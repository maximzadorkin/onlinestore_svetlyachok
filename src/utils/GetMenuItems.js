import React from 'react'
import ProductCategories from '../containers/Sections/ProductCategories'
import ProductVendors from '../containers/Sections/ProductVendors'
import Suppliers from '../containers/Sections/Suppliers'
import StaffPositions from '../containers/Sections/StaffPositions'
import Clients from '../containers/Sections/Clients'
import Products from '../containers/Sections/Products'
import Staff from '../containers/Sections/Staff'
import Supplies from './../containers/Sections/Supplies'
import Transactions from './../containers/Sections/Transactions'
import CountSalesForDateRange from '../containers/Reports/CountSalesForDateRange'
import StockBalances from '../containers/Reports/StockBalances'
import BuyersListForDateRange from '../containers/Reports/BuyersListForDateRange'
import { Roles } from '../components/ControlPanel'
import _ from 'lodash'

const GetMenuItems = (positions) => {
    let menu = []
    let Role = Roles()
    let positionsMenu = []

    positions.forEach(position => {
        switch (position) {
            case 'Администратор':
                Role.Add = true
                Role.Refactor = true
                Role.Delete = true
                Role.Update = true
                positionsMenu = []
                positionsMenu.push({
                    title: 'Отчеты',
                    elements: [
                        {
                            title: 'Список покупателей за период',
                            component: <BuyersListForDateRange />
                        },
                        {
                            title: 'Количество продаж за период',
                            component: <CountSalesForDateRange />
                        },
                        {
                            title: 'Остатки на складе',
                            component: <StockBalances />
                        },
                    ],
                })
                positionsMenu.push({
                    title: 'Товары',
                    elements: [
                        {
                            title: 'Категории',
                            component: <ProductCategories Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Производители',
                            component: <ProductVendors Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Товары',
                            component: <Products Role={_.cloneDeep(Role)} />
                        },
                    ],
                })
                positionsMenu.push({
                    title: 'Поставки',
                    elements: [
                        {
                            title: 'Поставщики',
                            component: <Suppliers Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Поставки',
                            component: <Supplies Role={_.cloneDeep(Role)} />
                        },
                    ],
                })
                positionsMenu.push({
                    title: 'Пользователи',
                    elements: [
                        {
                            title: 'Должности',
                            component: <StaffPositions Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Сотрудники',
                            component: <Staff Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Клиенты',
                            component: <Clients Role={_.cloneDeep(Role)} />
                        },
                    ],
                })
                positionsMenu.push({
                    title: 'Сделки',
                    elements: [
                        {
                            title: 'Заказы',
                            component: <Transactions Role={_.cloneDeep(Role)} />
                        },
                    ],
                })
                menu.push({
                    title: position,
                    elements: positionsMenu
                })
                break
            case 'Директор':
                positionsMenu = []
                positionsMenu.push({
                    title: 'Отчеты',
                    elements: [
                        {
                            title: 'Список покупателей за период',
                            component: <BuyersListForDateRange />
                        },
                        {
                            title: 'Количество продаж за период',
                            component: <CountSalesForDateRange />
                        },
                        {
                            title: 'Остатки на складе',
                            component: <StockBalances />
                        },
                    ],
                })
                menu.push({
                    title: position,
                    elements: positionsMenu
                })
                break
            case 'Менеджер':
                positionsMenu = []
                Role.Add = true
                Role.Refactor = true
                Role.Delete = true
                Role.Update = true
                positionsMenu.push({
                    title: 'Поставки',
                    elements: [
                        {
                            title: 'Поставщики',
                            component: <Suppliers Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Поставки',
                            component: <Supplies Role={_.cloneDeep(Role)} />
                        },
                    ]
                })
                positionsMenu.push({
                    title: 'Товары',
                    elements: [
                        {
                            title: 'Категории',
                            component: <ProductCategories Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Производители',
                            component: <ProductVendors Role={_.cloneDeep(Role)} />
                        },
                        {
                            title: 'Товары',
                            component: <Products Role={_.cloneDeep(Role)} />
                        },
                    ]
                })
                menu.push({
                    title: position,
                    elements: positionsMenu
                })
                break
            case 'Продавец':
                positionsMenu = []
                Role.Add = true
                Role.Refactor = true
                Role.Delete = true
                Role.Update = true
                positionsMenu.push({
                    title: 'Сделки',
                    elements: [
                        {
                            title: 'Заказы',
                            component: <Transactions Role={_.cloneDeep(Role)} />
                        },
                    ]
                })
                positionsMenu.push({
                    title: 'Пользователи',
                    elements: [
                        {
                            title: 'Клиенты',
                            component: <Clients Role={_.cloneDeep(Role)} />
                        },
                    ],
                })
                menu.push({
                    title: position,
                    elements: positionsMenu
                })
                break
            case 'Курьер':
                positionsMenu = []
                Role.Add = false
                Role.Refactor = true
                Role.Delete = false
                Role.Update = true
                positionsMenu.push({
                    title: 'Сделки',
                    elements: [
                        {
                            title: 'Заказы',
                            component: <Transactions Role={_.cloneDeep(Role)} />
                        },
                    ]
                })
                menu.push({
                    title: position,
                    elements: positionsMenu
                })
                break
            default:
                break
        }
    })

    return menu
}

export default GetMenuItems
