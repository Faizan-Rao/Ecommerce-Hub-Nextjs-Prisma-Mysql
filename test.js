const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  const stores = await prisma.stores.findMany()
        const customers = await prisma.customers.findMany();
        const admins = await prisma.admins.findMany();
        const purchaseRecord = await prisma.purchase_record.findMany()
        const revenue = purchaseRecord.reduce((totalRevenue, item)=>{
            if(item.purchase_status === "dispatched" && item.purchase_type === 'product')
                totalRevenue.revenue += (item.purchase_amount * 0.3)
            if(item.purchase_type === 'store')
                totalRevenue.revenue += item.purchase_amount 
            return totalRevenue
        },{revenue : 0})

        const payload = {
            totalStore : stores.length,
            totalCustomers: customers.length,
            totalAdmins: admins.length,
            totalRevenue: revenue.revenue
        }
        console.log(payload)
};

main()
  .catch((err) => {
    console.log(err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
