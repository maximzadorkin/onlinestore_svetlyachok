import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Box, Button, Divider, Menu, MenuItem} from '@material-ui/core'
import ProductCategories from './Sections/ProductCategories'
import ProductVendors from './Sections/ProductVendors'
import Providers from './Sections/Providers'
import Positions from './Sections/Positions'
import TransactionStatuses from './Sections/TransactionStatuses'
import Clients from './Sections/Clients'
import Staff from './Sections/Staff'
import ErrorPage from '../components/ErrorPage'
import {Actions} from '../store/actions'
import DBStaff from '../utils/Database/Staff'
import DBPositions from '../utils/Database/Positions'
import DBProviders from '../utils/Database/Providers'
import DPTransactionStatuses from '../utils/Database/TransactionStatuses'
import DBProductVendors from '../utils/Database/ProductVendors'
import DBClients from '../utils/Database/Clients'
import DBProducts from '../utils/Database/Products'
import DBProductCategories from '../utils/Database/ProductCategories'
import DBProcurement from '../utils/Database/Procurement'
import DBTransaction from '../utils/Database/Transactions'
import DBNEWTrans from '../utils/Database/NewTransaction'
import Products from './Sections/Products'
import Procurement from './Sections/Procurement'
import Transactions from './Sections/Transactions'
import NewTransaction from './Sections/NewTransaction'


const App = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [SelectedMenuItem, setMenuItem] = useState('Категории товаров')

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = ({currentTarget}) => {
        setMenuItem(
            currentTarget.textContent
                ? currentTarget.textContent
                : 'Категории товаров'
        )
        setAnchorEl(null)
    }

    const SelectTable = () => {
        switch(SelectedMenuItem) {
            case 'Категории товаров':
                props.getProductCategories()
                return <ProductCategories />
            case 'Товары':
                props.setProductCategories()
                props.setProductVendors()
                props.getProducts()
                return <Products />
            case 'Производители':
                props.getProductVendors()
                return <ProductVendors />
            case 'Поставщики':
                props.getProviders()
                return <Providers />
            case 'Поставки':
                props.setProducts()
                props.setProviders()
                props.getProcurement()
                props.getProcurementProducts()
                props.setStaff()
                return <Procurement />
            case 'Должности':
                props.getRowsPositions()
                return <Positions />
            case 'Сотрудники':
                props.getPositions()
                props.getStaff()
                return <Staff />
            case 'Клиенты':
                props.getClients()
                return <Clients />
            case 'Сделки':
                props.getTransactions()
                return <Transactions />
            case 'Создать заказ':
                props.setProducts()
                props.setClients()
                props.getSalers()
                return <NewTransaction />
            case 'Статусы сделки':
                props.getTransactionStatuses()
                return <TransactionStatuses />
            default:
                return <ErrorPage />
        }
    }

    return (
        <>
            <div style={{ height: '100%', width: '100%', marginTop: 15 }}>
                <Box display='flex' justifyContent='space-between' width='100%'>
                    <Button onClick={handleClick}>
                        {SelectedMenuItem}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Категории товаров</MenuItem>
                        <MenuItem onClick={handleClose}>Товары</MenuItem>
                        <MenuItem onClick={handleClose}>Производители</MenuItem>
                        <MenuItem onClick={handleClose}>Поставщики</MenuItem>
                        <MenuItem onClick={handleClose}>Поставки</MenuItem>
                        <MenuItem onClick={handleClose}>Должности</MenuItem>
                        <MenuItem onClick={handleClose}>Сотрудники</MenuItem>
                        <MenuItem onClick={handleClose}>Клиенты</MenuItem>
                        <MenuItem onClick={handleClose}>Сделки</MenuItem>
                        <MenuItem onClick={handleClose}>Создать заказ</MenuItem>
                        <MenuItem onClick={handleClose}>Статусы сделки</MenuItem>
                    </Menu>
                </Box>
                <Divider light />
                {SelectTable()}
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {

    const callback = (err, rows) => dispatch(Actions.setRows(rows))

    return {
        getPositions: () => DBPositions.get((err, rows) => dispatch(Actions.setPositions(rows))),
        getStaff: () => DBStaff.get(callback),
        getProviders: () => DBProviders.get(callback),
        getTransactionStatuses: () => DPTransactionStatuses.get(callback),
        getRowsPositions: () => DBPositions.get(callback),
        getProductVendors: () => DBProductVendors.get(callback),
        getClients: () => DBClients.get(callback),
        setClients: () => DBClients.get((err, rows) => dispatch(Actions.setClients(rows))),
        getProducts: () => DBProducts.get(callback),
        getProductCategories: () => DBProductCategories.get(callback),
        setProductCategories:
            () => DBProductCategories.get((err, rows) => dispatch(Actions.setProductCategories(rows))),
        setProductVendors: () =>
            DBProductVendors.get((err, rows) => dispatch(Actions.setProductVendors(rows))),
        getProcurement: () => DBProcurement.get((err, rows) => dispatch(Actions.setRows(rows))),
        getProcurementProducts:
            () => DBProcurement.getProcProducts((err, rows) => dispatch(Actions.setProcurementProducts(rows))),
        setProviders: () => DBProviders.get((err, result) => dispatch(Actions.setProviders(result))),
        setStaff: () => DBStaff.get((err, rows) => dispatch(Actions.setStaff(rows))),
        setProducts: () => DBProducts.get((err, res) => dispatch(Actions.setProducts(res))),
        getTransactions: () => DBTransaction.getTransactions((err, res) => dispatch(Actions.setTransactions(res))),
        getSalers: () => DBNEWTrans.getSalers((err, rows) => dispatch(Actions.setSalers(rows))),
    }
}

export default connect(null, mapDispatchToProps)(App)