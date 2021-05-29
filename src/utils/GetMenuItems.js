import React from 'react'
import ErrorPage from '../components/ErrorPage'
import ProductCategories from '../containers/Sections/ProductCategories'
import ProductVendors from '../containers/Sections/ProductVendors'
import Suppliers from '../containers/Sections/Suppliers'
import StaffPositions from '../containers/Sections/StaffPositions'
import Clients from '../containers/Sections/Clients'
import Products from '../containers/Sections/Products'
import Staff from '../containers/Sections/Staff'
import Supplies from './../containers/Sections/Supplies'
import Transactions from './../containers/Sections/Transactions'

const GetMenuItems = () => [
    {
        title: 'Отчеты',
        elements: [
            { title: 'Список покупателей за период', component: <ErrorPage /> },
            { title: 'Количество продаж за период', component: <ErrorPage /> },
            { title: 'Остатки на складе', component: <ErrorPage /> },
        ],
    },
    {
        title: 'Товары',
        elements: [
            { title: 'Категории', component: <ProductCategories /> },
            { title: 'Производители', component: <ProductVendors /> },
            { title: 'Товары', component: <Products /> },
        ],
    },
    {
        title: 'Поставки',
        elements: [
            { title: 'Поставщики', component: <Suppliers /> },
            { title: 'Поставки', component: <Supplies /> },
        ],
    },
    {
        title: 'Пользователи',
        elements: [
            { title: 'Должности', component: <StaffPositions /> },
            { title: 'Сотрудники', component: <Staff /> },
            { title: 'Клиенты', component: <Clients /> },
        ],
    },
    {
        title: 'Сделки',
        elements: [
            { title: 'Заказы', component: <Transactions /> },
        ],
    },
]

export default GetMenuItems
