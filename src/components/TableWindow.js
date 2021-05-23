import React from 'react'
import Table from './Table'
import {Button} from '@material-ui/core'
import _ from 'lodash'
import RowModal from './RowModal'

const columns = [
    { field: 'id', headerName: 'ID'},
    { field: 'firstName', headerName: 'First name'},
    { field: 'lastName', headerName: 'Last name'},
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${
                params.getValue(params.id, 'lastName') || ''
            }`,
    },
]

const rows = [
    { id: 101, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie10', firstName: 'Harvey10', age: 64 },
    { id: 11, lastName: 'Roxie11', firstName: 'Harvey11', age: 65 },
    { id: 12, lastName: 'Roxie12', firstName: 'Harvey12', age: 66 },
]

const TableWindow = ({columns, rows, deleteRow, getRows, getRowStruct}) => {

    const [rowModal, setRowModal] = React.useState({
        open: false,
        isRefactor: false
    })

    const [selectionModel, setSelectionModel] = React.useState([])

    const HandlerDeleteRow = () => {
        selectionModel.forEach(select => {
            deleteRow(
                rows.find(row => row.id === select)
            )
        })
    }

    const HandleRefactorRow = () => {
        setRowModal({
            open: true,
            isRefactor: true
        })
    }

    const HandleAddRow = () => {
        setRowModal({
            open: true,
            isRefactor: false
        })
    }

    return (
        <>
            <div style={{margin: '15px 0 15px 15px'}}>
                <Button
                    variant="outlined"
                    style={{
                        margin: '0 15px 0 0',
                        color: 'green',
                        borderColor: 'green'
                    }}
                    onClick={HandleAddRow}
                >
                    Добавить
                </Button>
                <Button
                    variant="outlined"
                    style={{
                        margin: '0 15px 0 0',
                        color: 'orange',
                        borderColor: 'orange'
                    }}
                    onClick={HandleRefactorRow}
                >
                    Редактировать
                </Button>
                <Button
                    variant="outlined"
                    style={{
                        margin: '0 15px 0 0',
                        color: 'orangered',
                        borderColor: 'orangered'
                    }}
                    onClick={HandlerDeleteRow}
                >
                    Удалить
                </Button>
                <Button
                    variant="outlined"
                    onClick={getRows}
                >
                    Обновить
                </Button>
            </div>
            <div style={{ height: 650, width: '100%' }}>
                <Table
                    rows={rows}
                    columns={columns}
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                />
            </div>
            <RowModal
                open={rowModal.open}
                handleClose={() => setRowModal({
                    open: false,
                    isRefactor: false
                })}
                data={getRowStruct(rowModal.isRefactor)}
                isRefactor={rowModal.isRefactor}
            />
        </>
    )
}

export default TableWindow