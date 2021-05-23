import {_getDataBaseConnection} from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query('' +
        'SELECT * FROM товары',
        (err, result) => callback(err, result)
    )
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const query = `insert into товары(Наименование, Цена, Описание, КоличествоНаСкладе, Категории_id, Производитель_id)` +
        ` values('${row.Наименование}', ${row.Цена}, '${row.Описание}',` +
        ` ${row.КоличествоНаСкладе}, ${row.Категории_id}, ${row.Производитель_id});`
    connection.query(query, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const query = `update товары set Наименование='${row.Наименование}', Цена=${row.Цена}, Описание='${row.Описание}',`+
        ` КоличествоНаСкладе=${row.КоличествоНаСкладе}, Категории_id=${row.Категории_id}, ` +
        `Производитель_id=${row.Производитель_id} where id='${row.id}';`
    connection.query(query, () => callback())
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from товары where id='${row.id}';`, callback)
    connection.end()
}

export default { get, add, update, del }