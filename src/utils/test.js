const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "onlinestore"
})

connection.connect()
connection.query('SELECT * FROM Сделки left join СтатусыСделки on Сделки.СтатусыСделки_id = СтатусыСделки.id')
connection.end()