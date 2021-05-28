import React from 'react'
import {connect} from 'react-redux'
import DB from '../../utils/Database/Staff'
import DBStaffPositions from '../../utils/Database/StaffPositions'
import Actions from '../../store/actions/staff'
import SimplePageInterface from './SimplePageInterface'

class Staff extends SimplePageInterface {

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
                {field: 'Email', headerName: 'Email'},
                {field: 'Должности', headerName: 'Занимаемые должности'},
                {field: 'Login', headerName: 'Login'},
                {field: 'Password', headerName: 'Password'},
            ]
        }
    }

    componentDidMount = () => {
        this.props.get()
        this.props.getPositions()
    }

    getTableRows = () => this.props.rows.map(row => ({
        ...row,
        Должности: row.Должности.map(r =>
            this.props.positions.find(pos => pos.id === r.Должности_id).Наименование)
    }))

    getSelectedRow = (RefMode = null) => {
        const SelectRow = this.state.SelectRow
        // SelectRow.Должности = SelectRow.Должности.map(sp => ({
        //     id: this.props.positions.find(pos => pos.Наименование === sp).id
        // }))
        console.log(SelectRow)

        return [
            {
                label: 'id',
                value: RefMode ? SelectRow.id : 'автогенерируемый',
                required: true,
                readOnly: true
            },
            {
                label: 'Имя',
                value: RefMode ? SelectRow.Имя : '',
                required: true,
                readOnly: false
            },
            {
                label: 'Отчество',
                value: RefMode ? SelectRow.Отчество : '',
                required: false,
                readOnly: false
            },
            {
                label: 'Фамилия',
                value: RefMode ? SelectRow.Фамилия : '',
                required: true,
                readOnly: false
            },
            {
                label: 'Телефон',
                value: RefMode ? SelectRow.Телефон : '',
                required: false,
                readOnly: false
            },
            {
                label: 'Email',
                value: RefMode ? SelectRow.Email : '',
                required: false,
                readOnly: false
            },
            {
                label: 'Должности',
                value: RefMode ? SelectRow.Должности : [], // array
                selectionList: this.props.positions.map(p => ({
                    id: p.id,
                    value: p.Наименование,
                })),
                multiple: true,
                required: true,
                readOnly: false
            },
            {
                label: 'Login',
                value: RefMode ? SelectRow.Login : '',
                required: true,
                readOnly: false
            },
            {
                label: 'Password',
                value: RefMode ? SelectRow.Password : '',
                required: false,
                readOnly: false
            },
        ]
    }

}

const mapStateToProps = state => ({
    rows: state.staff.staff,
    positions: state.staff.positions,
})

const mapDispatchToProps = dispatch => {

    const DBGet = () => DB.get(rows => dispatch(Actions.getStaff(rows)))

    return {
        get: DBGet,
        add: row => DB.add(row, DBGet),
        update: row => DB.update(row, DBGet),
        delete: row => DB.delete(row, DBGet),
        getPositions: () => DBStaffPositions.get(rows => dispatch(Actions.getStaffPositions(rows)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)