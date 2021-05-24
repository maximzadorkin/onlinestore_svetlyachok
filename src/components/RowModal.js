import {
    Box,
    Button,
    Chip,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import CloseModalButton from './CloseModalButton'
import _ from 'lodash'

const getInputs = items => items.filter(item => !(item.value instanceof Array))
const getSelects = items => items.filter(item => item.value instanceof Array)

const RowModal = ({row, refactorMode, ButtonHandler, open, onClose}) => {

    const [Error, SetError] = useState(false)
    const states = {}

    const clickHandler = () => {
        let HaveEmptyRequired = false
        const value = {}
        _.keys(states)
            .map(key => +key)
            .sort()
            .forEach(key => {
                const label = states[key].label
                value[label] = states[key].value
                const required = states[key].required

                if (required) {
                    const isArray = value[label] instanceof Array
                    if (isArray && value[label].length === 0)
                        HaveEmptyRequired = true
                    else if (value[label] === null || value[label] === '')
                        HaveEmptyRequired = true
                }

            })

        if (HaveEmptyRequired) {
            SetError(true)
            return
        }
        ButtonHandler(value)
        onClose()
    }

    const inputs = () => getInputs(row).map(col => {
        const [value, setValue] = useState(col.value)
        const index = row.indexOf(col)
        states[index] = {
            value,
            label: col.label,
            required: col.required
        }

        return (
            <TextField
                // key={_.uniqueId()}
                variant='outlined'
                label={col.label}
                defaultValue={value}
                required={col.required}
                disabled={col.readOnly}
                onChange={event => setValue(event.target.value)}
                fullWidth
                style={{marginBottom: '1rem'}}
                type={col.hasOwnProperty('type') ? col.type : 'string'}
            />
        )
    })

    const select = () => getSelects(row).filter(col => !col.multiple).map(col => {
        const [value, setValue] = useState(col.value)
        useEffect(() => { setValue(value)}, [value] )

        const index = row.indexOf(col)
        states[index] = {
            value,
            label: col.label,
            required: col.required
        }


        return (
            <FormControl
                variant="outlined"
                fullWidth
                style={{marginBottom: '1rem'}}
            >
                <InputLabel>{col.label}</InputLabel>
                <Select
                    // defaultValue={col.value}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    label={col.label}
                    readOnly={col.readOnly}
                >
                    {col.selectionList.map(item => (
                        <MenuItem value={item.id} key={_.uniqueId()}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    })

    // col.value === id
    // selectionList === {id, value}
    const selects = () => getSelects(row).filter(col => col.multiple)
        .map(col => {
            const [value, setValue] = useState(col.value)
            const index = row.indexOf(col)
            states[index] = {
                value,
                label: col.label,
                required: col.required
            }
            return (
                <FormControl
                    key={_.uniqueId()}
                    fullWidth
                    style={{marginBottom: '1rem'}}
                >
                    <InputLabel>{col.label}}</InputLabel>
                    <Select
                        multiple={col.multiple}
                        defaultValue={value}
                        onChange={event => setValue(event.target.value)}
                        input={<Input />}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                    >
                        {col.selectionList.map(item => (
                            <MenuItem key={item.value} value={item.id}>
                                {item.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        })

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <div style={{
                    width: 400,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    padding: '30px 30px'
                }}>
                    <CloseModalButton handleClose={onClose}/>
                    {inputs()}
                    {select()}
                    {selects()}
                    <Box display='flex' justifyContent='center'>
                        <Button
                            variant='contained'
                            style={{color: 'white', backgroundColor: 'limegreen'}}
                            onClick={clickHandler}
                            disableElevation
                        >
                            {refactorMode ? 'Обновить' : 'Добавить'}
                        </Button>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='center'
                        m={1}
                    >
                        {
                            Error &&
                            <Typography component='span' variant='body1' color='secondary'>
                                Проверьте заполнения полей
                            </Typography>
                        }
                    </Box>
                </div>
            </div>
        </Modal>
    )
}

export default RowModal