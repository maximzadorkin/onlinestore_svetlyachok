import React, { useState } from 'react'
import SimplePage from './SimplePage'
import { connect } from 'react-redux'
import DB from '../../utils/Database/Reports'
import Actions from '../../store/actions/reports'
import { Typography, Box } from '@material-ui/core'

const CountSalesForDateRange = ({ rows = [], columns = [], get }) => (
    <Box>
        <SimplePage
            rows={rows}
            columns={columns}
            get={get}
            dateRange={true}
        />
        <Typography>Итоговая сумма: {rows.reduce((acc, el) => acc + el.Стоимость_сделки, 0)}</Typography>
    </Box>
)

const mapStateToProps = state => ({
    columns: [
        { field: 'id', headerName: 'id', width: 120 },
        { field: 'Дата', headerName: 'Дата' },
        { field: 'Стоимость_сделки', headerName: 'Стоимость сделки' },
    ],
    rows: state.reports.CountSalesForDateRange
})
const mapDispatchToProps = dispatch => ({
    get: (dateStart, dateEnd) =>
        DB.getCountSalesForDateRange(dateStart, dateEnd, rows => dispatch(Actions.getCountSalesForDateRange(rows))),
})

export default connect(mapStateToProps, mapDispatchToProps)(CountSalesForDateRange)