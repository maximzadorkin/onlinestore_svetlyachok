import { TextField, Box, Divider, Button } from '@material-ui/core'
import React, { useState } from 'react'
import Table from '../../components/Table'

const SimplePage = ({ columns, rows, get, dateRange }) => {
    const [selectionModel, setSelectionModel] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const clickHandler = () => {
        if (dateRange)
            get(startDate, endDate)
        else
            get()
    }

    return (
        <Box>
            <Box mt={3} display='flex'>
                {dateRange && (
                    <>
                        <TextField
                            label='Дата начала выборки'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            type='date'
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        <Box m={2}>
                            <Divider orientation='vertical' />
                        </Box>
                        <TextField
                            label='Дата конца выборки'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            type='date'
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                        <Box m={2}>
                            <Divider orientation='vertical' />
                        </Box>
                    </>
                )}
                <Button
                    variant='contained'
                    disableElevation
                    color='primary'
                    onClick={clickHandler}
                >
                    Построить отчет
                </Button>
            </Box>
            <Table
                rows={rows}
                columns={columns}
                onRowClick={() => { }}
                selectionModel={selectionModel}
                setSelectionModel={setSelectionModel}
            />
        </Box>
    )
}

export default SimplePage