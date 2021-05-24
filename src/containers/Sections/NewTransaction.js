import React, {useState} from 'react'
import {
    Box, Button,
    Container,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from '@material-ui/core'
import _ from 'lodash'
import {connect} from 'react-redux'
import DB from '../../utils/Database/NewTransaction'

const NewTransaction = ({salers, clients, products, newTransaction}) => {
    const [saler, setSaler] = useState('')
    const [client, setClients] = useState('')
    const [delivery, setDelivery] = useState(false)
    const [address, setAddress] = useState('')
    const [goods, setGoods]= useState([])


    return (
        <Box mt={2}>
            <Container>
                <FormControl variant="outlined" fullWidth style={{marginBottom: '1rem'}}>
                    <InputLabel>Продавец</InputLabel>
                    <Select value={saler} onChange={event => setSaler(event.target.value)}>
                        {salers.map(item => (
                            <MenuItem value={item.id} key={_.uniqueId()}>
                                {item.Фамилия}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth style={{marginBottom: '1rem'}}>
                    <InputLabel>Клиент</InputLabel>
                    <Select value={client} onChange={event => setClients(event.target.value)}>
                        {clients.map(item => (
                            <MenuItem value={item.id} key={_.uniqueId()}>
                                {item.Фамилия}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box>
                    <Box display='flex' alignItems={'center'}>
                        <Typography variant='body1' component='h3'>Нужна доставка?</Typography>
                        <Switch
                            checked={delivery}
                            onChange={event => setDelivery(event.target.checked)}
                            color='primary'
                        />
                    </Box>
                    <TextField
                        helperText={'Введите адрес для доставки'}
                        disabled={!delivery}
                        onChange={event => setAddress(event.target.value)}
                        value={address}
                        variant='outlined'
                        fullWidth
                    />
                </Box>
                <Box display='flex' >
                    <FormControl variant="outlined" fullWidth style={{marginBottom: '1rem'}}>
                        <InputLabel>Продукт</InputLabel>
                        <Select value={saler} onChange={event => setSaler(event.target.value)}>
                            {products.map(item => (
                                <MenuItem value={item.id} key={_.uniqueId()}>
                                    {item.Наименование}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField variant='outlined' type='number' fullWidth/>
                    <Button size={'small'}>+</Button>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Button variant='outlined'
                            color='primary'
                            size={'small'}
                            onClick={() => newTransaction({
                                saler, client, delivery, address, goods
                            })}
                    >
                        Оформить заказ
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

const mapStateToProps = state => ({
    salers: state.salers || [],
    clients: state.clients || [],
    products: state.products || []
})
const mapDispatchToProps = dispatch => ({
    newTransaction: (data) => DB.newTransaction(data)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTransaction)