import { prisma } from "@/script";




export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const orderResponse = await getDispatchOrders(req);
      if (orderResponse) res.status(200).json(orderResponse);
      break;
   
  }
}

const getDispatchOrders = async (req) => {
  try {
    await prisma.$connect();
    const d_Orders = await prisma.purchase_record.findMany({
        where:{
            purchase_status: "dispatched"
        }
    })
    console.log(d_Orders)
    

    await prisma.$disconnect();
    if( d_Orders)
    return d_Orders
    else{
      return {}
    }
  } catch (err) {
    await prisma.$disconnect();
    
    console.log(err.message);
  }
};

