import { prisma } from "@/script";

export default async function handler (req, res)
{
    try
    {
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
       return res.json(payload)
    }
    catch(e)
    {
        console.log(e.message)
        res.status(400).json({})
    }
}