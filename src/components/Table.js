import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'

const SetWidth = (columns) => columns.map((val) => ({
    ...val,
    width: Math.trunc((window.innerWidth * 0.75) / columns.length)
}))

const Table = ({rows, columns, onRowClick, selectionModel, setSelectionModel}) => {

    return (
        <div style={{ height: '100%', width: '100%' }} id='table'>
            <DataGrid
                rows={rows}
                columns={SetWidth(columns)}
                pageSize={10}
                onRowClick={onRowClick}
                onSelectionModelChange={(newSelection) => setSelectionModel(newSelection.selectionModel)}
                selectionModel={selectionModel}
            />
        </div>
    )
}


export default Table