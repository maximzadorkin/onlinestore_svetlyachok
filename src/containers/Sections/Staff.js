import React from 'react'
import { connect } from 'react-redux'
import DB from '../../utils/Database/Staff'
import DBStaffPositions from '../../utils/Database/StaffPositions'
import Actions from '../../store/actions/staff'
import SimplePageInterface from './SimplePageInterface'
import _ from 'lodash'

class Staff extends SimplePageInterface {

    constructor() {
        super()
        this.state = {
            ...this.state,
            columns: [
                { field: 'id', headerName: 'id' },
                { field: 'Имя', headerName: 'Имя' },
                { field: 'Отчество', headerName: 'Отчество' },
                { field: 'Фамилия', headerName: 'Фамилия' },
                { field: 'Телефон', headerName: 'Телефон' },
                { field: 'Email', headerName: 'Email' },
                { field: 'Должности', headerName: 'Занимаемые должности' },
                { field: 'Login', headerName: 'Login' },
                { field: 'Password', headerName: 'Password' },
                { field: 'Действителен', headerName: 'Действителен' },
            ]
        }
    }

    componentDidMount = () => {
        this.props.get()
        this.props.getPositions()
    }

    getTableRows = () => _.cloneDeep(this.props.rows).map(row => ({
        ...row,
        Действителен: !!row.Действителен ? 'да' : 'нет',
        Должности: row.Должности.map(r =>
            this.props.positions.find(pos => pos.id === r.Должности_id).Наименование)
    }))

    getSelectedRow = (RefMode = null) => {
        let SelectRow
        if (RefMode) {
            SelectRow = _.cloneDeep(this.props.rows).find(c => this.state.SelectRow.id === c.id)
            SelectRow.Должности = SelectRow.Должности.map(pos => pos.Должности_id)
        }

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
            },
            {
                label: 'Должности',
                value: RefMode ? SelectRow.Должности : [], // array
                selectionList: this.props.positions.map(p => ({
                    value: p.id,
                    display: p.Наименование
                })),
                required: true,
                readOnly: false,
                component: 'multipleSelect'
            },
            {
                label: 'Login',
                value: RefMode ? SelectRow.Login : '',
                selectionList: [],
                required: true,
                readOnly: false,
                component: 'textField'
            },
            {
                label: 'Password',
                value: RefMode ? SelectRow.Password : '',
                selectionList: [],
                required: false,
                readOnly: false,
                component: 'textField'
            },
            {
                label: 'Действителен',
                value: RefMode ? SelectRow.Действителен : '',
                selectionList: [],
                required: false,
                readOnly: true,
                component: 'switch'
            },
        ]
    }
}

const mapStateToProps = state => ({
    rows: state.staff.staff || [],
    positions: state.staff.positions || [],
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