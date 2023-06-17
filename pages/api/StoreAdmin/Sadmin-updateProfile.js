
import { prisma } from "@/script";

export default async function handler (req, res)
{
    try 
    {
        if(req.method === "POST")
        {

        
        const {customer_login ,customer_password, customer_name} = req.body
        let updateData = {}
        let adminData = {};
        if(customer_password)
        {
            updateData.customer_password = customer_password;
            adminData.admin_password = customer_password;
    
        }
        if(customer_name){
            updateData.customer_name = customer_name;
            adminData.admin_name = customer_name
        }
        
         const update = await prisma.customers.update({
          where : {
            customer_login
          },
          data: updateData
         })
         const updateAdmin = await prisma.admins.update({
          where : {
            admin_login: customer_login
          },
          data:adminData
         })
        
         res.json({update, updateAdmin})
        }
    }
    catch(e)
    {
        console.log(e.message)
        res.status(400).json({})
    }
}