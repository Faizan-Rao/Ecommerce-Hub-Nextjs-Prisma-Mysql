import ExecuteQuery from "@/db/db";

// Interface : User
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // GET get Specific SubCategories from Table
      const { prodId } = req.query;
      let query =
        "select * from products inner join feedback  using(product_id) where product_id = ?";
      let values = [prodId];
      let result = await ExecuteQuery({ query, values });

      query =
        "SELECT SUM(f.feedback_rating) AS avg_rating FROM products p JOIN feedback f ON p.product_id = f.product_id GROUP BY p.product_id, p.product_title HAVING SUM(f.feedback_rating) >= 0.0 ";
      values = [prodId];
      let ratings = await ExecuteQuery({ query, values });

<<<<<<< HEAD
      
=======
     
>>>>>>> feature

      if (ratings.length > 0 && result.length > 0) {
        result = { ...result[0], ["avg_rating"]: ratings[0].avg_rating };
      }
<<<<<<< HEAD
     
=======
      
>>>>>>> feature

      if (result.length !== 0) {
        return res.json({
          status: "success",
          data: [result],
        });
      } else
       {
       let query = "select * from products where product_id = ?";
       let values = [prodId];
        let result = await ExecuteQuery({ query, values });
        
        query =
          "SELECT SUM(f.feedback_rating) AS avg_rating FROM products p JOIN feedback f ON p.product_id = f.product_id GROUP BY p.product_id, p.product_title HAVING SUM(feedback_rating) >= 0.0 ";
        values = [prodId];
        let ratings = await ExecuteQuery({ query, values });
        
        if (ratings.length > 0 && result.length > 0) {
          result = { ...result[0], ["avg_rating"]: ratings[0].avg_rating };
        }
        
        return res.json({
          status: "success",
          data: [result],
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
