import {_getDataBaseConnection} from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const currentCallback = (_err, rows) => callback(rows)
    const queryText = `
        select * from Клиенты;
    `
    connection.query(queryText, currentCallback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        insert into клиенты(Имя, Отчество, Фамилия, Телефон, Email) 
        values(
            '${row.Имя}',
            '${row.Отчество}',
            '${row.Фамилия}',
            '${row.Телефон}',
            '${row.Email}'
        );
    `
    connection.query(queryText, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        update клиенты 
        set Имя='${row.Имя}', 
            Отчество='${row.Отчество}',
            Фамилия='${row.Фамилия}',
            Телефон='${row.Телефон}',
            Email='${row.Email}' 
        where id='${row.id}';
    `
    connection.query(queryText, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        delete from клиенты 
        where id='${row.id}';
    `
    connection.query(queryText, callback)
    connection.end()
}

export default { get, add, update, delete: del }