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
                required: true,
                readOnly: true,
                selectionList: [],
                multiple: false,
            },
            {
                label: 'Имя',
                value: RefMode ? SelectRow.Имя : '',
                required: true,
                readOnly: false,
                selectionList: [],
                multiple: false,
            },
            {
                label: 'Отчество',
                value: RefMode ? SelectRow.Отчество : '',
                required: false,
                readOnly: false,
                selectionList: [],
                multiple: false,
            },
            {
                label: 'Фамилия',
                value: RefMode ? SelectRow.Фамилия : '',
                required: true,
                readOnly: false,
                selectionList: [],
                multiple: false,
            },
            {
                label: 'Телефон',
                value: RefMode ? SelectRow.Телефон : '',
                required: false,
                readOnly: false,
                selectionList: [],
                multiple: false,
            },
            {
                label: 'Email',
                value: RefMode ? SelectRow.Email : '',
                required: false,
                readOnly: false,
                selectionList: [],
                multiple: false,
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