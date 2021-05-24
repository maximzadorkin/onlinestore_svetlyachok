import React, {useState} from 'react'
import Table from '../../components/Table'
import {Box, Divider} from '@material-ui/core'
import {connect} from 'react-redux'
import RowModal from '../../components/RowModal'
import ControlPanel from '../../components/ControlPanel'
import DB from '../../utils/Database/Procurement'
import DBProvider from '../../utils/Database/Providers'
import {Actions} from '../../store/actions'
import _ from 'lodash'

const Procurement = (props) => {
    const [selectionProcurementModel, setSelectionProcurementModel] = useState([])
    const [selectionProcurementProductsModel, setSelectionProcurementProductsModel] = useState([])
    const [ModalProcurementView, SetModalProcurementView] = useState({open: false, refactorMode: false})
    const [ModalProcurementProductsView, SetModalProcurementProductsView] = useState({open: false, refactorMode: false})


    const ProcurementColumns = [
        {field: 'id', headerName: 'id'},
        {field: 'Дата', headerName: 'Дата'},
        {field: 'Поставщики_id', headerName: 'Поставщик'},
        {field: 'Сотрудники_id', headerName: 'Сотрудник'}
    ]
    const ProcurementProductsColumns = [
        {field: 'id', headerName: 'id'},
        {field: 'Поставка_id', headerName: 'Поставка'},
        {field: 'Товар_id', headerName: 'Товар'},
        {field: 'КоличествоТовара', headerName: 'Количество товара'}
    ]


    const getModalProcurementRow = () => {
        const selected = props.procurements.find(col => col.id === selectionProcurementModel[0])


        const refactorMode = ModalProcurementView.refactorMode
        return [
            {
                label: 'id',
                value: refactorMode ? selected.id : 'автогенерируемая',
                required: true,
                readOnly: true
            },
            {
                label: 'Дата',
                value: refactorMode ? selected.Дата : '',
                required: true,
                readOnly: false
            },
            {
                label: 'Поставщики_id',
                value: ModalProcurementView.refactorMode ? [selected.Поставщики_id] : [], // array
                selectionList: props.providers.map(p => ({
                    id: p.id,
                    value: p.Наименование,
                })),
                multiple: false,
                required: true,
                readOnly: false
            },
            {
                label: 'Сотрудники_id',
                value: refactorMode ? [selected.Сотрудники_id] : [], // array
                selectionList: props.staff.map(p => ({
                    id: p.id,
                    value: p.Фамилия,
                })),
                multiple: false,
                required: true,
                readOnly: false
            }
        ]
    }
    const getModalProcurementProductsRow = () => {
        const refactorMode = ModalProcurementProductsView.refactorMode
        const selected = props.procurementProducts[selectionProcurementProductsModel[0]]
        return [
            {
                label: 'КоличествоТовара',
                value: refactorMode ? selected.КоличествоТовара : '',
                required: true,
                readOnly: false,
                type: 'number'
            },
            {
                label: 'Поставка_id',
                value: refactorMode ? selected.Поставка_id : '',
                required: true,
                readOnly: refactorMode,
                type: 'number'
            },
            {
                label: 'Товар_id',
                value: refactorMode ? [selected.Товар_id] : [], // array
                selectionList: props.products.map(p => ({
                    id: p.id,
                    value: p.Наименование,
                })),
                multiple: false,
                required: true,
                readOnly: refactorMode
            }
        ]
    }


    const getProcurementTableRows = () => _.cloneDeep(props.procurements).map(p => {
        if (props.providers.length > 0) {
            const provider = props.providers.find(pr => pr.id === p.Поставщики_id)
            if (provider)
                p.Поставщики_id = provider.Наименование
        }
        if (props.staff.length > 0) {
            const st = props.staff.find(st => st.id === p.Сотрудники_id)
            if (st)
                p.Сотрудники_id = st.Фамилия
        }

        return p
    })
    const getProcurementProductsTableRows = () => _.cloneDeep(props.procurementProducts).map((pp, index) => {
        pp.id = index
        const prod = props.products.find(prods => prods.id === pp.Товар_id)
        if (!_.isEmpty(prod))
            pp.Товар_id = prod.Наименование
        return pp
    })


    const HandleClickOnProcurementRow = () => {
        console.log()
    }
    const HandleClickOnProcurementProductsRow = () => {
        console.log()
    }


    const HandleProcurementRequestFromModal = row => {
        const format = _.cloneDeep(row)
        format.Поставщики_id = format.Поставщики_id[0]
        format.Сотрудники_id = format.Сотрудники_id[0]
        if (ModalProcurementView.refactorMode)
            props.updateProcurement(row)
        else
            props.addProcurement(row)

    }
    const HandleProcurementProductsRequestFromModal = row => {

        if (ModalProcurementProductsView.refactorMode)
            props.updateProcProducts(row)
        else
            props.addProcProducts(row)

    }


    const HandleAddProcurementRow = () => {
        SetModalProcurementView({open: true, refactorMode: false})
    }
    const HandleRefactorProcurementRow = () => {
        const selected = props.procurements.find(col => col.id === selectionProcurementModel[0])
        const haveSelected = selected !== undefined

        if (!haveSelected) return

        SetModalProcurementView({open: true, refactorMode: true})
    }
    const HandlerDeleteProcurementRow = () => {
        const row = props.procurements.find(p =>
            p.id === selectionProcurementModel[0])
        props.deleteProcurement(row)
    }
    const HandleGetProcurementRows = () => props.getProcurements()

    const HandleAddProductsRow = () => {
        SetModalProcurementProductsView({open: true, refactorMode: false})
    }
    const HandleRefactorProductsRow = () => {
        if (selectionProcurementProductsModel.length === 0) return

        SetModalProcurementProductsView({open: true, refactorMode: true})
    }
    const HandlerDeleteProductsRow = () => {
        const row = props.procurementProducts.map((p, i) => {
            p.id = i
            return p
        }).find(p => p.id === selectionProcurementProductsModel[0])
        props.deleteProcurementProduct(row)
    }
    const HandleGetProductsRows = () => props.getProcurementProducts()


    return (
        <Box display='flex' justifyContent='space-around'>
            <Box display='flex' width='50%' flexDirection='column' height={600}>
                <ControlPanel
                    HandleAddRow={HandleAddProcurementRow}
                    HandleRefactorRow={HandleRefactorProcurementRow}
                    HandlerDeleteRow={HandlerDeleteProcurementRow}
                    getRows={HandleGetProcurementRows}
                />
                <Table
                    rows={getProcurementTableRows()}
                    columns={ProcurementColumns}
                    onRowClick={HandleClickOnProcurementRow}
                    selectionModel={selectionProcurementModel}
                    setSelectionModel={setSelectionProcurementModel}
                />
                {ModalProcurementView.open && <RowModal
                    open={ModalProcurementView.open}
                    onClose={() => SetModalProcurementView({open: false, refactorMode: false})}
                    row={getModalProcurementRow()}
                    refactorMode={ModalProcurementView.refactorMode}
                    ButtonHandler={HandleProcurementRequestFromModal}
                />}
            </Box>
            <Box display='flex' width='50%' flexDirection='column' height={600}>
                <ControlPanel
                    HandleAddRow={HandleAddProductsRow}
                    HandleRefactorRow={HandleRefactorProductsRow}
                    HandlerDeleteRow={HandlerDeleteProductsRow}
                    getRows={HandleGetProductsRows}
                />
                <Table
                    rows={getProcurementProductsTableRows()}
                    columns={ProcurementProductsColumns}
                    onRowClick={HandleClickOnProcurementProductsRow}
                    selectionModel={selectionProcurementProductsModel}
                    setSelectionModel={setSelectionProcurementProductsModel}
                />
                {ModalProcurementProductsView.open && <RowModal
                    open={ModalProcurementProductsView.open}
                    onClose={() => SetModalProcurementProductsView({open: false, refactorMode: false})}
                    row={getModalProcurementProductsRow()}
                    refactorMode={ModalProcurementProductsView.refactorMode}
                    ButtonHandler={HandleProcurementProductsRequestFromModal}
                />}
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    procurements: state.rows || [],
    procurementProducts: state.procurementProducts || [],
    providers: state.providers || [],
    staff: state.staff || [],
    products: state.products || []
})

