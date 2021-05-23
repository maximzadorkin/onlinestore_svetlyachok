import {_getDataBaseConnection} from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query('SELECT * FROM СтатусыСделки', callback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`insert into СтатусыСделки(Описание) values('${row.Описание}');`, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`update СтатусыСделки set Описание='${row.Описание}' where id='${row.id}';`, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from СтатусыСделки where id='${row.id}';`, callback)
    connection.end()
}

export default { get, add, update, del }