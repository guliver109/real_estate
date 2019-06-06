import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar'; 
import CreateListingForm from '../../components/CreateListingForm/CreateListingForm';
import backgroundImage from '../images/josh.jpg'


const styles = theme => ({
    pageWrapper: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingBottom: theme.spacing.unit * 2,
    }
})

class CreateListingPage extends Component {
    state = {};

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        const { classes } = this.props;
        
        return(
            <div className = {classes.pageWrapper}>
                <Navbar {...this.props}/>
                <CreateListingForm {...this.props}/>
            </div>
        )
    }
}
CreateListingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateListingPage);