import {Button} from '@material-ui/core'
import React from 'react'

export const Roles = () => ({
    Add: true,
    Refactor: true,
    Delete: true,
    Update: true
})

const ControlPanel = ({HandleAdd, HandleRefactor, HandlerDelete, HandlerUpdate, Role}) => {
    return (
        <div style={{margin: '15px 0 15px 0'}}>
            {Role.Add && (
                <Button
                    variant="outlined"
                    style={{
                        margin: '0 15px 0 0',
                        color: 'green',
                        borderColor: 'green'
                    }}
                    onClick={HandleAdd}
                >
                    Добавить
                </Button>
            )}
            {Role.Refactor && (
                <Button
                    variant="outlined"
                    style={{
                        margin: '0 15px 0 0',
                        color: 'orange',
                        borderColor: 'orange'
                    }}
                    onClick={HandleRefactor}
                >
                    Редактировать
                </Button>
            )}
            {Role.Delete && (
                <Button
                    variant="outlined"
                    style={{
                        margin: '0 15px 0 0',
                        color: 'orangered',
                        borderColor: 'orangered'
                    }}
                    onClick={HandlerDelete}
                >
                    Удалить
                </Button>
            )}
            {Role.Update && (
                <Button
                    variant="outlined"
                    onClick={HandlerUpdate}
                >
                    Обновить
                </Button>
            )}
        </div>
    )
}

export default ControlPanel