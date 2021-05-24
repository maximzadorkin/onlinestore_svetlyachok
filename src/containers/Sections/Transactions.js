import React from 'react'
import Table from '../../components/Table'
import {useState} from 'react'
import {connect} from 'react-redux'
import {Box, Modal, TextField} from '@material-ui/core'

const Transactions = (props) => {
    const [selectionModel, setSelectionModel] = useState([])
    const [SelectTransactionID, SetSelectTransactionID] = useState(null)
    const [ViewTransaction, SetViewTransaction] = useState(false)

    const columns = [
        {field: 'id', headerName: 'id'},
        {field: 'СтатусСделки', headerName: 'Статус сделки'},
        {field: 'НомерЧека', headerName: '№ чека'},
        {field: 'Клиент', headerName: 'Клиент'},
        {field: 'Сотрудник', headerName: 'Сотрудник'}
    ]

    const HandlerRowClick = () => {
        console.log(selectionModel[0])
        SetSelectTransactionID(selectionModel[0])
        SetViewTransaction(true)
    }

    return (
        <Box>
            <Box height={300}>
                <Table
                    rows={props.transactions || []}
                    columns={columns}
                    onRowClick={HandlerRowClick}
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                />
            </Box>
            <Box height={300}>
                <Box>
                    <TextField
                        label='Количество товара'
                        variant='outlined'
                        type='number'
                    />
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
    getTransaction: () => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)