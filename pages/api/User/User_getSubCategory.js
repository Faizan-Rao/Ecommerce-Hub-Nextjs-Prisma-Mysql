import ExecuteQuery from "@/db/db";

// Interface : User  
export default async function handler (req, res)
{
    if(req.method === "GET")
    {
        try
        {
            // GET get Specific SubCategories from Table
            const {catId} = req.query;
            const query = "select * from subcategory where category_id = ?;"
            const values = [catId];

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