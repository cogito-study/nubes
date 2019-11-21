import { Photon } from '@generated/photon';
import { config } from 'dotenv';
import * as faker from 'faker';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env') });
// TODO: Refactor when prisma2 supports seed
const photon = new Photon();

async function main() {
  const userRoles = await photon.userRoles.findMany();
  if (userRoles.length > 0) return;

  const adminRole = await photon.userRoles.create({
    data: {
      name: 'Admin',
      type: 'ADMIN',
    },
  });
  const professorRole = await photon.userRoles.create({
    data: {
      name: 'Professor',
      type: 'PROFESSOR',
    },
  });
  const userRole = await photon.userRoles.create({
    data: {
      name: 'User',
      type: 'USER',
    },
  });

  const english = await photon.languages.create({
    data: {
      code: 'en',
      name: 'English',
    },
  });
  const hungarian = await photon.languages.create({
    data: {
      code: 'hu',
      name: 'Magyar',
    },
  });

  if (process.env.NODE_ENV === 'production') return;

  const user = await photon.users.create({
    data: {
      email: 'user@example.org',
      firstName: 'Test',
      lastName: 'User',
      identifier: 'KATZEN',
      isActive: true,
      password: '$2b$12$7gGeJkqmmo7tTZ0QoikNBOGz6M1hxPsDVNHKoDmQpH98gMkTA5TuK', // "password"
      role: { connect: { id: userRole.id } },
    },
  });
  const admin = await photon.users.create({
    data: {
      email: 'admin@example.org',
      firstName: 'Test',
      lastName: 'Admin',
      password: '$2b$12$7gGeJkqmmo7tTZ0QoikNBOGz6M1hxPsDVNHKoDmQpH98gMkTA5TuK', // "password",
      identifier: 'WONDER',
      isActive: true,
      role: { connect: { id: adminRole.id } },
    },
  });
  photon.userPermissions.create({
    data: {
      type: 'UPDATE_USER',
      permissions: {
        create: {
          users: {
            connect: {
              id: admin.id,
            },
          },
        },
      },
      objects: {
        connect: { id: admin.id },
      },
    },
  });
  const professor = await photon.users.create({
    data: {
      email: 'professor@example.org',
      firstName: 'Test',
      lastName: 'Professor',
      position: 'professor',
      password: '$2b$12$7gGeJkqmmo7tTZ0QoikNBOGz6M1hxPsDVNHKoDmQpH98gMkTA5TuK', // "password",
      identifier: 'BATMAN',
      isActive: true,
      role: { connect: { id: professorRole.id } },
    },
  });

  for (let indexOfUniversity = 0; indexOfUniversity < 3; indexOfUniversity++) {
    const university = await photon.institutes.create({
      data: {
        name: `University of ${faker.address.city()}`,
      },
    });
    const students = [];
    for (let index = 0; index < 100; index++) {
      const newUser = await photon.users.create({
        data: {
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          password: '$2b$12$7gGeJkqmmo7tTZ0QoikNBOGz6M1hxPsDVNHKoDmQpH98gMkTA5TuK', // "password",
          identifier: faker.random.alphaNumeric(6),
          isActive: true,
          role: { connect: { id: userRole.id } },
          institutes: { connect: { id: university.id } },
        },
      });
      students.push({ id: newUser.id });
    }
    for (let indexOfDepartment = 0; indexOfDepartment < 5; indexOfDepartment++) {
      const department = await photon.departments.create({
        data: {
          name: faker.name.jobArea(),
          description: faker.name.jobDescriptor(),
          leader: { connect: { id: professor.id } },
          institute: { connect: { id: university.id } },
        },
      });
      photon.departmentPermissions.create({
        data: {
          type: 'UPDATE_DEPARTMENT',
          permissions: {
            create: {
              users: {
                connect: {
                  id: admin.id,
                },
              },
            },
          },
          objects: {
            connect: { id: department.id },
          },
        },
      });
      let connectedStudents = [];
      if (indexOfDepartment == 0 && indexOfUniversity == 0) {
        connectedStudents = [...students, { id: user.id }];
      } else {
        connectedStudents = [...students];
      }
      for (let indexOfSubject = 0; indexOfSubject < 5; indexOfSubject++) {
        const subject = await photon.subjects.create({
          data: {
            name: faker.random.words(2),
            code: faker.random.alphaNumeric(12),
            description: faker.random.words(13),
            department: { connect: { id: department.id } },
            teachers: { connect: { id: professor.id } },
            students: {
              connect: [...connectedStudents],
            },
            language: {
              connect: { id: hungarian.id },
            },
          },
        });
        for (let indexOfSubjectInformation = 0; indexOfSubjectInformation < 3; indexOfSubjectInformation++) {
          let subjectInformation = await photon.subjectInformations.create({
            data: {
              title: faker.random.words(3),
              content: faker.random.words(40),
              subject: { connect: { id: subject.id } },
            },
          });
        }
        for (let indexOfNote = 0; indexOfNote < 10; indexOfNote++) {
          let note = await photon.notes.create({
            data: {
              title: faker.random.words(3),
              number: faker.random.number(100),
              description: faker.random.words(13),
              subject: { connect: { id: subject.id } },
              noteCategory: 'NOTE',
              content: JSON.stringify({
                ops: [
                  { insert: 'Gandalf', attributes: { bold: true } },
                  { insert: ' the ' },
                  { insert: 'Grey', attributes: { color: '#cccccc' } },
                ],
              }),
              contentHTML: '<b>Gandalf</b> the <span style="color: #cccccc;>Grey</span>',
            },
          });
          photon.notePermissions.create({
            data: {
              type: 'UPDATE_NOTE',
              permissions: {
                create: {
                  users: {
                    connect: {
                      id: admin.id,
                    },
                  },
                },
              },
              objects: {
                connect: { id: note.id },
              },
            },
          });
        }
      }
    }
  }
}

main().finally(async () => {
  await photon.disconnect();
});
