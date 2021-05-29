import { Modal, Box } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import ControlPanel, { Roles } from '../../components/ControlPanel'
import Table from './../../components/Table'
import Transaction from '../../components/Transaction'
import DB from '../../utils/Database/Transactions'
import DBStaff from '../../utils/Database/Staff'
import DBClients from '../../utils/Database/Clients'
import Actions from '../../store/actions/transactions'
import ActionsStaff from '../../store/actions/staff'
import ActionsClients from '../../store/actions/clients'
import _ from 'lodash'

class Transactions extends React.Component {

    constructor() {
        super()
        this.state = {
            Role: Roles(),
            selectionModel: [],
            ShowModal: false,
            RefactorMode: false,
            columns: [
                { field: 'id', headerName: 'id', width: 100 },
                { field: 'Клиент_id', headerName: 'Клиент', width: 150 },
                { field: 'Сотрудник_id', headerName: 'Сотрудник', width: 200 },
                { field: 'Стоимость_сделки', headerName: 'Стоимость сделки', width: 250 },
                { field: 'Доставка_Доставлено', headerName: 'Доставлено', width: 200 }
            ]
        }
    }

    componentDidMount = () => {
        this.props.getStaff()
        this.props.getClients()
        this.props.getTransactions()
    }
    getTableRows = () => {
        return _.cloneDeep(this.props.transactions).map(tr => {
            tr.Клиент_id = this.props.clients
                .find(c => c.id === tr.Клиент_id)?.Фамилия
            tr.Сотрудник_id = this.props.staff
                .find(c => c.id === tr.Сотрудник_id)?.Фамилия
            return tr
        })
    }
    onRowClick = () => { }
    HandlerButtonAdd = () => {
        this.setState({
            ShowModal: true,
            RefactorMode: false
        })
    }
    HandlerButtonUpdate = () => {
        this.setState({
            ShowModal: true,
            RefactorMode: true
        })
    }
    HandlerButtonDelete = () => { }

    render() {
        return (
            <Box display='flex' flexDirection='column'>
                <ControlPanel
                    Role={this.state.Role}
                    HandleAdd={this.HandlerButtonAdd}
                    HandleRefactor={this.HandlerButtonUpdate}
                    HandlerDelete={this.HandlerButtonDelete}
                    HandlerUpdate={this.props.get}
                />
                <Table
                    rows={this.getTableRows()}
                    columns={this.state.columns}
                    onRowClick={this.onRowClick}
                    selectionModel={this.state.selectionModel}
                    setSelectionModel={selectionModel => this.setState({ selectionModel })}
                />
                <Modal
                    open={this.state.ShowModal}
                    onClose={() => this.setState({ ShowModal: false })}
                >
                    {this.state.ShowModal && (
                        <Transaction
                            RefactorMode={this.state.RefactorMode}
                            closeModal={() => this.setState({ ShowModal: false })}
                            initialState={{}}
                        />
                    )}
                </Modal>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    staff: state.staff.staff,
    clients: state.clients.clients
})

const mapDispatchToProps = dispatch => ({
    getTransactions: () => DB.getTransactions(rows => dispatch(Actions.getTransactions(rows))),
    getStaff: () => DBStaff.get(rows => dispatch(ActionsStaff.getStaff(rows))),
    getClients: () => DBClients.get(rows => dispatch(ActionsClients.getClients(rows))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)