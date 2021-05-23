const _getDataBaseConnection = () => {
    const mysql = require("mysql2")

    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "onlinestore"
    })
}

export  {
    _getDataBaseConnection
}