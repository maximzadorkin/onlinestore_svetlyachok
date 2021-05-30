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
    TextField,
    Select,
    Modal
} from '@material-ui/core'
import CloseModalButton from './CloseModalButton'
import _ from 'lodash'

// const initState = {}
// initState.Сделка = {
//     Клиент: {
//         value: '',
//         selectionList: [{ value: '', display: '' }]
//     },
//     Продавец: {
//         value: '',
//         selectionList: [{ value: '', display: '' }]
//     },
//     СтоимостьСделки: 0
// }
// initState.Чек = {
//     id: '',
//     Сумма: '',
//     Дата: ''
// }
// initState.Доставка = {
//     Дата: '',
//     Адрес: '',
//     Доставлено: false,
//     Курьер: {
//         value: '',
//         selectionList: [{ value: '', display: '' }]
//     }
// }
// initState.Товары = [{
//     Товар: '', // id
//     КоличествоТовара: 0,
//     selectionList: [{ value: '', display: '' }]
// }]

const SelectField = ({ label, selectionList, disabled, value, HandlerInputChange }) => (
    <FormControl
        key={`${label}_${value.toString()}`}
        style={{ marginBottom: '1rem' }}
        variant='outlined'
        fullWidth
    >
        <InputLabel>{label}</InputLabel>
        <Select
            label={label}
            value={value}
            onChange={event =>
                HandlerInputChange(event.target.value)}
            disabled={disabled}
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

const Transaction = ({ closeModal, RefactorMode, initialState, MainButtonHandler }) => {
    const [state, setState] = useState(initialState)
    const initialProductState = {
        Товары_id: '',
        КоличествоТовара: '',
        Штука_Стоимость: 0
    }
    const [productState, setProductState] = useState(initialProductState)
    const [error, setError] = useState(false)
    const getTransSumm = () => {
        const prods = state.Товары.Товары.map(p => {
            const price = state.Товары.selectionList
                .find(sl => sl.value === p.Товары_id).Штука_Стоимость
            p.Штука_Стоимость = price
            return p
        })
        return prods.reduce((acc, p) => acc + p.Штука_Стоимость * p.КоличествоТовара, 0)
    }

    return (
        <Modal open={true}>
            <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
                <Box width='70%' p={3} bgcolor='white' borderRadius={4}>
                    <CloseModalButton handleClose={closeModal} />
                    <Box display='flex' flexWrap='wrap' justifyContent='space-around' alignItems='stretch' mb={3}>
                        <Box width='50%' minWidth={320}>
                            <Card variant='outlined' style={{ height: '100%' }}>
                                <Box p={3}>
                                    <Typography>Основное</Typography>
                                    <Box mb={2}><Divider /></Box>
                                    <SelectField
                                        label='Клиент'
                                        selectionList={state.Сделка.Клиент.selectionList}
                                        disabled={!!state.Доставка.Доставлено}
                                        value={state.Сделка.Клиент.value}
                                        HandlerInputChange={value => setState({
                                            ...state,
                                            Сделка: {
                                                ...state.Сделка,
                                                Клиент: { ...state.Сделка.Клиент, value }
                                            }
                                        })}
                                    />
                                    <SelectField
                                        label='Продавец'
                                        selectionList={state.Сделка.Продавец.selectionList}
                                        disabled={!!state.Доставка.Доставлено}
                                        value={state.Сделка.Продавец.value}
                                        HandlerInputChange={value => setState({
                                            ...state,
                                            Сделка: {
                                                ...state.Сделка,
                                                Продавец: { ...state.Сделка.Продавец, value }
                                            }
                                        })}
                                    />
                                    <Typography>Стоимость сделки: {getTransSumm()}</Typography>
                                </Box>
                            </Card>
                        </Box>
                        <Box width='50%' minWidth={320}>
                            <Card variant='outlined' style={{ height: '100%' }}>
                                <Box p={3}>
                                    <Typography>Доставка</Typography>
                                    <Box mb={2}><Divider /></Box>
                                    <Box mb={1}>
                                        <TextField
                                            label='Дата'
                                            InputLabelProps={{ shrink: true }}
                                            variant='outlined'
                                            fullWidth
                                            disabled={!!state.Доставка.Доставлено}
                                            value={state.Доставка.Дата}
                                            onChange={e => setState({
                                                ...state,
                                                Доставка: {
                                                    ...state.Доставка,
                                                    Дата: e.target.value
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
                                            disabled={!!state.Доставка.Доставлено}
                                            value={state.Доставка.Адрес}
                                            onChange={e => setState({
                                                ...state,
                                                Доставка: {
                                                    ...state.Доставка,
                                                    Адрес: e.target.value
                                                }
                                            })}
                                        />
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={!!state.Доставка.Доставлено}
                                                onChange={_e => setState({
                                                    ...state,
                                                    Доставка: {
                                                        ...state.Доставка,
                                                        Доставлено: Number(!state.Доставка.Доставлено)
                                                    }
                                                })}
                                                color='primary'
                                            />
                                        }
                                        label='Доставлено'
                                    />
                                    <SelectField
                                        label='Курьер'
                                        selectionList={state.Доставка.Курьер.selectionList}
                                        disabled={!!state.Доставка.Доставлено}
                                        value={state.Доставка.Курьер.value}
                                        HandlerInputChange={value => setState({
                                            ...state,
                                            Доставка: {
                                                ...state.Доставка,
                                                Курьер: { ...state.Доставка.Курьер, value }
                                            }
                                        })}
                                    />
                                </Box>
                            </Card>
                        </Box>
                        {RefactorMode && (
                            <Box width='50%' minWidth={320}>
                                <Card variant='outlined' style={{ height: '100%' }}>
                                    <Box p={3} display='flex' flexDirection='column'>
                                        <Typography>Чек</Typography>
                                        <Divider />
                                        <Box mt={2}>
                                            <Typography>№{state.Чек.id}</Typography>
                                            <Typography>Сумма: {state.Чек.Сумма}</Typography>
                                            <Typography>Дата: {state.Чек.Дата}</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        )}
                        <Box width={RefactorMode ? '50%' : '100%'} minWidth={320}>
                            <Card variant='outlined' style={{ height: '100%' }}>
                                <Box p={3}>
                                    <Typography>Товары</Typography>
                                    <Box mb={2}><Divider /></Box>
                                    <Box height={100} overflow='auto'>
                                        {state.Товары.Товары.map(p => (
                                            <Box
                                                display='flex'
                                                justifyContent='space-between'
                                                alignItems='center'
                                                key={_.uniqueId()}
                                            >
                                                <Box width='80%'>
                                                    <Typography>
                                                        {p.Товары_id} | {p.display} | {p.КоличествоТовара}шт.
                                                    </Typography>
                                                </Box>
                                                <Button disabled={!!state.Доставка.Доставлено} onClick={() => {
                                                    setState({
                                                        ...state,
                                                        Товары: {
                                                            ...state.Товары,
                                                            Товары: [...state.Товары.Товары.filter(тов => тов.Товары_id !== p.Товары_id)]
                                                        }
                                                    })
                                                }}>
                                                    &times;
                                                </Button>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box>
                                        <Box display='flex' alignContent='center'>
                                            <SelectField
                                                label='Товар'
                                                selectionList={state.Товары.selectionList}
                                                disabled={!!state.Доставка.Доставлено}
                                                value={productState.Товары_id}
                                                HandlerInputChange={value => setProductState({
                                                    ...productState, Товары_id: Number(value)
                                                })}
                                            />
                                            <TextField
                                                label='Количество товара'
                                                variant='outlined'
                                                fullWidth
                                                disabled={!!state.Доставка.Доставлено}
                                                value={productState.КоличествоТовара}
                                                onChange={e => setProductState({
                                                    ...productState,
                                                    КоличествоТовара: e.target.value
                                                })}
                                                type='number'
                                            />
                                        </Box>
                                        <Button fullWidth size='small' color='primary' variant='outlined' onClick={() => {
                                            const containsID = state.Товары.Товары.map(p => p.Товары_id)
                                            const HaveThisProduct = containsID.includes(productState.Товары_id)
                                            const prodState = _.cloneDeep(productState)

                                            setProductState(initialProductState)
                                            if (HaveThisProduct) return
                                            setState({
                                                ...state,
                                                Сделка: {
                                                    ...state.Сделка,
                                                },
                                                Товары: {
                                                    ...state.Товары,
                                                    Товары: [
                                                        ...state.Товары.Товары,
                                                        {
                                                            ...prodState,
                                                            display: state.Товары.selectionList.find(p => p.value === prodState.Товары_id).display,
                                                        }
                                                    ]
                                                }
                                            })
                                        }}>+</Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Button
                            color='primary'
                            variant='contained'
                            disableElevation
                            onClick={() => {
                                const haveClient = !!state.Сделка.Клиент.value
                                const haveSeller = !!state.Сделка.Продавец.value
                                const haveDeliveryDate = !!state.Доставка.Дата
                                const haveDeliveryAddress = !!state.Доставка.Адрес
                                const haveDeliveryCourier = !!state.Доставка.Курьер.value
                                const haveProducts = !!state.Товары.Товары.length
                                const haveProblem = !haveClient || !haveSeller || !haveDeliveryDate
                                    || !haveDeliveryAddress || !haveDeliveryCourier || !haveProducts
                                if (haveProblem) {
                                    setError(true)
                                } else {
                                    MainButtonHandler(state)
                                    closeModal()
                                }
                            }}
                        >
                            {RefactorMode ? 'Обновить' : 'Создать'}
                        </Button>
                    </Box>
                    {error && (
                        <Typography color='secondary'>
                            Заполните все данные
                        </Typography>
                    )}
                </Box>
            </Box >
        </Modal>
    )
}

export default Transaction