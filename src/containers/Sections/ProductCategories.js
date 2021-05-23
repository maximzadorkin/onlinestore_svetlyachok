import React from 'react'
import {connect} from 'react-redux'
import TableWindow from '../../components/TableWindow'
import DB from '../../utils/Database/ProductCategories'
import {Actions} from '../../store/actions'

class ProductCategories extends React.Component {

    componentDidMount() {
        this.props.get()
    }

    getRowStruct(isRefactorMode, selectedRow = null) {
        // if need to choise, then {} in [] in input[] -> [{}, {}, [{}, {}], {}]
        // for every input:
        //  -- label
        //  -- value, if add modal then null
        //  -- required
        //  -- readOnly
        // const row = rows.find(row => row.id === select)
        const inputs = [
            {
                label: 'id',
                value: 'автогенерируемый',
                required: true,
                readOnly: true
            },
            {
                label: 'Наименование',
                value: selectedRow.Наименование,
                required: true,
                readOnly: false
            }
        ]
    }

    render() {
        return (
            <TableWindow
                rows={this.props.rows}
                columns={this.props.columns}
                deleteRow={this.props.del}
                getRows={this.props.get}
                getRowStruct={this.getRowStruct}
            />
        )
    }
}

const mapStateToProps = (state) => {

    const columns = [
        {field: 'id', headerName: 'id'},
        {field: 'Наименование', headerName: 'Наименование'}
    ]

    const rows = state.rows

    return {rows, columns}
}

const mapDispatchToProps = (dispatch) => {
    return {
        get: () => DB.get((err, rows) => dispatch(Actions.setRows(rows))),
        add: () => dispatch(),
        update: () => dispatch(),
        del: row => {
            DB.del(row)
            dispatch(Actions.deleteRow(row))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories)