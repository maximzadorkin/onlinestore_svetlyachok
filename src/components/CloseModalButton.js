import {Box, Button} from '@material-ui/core'
import React from 'react'

const CloseModalButton = ({handleClose}) => (
    <Box display='flex' justifyContent='flex-end' mb={2}>
        <Button
            size='small'
            variant='contained'
            style={{
                color: 'white',
                backgroundColor: 'orangered',
                borderColor: 'orangered',
                fontSize: '40px'
            }}
            disableElevation
            onClick={handleClose}
        >
            &times;
        </Button>
    </Box>
)

export default CloseModalButton