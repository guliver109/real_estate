import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';



import Navbar from '../../components/Navbar';
import SimpleModalWrapped from '../../components/SimpleModal';
import axios from 'axios';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});


class ListingPage extends React.Component {
    state = {
        listings: [],
    };

    // simpleModalRef = ({handleShow}) => {
    //     this.showModal = handleShow;
    // }

    // onViewClick = () => {
    // console.log("hello")
    //     this.showModal();
    // }
 
    handleRemoveClick = (index) => {
        console.log("hello from delete button")
        // window.location.reload();
        console.log(index);
        var {_id} = this.state.listings[index];
        axios.post(`/listings/${_id}` ).then(res => {
            // console.log(res, 'res from delete')
            this.setState({listings: res.data});
            console.log(res.data, "from axios delete");
        }).catch(err => {
            if (err) throw err;
        })
    }

    componentWillMount() {
        axios.get('/listings').then(res => {
            const listings = res.data;
            this.setState({ listings }, () => {
                console.log(this.state);
            })
        }).catch(err => {
            if (err) throw err;
        })
    }

    // componentWillMount() {
    //     this.handleRemoveClick();
    // }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <SimpleModalWrapped ref={this.simpleModalRef}></SimpleModalWrapped>
                <Navbar {...this.props} />
                    Listing Page
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        {this.state.listings.map((listings, index) => {
                            return <Grid item key={index} sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={listings.picture}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Price: {listings.price}
                                        </Typography>
                                        <Typography>
                                            {/* {listings.teaser} */}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={this.onViewClick} size="small" color="primary">
                                        {/* {console.log(this.onViewClick, "hello from button")} */}
                                        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
                                            View
                                        </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={() => this.handleRemoveClick(index)} size="small" color="primary">
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })}
                    </Grid>
                </div>
            </div>
        )
    }
}
ListingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListingPage);