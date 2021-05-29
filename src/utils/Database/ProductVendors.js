import { _getDataBaseConnection } from './Connector'

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        SELECT * FROM производители;
    `
    connection.query(queryText, (_err, rows) => callback(rows))
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        insert into производители(
            Наименование
        ) values(
            '${row.Наименование}'
        );
    `
    connection.query(queryText, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        update производители
        set Наименование='${row.Наименование}'
        where id=${row.id};
    `
    connection.query(queryText, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        delete from производители
        where id=${row.id};
    `
    connection.query(queryText, callback)
    connection.end()
}

export default { get, add, update, delete: del }