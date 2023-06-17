import {prisma} from '@/script'

export default async function handler (req, res)
{
    switch(req.method)
    {
        case "GET":
            await getStore(req, res);
            break;
    }
} 

const getStore = async (req, res) =>{
    try
    {
        const admins = await prisma.admins.findMany({
            select:{
                admin_login: true,
                admin_name: true,
                admin_role: true,
                manages:{
                    include:{
                      stores: true
                    }
                }
            }
        })

        return res.json(admins)
        
    }
    catch(e)
    {
        console.log(e.message)
        res.status(400).json({})
    }
}
