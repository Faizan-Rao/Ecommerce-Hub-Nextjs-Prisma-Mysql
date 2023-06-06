import ExecuteQuery from "@/db/db";

// Interface : User
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userEmail, userPassword, userName } = req.body;
      let query =
        "select * from customers where customer_login = ? and customer_password=? ";

      let values = [userEmail, userPassword];
      const validateUser = await ExecuteQuery({ query, values });

      if (validateUser.length > 0) {
        return res.status(400).json({
          error: "error",
        });
      }

      query =
        "insert into customers (customer_login, customer_name, customer_password) values (?,?,?);";
      values = [userEmail, userName, userPassword];
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
