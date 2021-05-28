import React from 'react'
import {connect} from 'react-redux'
import {Box} from '@material-ui/core'

class ProductCategories extends React.Component {

    state = {
        rows: [],
        columns: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <Box>

            </Box>
        )
    }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories)