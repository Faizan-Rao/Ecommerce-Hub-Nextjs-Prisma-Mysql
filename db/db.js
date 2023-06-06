import  mysql from  'mysql2'

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'biz_world',
  password: 'rootadmin'
});

const ExecuteQuery = async ({query, values}) => {
 const promisePool = pool.promise();
  // query database using promises
  const [result] = await promisePool.query(query, values);
    
  return result;
}

export default ExecuteQuery;