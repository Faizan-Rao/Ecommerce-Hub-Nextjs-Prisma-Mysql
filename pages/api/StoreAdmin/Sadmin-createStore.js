import { prisma } from "@/script";

export default async function handler(req, res) {
  try {
    const { customerData, b_card, b_cardNo, store_name } = req.body;
    const bill = await prisma.billing.create({
      data: {
        bill_card: b_card,
        bill_card_no: b_cardNo,
        bill_date: new Date(),
        delivery_date: new Date(),
        customer_id: parseInt(customerData.customer_id),
      },
    });
    // console.log()
    const id = bill.bill_id
    const purchaseRecord = await prisma.purchase_record.create({
      data: {
        purchase_amount: 300,
        purchase_date: new Date(),
        purchase_quantity: 1,
        purchase_type: "store",
        purchase_status: "dispatched",
        purchase_title: "Purchased Store",
        store_id: 0,
        billing:{
            connect: {
                 bill_id: id
            }
        }
        
      },
    });
    console.log(purchaseRecord);
    if (purchaseRecord) {
      const admin = await prisma.admins.create({
        data: {
          admin_login: customerData.customer_login,
          admin_name: customerData.customer_name,
          admin_password: customerData.customer_password,
          admin_role: "sAdminS",
        },
      });
      const store = await prisma.stores.create({
        data: {
          store_name: store_name,
        },
      });
      const manages = await prisma.manages.create({
        data: {
          admin_id: admin.admin_id,
          store_id: store.store_id,
        },
      });

      return res.json(store);
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
}
