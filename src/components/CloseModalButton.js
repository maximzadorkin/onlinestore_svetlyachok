import {Box, Button} from '@material-ui/core'
import React from 'react'

const CloseModalButton = ({handleClose}) => (
    <Box display='flex' justifyContent='flex-end' mb={2}>
        <Button
            size='small'
            variant='outlined'
            style={{
                color: 'orangered',
                borderColor: 'orangered'
            }}
            onClick={handleClose}
        >
            X
        </Button>
    </Box>
)

export default CloseModalButton