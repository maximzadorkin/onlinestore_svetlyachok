insert into Категории(Наименование) values('Смартфоны');
insert into Категории(Наименование) values('Ноутбуки');
insert into Категории(Наименование) values('Часы');
insert into Категории(Наименование) values('ПК');
insert into Категории(Наименование) values('Наушники');


insert into Производители(Наименование) values('Microsoft');
insert into Производители(Наименование) values('Google');
insert into Производители(Наименование) values('Apple');
insert into Производители(Наименование) values('Samsung');
insert into Производители(Наименование) values('Xiaomi');


insert into Товары(Наименование, Цена, Описание, КоличествоНаСкладе, Категории_ID, Производитель_ID) values('IPhone 12', 65000, 'Самый быстрый в своем классе', 0, 1, 3);
insert into Товары(Наименование, Цена, Описание, КоличествоНаСкладе, Категории_ID, Производитель_ID) values('Samsung S9', 30000, 'Самый красивый', 0, 1, 4);
insert into Товары(Наименование, Цена, Описание, КоличествоНаСкладе, Категории_ID, Производитель_ID) values('Google Pixel 4', 40000, 'Лучшая камера', 0, 1, 2);
insert into Товары(Наименование, Цена, Описание, КоличествоНаСкладе, Категории_ID, Производитель_ID) values('Google Pixel 3a', 35000, 'Бронированная крышка', 0, 1, 2);
insert into Товары(Наименование, Цена, Описание, КоличествоНаСкладе, Категории_ID, Производитель_ID) values('Macbook pro 2020', 150000, 'Тонкий', 0, 2, 5);


insert into Клиенты(Имя, Отчество, Фамилия, Телефон, Email) values('Алексей', 'Витальевич', 'Прохоров', '+79064869563', 'prohorov@mail.ru');
insert into Клиенты(Имя, Отчество, Фамилия, Телефон, Email) values('Сергей', 'Анатольевич', 'Иванов', '+79275869845', 'ivanod@mail.ru');
insert into Клиенты(Имя, Отчество, Фамилия, Телефон, Email) values('Анна', 'Геннадьевна', 'Петрова', '+79261254653', 'petrov@mail.ru');
insert into Клиенты(Имя, Отчество, Фамилия, Телефон, Email) values('Мария', 'Александровна', 'Сергеева', '+79278523645', 'sergeev@mail.ru');
insert into Клиенты(Имя, Отчество, Фамилия, Телефон, Email) values('Александр', 'Александрович', 'Родинов', '+79061256363', 'rodinov@mail.ru');


insert into Должности(Наименование) values('Администратор');	-- id 1
insert into Должности(Наименование) values('Директор');	-- id 2
insert into Должности(Наименование) values('Продавец');	-- id 3
insert into Должности(Наименование) values('Курьер');	-- id 4


insert into Сотрудники(Имя, Отчество, Фамилия, Телефон, Email, Login, Password) values('Эвелина', 'Муратовна', 'Беркутова', '+79056485523', 'evelina@mail.ru', 'evelina', '');
insert into Должности_Сотрудники(Должности_id, Сотрудники_id) values(1, 1);
insert into Должности_Сотрудники(Должности_id, Сотрудники_id) values(2, 1);
insert into Сотрудники(Имя, Отчество, Фамилия, Телефон, Email, Login, Password) values('Мария', 'Максимовна', 'Смирнова', '+79278569412', 'smirnova@mail.ru', 'maria_smirnova', '');
insert into Должности_Сотрудники(Должности_id, Сотрудники_id) values(2, 2);
insert into Сотрудники(Имя, Отчество, Фамилия, Телефон, Email, Login, Password) values('Наталья', 'Даниловна', 'Кузнецова', '+79123653636', 'kuznecova@mail.ru', 'natalya_kuznecova', '');
insert into Должности_Сотрудники(Должности_id, Сотрудники_id) values(3, 3);
insert into Сотрудники(Имя, Отчество, Фамилия, Телефон, Email, Login, Password) values('Артем', 'Алексеевич', 'Егоров', '+79261565505', 'egorov@mail.ru', 'artem_egorov', '');
insert into Должности_Сотрудники(Должности_id, Сотрудники_id) values(4, 4);
insert into Сотрудники(Имя, Отчество, Фамилия, Телефон, Email, Login, Password) values('Александр', 'Сергеевич', 'Лебедев', '+79285648923', 'lebedev@mail.ru', 'alexandr_lebedev', '');
insert into Должности_Сотрудники(Должности_id, Сотрудники_id) values(4, 5);


insert into Поставщики(Наименование) values('ИП Электрод');	-- id 1
insert into Поставщики(Наименование) values('ИП Техно');	-- id 2
insert into Поставщики(Наименование) values('ООО ЭлТех');	-- id 3
insert into Поставщики(Наименование) values('ООО MySpace');	-- id 4
insert into Поставщики(Наименование) values('ИП SmartWorld');	-- id 5


insert into Поставки(Дата, Поставщики_id, Сотрудники_id) values('21.11.2020', 1, 2);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(33000, 55, 1, 1);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(27000, 10, 1, 2);
insert into Поставки(Дата, Поставщики_id, Сотрудники_id) values('21.12.2020', 3, 3);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(33000, 70, 2, 1);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(110000, 9, 2, 5);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(42000, 60, 2, 4);
insert into Поставки(Дата, Поставщики_id, Сотрудники_id) values('10.01.2021', 1, 3);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(33000, 41, 3, 2);
insert into Поставки(Дата, Поставщики_id, Сотрудники_id) values('15.02.2021', 5, 2);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(33000, 32, 4, 3);
insert into Поставки(Дата, Поставщики_id, Сотрудники_id) values('23.03.2021', 4, 3);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(33000, 70, 5, 1);
insert into Поставки_Товары(Штука_Стоимость, КоличествоТовара, Поставка_id, Товар_id) values(27000, 80, 5, 2);


insert into Сделки(Клиенты_id, Сотрудники_id, Стоимость_сделки) values(1, 3, 65000);
insert into Сделки_Товары(Сделки_id, Товары_id, КоличествоТовара, Штука_Стоимость) values(1, 1, 1, 65000);
insert into Доставки(Дата, Адрес, Доставлено, Сотрудники_id_курьер, Сделки_id) values('22.03.2021', 'Авиамоторная', 1, 5, 1);
insert into Сделки(Клиенты_id, Сотрудники_id, Стоимость_сделки) values(2, 3, 365000);
insert into Сделки_Товары(Сделки_id, Товары_id, КоличествоТовара, Штука_Стоимость) values(2, 1, 1, 65000);
insert into Сделки_Товары(Сделки_id, Товары_id, КоличествоТовара, Штука_Стоимость) values(2, 5, 2, 150000);
insert into Доставки(Дата, Адрес, Доставлено, Сотрудники_id_курьер, Сделки_id) values('9.04.2021', 'Заводская', 1, 5, 2);



select * from сотрудники
        left join Должности_Сотрудники
        on сотрудники.id = Должности_Сотрудники.Сотрудники_id