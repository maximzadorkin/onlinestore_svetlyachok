import SimplePageInterface from './SimplePageInterface'
import { connect } from 'react-redux'
import DB from '../../utils/Database/Suppliers'
import Actions from '../../store/actions/supplies'

class Suppliers extends SimplePageInterface {
    constructor() {
        super()
        this.state = {
            ...this.state,
            columns: [
                { field: 'id', headerName: 'id' },
                { field: 'Наименование', headerName: 'Наименование' }
            ],
        }
    }

    getSelectedRow = (RefMode = null) => {
        const SelectRow = this.state.SelectRow

        return [
            {
                label: 'id',
                value: RefMode ? SelectRow.id : 'автогенерируемый',
                required: true,
                readOnly: true,
                selectionList: [],
                component: 'textField'
            },
            {
                label: 'Наименование',
                value: RefMode ? SelectRow.Наименование : '',
                required: true,
                readOnly: false,
                selectionList: [],
                component: 'textField'
            }
        ]
    }
}

const mapStateToProps = state => ({
    rows: state.supplies.suppliers || []
})
const mapDispatchToProps = dispatch => {

    const DBGet = () => DB.get(rows => dispatch(Actions.getSuppliers(rows)))

    return {
        get: DBGet,
        add: row => DB.add(row, DBGet),
        update: row => DB.update(row, DBGet),
        delete: row => DB.delete(row, DBGet),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers)