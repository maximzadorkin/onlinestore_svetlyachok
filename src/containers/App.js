import React from 'react'
import { useState } from 'react'
import Menu from '../components/Menu'
import GetMenuItems from '../utils/GetMenuItems'
import { Typography, Box } from '@material-ui/core'

const App = () => {
    const [SelectedMenu, SetSelectedMenu] = useState(null)
    let MenuLinks = GetMenuItems()

    return (
        <div style={{ width: '100%' }}>
            <Menu
                MenuItems={MenuLinks}
                MenuTitle='Светлячок'
                SetSelectedMenu={SetSelectedMenu}
            />
            {SelectedMenu && (
                <Box p={3}>
                    <Typography variant='h6'>{SelectedMenu.title}</Typography>
                    {SelectedMenu.component}
                </Box>
            )}
        </div>
    )
}

export default App
