import { _getDataBaseConnection } from './Connector'

const auth = ({ login, password }, callback) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const currentCallback = (_err, rows) => {
        if (rows.length > 0)
            callback(true, rows.sort((r1, r2) => {
                if (r1.id < r2.id)
                    return -1
                else if (r1.id > r2.id)
                    return 1
                else
                    return 0
            }).map(r => r.Должность))
        else
            callback(false)
    }
    const queryText = `
        select Должности.Наименование as Должность, Должности.id as id from сотрудники
        join Должности_Сотрудники on сотрудники.id = Должности_Сотрудники.Сотрудники_id
        join Должности on Должности_Сотрудники.Должности_id = Должности.id
        where Login='${login}'
            and Password='${password}';
    `
    connection.query(queryText, currentCallback)
    connection.end()
}

export default {
    auth
}