import React from 'react'
import {Box} from '@material-ui/core'
import Table from '../../components/Table'
import RowModal from '../../components/RowModal'
import ControlPanel, {Roles} from '../../components/ControlPanel'
import _ from 'lodash'

// props
// get, add, update, delete

class SimplePageInterface extends React.Component {

    constructor() {
        super()
        this.state = {
            Role: Roles(),
            selectionModel: [],
            SelectRow: null,
            RefactorMode: false,
            ShowModal: false,
            ModalOptions: [],
            columns: [
                {field: 'id', headerName: 'id'}
            ],
        }
    }

    componentDidMount = () =>
        this.props.get()

    onRowClick = (e) =>
        this.setState({SelectRow: _.cloneDeep(e.row)})

    getTableRows = () =>
        this.props.rows

    getSelectedRow = (RefMode = null) => {
        const SelectRow = this.state.SelectRow

        return [
            {
                label: 'id',
                value: RefMode ? SelectRow.id : 'автогенерируемый',
                required: true,
                readOnly: true
            }
        ]
    }

    HandlerButtonAdd = () =>
        this.setState({
            ShowModal: true,
            RefactorMode: false,
            ModalOptions: this.getSelectedRow(false),
            selectionModel: [],
            SelectRow: null
        })

    HandlerButtonUpdate = () => {
        if (this.state.SelectRow)
            this.setState({
                ShowModal: true,
                RefactorMode: true,
                ModalOptions: this.getSelectedRow(true),
                selectionModel: [],
                SelectRow: null
            })
    }

    HandlerButtonDelete = () => {
        if (this.state.SelectRow)
            this.props.delete(this.state.SelectRow)
    }

    HandlerButtonModal = (row) => {
        if (this.state.RefactorMode)
            this.props.update(row)
        else
            this.props.add(row)
        this.setState({ShowModal: false, RefactorMode: false})
    }

    render = () => {
        return (
            <Box>
                <ControlPanel
                    Role={this.state.Role}
                    HandleAdd={this.HandlerButtonAdd}
                    HandleRefactor={this.HandlerButtonUpdate}
                    HandlerDelete={this.HandlerButtonDelete}
                    HandlerUpdate={this.props.get}
                />
                <Table
                    rows={this.getTableRows()}
                    columns={this.state.columns}
                    onRowClick={this.onRowClick}
                    selectionModel={this.state.selectionModel}
                    setSelectionModel={(selectionModel) => this.setState({selectionModel})}
                />
                {this.state.ShowModal && (
                    <RowModal
                        refactorMode={this.state.RefactorMode}
                        onClose={() => this.setState({ShowModal: false, RefactorMode: false})}
                        ButtonHandler={this.HandlerButtonModal}
                        open={this.state.ShowModal}
                        row={this.state.ModalOptions}
                    />
                )}
            </Box>
        )
    }
}

export default SimplePageInterface