import { _getDataBaseConnection } from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        SELECT * FROM Поставки_Товары;
    `
    connection.query(queryText, (_err, rows) => callback(rows))
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = `
        insert into Поставки_Товары(
            Штука_Стоимость,
            КоличествоТовара,
            Поставка_id,
            Товар_id
        )
        values(
            ${row.Штука_Стоимость},
            ${row.КоличествоТовара},
            ${row.Поставка_id},
            ${row.Товар_id}
        );
    `
    connection.query(queryText, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        update Поставки_Товары 
        set Штука_Стоимость=${row.Штука_Стоимость},
            КоличествоТовара=${row.КоличествоТовара}
        where Поставка_id=${row.Поставка_id}
            and Товар_id=${row.Товар_id};
    `
    connection.query(queryText, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        delete from Поставки_Товары 
        where Поставка_id=${row.Поставка_id}
            and Товар_id=${row.Товар_id};
    `
    connection.query(queryText, callback)
    connection.end()
}

export default { get, add, update, delete: del }