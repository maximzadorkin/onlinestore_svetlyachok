import SimplePageInterface from './SimplePageInterface'
import { connect } from 'react-redux'
import DB from '../../utils/Database/Products'
import Actions from '../../store/actions/products'
import DBCategories from '../../utils/Database/ProductCategories'
import DBVendors from '../../utils/Database/ProductVendors'
import _ from 'lodash'

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

    getTableRows = () => _.cloneDeep(this.props.rows).map(row => {
        row.Категории_id = this.props.categories
            .find(cat => cat.id === row.Категории_id)?.Наименование

        row.Производитель_id = this.props.vendors
            .find(vend => vend.id === row.Производитель_id)?.Наименование

        return row
    })

    getSelectedRow = (RefMode = null) => {
        let SelectRow
        if (RefMode)
            SelectRow = _.cloneDeep(this.props.rows).find(c => this.state.SelectRow.id === c.id)

        return [
            {
                label: 'id',
                value: RefMode ? SelectRow.id : 'автогенерируемый',
                selectionList: [],
                required: true,
                readOnly: true,
                component: 'textField'
            },
            {
                label: 'Наименование',
                value: RefMode ? SelectRow.Наименование : '',
                selectionList: [],
                required: true,
                readOnly: false,
                component: 'textField'
            },
            {
                label: 'Цена',
                value: RefMode ? SelectRow.Цена : '',
                selectionList: [],
                required: true,
                readOnly: false,
                type: 'number',
                component: 'textField',
            },
            {
                label: 'Описание',
                value: RefMode ? SelectRow.Описание : '',
                selectionList: [],
                required: false,
                readOnly: false,
                component: 'textField',
            },
            {
                label: 'КоличествоНаСкладе',
                value: RefMode ? SelectRow.КоличествоНаСкладе : '',
                selectionList: [],
                required: true,
                readOnly: false,
                type: 'number',
                component: 'textField',
            },
            {
                label: 'Категории_id',
                value: RefMode ? [SelectRow.Категории_id] : [],
                selectionList: this.props.categories.map((p) => ({
                    value: p.id,
                    display: p.Наименование,
                })),
                required: true,
                readOnly: false,
                component: 'select',
            },
            {
                label: 'Производитель_id',
                value: RefMode ? [SelectRow.Производитель_id] : [],
                selectionList: this.props.vendors.map((p) => ({
                    value: p.id,
                    display: p.Наименование
                })),
                required: true,
                readOnly: false,
                component: 'select',
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