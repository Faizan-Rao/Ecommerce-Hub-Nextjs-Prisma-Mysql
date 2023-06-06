import ExecuteQuery from "@/db/db";

// Interface : User  
export default async function handler (req, res)
{
    if(req.method === "GET")
    {
        try
        {
            // GET get Specific Categories from Table
            const {storeId} = req.query;
            const query = "select * from stores inner join stores_has_categories using (store_id) inner join categories using(category_id) where store_id = ?;"
            const values = [storeId];

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