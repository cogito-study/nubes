// // THIS SCRIPT WILL BE USED FOR SEEDING WHEN THIS GITHUB ISSUE IS FIXED:
// // https://github.com/prisma/prisma/issues/3596

// import { hash } from 'bcrypt';
// import { prisma } from '../src/generated/prisma-client';

// async function main() {
//   const password = await hash('asdf1234', 10);

//   await prisma.createUser({
//     email: 'mate.papp@cogito.study',
//     password,
//     neptun: 'ABC123',
//     firstName: 'Mate',
//     lastName: 'Papp',
//     role: 'ADMIN',
//   });
// }

// main();
