const _getDataBaseConnection = () => {
    const mysql = require("mysql2")

    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "onlinestore"
    })
}

export {
    _getDataBaseConnection
}