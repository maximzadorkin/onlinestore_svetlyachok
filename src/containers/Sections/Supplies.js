import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../store/actions/supplies'
import ActionsProducts from '../../store/actions/products'
import ActionsStaff from '../../store/actions/staff'
import Table from './../../components/Table'
import ControlPanel, { Roles } from './../../components/ControlPanel'
import ModalRowHandler from './../../components/ModalRowHandler'
import DBSupplies from '../../utils/Database/Supplies'
import DBScopes from '../../utils/Database/ScopeOfSupplies'
import DBSuppliers from '../../utils/Database/Suppliers'
import DBProducts from '../../utils/Database/Products'
import DBStaff from '../../utils/Database/Staff'
import { Box } from '@material-ui/core'
import _ from 'lodash'

class Supplies extends React.Component {

    constructor() {
        super()
        this.state = {
            suppliesRole: Roles(),
            suppliesSelectionModel: [],
            suppliesSelectRow: null,
            suppliesRefactorMode: false,
            suppliesShowModal: false,
            suppliesModalOptions: [],
            suppliesColumns: [
                { field: 'id', headerName: 'id', width: 100 },
                { field: 'Дата', headerName: 'Дата', width: 150 },
                { field: 'Поставщики_id', headerName: 'Поставщик', width: 200 },
                { field: 'Сотрудники_id', headerName: 'Сотрудник', width: 200 }
            ],
            scopesRole: Roles(),
            scopesSelectionModel: [],
            scopesSelectRow: null,
            scopesRefactorMode: false,
            scopesShowModal: false,
            scopesModalOptions: [],
            scopesColumns: [
                { field: 'id', headerName: 'id', width: 100 },
                { field: 'Поставка_id', headerName: 'Поставка', width: 150 },
                { field: 'Товар_id', headerName: 'Товар', width: 150 },
                { field: 'КоличествоТовара', headerName: 'Количество товара', width: 225 },
                { field: 'Штука_Стоимость', headerName: 'Стоимость за штуку', width: 225 }
            ]
        }
    }

    componentDidMount = () => {
        this.props.getStaff()
        this.props.getProducts()
        this.props.getSuppliers()
        this.props.getSupplies()
        this.props.getScopes()
    }

    onSuppliesRowClick = (e) =>
        this.setState({ suppliesSelectRow: _.cloneDeep(e.row) })

    getSuppliesTableRows = () => _.cloneDeep(this.props.supplies).map(s => {
        s.Поставщики_id = this.props.suppliers.find(sup => sup.id === s.Поставщики_id)?.Наименование
        s.Сотрудники_id = this.props.staff.find(st => st.id === s.Сотрудники_id)?.Фамилия
        return s
    })

    getSuppliesSelectedRow = (RefMode = null) => {
        const SelectRow = _.cloneDeep(this.props.supplies).find(c => this.state.suppliesSelectRow?.id === c.id)

        return [
            {
                label: 'id',
                value: RefMode ? SelectRow.id : 'автогенерируемый',
                required: true,
                readOnly: true,
                selectionList: [],
                component: 'textField'
            },
            {
                label: 'Дата',
                value: RefMode ? SelectRow.Дата : '',
                required: true,
                readOnly: false,
                selectionList: [],
                component: 'textField',
                type: 'date'
            },
            {
                label: 'Поставщики_id',
                value: RefMode ? [SelectRow.Поставщики_id] : '',
                required: true,
                readOnly: false,
                selectionList: this.props.suppliers.map(s => ({
                    value: s.id,
                    display: s.Наименование
                })),
                component: 'select'
            },
            {
                label: 'Сотрудники_id',
                value: RefMode ? [SelectRow.Сотрудники_id] : '',
                required: true,
                readOnly: false,
                selectionList: this.props.staff.map(s => ({
                    value: s.id,
                    display: s.Фамилия
                })),
                component: 'select'
            }
        ]
    }

    HandlerSuppliesButtonAdd = () =>
        this.setState({
            suppliesShowModal: true,
            suppliesRefactorMode: false,
            suppliesModalOptions: this.getSuppliesSelectedRow(false),
            suppliesSelectionModel: [],
            suppliesSelectRow: null
        })

