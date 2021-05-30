import React from 'react'
import { useState } from 'react'
import _ from 'lodash'
import Menu from '../components/Menu'
import GetMenuItems from '../utils/GetMenuItems'
import { Typography, Box, Modal, TextField, Button } from '@material-ui/core'
import ErrorPage from '../components/ErrorPage'
import DB from '../utils/Database/Auth'

const App = () => {
    const [SelectedMenu, SetSelectedMenu] = useState(null)
    const [Login, setLogin] = useState(false)
    const [MenuLinks, setMenuLinks] = useState([])//GetMenuItems()
    const [LoginData, SetLogInData] = useState({
        login: '',
        password: '',
        error: false
    })
    const loginClick = () => {
        if (!LoginData.login) {
            SetLogInData({ ...LoginData, error: true })
        } else {
            DB.auth(LoginData, (success, positions) => {
                setMenuLinks(GetMenuItems(positions))
                setLogin(success)
            })
            SetLogInData({ ...LoginData, error: false })
        }
    }
    const exit = () => {
        SetSelectedMenu(false)
        setLogin(false)
        SetLogInData({
            login: '',
            password: '',
            error: false
        })
    }

    return (
        <div style={{ width: '100%' }}>
            {Login ? (
                <Menu
                    PositionsList={MenuLinks || []}
                    MenuTitle='Светлячок'
                    SetSelectedMenu={SetSelectedMenu}
                    leftButton={{ handler: exit, label: 'Выйти' }}
                />
            ) : (
                <Modal open={true}>
                    <Box position='absolute'
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Box bgcolor='white'
                            height={250}
                            width={300}
                            p={3}
                            borderRadius={4}
                            display='flex'
                            justifyContent='space-around'
                            alignContent='center'
                            flexDirection='column'
                        >
                            <Box alignSelf='center'>
                                <Typography variant='h6' component='span'>
                                    Войти в систему
                                </Typography>
                            </Box>
                            <TextField
                                label='Login'
                                required={true}
                                variant='outlined'
                                onChange={e => SetLogInData({
                                    ...LoginData, login: e.target.value
                                })}
                            />
                            <TextField
                                label='Password'
                                required={false}
                                variant='outlined'
                                onChange={e => SetLogInData({
                                    ...LoginData, password: e.target.value
                                })}
                            />
                            <Button variant='outlined' color='primary' onClick={loginClick}>
                                Войти
                            </Button>
                            {LoginData.error && (
                                <Typography color='secondary'>
                                    Введите логин и пароль
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Modal>
            )}
            {SelectedMenu ? (
                <Box p={3}>
                    <Typography variant='h6'>{SelectedMenu.title}</Typography>
                    {SelectedMenu.component}
                </Box>
            ) : <ErrorPage />}
        </div>
    )
}

export default App
