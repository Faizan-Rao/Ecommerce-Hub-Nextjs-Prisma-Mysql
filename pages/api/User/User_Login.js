import ExecuteQuery from "@/db/db";

// Interface : User
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      
      const { userEmail, userPassword } = req.body;
      let query ="select * from customers where customer_login = ? and customer_password=? ";
      
      let values = [userEmail, userPassword];
      const  validateUser = await ExecuteQuery ({query, values})
        
      if(validateUser.length <= 0)
      {
        return res.status(404).json({
            error: "error"
        })
      }

      
      
       return res.json({
          status: "success",
          data: validateUser[0] })
      
      
    } catch (e) {
      res.json({
        status: "error",
        message: e.message,
      });
    }
  }
}
