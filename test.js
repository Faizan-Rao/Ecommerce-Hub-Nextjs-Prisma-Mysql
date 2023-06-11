const {PrismaClient} =  require("@prisma/client")
const prisma = new PrismaClient();

const main = async () =>{
    const Orders = await prisma.purchase_record.findMany({
        where:{
          store_id : 2,
        },
        
      })
      let revenue = Orders.reduce((totalData, item)=>{
        totalData.totalRevenue += item.purchase_amount;
        return totalData
      },{
        totalRevenue: 0,
      })
      console.log(revenue)
      console.dir(Orders, revenue,{depth: null})

    
  
}

main()
.catch(err=>{
    console.log(err.message)
}).finally(async ()=>{
    await prisma.$disconnect()
})