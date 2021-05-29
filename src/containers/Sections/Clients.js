import React from 'react'
import {connect} from 'react-redux'
import DB from '../../utils/Database/Clients'
import Actions from '../../store/actions/clients'
import SimplePageInterface from './SimplePageInterface'

class Clients extends SimplePageInterface {

    constructor() {
        super()
        this.state = {
            ...this.state,
            columns: [
                {field: 'id', headerName: 'id'},
                {field: 'Имя', headerName: 'Имя'},
                {field: 'Отчество', headerName: 'Отчество'},
                {field: 'Фамилия', headerName: 'Фамилия'},
                {field: 'Телефон', headerName: 'Телефон'},
                {field: 'Email', headerName: 'Email'}
            ],
        }
    }

    getSelectedRow = (RefMode = null) => {
        const SelectRow = this.state.SelectRow

        return [
            {
                label: 'id',
                value: RefMode ? SelectRow.id : 'автогенерируемый',
                selectionList: [],
                required: true,
                readOnly: true,
                multiple: false,
                component: 'textField'
            },
            {
                label: 'Имя',
                value: RefMode ? SelectRow.Имя : '',
                selectionList: [],
                required: true,
                readOnly: false,
                multiple: false,
                component: 'textField'
            },
            {
                label: 'Отчество',
                value: RefMode ? SelectRow.Отчество : '',
                selectionList: [],
                required: false,
                readOnly: false,
                multiple: false,
                component: 'textField'
            },
            {
                label: 'Фамилия',
                value: RefMode ? SelectRow.Фамилия : '',
                selectionList: [],
                required: true,
                readOnly: false,
                multiple: false,
                component: 'textField'
            },
            {
                label: 'Телефон',
                value: RefMode ? SelectRow.Телефон : '',
                selectionList: [],
                required: false,
                readOnly: false,
                multiple: false,
                component: 'textField'
            },
            {
                label: 'Email',
                value: RefMode ? SelectRow.Email : '',
                selectionList: [],
                required: false,
                readOnly: false,
                multiple: false,
                component: 'textField'
            }
        ]
    }

}



const mapStateToProps = state => ({
    rows: state.clients.clients
})

const mapDispatchToProps = dispatch => {

    const DBGet = () => DB.get((rows) => dispatch(Actions.getClients(rows)))

    return {
        get: DBGet,
        add: (row) => DB.add(row, DBGet),
        update: (row) => DB.update(row, DBGet),
        delete: (row) => DB.delete(row, DBGet)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)