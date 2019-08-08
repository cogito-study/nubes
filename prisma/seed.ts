import Photon from '@generated/photon';
import * as faker from 'faker';
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

  if (process.env.NODE_ENV === 'production') return;

  const user = await photon.users.create({
    data: {
      email: 'user@example.org',
      firstName: 'Test',
      lastName: 'User',
      identifier: 'KATZEN',
      password: '$2y$12$OpGDvPj9lctWxuY9CsXd8Oootkg0xV5nIO2q..pvga6806.CR2luS', // "password"
      role: { connect: { id: userRole.id } },
    },
  });
  const admin = await photon.users.create({
    data: {
      email: 'admin@example.org',
      firstName: 'Test',
      lastName: 'Admin',
      password: '$2y$12$OpGDvPj9lctWxuY9CsXd8Oootkg0xV5nIO2q..pvga6806.CR2luS', // "password",
      identifier: 'WONDER',
      role: { connect: { id: adminRole.id } },
    },
  });
  const professor = await photon.users.create({
    data: {
      email: 'professor@example.org',
      firstName: 'Test',
      lastName: 'Professor',
      password: '$2y$12$OpGDvPj9lctWxuY9CsXd8Oootkg0xV5nIO2q..pvga6806.CR2luS', // "password",
      identifier: 'BATMAN',
      role: { connect: { id: professorRole.id } },
    },
  });

  for (let indexOfUniversity = 0; indexOfUniversity < 3; indexOfUniversity++) {
    let university = await photon.institutes.create({
      data: {
        name: `University of ${faker.address.city()}`,
      },
    });
    let students = Array();
    students.push({ id: user.id });
    for (let index = 0; index < 100; index++) {
      let user = await photon.users.create({
        data: {
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          password: '$2y$12$OpGDvPj9lctWxuY9CsXd8Oootkg0xV5nIO2q..pvga6806.CR2luS', // "password",
          identifier: faker.random.alphaNumeric(6),
          role: { connect: { id: userRole.id } },
          institutes: { connect: { id: university.id } },
        },
      });
      students.push({ id: user.id });
    }
    for (let indexOfDepartment = 0; indexOfDepartment < 10; indexOfDepartment++) {
      let department = await photon.departments.create({
        data: {
          name: faker.name.jobArea(),
          description: faker.name.jobDescriptor(),
          leader: { connect: { id: professor.id } },
          institute: { connect: { id: university.id } },
        },
      });
      for (let indexOfSubject = 0; indexOfSubject < 10; indexOfSubject++) {
        let subject = await photon.subjects.create({
          data: {
            name: faker.random.words(2),
            code: faker.random.alphaNumeric(12),
            description: faker.random.words(13),
            department: { connect: { id: department.id } },
            teachers: { connect: { id: professor.id } },
            students: {
              connect: [...students],
            },
          },
        });
        for (let indexOfNote = 0; indexOfNote < 10; indexOfNote++) {
          await photon.notes.create({
            data: {
              title: faker.random.words(2),
              number: faker.random.number(),
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
        }
      }
    }
  }
}

main().finally(async () => {
  await photon.disconnect();
});
