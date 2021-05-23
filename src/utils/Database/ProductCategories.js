import {_getDataBaseConnection} from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query('SELECT * FROM категории', callback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`insert into категории(Наименование) values('${row.Наименование}');`, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    console.log(row)
    connection.query(`update категории set Наименование='${row.Наименование}' where id='${row.id}';`, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from категории where id='${row.id}';`, callback)
    connection.end()
}

export default { get, add, update, del }