    HandlerSuppliesButtonUpdate = () => {
        if (!_.isEmpty(this.state.suppliesSelectRow))
            this.setState({
                suppliesShowModal: true,
                suppliesRefactorMode: true,
                suppliesModalOptions: this.getSuppliesSelectedRow(true),
                suppliesSelectionModel: [],
                suppliesSelectRow: null
            })
    }

    HandlerSuppliesButtonDelete = () => {
        if (!_.isEmpty(this.state.suppliesSelectRow)) {
            const SelectRow = _.cloneDeep(this.props.supplies).find(c => this.state.suppliesSelectRow?.id === c.id)
            this.props.deleteSupply(SelectRow)
        }
    }

    HandlerSuppliesButtonModal = row => {
        const currentRowObject = {}
        row.forEach(col => currentRowObject[col.label] = col.value)

        if (this.state.suppliesRefactorMode)
            this.props.updateSupply(currentRowObject)
        else
            this.props.addSupply(currentRowObject)
        this.setState({
            suppliesShowModal: false,
            suppliesRefactorMode: false
        })
    }

    onScopesRowClick = (e) =>
        this.setState({ scopesSelectRow: _.cloneDeep(e.row) })

    getScopesTableRows = () => {
        const rows = _.cloneDeep(this.props.scopes).map(s => {
            s.Товар_id = this.props.products.find(sup => sup.id === s.Товар_id)?.Наименование
            return s
        })

        const SelectSuppliesRow = _.cloneDeep(this.props.supplies).find(c => this.state.suppliesSelectRow?.id === c.id)
        if (SelectSuppliesRow)
            return rows.filter(r => r.Поставка_id === SelectSuppliesRow.id)
        else
            return rows
    }

    getScopesSelectedRow = (RefMode = null) => {
        const SelectRow = _.cloneDeep(this.props.scopes).find(c => this.state.scopesSelectRow?.id === c.id)
        return [
            {
                label: 'Поставка_id',
                value: RefMode ? [SelectRow.Поставка_id] : '',
                selectionList: this.props.supplies.map(s => ({
                    value: s.id,
                    display: s.id
                })),
                required: true,
                readOnly: RefMode ? true : false,
                component: 'select'
            },
            {
                label: 'Товар_id',
                value: RefMode ? [SelectRow.Товар_id] : '',
                selectionList: this.props.products.map(p => ({
                    value: p.id,
                    display: p.Наименование
                })),
                required: true,
                readOnly: RefMode ? true : false,
                component: 'select'
            },
            {
                label: 'КоличествоТовара',
                value: RefMode ? SelectRow.КоличествоТовара : '',
                selectionList: [],
                required: true,
                readOnly: false,
                type: 'number',
                component: 'textField'
            },
            {
                label: 'Штука_Стоимость',
                value: RefMode ? SelectRow.Штука_Стоимость : '',
                selectionList: [],
                required: true,
                readOnly: false,
                type: 'number',
                component: 'textField'
            }
        ]
    }

    HandlerScopesButtonAdd = () =>
        this.setState({
            scopesShowModal: true,
            scopesRefactorMode: false,
            scopesModalOptions: this.getScopesSelectedRow(false),
            scopesSelectionModel: [],
            scopesSelectRow: null
        })

    HandlerScopesButtonUpdate = () => {
        if (!_.isEmpty(this.state.scopesSelectRow))
            this.setState({
                scopesShowModal: true,
                scopesRefactorMode: true,
                scopesModalOptions: this.getScopesSelectedRow(true),
                scopesSelectionModel: [],
                scopesSelectRow: null
            })
    }

    HandlerScopesButtonDelete = () => {
        if (!_.isEmpty(this.state.scopesSelectRow)) {
            const SelectRow = _.cloneDeep(this.props.scopes).find(c => this.state.scopesSelectRow.id === c.id)
            this.props.deleteScopes(SelectRow)
        }
    }

