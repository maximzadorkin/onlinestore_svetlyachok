import React, {useState} from 'react'
import {connect} from 'react-redux'
import RowModal from '../../components/RowModal'
import ControlPanel from '../../components/ControlPanel'
import Table from '../../components/Table'
import DB from '../../utils/Database/Products'
import {Actions} from '../../store/actions'
import _ from 'lodash'

const Products = ({rows, columns, productCategories, productVendors, get, add, update, del}) => {

    const [openModal, setOpenModal] = useState({open: false, refactorMode: false})
    const [selectionModel, setSelectionModel] = React.useState([])

    const haveSelectedRow = () => {
        const selected = rows.find(col => col.id === selectionModel[0])
        const haveSelected = selected !== undefined
        return haveSelected
    }


    const HandleButtonsRequest = row => {
        if (openModal.refactorMode)
            update(row)
        else
            add(row)
    }
    const HandleAddRow = () => {
        setOpenModal({open: true, refactorMode: false})
    }
    const HandleRefactorRow = () => {
        if (!haveSelectedRow()) return
        setOpenModal({open: true, refactorMode: true})
    }
    const HandlerDeleteRow = () => {
        const row = rows.find(row => row.id === selectionModel[0])
        del(row)
    }
    const HandleGetRows = () => {
        return get()
    }



    const getModalRow = () => {
        const refactorMode = openModal.refactorMode
        const selected = rows.find(col => col.id === selectionModel[0])
        return [
            {
                label: 'id',
                value: refactorMode ? selected.id : 'автогенерируемый',
                required: true,
                readOnly: true
            },
            {
                label: 'Наименование',
                value: refactorMode ? selected.Наименование : '',
                required: true,
                readOnly: false
            },
            {
                label: 'Цена',
                value: refactorMode ? selected.Цена : '',
                required: true,
                readOnly: false,
                type: 'number'
            },
            {
                label: 'Описание',
                value: refactorMode ? selected.Описание : '',
                required: false,
                readOnly: false
            },
            {
                label: 'КоличествоНаСкладе',
                value: refactorMode ? selected.КоличествоНаСкладе : '',
                required: true,
                readOnly: false,
                type: 'number'
            },
            {
                label: 'Категории_id',
                value: refactorMode ? [selected.Категории_id] : [],
                selectionList: productCategories.map(p => ({
                    id: p.id,
                    value: p.Наименование,
                })),
                multiple: false,
                required: true,
                readOnly: false
            },
            {
                label: 'Производитель_id',
                value: refactorMode ? [selected.Производитель_id] : [],
                selectionList: productVendors.map(p => ({
                    id: p.id,
                    value: p.Наименование,
                })),
                multiple: false,
                required: true,
                readOnly: false
            }
        ]
    }

    const getTableRow = () => _.cloneDeep(rows).map(row => {
        row.Производитель_id = productVendors.find(pv => pv.id === row.Производитель_id)
        row.Категории_id = productCategories.find(pc => pc.id === row.Категории_id)
        if (row.Производитель_id instanceof Object)
            row.Производитель_id = row.Производитель_id.Наименование
        if (row.Категории_id instanceof Object)
            row.Категории_id = row.Категории_id.Наименование
        return row
    })

    return (
        <>
            {openModal.open && (
                <RowModal
                    open={openModal.open}
                    onClose={() => setOpenModal({open: false, refactorMode: false})}
                    row={getModalRow()}
                    refactorMode={openModal.refactorMode}
                    ButtonHandler={HandleButtonsRequest}
                />
            )}
            <ControlPanel
                HandleAddRow={HandleAddRow}
                HandleRefactorRow={HandleRefactorRow}
                HandlerDeleteRow={HandlerDeleteRow}
                getRows={HandleGetRows}
            />
            <div style={{ height: 650, width: '100%' }}>
                <Table
                    rows={getTableRow()}
                    columns={columns}
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                />
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        rows: state.rows,
        columns: [
            {field: 'id', headerName: 'id'},
            {field: 'Наименование', headerName: 'Наименование'},
            {field: 'Цена', headerName: 'Цена'},
            {field: 'Описание', headerName: 'Описание'},
            {field: 'КоличествоНаСкладе', headerName: 'Количество на складе'},
            {field: 'Категории_id', headerName: 'Категория'},
            {field: 'Производитель_id', headerName: 'Производитель'}
        ],
        productCategories: state.productCategories,
        productVendors: state.productVendors
    }
}

const mapDispatchToProps = dispatch => ({
    get: () => DB.get((err, rows) => dispatch(Actions.setRows(rows))),
    add: row => DB.add(
        row,
        () => DB.get((err, rows) => dispatch(Actions.setRows(rows)))
    ),
    update: row => DB.update(
        row,
        () => DB.get((err, rows) => dispatch(Actions.setRows(rows)))
    ),
    del: row => {
        DB.del(row)
        dispatch(Actions.deleteRow(row))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)