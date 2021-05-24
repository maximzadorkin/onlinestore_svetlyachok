import {_getDataBaseConnection} from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query('SELECT * FROM поставки', (err, result) => {

        const rows = result.map(r => {
            const date = new Date(r.Дата)
            r.Дата = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            return r
        })

        if (callback !== null) callback(err, rows)
    })
    connection.end()
}

const addProcurement = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const values = `'${row.Дата}', ${row.Поставщики_id}, ${row.Сотрудники_id}`
    connection.query(`insert into поставки(Дата, Поставщики_id, Сотрудники_id) values(${values});`, callback)
    connection.end()
}

const updateProcurement = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    let date
    let DateFormat = row.Дата
    if (DateFormat.length > 13) {
        date = new Date(row.Дата)
        DateFormat = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }
    connection.query(`update поставки set Дата='${DateFormat}', Поставщики_id=${row.Поставщики_id},` +
        ` Сотрудники_id=${row.Сотрудники_id}  where id=${row.id};`, callback)
    connection.end()
}

const delProcurement = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from поставки_товары where Поставка_id=${row.id};`, () => {
        const connection = _getDataBaseConnection()
        connection.connect()
        connection.query(`delete from поставки where id='${row.id}';`, callback)
        connection.end()
    })
    connection.end()
}

const getProcProducts = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query('SELECT * FROM поставки_товары', callback)
    connection.end()
}

const addProcProducts = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const values = `${row.Поставка_id}, ${row.Товар_id}, ${row.КоличествоТовара}`
    connection.query(`insert into поставки_товары(Поставка_id, Товар_id, КоличествоТовара) values(${values});`, callback)
    connection.end()
}

const updateProcProducts = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`update поставки_товары set` +
        ` КоличествоТовара=${row.КоличествоТовара}  where Товар_id=${row.Товар_id} and Поставка_id='${row.Поставка_id}';`, callback)
    connection.end()
}

const delProcProducts = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from поставки_товары where Поставка_id=${row.Поставка_id} and Товар_id=${row.Товар_id};`, callback)
    connection.end()
}

export default {
    get,
    addProcurement,
    updateProcurement,
    delProcurement,
    getProcProducts,
    addProcProducts,
    updateProcProducts,
    delProcProducts
}