import React, {useState} from 'react'
import {Button, ButtonGroup, Divider, Menu, MenuItem} from '@material-ui/core'
import TableWindow from '../components/TableWindow'
import ProductCategories from './Sections/ProductCategories'


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
                return <ProductCategories />
            case 'Товары':
                return <TableWindow />
            case 'Производители':
                return <TableWindow />
            case 'Поставщики':
                return <TableWindow />
            case 'Поставки':
                return <TableWindow />
            case 'Должности':
                return <TableWindow />
            case 'Сотрудники':
                return <TableWindow />
            case 'Клиенты':
                return <TableWindow />
            case 'Сделки':
                return <TableWindow />
            default:
                return <ProductCategories />
        }
    }

    return (
        <>
            <div style={{ height: '100%', width: '100%', marginTop: 15 }}>
                <Button onClick={handleClick} >
                    {SelectedMenuItem}
                </Button>
                <Menu
                    id="simple-menu"
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
                </Menu>
                <Divider light />
                {SelectTable()}
            </div>
        </>
    )
}

export default App
