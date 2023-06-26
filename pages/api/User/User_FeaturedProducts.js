import {prisma} from "@/script"

export default async function handler (req, res)
{
    try
    {
        const data = await prisma.subcategory.findMany({
            include:{
                products:true
            }
        })
       res.status(200).json(data)
    }
    catch(err)
    {
        console.log(err.message)
        res.status(400).json({})
    }
}