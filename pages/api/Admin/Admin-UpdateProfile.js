
import { prisma } from "@/script";

export default async function handler (req, res)
{
    try 
    {
        if(req.method === "PUT")
        {

        
        const {admin_login ,admin_password, admin_name} = req.body
        
        let adminData = {};
        if(admin_password)
        {
            
            adminData.admin_password = admin_password;
    
        }
        if(admin_name){
           
            adminData.admin_name = admin_name
        }
        
         
         const updateAdmin = await prisma.admins.update({
          where : {
            admin_login,
          },
          data:adminData
         })
        
         res.json(updateAdmin)
        }
    }
    catch(e)
    {
        console.log(e.message)
        res.status(400).json({})
    }
}