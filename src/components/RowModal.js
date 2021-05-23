import React from 'react'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField
} from '@material-ui/core'

// array of inputs,
// if need to choise, then {} in [] in input[] -> [{}, {}, [{}, {}], {}]
// for every input:
//  -- label
//  -- value, if add modal then null
//  -- required
//  -- readOnly

const RowModal = ({data, open, handleClose, isRefactor}) => {

    const input = (label, value, onChanged, required = false) => (
        <TextField
            variant="outlined"
            label={label}
            value={value}
            required={required}
            onChanged={onChanged}
        />
    )

    const select = (label, list, handleChange, required = false) => (
        <FormControl>
            <InputLabel shrink>{label}</InputLabel>
            <Select
                value={null}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value=""></MenuItem>
                {list.map(item => <MenuItem value={item.value}>{item.value}</MenuItem>)}
            </Select>
        </FormControl>
    )


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <div style={{
                    width: 320,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    padding: '20px 10px'
                }}>
                    <Box display='flex' justifyContent='flex-end'>
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
                    {data.map(item =>
                        (item) instanceof Array
                            ? select(

                            )
                            : input(

                            )
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default RowModal