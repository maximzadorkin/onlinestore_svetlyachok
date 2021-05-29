import { _getDataBaseConnection } from './Connector'
import convertDate from '../convertDate'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const currentCallback = (_err, rows) => {
        rows.forEach(row => row.Дата = convertDate.forCRM(row.Дата))
        callback(rows)
    }
    const queryText = `
        SELECT * FROM Поставки;
    `
    connection.query(queryText, currentCallback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        insert into Поставки(
            Дата,
            Поставщики_id,
            Сотрудники_id
        )
        values(
            '${convertDate.forDatabase(row.Дата)}',
            ${row.Поставщики_id},
            ${row.Сотрудники_id}
        );
    `
    connection.query(queryText, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        update Поставки 
        set Дата='${convertDate.forDatabase(row.Дата)}',
            Поставщики_id=${row.Поставщики_id},
            Сотрудники_id=${row.Сотрудники_id}
        where id=${row.id};
    `
    connection.query(queryText, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = `
        delete from Поставки_Товары
        where Поставка_id=${row.id};
    `
    connection.query(queryText, callback)
    queryText = `
        delete from Поставки
        where id=${row.id};
    `
    connection.query(queryText, callback)
    connection.end()
}

export default { get, add, update, delete: del }