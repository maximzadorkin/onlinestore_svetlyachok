import {Button} from '@material-ui/core'
import React from 'react'

const ControlPanel = ({HandleAddRow, HandleRefactorRow, HandlerDeleteRow, getRows}) => {
    return (
        <div style={{margin: '15px 0 15px 15px'}}>
            <Button
                variant="outlined"
                style={{
                    margin: '0 15px 0 0',
                    color: 'green',
                    borderColor: 'green'
                }}
                onClick={HandleAddRow}
            >
                Добавить
            </Button>
            <Button
                variant="outlined"
                style={{
                    margin: '0 15px 0 0',
                    color: 'orange',
                    borderColor: 'orange'
                }}
                onClick={HandleRefactorRow}
            >
                Редактировать
            </Button>
            <Button
                variant="outlined"
                style={{
                    margin: '0 15px 0 0',
                    color: 'orangered',
                    borderColor: 'orangered'
                }}
                onClick={HandlerDeleteRow}
            >
                Удалить
            </Button>
            <Button
                variant="outlined"
                onClick={getRows}
            >
                Обновить
            </Button>
        </div>
    )
}

export default ControlPanel