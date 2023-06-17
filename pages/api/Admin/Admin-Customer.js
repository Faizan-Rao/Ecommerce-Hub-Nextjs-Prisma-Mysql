import {prisma} from '@/script'

export default async function handler (req, res)
{
    switch(req.method)
    {
        case "GET":
            await getCustomer(req, res);
            break;
    }
} 

const getCustomer = async (req, res) =>{
    try
    {
        const customers = await prisma.customers.findMany({
            select:{
                customer_login: true,
                customer_name: true,
               
                
            }
        })

        return res.json(customers)
        
    }
    catch(e)
    {
        console.log(e.message)
        res.status(400).json({})
    }
}
