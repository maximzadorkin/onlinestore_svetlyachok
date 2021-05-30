import { _getDataBaseConnection } from './Connector'
import convertDate from '../convertDate'

const getCountSalesForDateRange = (dateStart, dateEnd, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        select Сделки.id as id, 
            Сделки.Клиенты_id, 
            Сделки.Сотрудники_id, 
            Сделки.Стоимость_сделки as Стоимость_сделки, 
            Чек.Сумма, 
            Чек.Дата as Дата from сделки
        join Чек on Чек.Сделки_id = сделки.id
        where Чек.Дата >= '${convertDate.forDatabase(dateStart)}'
        and Чек.Дата <= '${convertDate.forDatabase(dateEnd)}';
    `
    connection.query(queryText, (_err, rows) =>
        callback(rows.map(row => {
            row.Дата = convertDate.forCRM(row.Дата)
            return row
        }))
    )
    connection.end()
}

const getStockBalance = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `select id, Наименование, КоличествоНаСкладе from товары;`
    connection.query(queryText, (_err, rows) => callback(rows))
    connection.end()
}

const getBuyersListForDateRange = (dateStart, dateEnd, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        select Сделки.id as id,
            Чек.Дата as Дата,
            Сделки.Стоимость_сделки as Стоимость_сделки, 
            Клиенты.Имя as Имя,
            Клиенты.Отчество as Отчество,
            Клиенты.Фамилия as Фамилия, 
            Клиенты.Телефон as Телефон from Сделки
        join Клиенты on сделки.Клиенты_id = Клиенты.id
        join Чек on Сделки.id = Чек.Сделки_id
        where Чек.Дата >= '${convertDate.forDatabase(dateStart)}'
            and Чек.Дата <= '${convertDate.forDatabase(dateEnd)}';
    `
    connection.query(queryText, (_err, rows) =>
        callback(rows.map(row => {
            row.Дата = convertDate.forCRM(row.Дата)
            return row
        }))
    )
    connection.end()
}

export default {
    getBuyersListForDateRange,
    getCountSalesForDateRange,
    getStockBalance
}