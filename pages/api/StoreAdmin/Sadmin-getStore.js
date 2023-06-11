import {prisma} from '@/script'
// Interface: Store-Admin
export default async function handler (req, res) {
    try
    {
        await prisma.$connect();
        const {customer_login}= req.body;
        
        const store = await prisma.admins.findUnique({
            where:{
                admin_login : customer_login
            },
            select:{
                manages:{
                    select:{
                        stores:{
                            select:{
                                store_id: true,
                                store_name: true
                            }
                        }
                    }
                }
            }
        })
       
        await prisma.$disconnect() 
        const storeData = store.manages[0].stores
        if(storeData)
        return res.json(storeData)
        else{
            return res.json({})
        }
    }
    catch(err)
    {
        await prisma.$disconnect()
        console.log(err.message)
        return res.json({})
    }
}