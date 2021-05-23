import {_getDataBaseConnection} from './Connector'
import _ from 'lodash'

const findPositionsForEveryStaff = (staff, positions, callback) => {

    const rows = staff.map(s => {
        s.Должности = {}
        s.Должности.value = positions
            .filter(p => p.Сотрудники_id === s.id)
            .map(p => p.Должности_id)
        s.Должности.selectionList = _.sortedUniq(positions.map(p => p.Должности_id))
        return s
    })

    callback(null, rows) // запишет в rows

}

const getPositionsForStaff = (staff, callback) => {
    const connection = _getDataBaseConnection()
    connection.connect()

    connection.query(
        `SELECT * FROM Должности_Сотрудники`,
        (err, positions) => findPositionsForEveryStaff(staff, positions, callback)
    )

    connection.end()
}

const get = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(
        'SELECT * FROM сотрудники',
        (err, result) => getPositionsForStaff(result, callback)
    )
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    _.keys(row).forEach(key => {
        if (row[key] === null)
            row[key] === ''
    })
    const data = `'${row.Имя}', '${row.Отчество}', '${row.Фамилия}', '${row.Телефон}', '${row.Email}'`
    connection.query(
        `insert into сотрудники(Имя, Отчество, Фамилия, Телефон, Email) values(${data});`,
        (err, result) => {
            if (row.Должности.length === 0)
                callback()

            row.Должности.forEach(val => {
                const connection = _getDataBaseConnection()
                connection.connect()
                connection.query(
                    `insert into Должности_Сотрудники(Должности_id, Сотрудники_id) values('${val}', '${result.insertId}');`,
                    (err, result) => callback()
                )
                connection.end()
            })
        }
    )
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const data = `Имя='${row.Имя}', Отчество='${row.Отчество}', Фамилия='${row.Фамилия}', Телефон='${row.Телефон}', Email='${row.Email}'`
    connection.query(`update сотрудники set ${data} where id='${row.id}';`, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(
        `delete from Должности_Сотрудники where Сотрудники_id='${row.id}';`,
        () => {
            const connection = _getDataBaseConnection()
            connection.connect()
            connection.query(`delete from сотрудники where id='${row.id}';`)
            connection.end()
            if (callback !== null) callback()
        }
    )
    connection.end()
}

export default { get, add, update, del }