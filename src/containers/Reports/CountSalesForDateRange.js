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
        <Typography variant='h6'>
            Итоговая сумма: {rows.reduce((acc, el) => acc + Number(el.Стоимость_сделки), 0)}
        </Typography>
    </Box>
)

const mapStateToProps = state => ({
    columns: [
        { field: 'id', headerName: 'id', width: 120 },
        { field: 'Дата', headerName: 'Дата', width: 150 },
        { field: 'Стоимость_сделки', headerName: 'Стоимость сделки', width: 150 },
    ],
    rows: state.reports.countSalesForDataRange || []
})

const mapDispatchToProps = dispatch => ({
    get: (dateStart, dateEnd) =>
        DB.getCountSalesForDateRange(dateStart, dateEnd, rows => dispatch(Actions.getCountSalesForDateRange(rows))),
})

export default connect(mapStateToProps, mapDispatchToProps)(CountSalesForDateRange)