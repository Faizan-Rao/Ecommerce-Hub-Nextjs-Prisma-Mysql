import ExecuteQuery from "@/db/db";

// Interface : User  
export default async function handler (req, res)
{
    if(req.method === "GET")
    {
        try
        {
            // GET popular-products From Feedback and Product table
            const query = "SELECT p.product_id , p.product_price, p.product_qty, p.product_warranty  , p.product_title  ,p.product_desc , AVG(f.feedback_rating) AS avg_rating FROM products p JOIN feedback f ON p.product_id = f.product_id GROUP BY p.product_id, p.product_title HAVING AVG(f.feedback_rating) >= 2.0;"
            const values = [];

            const result = await ExecuteQuery({query, values})

            if(result.length > 0)
            {
                res.json({
                    status: "success",
                    data: result 
                })
            }
            else
            {
                res.json({
                    status: "failure",
                    data: []
                })
            }
            
        }
        catch(e)
        {
            res.json({
                status: "error",
                message: e.message
            })
        }
    }
} 