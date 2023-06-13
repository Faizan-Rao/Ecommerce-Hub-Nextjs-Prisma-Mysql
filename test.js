const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  const products = await prisma.products.findMany({
    where:{
        subcategory_id : 1
    }
  })
  console.log(products)
};

main()
  .catch((err) => {
    console.log(err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
