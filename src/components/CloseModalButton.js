import { Box, Button } from '@material-ui/core'
import React from 'react'

const CloseModalButton = ({ handleClose }) => (
    <Box width='100%' display='flex' justifyContent='flex-start' mb={3}>
        <Button
            size='small'
            variant='contained'
            style={{ fontSize: '40px' }}
            color='secondary'
            disableElevation
            onClick={handleClose}
        >
            &times;
        </Button>
    </Box>
)

export default CloseModalButton