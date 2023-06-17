import { prisma } from "@/script";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const orderResponse = await getOrder(req);
      if (orderResponse) res.status(200).json(orderResponse);
      break;
    case "PUT":
      const response = await dispatchOrder(req)
      res.status(200).json(response)
      break;
  }
}

const getOrder = async (req) => {
  try {
    await prisma.$connect();
    const { store_id, customer_id } = req.query;
    const id = parseInt(store_id);
    const cus_id = parseInt(customer_id);
    // Get-Orders By Customer Id
    const Orders = await prisma.purchase_record.findMany({
      where: {
        AND: [
          {
            store_id: id,
          },
          
          {
            purchase_status: "full-filled",
            // purchase_status: "dispatched",
          },
        ],
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
      return {}
    }
  } catch (err) {
    await prisma.$disconnect();
    // res.status(400).json({status: "error", message:err.message})
    
  }
};

const dispatchOrder = async (req) => {
  try {
    await prisma.$connect();
    const { id } = req.body;
    const pr_id = parseInt(id);

    // Get-Orders By Customer Id
    const Orders = await prisma.purchase_record.update({
      where: {
        purchase_id: pr_id,
      },
      data: {
        purchase_status: "dispatched"
      },
    });

    await prisma.$disconnect();
    return Orders;
  } catch (err) {
    await prisma.$disconnect();
    // res.status(400).json({status: "error", message:err.message})
   
    return null;
  }
};
