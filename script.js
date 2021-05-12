const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await getAllUsers();
  console.dir(allUsers, { depth: null });

  console.log("------------------------------");
  const insertPost = await insertNewPost();
  console.log(insertPost);

  console.log("------------------------------");
  const updatedPost = await updatePost();
  console.log(updatedPost);
}

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany({ include: { posts: true } });
  return allUsers;
};

const insertNewPost = async () => {
  const post = await prisma.post.create({
    data: {
      title: "Hello World",
      content: "Description of the title",
      author: {
        connect: { id: 1 },
      },
    },
  });
  return post;
};

const updatePost = async () => {
  const post = await prisma.post.update({
    where: { id: 2 },
    data: { published: true },
  });
  return post;
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
