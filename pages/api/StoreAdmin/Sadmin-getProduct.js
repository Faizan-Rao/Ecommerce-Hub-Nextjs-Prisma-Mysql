
import { prisma } from "@/script";

export default async function handler(req, res) {
  switch(req.method)
  {
    case "GET":
      await getProduct(req,res);
    break;
  }  
}


const getProduct = async (req, res) => {
  try {
   
    const { subId } = req.query;
    const id = parseInt(subId);
    const products = await prisma.products.findMany({
        where:{
            subcategory_id : id
        }
      })

    res.json(products)
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
}