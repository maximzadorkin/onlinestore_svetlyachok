import React from 'react'
import { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Modal, Card,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import _ from 'lodash'

const GetMenuItems = (MenuItems, onClose, SetSelectedMenu) => {
    const HandleClose = (el) => {
        SetSelectedMenu(el)
        onClose()
    }

    return MenuItems.map((item) => (
        <Box m={2} key={_.uniqueId()}>
            <Card variant='outlined'>
                <Box p={2}>
                    <Typography variant='h1' variant='h6' color='primary'>
                        {item.title}
                    </Typography>
                    <Box display='flex' flexDirection='column'>
                        {item.elements.map((el) => (
                            <Box m={1} key={_.uniqueId()}>
                                <Button onClick={() => HandleClose(el)} disableRipple>
                                    {el.title}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Card>
        </Box>
    ))
}

const MenuList = ({ MenuItems, MenuTitle, SetSelectedMenu }) => {
    const [ViewMenu, SetViewMenu] = useState(false)
    const ChangeViewMenuMode = () => {
        SetViewMenu(!ViewMenu)
    }

    return (
        <Box>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        onClick={ChangeViewMenuMode}
                        edge='start'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>{MenuTitle}</Typography>
                </Toolbar>
            </AppBar>
            {ViewMenu && (
                <Box position='absolute' top={0} bottom={0}>
                    <Modal open={ViewMenu} onClose={ChangeViewMenuMode}>
                        <Box height='100%'>
                            <Box
                                width='100%'
                                height='100%'
                                bgcolor='white'
                                p={5}
                                overflow='auto'
                            >
                                <Box display='flex' flexWrap='wrap'>
                                    {GetMenuItems(
                                        MenuItems,
                                        ChangeViewMenuMode,
                                        SetSelectedMenu
                                    )}
                                </Box>
                            </Box>
                            <Box
                                position='absolute'
                                top={0}
                                right={0}
                            >
                                <Button onClick={ChangeViewMenuMode}>
                                    &times;
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            )}
        </Box>
    )
}

export default MenuList
