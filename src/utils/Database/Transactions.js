import { _getDataBaseConnection } from './Connector'

const getTransactions = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        select Сделки.id as id,
            Сделки.Клиенты_id as Клиент_id,
            Сделки.Сотрудники_id as Сотрудник_id,
            Сделки.Стоимость_сделки,
            Доставки.id as Доставка_id,
            Доставки.Дата as Доставка_Дата,
            Доставки.Адрес as Доставка_Адрес,
            Доставки.Доставлено as Доставка_Доставлено,
            Доставки.Сотрудники_id_курьер as Доставка_Курьер_id,
            Чек.id as Чек_id,
            Чек.Сумма as Чек_Сумма,
            Чек.Дата as Чек_Дата
        from Сделки
        left join Доставки on Сделки.id=Доставки.Сделки_id
        left join Чек on Сделки.id=Чек.Сделки_id;
    `
    connection.query(queryText, (_err, rows) => callback(rows))
    connection.end()
}

const add = (row, callback = null) => {
    // TODO: Уменьшить количество для каждого товара
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        insert into ?(
            ?
        ) values(

        );
    `
    connection.query(queryText, callback)
    connection.end()
}

const update = (row, callback = null) => {
    // TODO: Проверить количество для каждого товара
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        update ?
        set ?
        where id='${row.id}';
    `
    connection.query(queryText, callback)
    connection.end()
}

const del = (row, callback = null) => {
    // TODO: Прибавить количество для каждого товара
    const connection = _getDataBaseConnection()
    connection.connect()
    const queryText = `
        delete from ?
        where id='${row.id}';
    `
    connection.query(queryText, callback)
    connection.end()
}

export default { getTransactions, add, update, delete: del }