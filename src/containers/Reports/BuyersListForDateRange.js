import React, { useState } from 'react'
import SimplePage from './SimplePage'
import { connect } from 'react-redux'
import DB from '../../utils/Database/Reports'
import Actions from '../../store/actions/reports'
import { Typography, Box } from '@material-ui/core'

const BuyersListForDateRange = ({ rows = [], columns = [], get }) => (
    <Box>
        <SimplePage
            rows={rows}
            columns={columns}
            get={get}
            dateRange={true}
        />
    </Box>
)

const mapStateToProps = state => ({
    columns: [
        { field: 'id', headerName: 'id', width: 120 },
        { field: 'Дата', headerName: 'Дата', width: 150 },
        { field: 'Стоимость_сделки', headerName: 'Стоимость сделки', width: 150 },
        { field: 'Имя', headerName: 'Имя', width: 150 },
        { field: 'Отчество', headerName: 'Отчество', width: 150 },
        { field: 'Фамилия', headerName: 'Фамилия', width: 150 },
        { field: 'Телефон', headerName: 'Телефон', width: 150 },
    ],
    rows: state.reports.buyersListForDateRange || []
})

const mapDispatchToProps = dispatch => ({
    get: (dateStart, dateEnd) =>
        DB.getBuyersListForDateRange(dateStart, dateEnd, rows => dispatch(Actions.getBuyersListForDateRange(rows))),
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyersListForDateRange)