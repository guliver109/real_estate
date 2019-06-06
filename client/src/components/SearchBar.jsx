import React, {Component} from 'react';
// import { styles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = theme => ({
    root: {
       
            marginLeft  : 'auto',
            marginRight : 'auto',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
});

class InputBox extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <InputBase className={classes.input} placeholder="Address, City, Zip" />
                <IconButton className={classes.iconButton} aria-label="Search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} />
                <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        );
    }
}

InputBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputBox);