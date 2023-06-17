import { prisma } from "@/script";

export default async function handler(req, res) {
  try {
    const { s_id } = req.query;
    const id = parseInt(s_id);
    const categories = await prisma.stores_has_categories.findMany({
      where: {
        store_id: id,
      },
      select: {
        categories: {
          select: { category_id: true, category_title: true },
        },
      },
    });

    res.json(categories)
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
}
