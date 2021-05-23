import {_getDataBaseConnection} from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query('SELECT * FROM Клиенты', callback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const values = `'${row.Имя}', '${row.Отчество}', '${row.Фамилия}', '${row.Телефон}', '${row.Email}'`
    connection.query(`insert into клиенты(Имя, Отчество, Фамилия, Телефон, Email) values(${values});`, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const values = `Имя='${row.Имя}', Отчество='${row.Отчество}', Фамилия='${row.Фамилия}', Телефон='${row.Телефон}', Email='${row.Email}'`
    connection.query(`update клиенты set ${values} where id='${row.id}';`, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from клиенты where id='${row.id}';`, callback)
    connection.end()
}

export default { get, add, update, del }