import { Modal, Box, Backdrop } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import ControlPanel, { Roles } from '../../components/ControlPanel'
import Table from './../../components/Table'
import Transaction from '../../components/Transaction'
import DB from '../../utils/Database/Transactions'
import DBStaff from '../../utils/Database/Staff'
import DBClients from '../../utils/Database/Clients'
import DBProducts from '../../utils/Database/Products'
import DBStaffPositions from '../../utils/Database/StaffPositions'
import Actions from '../../store/actions/transactions'
import ActionsStaff from '../../store/actions/staff'
import ActionsClients from '../../store/actions/clients'
import ActionsProducts from '../../store/actions/products'
import _ from 'lodash'

class Transactions extends React.Component {

    constructor() {
        super()
        this.state = {
            Role: Roles(),
            selectionModel: [],
            ShowModal: false,
            RefactorMode: false,
            SelectRow: {},
            columns: [
                { field: 'id', headerName: 'id', width: 100 },
                { field: 'Клиент_id', headerName: 'Клиент', width: 150 },
                { field: 'Доставка_Курьер_id', headerName: 'Курьер', width: 150 },
                { field: 'Сотрудник_id', headerName: 'Сотрудник', width: 200 },
                { field: 'Стоимость_сделки', headerName: 'Стоимость сделки', width: 250 },
                { field: 'Доставка_Доставлено', headerName: 'Доставлено', width: 200 }
            ]
        }
    }

    componentDidMount = () => {
        this.props.getStaff()
        this.props.getStaffPositions()
        this.props.getClients()
        this.props.getProducts()
        this.props.getTransactions()
        this.setState({ Role: this.props.Role })
    }

    getTableRows = () => _.cloneDeep(this.props.transactions).map(tr => {
        tr.Клиент_id = this.props.clients
            .find(c => c.id === tr.Клиент_id)?.Фамилия
        tr.Сотрудник_id = this.props.staff
            .find(c => c.id === tr.Сотрудник_id)?.Фамилия
        tr.Доставка_Курьер_id = this.props.staff
            .find(c => c.id === tr.Доставка_Курьер_id)?.Фамилия
        tr.Доставка_Доставлено = tr.Доставка_Доставлено === 1 ? 'да' : 'нет'
        return tr
    })

    getModalInitialState = () => {
        const SelRow = this.state.SelectRow
        const RefM = this.state.RefactorMode

        const sellersPosID = this.props.staffPositions?.find(pos => pos.Наименование === 'Продавец')?.id
        const couriersPosID = this.props.staffPositions?.find(pos => pos.Наименование === 'Курьер')?.id
        const sellers = _.cloneDeep(this.props.staff)?.filter(s => {
            const posIds = s.Должности.map(pos => pos.Должности_id)
            return !!posIds.find(pos => pos === sellersPosID)
        })
        const couriers = _.cloneDeep(this.props.staff)?.filter(s => {
            const posIds = s.Должности.map(pos => pos.Должности_id)
            return !!posIds.find(pos => pos === couriersPosID)
        })

        const initState = {}
        initState.Сделка = {
            id: RefM ? SelRow.id : '',
            Клиент: {
                value: RefM ? SelRow.Клиент_id : '',
                selectionList: _.cloneDeep(this.props.clients).map(c => ({
                    value: c.id,
                    display: c.Фамилия
                }))
            },
            Продавец: {
                value: RefM ? SelRow.Сотрудник_id : '',
                selectionList: _.cloneDeep(sellers).filter(sel => sel.Действителен).map(c => ({
                    value: c.id,
                    display: c.Фамилия
                }))
            },
            СтоимостьСделки: RefM ? SelRow.Стоимость_сделки : ''
        }
        initState.Чек = {
            id: RefM ? SelRow.Чек_id : '',
            Сумма: RefM ? SelRow.Чек_Сумма : '',
            Дата: RefM ? SelRow.Чек_Дата : ''
        }
        initState.Доставка = {
            Дата: RefM ? SelRow.Доставка_Дата : '',
            Адрес: RefM ? SelRow.Доставка_Адрес : '',
            Доставлено: RefM ? +SelRow.Доставка_Доставлено : 0,
            Курьер: {
                value: RefM ? SelRow.Доставка_Курьер_id : '',
                selectionList: _.cloneDeep(couriers).filter(sel => sel.Действителен).map(c => ({
                    value: c.id,
                    display: c.Фамилия
                }))
            }
        }
        initState.Товары = {
            Товары: RefM ? SelRow.Товары.map(p => {
                p.display = this.props.products
                    .find(prod => prod.id === p.Товары_id)?.Наименование
                return p
            }) : [], // full information: id, count, price
            selectionList: _.cloneDeep(this.props.products).map(c => ({
                value: c.id,
                display: c.Наименование,
                Штука_Стоимость: c.Цена
            }))
        }
        return initState
    }

