const {PrismaClient} =  require("@prisma/client")
const prisma = new PrismaClient();

const main = async () =>{
 

    
  
}

main()
.catch(err=>{
    console.log(err.message)
}).finally(async ()=>{
    await prisma.$disconnect()
})