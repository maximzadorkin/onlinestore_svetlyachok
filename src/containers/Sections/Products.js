import SimplePageInterface from './SimplePageInterface'
import {connect} from 'react-redux'
import DB from '../../utils/Database/Products'
import Actions from '../../store/actions/products'
import DBCategories from '../../utils/Database/ProductCategories'
import DBVendors from '../../utils/Database/ProductVendors'

class Products extends SimplePageInterface {
    constructor() {
        super()
        this.state = {
            ...this.state,
            columns: [
                { field: 'id', headerName: 'id' },
                { field: 'Наименование', headerName: 'Наименование' },
                { field: 'Цена', headerName: 'Цена' },
                { field: 'Описание', headerName: 'Описание' },
                { field: 'КоличествоНаСкладе', headerName: 'Количество на складе' },
                { field: 'Категории_id', headerName: 'Категория' },
                { field: 'Производитель_id', headerName: 'Производитель' },
            ],
        }
    }

    componentDidMount = () => {
        this.props.get()
        this.props.getVendors()
        this.props.getCategories()
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
                multiple: false,
            },
            {
                label: 'Наименование',
                value: RefMode ? SelectRow.Наименование : '',
                required: true,
                readOnly: false,
                selectionList: [],
                multiple: false,
            },
            {
                label: 'Цена',
                value: RefMode ? SelectRow.Цена : '',
                required: true,
                readOnly: false,
                selectionList: [],
                multiple: false,
                type: 'number',
            },
            {
                label: 'Описание',
                value: RefMode ? SelectRow.Описание : '',
                required: false,
                readOnly: false,
                selectionList: [],
                multiple: false,
            },
            {
                label: 'КоличествоНаСкладе',
                value: RefMode ? SelectRow.КоличествоНаСкладе : '',
                required: true,
                readOnly: false,
                selectionList: [],
                multiple: false,
                type: 'number',
            },
            {
                label: 'Категории_id',
                value: RefMode ? [SelectRow.Категории_id] : [],
                selectionList: this.props.categories.map((p) => ({
                    id: p.id,
                    value: p.Наименование,
                })),
                multiple: false,
                required: true,
                readOnly: false,
            },
            {
                label: 'Производитель_id',
                value: RefMode ? [SelectRow.Производитель_id] : [],
                selectionList: this.props.vendors.map((p) => ({
                    id: p.id,
                    value: p.Наименование,
                })),
                multiple: false,
                required: true,
                readOnly: false,
            },
        ]
    }
}

const mapStateToProps = state => ({
    rows: state.products.products,
    categories: state.products.categories,
    vendors: state.products.vendors
})
const mapDispatchToProps = dispatch => {

    const DBGet = () => DB.get(rows => dispatch(Actions.getProducts(rows)))

    return {
        get: DBGet,
        add: row => DB.add(row, DBGet),
        update: row => DB.update(row, DBGet),
        delete: row => DB.delete(row, DBGet),
        getCategories: () => DBCategories.get(rows => dispatch(Actions.getProductCategories(rows))),
        getVendors: () => DBVendors.get(rows => dispatch(Actions.getProductVendors(rows)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)