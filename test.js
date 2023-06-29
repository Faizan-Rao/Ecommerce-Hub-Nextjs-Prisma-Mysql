const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  const data = await prisma.purchase_record.findMany({
    where:{
        AND:[
          {purchase_date:{gte:new Date("2023-06-18")}},
          {purchase_date:{lte:new Date("2023-06-20")}}
        ]
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