    onRowClick = e => this.setState({
        SelectRow: _.cloneDeep(this.props.transactions).find(t => t.id === e.row.id)
    })

    HandlerButtonAdd = () => this.setState({
        ShowModal: true,
        RefactorMode: false
    })

    HandlerButtonUpdate = () => {
        if (_.isEmpty(this.state.SelectRow)) return
        this.setState({
            ShowModal: true,
            RefactorMode: true
        })
    }

    HandlerButtonDelete = () => {
        if (_.isEmpty(this.state.SelectRow)) return
        this.props.deleteTransaction(this.state.SelectRow)
    }

    MainModalButtonHandler = row => {
        row.Товары.Товары = row.Товары.Товары.map(p => {
            p.Штука_Стоимость = this.props.products
                .find(prod => prod.id === p.Товары_id).Цена
            return p
        })
        row.Сделка.СтоимостьСделки = row.Товары.Товары.reduce((acc, item) =>
            acc + item.Штука_Стоимость * item.КоличествоТовара, 0)

        if (this.state.RefactorMode)
            this.props.updateTransaction(row)
        else
            this.props.addTransaction(row)

        this.setState({
            selectionModel: [],
            ShowModal: false,
            RefactorMode: false,
            SelectRow: {},
        })
    }

    render() {
        return (
            <Box display='flex' flexDirection='column'>
                <ControlPanel
                    Role={this.state.Role}
                    HandleAdd={this.HandlerButtonAdd}
                    HandleRefactor={this.HandlerButtonUpdate}
                    HandlerDelete={this.HandlerButtonDelete}
                    HandlerUpdate={this.props.getTransactions}
                />
                <Table
                    rows={this.getTableRows()}
                    columns={this.state.columns}
                    onRowClick={this.onRowClick}
                    selectionModel={this.state.selectionModel}
                    setSelectionModel={selectionModel => this.setState({ selectionModel })}
                />
                {this.state.ShowModal && (
                    <Transaction
                        RefactorMode={this.state.RefactorMode}
                        closeModal={() => this.setState({ ShowModal: false })}
                        initialState={this.getModalInitialState()}
                        MainButtonHandler={this.MainModalButtonHandler}
                    />
                )}
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions || [],
    staff: state.staff.staff || [],
    staffPositions: state.staff.positions || [],
    clients: state.clients.clients || [],
    products: state.products.products || []
})

const mapDispatchToProps = dispatch => {

    const DBGetTransaction = () => DB.getTransactions(rows => dispatch(Actions.getTransactions(rows)))

    return {
        getTransactions: DBGetTransaction,
        getStaff: () => DBStaff.get(rows => dispatch(ActionsStaff.getStaff(rows))),
        getStaffPositions: () => DBStaffPositions.get(rows => dispatch(ActionsStaff.getStaffPositions(rows))),
        getClients: () => DBClients.get(rows => dispatch(ActionsClients.getClients(rows))),
        getProducts: () => DBProducts.get(rows => dispatch(ActionsProducts.getProducts(rows))),
        addTransaction: row => DB.add(row, DBGetTransaction),
        updateTransaction: row => DB.update(row, DBGetTransaction),
        deleteTransaction: row => DB.delete(row, DBGetTransaction),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)