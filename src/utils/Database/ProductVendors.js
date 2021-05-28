import {_getDataBaseConnection} from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query('SELECT * FROM производители', (_err, rows) => callback(rows))
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`insert into производители(Наименование) values('${row.Наименование}');`, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`update производители set Наименование='${row.Наименование}' where id=${row.id};`, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from производители where id=${row.id};`, callback)
    connection.end()
}

export default { get, add, update, delete: del }