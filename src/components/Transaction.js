import React, { useState } from 'react'
import {
    Box,
    Typography,
    Card,
    Divider,
    InputLabel,
    FormControl,
    FormControlLabel,
    MenuItem,
    Switch,
    Button,
    TextField
} from '@material-ui/core'
import CloseModalButton from './CloseModalButton'
import _ from 'lodash'

const Select = ({ label, selectionList, readOnly, value, HandlerInputChange }) => (
    <FormControl
        key={`${label}_${value.toString()}`}
        style={{ marginBottom: '1rem' }}
        variant='outlined'
        fullWidth
    >
        <InputLabel>{label}</InputLabel>
        <Select
            value={value}
            onChange={event =>
                HandlerInputChange(event.target.value)}
            readOnly={readOnly}
            required={true}
        >
            {selectionList.map(item => (
                <MenuItem value={item.value} key={_.uniqueId()}>
                    {item.display}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
)

const initState = {}
initState.Сделка = {
    Клиент: {
        value: '',
        selectionList: [{ value: '', display: '' }]
    },
    Продавец: {
        value: '',
        selectionList: [{ value: '', display: '' }]
    },
    СтоимостьСделки: 0
}
initState.Чек = {
    id: '',
    Сумма: '',
    Дата: ''
}
initState.Доставка = {
    Дата: '',
    Адрес: '',
    Доставлено: false,
    Курьер: {
        value: '',
        selectionList: [{ value: '', display: '' }]
    }
}
initState.Товары = [{
    Товар: '', // id
    КоличествоТовара: 0,
    selectionList: [{ value: '', display: '' }]
}]

const Transaction = ({ closeModal, RefactorMode, initialState }) => {
    const [state, setState] = useState(initState)

    return (
        <Box
            height='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Box
                width={600}
                p={3}
                bgcolor='white'
                borderRadius={4}
            >
                <CloseModalButton handleClose={closeModal} />
                <Box mb={3}>
                    <Card variant='outlined'>
                        <Box p={3}>
                            <Typography>Основное</Typography>
                            <Divider />
                            <Select
                                label='Клиент'
                                selectionList={state.Сделка.Клиент.selectionList}
                                readOnly={false}
                                value={state.Сделка.Клиент.value}
                                HandlerInputChange={val => setState({
                                    ...state,
                                    Сделка: {
                                        ...state.Сделка,
                                        Клиент: {
                                            ...state.Сделка.Клиент,
                                            value: val
                                        }
                                    }
                                })}
                            />
                            <Select
                                label='Продавец'
                                selectionList={state.Сделка.Продавец.selectionList}
                                readOnly={false}
                                value={state.Сделка.Продавец.value}
                                HandlerInputChange={val => setState({
                                    ...state,
                                    Сделка: {
                                        ...state.Сделка,
                                        Продавец: {
                                            ...state.Сделка.Продавец,
                                            value: val
                                        }
                                    }
                                })}
                            />
                            <Typography>Стоимость сделки: {state.Сделка.СтоимостьСделки}</Typography>
                        </Box>
                    </Card>
                </Box>
                {RefactorMode && (
                    <Box mb={3}>
                        <Card variant='outlined'>
                            <Box p={3} display='flex' flexDirection='column'>
                                <Typography>Чек</Typography>
                                <Divider />
                                <Typography>№: {state.Чек.id}</Typography>
                                <Typography>Сумма: {state.Чек.Сумма}</Typography>
                                <Typography>Дата: {state.Чек.Дата}</Typography>
                            </Box>
                        </Card>
                    </Box>
                )}
                <Box mb={3}>
                    <Card variant='outlined'>
                        <Box p={3}>
                            <Typography>Доставка</Typography>
                            <Box mb={2}><Divider /></Box>
                            <Box mb={1}>
                                <TextField
                                    label='Дата'
                                    InputLabelProps={{ shrink: true }}
                                    variant='outlined'
                                    fullWidth
                                    value={state.Доставка.Дата}
                                    onChange={val => setState({
                                        ...state,
                                        Доставка: {
                                            ...state.Доставка,
                                            Дата: val
                                        }
                                    })}
                                    type='date'
                                />
                            </Box>
                            <Box mb={1}>
                                <TextField
                                    label='Адрес'
                                    variant='outlined'
                                    fullWidth
                                    value={state.Доставка.Адрес}
                                    onChange={val => setState({
                                        ...state,
                                        Доставка: {
                                            ...state.Доставка,
                                            Адрес: val
                                        }
                                    })}
                                />
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.Доставка.Доставлено}
                                        onChange={val => setState({
                                            ...state,
                                            Доставка: {
                                                ...state.Доставка,
                                                Доставлено: val
                                            }
                                        })}
                                        color='primary'
                                    />
                                }
                                label='Доставлено'
                            />
                            <Select
                                label='Курьер'
                                selectionList={state.Доставка.selectionList}
                                readOnly={false}
                                value={state.Доставка.Курьер.value}
                                HandlerInputChange={val => setState({
                                    ...state,
                                    Доставка: {
                                        ...state.Доставка,
                                        Курьер: {
                                            ...state.Курьер,
                                            value: val
                                        }
                                    }
                                })}
                            />
                        </Box>
                    </Card>
                </Box>
                <Box mb={3}>
                    <Card variant='outlined'>
                        <Box p={3}>
                            <Typography>Товары</Typography>
                            <Divider />
                        </Box>
                    </Card>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Button color='primary' variant='contained' disableElevation>
                        {RefactorMode ? 'Обновить' : 'Создать'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Transaction