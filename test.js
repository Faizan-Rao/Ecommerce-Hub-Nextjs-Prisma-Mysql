const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  const data = await prisma.subcategory.findMany({
    include:{
        products:true
    }
})
console.dir(data, {depth: null})
};

main()
  .catch((err) => {
    console.log(err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
