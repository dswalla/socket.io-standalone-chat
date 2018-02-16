const mysql = require('mysql2/promise')
let conn = null

const createConnection = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Homeaway_Pinboard'
  })
  return true
}

module.exports.query = async (query, values) => {
  if (!conn) await createConnection()
  const [rows, fields] = await conn.execute(query, values)
  return rows
}

module.exports.createConnection = createConnection
