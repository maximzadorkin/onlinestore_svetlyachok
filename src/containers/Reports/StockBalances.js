import React, { useState } from 'react'
import SimplePage from './SimplePage'
import { connect } from 'react-redux'
import DB from '../../utils/Database/Reports'
import Actions from '../../store/actions/reports'

const StockBalances = ({ rows = [], columns = [], get }) => (
    <SimplePage
        rows={rows}
        columns={columns}
        get={get}
        dateRange={false}
    />
)

const mapStateToProps = state => ({
    columns: [
        { field: 'id', headerName: 'id', width: 120 },
        { field: 'Наименование', headerName: 'Наименование' },
        { field: 'КоличествоНаСкладе', headerName: 'Остатки' },
    ],
    rows: state.reports.stockBalance
})
const mapDispatchToProps = dispatch => ({
    get: () => DB.getStockBalance(rows => dispatch(Actions.getStockBalance(rows))),
})


export default connect(mapStateToProps, mapDispatchToProps)(StockBalances)