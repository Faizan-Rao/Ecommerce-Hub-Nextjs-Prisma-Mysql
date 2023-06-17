import { prisma } from "@/script";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const orderResponse = await getRevenue(req);
      if (orderResponse) res.status(200).json(orderResponse);
      break;
   
  }
}

const getRevenue = async (req) => {
  try {
    await prisma.$connect();
    const { store_id, customer_id } = req.query;
    const id = parseInt(store_id);
    const cus_id = parseInt(customer_id);
    // Get-Orders By Customer Id
    const Orders = await prisma.purchase_record.findMany({
      where: {
       
        AND:[
            {
                purchase_status: "dispatched"
            },
            {
                store_id: id,
            }
        ]
      },
    });

    let revenue = Orders.reduce(
      (totalData, item) => {
        totalData.totalRevenue += item.purchase_amount;
        return totalData;
      },
      {
        totalRevenue: 0,
      }
    );

    await prisma.$disconnect();
    if(revenue || Orders)
    return {
      revenue: revenue.totalRevenue,
      orders: Orders,
    };
    else{
      return{}
    }
  } catch (err) {
    await prisma.$disconnect();
    // res.status(400).json({status: "error", message:err.message})
    console.log(err.message);
  }
};

