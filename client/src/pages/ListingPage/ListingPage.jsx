import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';


import Navbar from '../../components/Navbar';
import SimpleModal from '../../components/SimpleModal';
import axios from 'axios';
// import { CardHeader, Avatar } from '@material-ui/core';
import BackgroundImage from '../images/alex.jpg';

const styles = theme => ({
    pageWrapper: {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
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
        maxWidth: 400
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
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
        expanded: false
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    handleRemoveClick = (index) => {
        console.log("hello from delete button")
        // window.location.reload();
        console.log(index);
        var { _id } = this.state.listings[index];
        axios.post(`/listings/${_id}`).then(res => {
            // console.log(res, 'res from delete')
            this.setState({ listings: res.data });
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

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.pageWrapper}>
                <Navbar {...this.props} />
                Listing Page
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        {this.state.listings.map((listing, index) => {
                            return <Grid item key={index} sm={6} md={5} lg={4}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                                L
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="Share">
                                                <ShareIcon />
                                            </IconButton>
                                        }
                                        title="Listing Created At:"
                                        subheader={listing.createdAt}
                                    />
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
                                        // {listing.picture}
                                        title="Listing title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Price: {listing.price}
                                        </Typography>
                                        <Typography style={{ wordWrap: 'break-word' }} variant="body2">
                                            {listing.short_description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton aria-label="Add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <SimpleModal listing={listing} ref={this.simpleModalRef}></SimpleModal>
                                        <Button size="small" color="primary">Edit </Button>
                                        <Button onClick={() => this.handleRemoveClick(index)} size="small" color="primary">
                                            Delete
                                        </Button>
                                        <IconButton
                                            className={classNames(classes.expand, {
                                                [classes.expandOpen]: this.state.expanded,
                                            })}
                                            onClick={this.handleExpandClick}
                                            aria-expanded={this.state.expanded}
                                            aria-label="Show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Method:</Typography>
                                            <Typography paragraph>

                                            </Typography>
                                            <Typography paragraph>

                                            </Typography>
                                            <Typography paragraph>

                                            </Typography>
                                            <Typography>

                                            </Typography>
                                        </CardContent>
                                    </Collapse>
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