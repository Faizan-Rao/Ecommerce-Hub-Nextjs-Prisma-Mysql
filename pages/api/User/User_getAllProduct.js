import ExecuteQuery from "@/db/db";

// Interface : User
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // GET all Stores
      const query =
        "select * from categories inner join subcategory using (category_id) inner join products using (subcategory_id);";
      const values = [];

      const result = await ExecuteQuery({ query, values });

      if (result.length > 0) {
        res.json({
          status: "success",
          data: result,
        });
      } else {
        res.json({
          status: "failure",
          data: [],
        });
      }
    } catch (e) {
      res.json({
        status: "error",
        message: e.message,
      });
    }
  }
}
