import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'

const SetWidth = (columns) => columns.map((val) => ({
    ...val,
    width: 250
}))

const Table = ({rows, columns, onRowClick, selectionModel, setSelectionModel}) => {
    const onChangeSelection = (newSelection) => setSelectionModel(newSelection.selectionModel)

    return (
        <div style={{ height: '650px', width: '100%' }} id='table'>
            <DataGrid
                rows={rows}
                columns={SetWidth(columns)}
                pageSize={10}
                onRowClick={onRowClick}
                onSelectionModelChange={onChangeSelection}
                selectionModel={selectionModel}
            />
        </div>
    )
}


export default Table