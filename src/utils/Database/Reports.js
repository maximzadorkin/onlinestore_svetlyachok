import { _getDataBaseConnection } from './Connector'
import convertDate from '../convertDate'

const getCountSalesForDateRange = (dateStart, dateEnd, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        select * from сделки
        join Чек on Чек.Сделки_id = сделки.id
        where Чек.Дата > '${convertDate.forDatabase(dateStart)}' 
        and Чек.Дата < '${convertDate.forDatabase(dateEnd)}';
    `
    connection.query(queryText, (_err, rows) => {
        console.log(_err)
        console.log(rows)
        callback(rows)
    })
    connection.end()
}

const getStockBalance = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `select id, Наименование, КоличествоНаСкладе from товары;`
    connection.query(queryText, (_err, rows) => callback(rows))
    connection.end()
}

export default {
    getCountSalesForDateRange,
    getStockBalance
}