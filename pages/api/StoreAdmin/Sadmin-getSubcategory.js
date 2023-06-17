import { prisma } from "@/script";

export default async function handler(req, res) {
  try {
    const { c_id } = req.query;
    const id = parseInt(c_id);
    const subcategories = await prisma.subcategory.findMany({
      where: {
        category_id: id,
      },
    });

    res.json(subcategories);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
}
