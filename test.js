const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  // const data = {
  //   product_desc: "This is very good Product",
  //   product_image: "1686814468266_marvin-meyer-SYTO3xs06fU-unsplash.jpg",
  //   product_price: parseFloat("300"),
  //   product_stock_status: parseFloat("12"),
  //   product_title: "asdfadsfa",
  //   product_warranty: "1 year",
  //   store_id : 1,
  //   subcategory_id : 1,
  // };
  // const createProduct = await prisma.products.create({
  //   data,
  // })

  // console.log(createProduct)
};

main()
  .catch((err) => {
    console.log(err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