const mapDispatchToProps = dispatch => ({
    getProcurements: () => DB.get((err, rows) => dispatch(Actions.setRows(rows))),
    getProcurementProducts: () => DB.getProcProducts((err, rows) => dispatch(Actions.setProcurementProducts(rows))),
    getProviders: () => DBProvider.get((err, result) => dispatch(Actions.setProviders(result))),
    deleteProcurement: row => DB.delProcurement(
        row,
        (err, rows) => DB.get(
            (err, rows) => dispatch(Actions.setRows(rows))
        )
    ),
    deleteProcurementProduct: row => DB.delProcProducts(row, () => DB.getProcProducts((err, rows) => dispatch(Actions.setProcurementProducts(rows)))),
    updateProcurement: row => DB.updateProcurement(row, () => DB.get((err, rows) => dispatch(Actions.setRows(rows)))),
    updateProcProducts: row => DB.updateProcProducts(row, () => DB.getProcProducts((err, rows) => dispatch(Actions.setProcurementProducts(rows)))),
    addProcurement: row => DB.addProcurement(row, () => DB.get((err, rows) => dispatch(Actions.setRows(rows)))),
    addProcProducts: row => DB.addProcProducts(row, () => DB.getProcProducts((err, rows) => dispatch(Actions.setProcurementProducts(rows)))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Procurement)