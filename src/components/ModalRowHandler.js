// row array:
//  label: '',
//  defaultValue: '', []
//  selectionList: if defaultValue [], then [] with choises
//  multiple: true,
//  required: true,
//  readOnly: false,
//  type: 'number',
//  component: 'textField', 'select', 'multipleSelect', 'datepicker'
// open
// onClose
// RefactorMode
// ButtonHandler
import React from 'react'
import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core'
import CloseModalButton from './CloseModalButton'
import _ from 'lodash'

class ModalRowHandler extends React.Component {

    state = {
        Error: false,
        ErrorMessage: 'Проверьте заполнения полей',
        row: []
    }

    componentDidMount = () => {
        const row = _.cloneDeep(this.props.row).map((item, index) => {
            item.id = index
            return item
        })
        const states = {}
        row.forEach((item, index) => states[this.returnStateName(index)] = item)
        this.setState({ row, ...states })
    }

    returnStateName = (id) => `column_${id}`

    HandlerInputChange = (value, col) => {
        const uniqIDState = this.returnStateName(col.id)
        this.setState({
            [uniqIDState]: {
                ...this.state[uniqIDState],
                value: value// == -1 ? 0 : event.target.value
            }
        })
    }

    textFields = () => this.state.row.filter(item => item.component === 'textField')
        .map(col =>
            <TextField
                key={`${col.id}_${col.label}_${col.value}`}
                variant='outlined'
                label={col.label}
                value={this.state[this.returnStateName(col.id)].value}
                required={col.required}
                disabled={col.readOnly}
                onChange={event =>
                    this.HandlerInputChange(event.target.value, col)}
                fullWidth
                style={{ marginBottom: '1rem' }}
                type={col.hasOwnProperty('type') ? col.type : 'string'}
                InputLabelProps={{ shrink: true }}
            />
        )

    selects = () => this.state.row.filter(item => item.component === 'select').map(col => (
        <FormControl
            key={`${col.id}_${col.label}_${col.value.toString()}`}
            variant='outlined'
            fullWidth
            style={{ marginBottom: '1rem' }}
        >
            <InputLabel>{col.label}</InputLabel>
            <Select
                label={col.label}
                value={this.state[this.returnStateName(col.id)].value}
                onChange={event =>
                    this.HandlerInputChange(event.target.value, col)}
                readOnly={col.readOnly}
                required={col.required}
            >
                {col.selectionList.map(item => (
                    <MenuItem value={item.value} key={_.uniqueId()}>
                        {item.display}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    ))

    multipleSelects = () => this.state.row.filter(item => item.component === 'multipleSelect').map(col => (
        <FormControl
            key={`${col.id}_${col.label}_${col.value.toString()}`}
            variant='outlined'
            fullWidth
            style={{ marginBottom: '1rem' }}
        >
            <InputLabel>{col.label}</InputLabel>
            <Select
                label={col.label}
                value={this.state[this.returnStateName(col.id)].value}
                onChange={event =>
                    this.HandlerInputChange(event.target.value, col)}
                readOnly={col.readOnly}
                required={col.required}
                multiple={true}
            >
                {col.selectionList.map(item => (
                    <MenuItem value={item.value} key={_.uniqueId()}>
                        {item.display}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    ))

    ButtonHandler = () => {
        const row = this.state.row.map(i => ({
            label: this.state.row[i.id].label,
            value: this.state[this.returnStateName(i.id)].value,
            required: i.required
        }))

        let HaveError = false
        row.forEach(column => {
            if (!column.required) return
            if (!HaveError)
                HaveError = column.value.length === 0
        })
        if (HaveError)
            this.setState({ Error: true })
        else
            this.props.ButtonHandler(row)
    }

    render = () => {
        if (!Array.isArray(this.props.row)) return null

        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Box display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='100%'
                    overflow='auto'
                >
                    <Box width={400} bgcolor='white' p='30px' borderRadius={4}>
                        <CloseModalButton handleClose={this.props.onClose} />
                        {this.textFields()}
                        {this.selects()}
                        {this.multipleSelects()}
                        <Box display='flex' justifyContent='center' width='100%'>
                            <Button
                                variant='contained'
                                color='primary'
                                disableElevation
                                onClick={this.ButtonHandler}
                            >
                                {this.props.RefactorMode ? 'Обновить' : 'Добавить'}
                            </Button>
                        </Box>
                        {this.state.Error && (
                            <Box display='flex' justifyContent='center' m={1}>
                                <Typography component='span' variant='body1' color='secondary'>
                                    {this.state.ErrorMessage}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Modal>
        )
    }
}

export default ModalRowHandler
