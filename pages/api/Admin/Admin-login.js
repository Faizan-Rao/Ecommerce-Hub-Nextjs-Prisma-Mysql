import {prisma} from "@/script"

export default async function handler (req, res)
{
    try 
    {
        const {admin_login, admin_password} = req.body;

        const admin = await prisma.admins.findFirst({
            where:{
                admin_login,
                admin_password,
            }
        })

        return res.json(admin)
    }
    catch(e)
    {
        console.log(e.message)
        await prisma.$disconnect()
        res.status(400).json({})
    }
}