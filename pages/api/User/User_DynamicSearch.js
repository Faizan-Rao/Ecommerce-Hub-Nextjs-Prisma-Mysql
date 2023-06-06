import ExecuteQuery from "@/db/db";

// Interface : User
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // GET all Stores
      const { search, minPrice, maxPrice } = req.query;
      
      const values = [search, minPrice, maxPrice ];
      
      const query =
        "select * from products where match(product_title) against (?)  or product_price Between ? and ?";

      const result = await ExecuteQuery({ query, values });
        console.log(result)
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