    HandlerScopesButtonModal = (row) => {
        const currentRowObject = {}
        row.forEach(col => {
            const currentVal = Array.isArray(col.value) ? col.value[0] : col.value
            currentRowObject[col.label] = currentVal
        })

        if (this.state.scopesRefactorMode)
            this.props.updateScopes(currentRowObject)
        else
            this.props.addScopes(currentRowObject)
        this.setState({
            scopesShowModal: false,
            scopesRefactorMode: false
        })
    }

    render = () => {
        return (
            <Box display='flex' justifyContent='space-around' flexWrap='wrap'>
                <Box width='49%' minWidth={320}>
                    <ControlPanel
                        Role={this.state.suppliesRole}
                        HandleAdd={this.HandlerSuppliesButtonAdd}
                        HandleRefactor={this.HandlerSuppliesButtonUpdate}
                        HandlerDelete={this.HandlerSuppliesButtonDelete}
                        HandlerUpdate={this.props.getSupplies}
                    />
                    <Table
                        rows={this.getSuppliesTableRows()}
                        columns={this.state.suppliesColumns}
                        onRowClick={this.onSuppliesRowClick}
                        selectionModel={this.state.suppliesSelectionModel}
                        setSelectionModel={suppliesSelectionModel => this.setState({ suppliesSelectionModel })}
                    />
                    {this.state.suppliesShowModal && (
                        <ModalRowHandler
                            open={this.state.suppliesShowModal}
                            onClose={() => this.setState({ suppliesShowModal: false, suppliesRefactorMode: false })}
                            row={this.state.suppliesModalOptions}
                            RefactorMode={this.state.suppliesRefactorMode}
                            ButtonHandler={this.HandlerSuppliesButtonModal}
                        />
                    )}
                </Box>
                <Box width='49%' minWidth={320}>
                    <ControlPanel
                        Role={this.state.scopesRole}
                        HandleAdd={this.HandlerScopesButtonAdd}
                        HandleRefactor={this.HandlerScopesButtonUpdate}
                        HandlerDelete={this.HandlerScopesButtonDelete}
                        HandlerUpdate={this.props.getScopes}
                    />
                    <Table
                        rows={this.getScopesTableRows()}
                        columns={this.state.scopesColumns}
                        onRowClick={this.onScopesRowClick}
                        selectionModel={this.state.scopesSelectionModel}
                        setSelectionModel={scopesSelectionModel => this.setState({ scopesSelectionModel })}
                    />
                    {this.state.scopesShowModal && (
                        <ModalRowHandler
                            open={this.state.scopesShowModal}
                            onClose={() => this.setState({ scopesShowModal: false, scopesRefactorMode: false })}
                            row={this.state.scopesModalOptions}
                            RefactorMode={this.state.scopesRefactorMode}
                            ButtonHandler={this.HandlerScopesButtonModal}
                        />
                    )}
                </Box>
            </Box>
        )
    }
}



const mapStateToProps = state => ({
    staff: state.staff.staff,
    suppliers: state.supplies.suppliers,
    products: state.products.products,
    supplies: state.supplies.supplies,
    scopes: state.supplies.scopes.map((s, index) => {
        s.id = index
        return s
    })
})

const mapDispatchToProps = dispatch => {

    const DBSuppliesGet = () => DBSupplies.get((rows) => dispatch(Actions.getSupplies(rows)))
    const DBScopesGet = () => DBScopes.get((rows) => dispatch(Actions.getScopes(rows)))

    return {
        getStaff: () => DBStaff.get(rows => dispatch(ActionsStaff.getStaff(rows))),
        getSuppliers: () => DBSuppliers.get(rows => dispatch(Actions.getSuppliers(rows))),
        getProducts: () => DBProducts.get(rows => dispatch(ActionsProducts.getProducts(rows))),
        getSupplies: DBSuppliesGet,
        addSupply: row => DBSupplies.add(row, DBSuppliesGet),
        updateSupply: row => DBSupplies.update(row, DBSuppliesGet),
        deleteSupply: row => DBSupplies.delete(row, DBSuppliesGet),
        getScopes: DBScopesGet,
        addScopes: row => DBScopes.add(row, DBScopesGet),
        updateScopes: row => DBScopes.update(row, DBScopesGet),
        deleteScopes: row => DBScopes.delete(row, DBScopesGet),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplies)