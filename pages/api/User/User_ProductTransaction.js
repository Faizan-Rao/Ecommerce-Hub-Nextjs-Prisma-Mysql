import { prisma } from "@/script";

// Interface : User
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // prisma Connection to database
      await prisma.$connect();

      // GET all Stores

      try {
        const { cart, b_card, b_cardNo, customer_id } = req.body;
        // Product Transaction
        const newBill = await prisma.billing.create({
          data: {
            bill_card: b_card,
            bill_card_no: b_cardNo,
            bill_date: new Date(),
            delivery_date: new Date(),
            customer_id: customer_id,
          },
        });

        // Generated Bill
        const bill_id = newBill.bill_id;

        const DataToSend = cart.map((e) => {
          if (e.purchase_quantity > 0) {
            return {
              purchase_amount: e.purchase_amount,
              purchase_quantity: e.purchase_quantity,
              purchase_title: e.purchase_title,
              product_id: e.product_id,
              purchase_date: new Date(),
              purchase_status: e.purchase_status,
              purchase_type: e.purchase_type,
              bill_id: bill_id,
            };
          }
        });

        const response = await prisma.purchase_record.createMany({
          data: DataToSend,
        });
        

        // Disconnect from the database and return response
        await prisma.$disconnect();
        return res.json({
          status: "success",
        });
      } catch (e) {
        return res.json({
          status: "failure",
          e: message,
        });
      }
    } catch (e) {
      await prisma.$disconnect();
      return res.json({
        status: "error",
        e: e.message,
      });
    }
  }
}
