
import { prisma } from "@/script";

export default async function handler (req, res)
{
    try 
    {
        if(req.method === "POST")
        {

        
        const {store_id ,store_name} = req.body
        const updateStore = {}
        let id = parseInt(store_id)
        if(store_name){
           updateStore.store_name = store_name;
        }
        
         const update = await prisma.stores.update({
          where : {
            store_id : id
          },
          
          data:{
            store_name: updateStore.store_name
          }
         })
         
        
         res.json({update})
        }
    }
    catch(e)
    {
        console.log(e.message)
        res.status(400).json({})
    }
}