import { prisma } from "@/script";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { minDate, maxDate, store_id } = req.body;

      if (!minDate || !maxDate) return res.json({});

      const data = await prisma.purchase_record.findMany({
        where: {
          AND: [
            { purchase_date: { gte: new Date(minDate) } },
            { purchase_date: { lte: new Date(maxDate) } },
            { store_id: parseInt(store_id) },
          ],
        },
      });
      if (data) return res.status(200).json(data);
      else
        return res
          .status(200)
          .json({ status: "success", message: "No Records Found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({});
  }
}
