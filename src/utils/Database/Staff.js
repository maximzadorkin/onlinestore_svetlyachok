import {_getDataBaseConnection} from './Connector'

const addPositionForStaffID = (staffId, positions, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = ''
    positions.map(pos => {
        queryText += `
            insert into Должности_Сотрудники(
                Должности_id,
                Сотрудники_id
            ) values(
                ${pos},
                ${staffId}
            );
        `
    })
    connection.query(queryText, typeof callback === 'function' ? callback : null)
    connection.end()
}

const getPositionsForStaff = (staff, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `select * from Должности_Сотрудники;`
    const currentCallback = (_err, rows) => {
        const currentRows = staff.map(s => ({
            ...s,
            Должности: rows.filter(r => r.Сотрудники_id === s.id)
        }))
        callback(currentRows)
    }
    connection.query(queryText, currentCallback)
    connection.end()
}

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `select * from сотрудники;`
    const currentCallback = (_err, rows) => getPositionsForStaff(rows, callback)
    connection.query(queryText, currentCallback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = `
        insert into сотрудники(
            Имя, 
            Отчество, 
            Фамилия, 
            Телефон, 
            Email,
            Login,
            Password
        ) values(
            '${row.Имя}',
            '${row.Отчество}',
            '${row.Фамилия}',
            '${row.Телефон}',
            '${row.Email}',
            '${row.Login}',
            '${row.Password}'
        );
    `
    connection.query(
        queryText,
        (_err, result) =>
            addPositionForStaffID(result.insertId, row.Должности, callback)
    )
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = `
        update сотрудники 
        set Имя='${row.Имя}', 
            Отчество='${row.Отчество}',
            Фамилия='${row.Фамилия}',
            Телефон='${row.Телефон}',
            Email='${row.Email}',
            Login='${row.Login}',
            Password='${row.Password}'
        where id='${row.id}';
        delete from Должности_Сотрудники
        where Сотрудники_id=${row.id};
    `
    connection.query(
        queryText,
        (_err, _result) =>
            addPositionForStaffID(row.id, row.Должности, callback)
    )
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        delete from сотрудники 
        where id='${row.id}';
        delete from Должности_Сотрудники
        where Сотрудники_id=${row.id};
    `
    connection.query(queryText, callback)
    connection.end()
}

export default { get, add, update, delete: del }