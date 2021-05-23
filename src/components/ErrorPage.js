import React from 'react'
import {Box, Typography} from '@material-ui/core'

const ErrorPage = () => (
    <Box
        top={0}
        right={0}
        bottom={0}
        left={0}
        display='flex'
        justifyContent='center'
        alignItems='center'
    >
        <Box m={5}>
            <Typography component='span' variant='body1'>
                К сожалению, данная страница не найдена
            </Typography>
        </Box>
    </Box>
)

export default ErrorPage