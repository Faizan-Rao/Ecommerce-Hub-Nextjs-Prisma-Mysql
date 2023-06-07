import ExecuteQuery from "@/db/db";

// Interface : User
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { customer_id, product_id, feedback_rating } = req.body;
      let query =
        "select * from feedback where customer_id = ? and product_id = ? ";

      let values = [customer_id, product_id];
      const validateUser = await ExecuteQuery({ query, values });

      if (validateUser.length > 0) {
        return res.status(400).json({
          error: "error",
        });
      }

      query =
        "insert into feedback (customer_id, product_id, feedback_rating) values (?,?,?);";
      values = [customer_id, product_id, feedback_rating];
      const result = await ExecuteQuery({ query, values });

      return res.json({
        status: "success",
      });
    } catch (e) {
      res.json({
        status: "error",
        message: e.message,
      });
    }
  }
}
