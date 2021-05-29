import { _getDataBaseConnection } from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const currentCallback = (_err, rows) => callback(rows)
    const queryText = `select * from Товары;`
    connection.query(queryText, currentCallback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        insert into Товары(
            Наименование, 
            Цена, 
            Описание, 
            КоличествоНаСкладе, 
            Категории_id, 
            Производитель_id
        ) values(
            '${row.Наименование}',
            '${row.Цена}',
            '${row.Описание}',
            '${row.КоличествоНаСкладе}',
            ${row.Категории_id},
            ${row.Производитель_id}
        );
    `
    connection.query(queryText, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        update Товары 
        set Наименование='${row.Наименование}',
            Цена='${row.Цена}',
            Описание='${row.Описание}',
            КоличествоНаСкладе='${row.КоличествоНаСкладе}',
            Категории_id=${row.Категории_id},
            Производитель_id=${row.Производитель_id}
        where id=${row.id};
    `
    connection.query(queryText, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        delete from Товары
        where id=${row.id};
    `
    connection.query(queryText, callback)
    connection.end()
}

export default { get, add, update, delete: del }