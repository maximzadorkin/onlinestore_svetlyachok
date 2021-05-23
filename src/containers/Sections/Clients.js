import React from 'react'
import {connect} from 'react-redux'
import RowModal from '../../components/RowModal'
import ControlPanel from '../../components/ControlPanel'
import Table from '../../components/Table'
import DB from '../../utils/Database/Clients'
import {Actions} from '../../store/actions'
import _ from 'lodash'

const Clients = ({rows, columns, positions, get, add, update, del}) => {

    const [openModal, setOpenModal] = React.useState({open: false, refactorMode: false})
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
                label: 'Имя',
                value: refactorMode ? selected.Имя : '',
                required: true,
                readOnly: false
            },
            {
                label: 'Отчество',
                value: refactorMode ? selected.Отчество : '',
                required: false,
                readOnly: false
            },
            {
                label: 'Фамилия',
                value: refactorMode ? selected.Фамилия : '',
                required: true,
                readOnly: false
            },
            {
                label: 'Телефон',
                value: refactorMode ? selected.Телефон : '',
                required: false,
                readOnly: false
            },
            {
                label: 'Email',
                value: refactorMode ? selected.Email : '',
                required: false,
                readOnly: false
            }
        ]
    }

    const getTableRow = () => _.cloneDeep(rows).map(row => {
        if (row.hasOwnProperty('Должности'))
            row.Должности = row.Должности.value.join(', ')
        return row
    })

    return (
        <>
            {
                openModal.open &&
                <RowModal
                    open={openModal.open}
                    onClose={() => setOpenModal({open: false, refactorMode: false})}
                    row={getModalRow()}
                    refactorMode={openModal.refactorMode}
                    ButtonHandler={HandleButtonsRequest}
                />
            }
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
            {field: 'Имя', headerName: 'Имя'},
            {field: 'Отчество', headerName: 'Отчество'},
            {field: 'Фамилия', headerName: 'Фамилия'},
            {field: 'Телефон', headerName: 'Телефон'},
            {field: 'Email', headerName: 'Email'},
        ]
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
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Clients)