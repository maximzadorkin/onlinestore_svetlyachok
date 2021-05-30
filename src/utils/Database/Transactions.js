import { _getDataBaseConnection } from './Connector'
import convertDate from '../convertDate'

const getTransactions = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = `
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
    connection.query(queryText, (_err, rows) => {
        rows = rows.map(row => {
            row.Доставка_Дата = convertDate.forCRM(row.Доставка_Дата)
            row.Чек_Дата = convertDate.forCRM(row.Чек_Дата)
            return row
        })
        const connection = _getDataBaseConnection()
        connection.connect()
        queryText = `select * from Сделки_Товары;`
        connection.query(queryText, (_err, rows_products) => {
            rows = rows.map(row => {
                row.Товары = rows_products.filter(p => p.Сделки_id === row.id)
                return row
            })
            callback(rows)
        })
        connection.end()
    })
    connection.end()
}

const add = (row, callback = null) => {
    const currentCallback = (_err, rows) => callback(rows)
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = `
        insert into Сделки(
            Клиенты_id,
            Сотрудники_id,
            Стоимость_сделки,
            Дата
        ) values(
            ${row.Сделка.Клиент.value},
            ${row.Сделка.Продавец.value},
            ${row.Сделка.СтоимостьСделки},
            '${convertDate.forDatabase(new Date().toJSON().slice(0, 10))}'
        );
    `
    connection.query(queryText, (_err, result) => {
        const connection = _getDataBaseConnection()
        connection.connect()
        row.Товары.Товары.forEach(prod => {
            queryText = `
                insert into Сделки_Товары(
                    Сделки_id,
                    Товары_id,
                    КоличествоТовара,
                    Штука_Стоимость
                ) values(
                    ${result.insertId}, 
                    ${prod.Товары_id}, 
                    ${prod.КоличествоТовара}, 
                    ${prod.Штука_Стоимость}
                );
            `
            connection.query(queryText)
        })
        queryText = `
            insert into Доставки(
                Дата, 
                Адрес, 
                Доставлено, 
                Сотрудники_id_курьер, 
                Сделки_id
            ) values(
                '${convertDate.forDatabase(row.Доставка.Дата)}',
                '${row.Доставка.Адрес}',
                ${+row.Доставка.Доставлено}, 
                ${row.Доставка.Курьер.value}, 
                ${result.insertId}
            );
        `
        connection.query(queryText, currentCallback)
        connection.end()
    })
    connection.end()
}

const update = (row, callback = null) => {
    const currentCallback = (_err, rows) => callback(rows)
    const connection = _getDataBaseConnection()
    let queryText = `
        update сделки
        set Клиенты_id=${+row.Сделка.Клиент.value},
            Сотрудники_id=${+row.Сделка.Продавец.value},
            Стоимость_сделки=${+row.Сделка.СтоимостьСделки}
        where id=${row.Сделка.id};
    `
    connection.query(queryText)
    queryText = `
        delete from Сделки_Товары
        where Сделки_id=${+row.Сделка.id}
    `
    connection.query(queryText)
    row.Товары.Товары.forEach(prod => {
        queryText = `
            insert into Сделки_Товары(
                Сделки_id,
                Товары_id,
                КоличествоТовара,
                Штука_Стоимость
            ) values(
                ${+row.Сделка.id}, 
                ${+prod.Товары_id}, 
                ${+prod.КоличествоТовара}, 
                ${+prod.Штука_Стоимость}
            );
        `
        connection.query(queryText)
    })
    queryText = `
        update Доставки
        set Дата='${convertDate.forDatabase(row.Доставка.Дата)}', 
            Адрес='${row.Доставка.Адрес}', 
            Доставлено=${+row.Доставка.Доставлено}, 
            Сотрудники_id_курьер=${+row.Доставка.Курьер.value}
        where Сделки_id=${row.Сделка.id};
    `
    connection.query(queryText, currentCallback)
    connection.end()
}

const del = (row, callback = null) => {
    const currentCallback = (_err, rows) => callback(rows)
    const connection = _getDataBaseConnection()
    connection.connect()
    let queryText = `
        delete from Доставки
        where Сделки_id=${row.id};
    `
    connection.query(queryText)
    queryText = `
        delete from Сделки_Товары
        where Сделки_id=${row.id};
    `
    connection.query(queryText)
    queryText = `
        delete from Сделки
        where id=${row.id};
    `
    connection.query(queryText, currentCallback)
    connection.end()
}

export default { getTransactions, add, update, delete: del }