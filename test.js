const {PrismaClient} =  require("@prisma/client")
const prisma = new PrismaClient();

const main = async () =>{
    const PR_response = await prisma.billing.findMany({
        where:{
          customer_id: 1
        },
        include:{
          purchase_record:{
            where:{
              purchase_id: 60,
            }

          }
        }
      })
      console.dir(PR_response,{depth: null})
}

main()
.catch(err=>{
    console.log(err.message)
}).finally(async ()=>{
    await prisma.$disconnect()
})