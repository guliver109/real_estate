import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Link from '@material-ui/core/Link';
// import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import { spacing } from '@material-ui/system';
// import Container from '@material-ui/core/Container';
import CustomizedInputBase from '../../components/SearchBar';
import backgroundImage from '../images/rusticGreen1920.jpg';
import BackgroundImage from '../images/condominium1280.jpg';


const styles = theme => ({

    mainContainer: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
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
    toolbarMain: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
    },
    mainFeaturedPost: {
        // backgroundColor: theme.palette.grey[800],
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
        height: '480px'
    },
    mainFeaturedPostContent: {
        padding: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 20,
        // marginLeft: 'auto',
        // marginRight: 'auto'
        // [theme.breakpoints.up('md')]: {
        //     paddingRight: 0,
        // },
    },
    inputBox: {
        margin: '0 auto'
    },

    mainGrid: {
        marginTop: theme.spacing.unit * 3,
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
    button: {
        margin: theme.spacing.unit,
        backgroundColor: 'grey',
    },
    input: {
        display: 'none',
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
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        marginTop: theme.spacing.unit * 4,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 3,
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing.unit * 6,
            paddingBottom: theme.spacing.unit * 6
        },
    },
});

const sections = [
    'Technology',
    'Design',
    'Culture',
    'Opinion',
    'Style',
    'Travel',
];

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

function Album(props) {
    const { classes } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.mainContainer}>
                <div className={classes.layout}>
                    <Toolbar className={classes.toolbarMain}>
                        <Button size="small">Subscribe</Button>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            RealEstate Window
                    </Typography>
                        <Button href="/login">
                            Login
                        </Button>
                        <Button href="/signup">
                            Sign up
                        </Button>
                    </Toolbar>
                    <Toolbar variant="dense" className={classes.toolbarSecondary}>
                        {sections.map(section => (
                            <Typography color="inherit" noWrap key={section}>
                                {section}
                            </Typography>
                        ))}
                    </Toolbar>
                    <main>
                        {/* Hero unit */}
                        <Paper className={classes.mainFeaturedPost}>
                            <Grid container>
                                <div className={classes.mainFeaturedPostContent}>
                                    <Grid item xs={12}>
                                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                            Title of a longer featured blog post
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.searchBox}>
                                        <Typography variant="h5" color="inherit" paragraph>
                                            Multiple lines of text that form the lede, informing new readers quickly and
                                            efficiently about what&apos;s most interesting in this post&apos;s contents…
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomizedInputBase  />
                                    </Grid>
                                </div>
                            </Grid>
                        </Paper>
                        <div className={classNames(classes.layout, classes.cardGrid)}>
                            {/* End hero unit */}
                            <Grid container spacing={40}>
                                {cards.map(card => (
                                    <Grid item key={card} sm={6} md={4} lg={3}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Heading
                                            </Typography>
                                                <Typography>
                                                    This is a media card. You can use this section to describe the content.
                                            </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    View
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Edit
                                            </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </main>
                    {/* Footer */}
                    <footer maxWidth="md" componen="footer" className={classes.footer}>
                        <Grid container spacing={4} justify="space-evenly">
                            {footers.map(footer => (
                                <Grid item xs={6} sm={3} key={footer.title}>
                                    <Typography variant="h6" color="textLight" gutterBottom>
                                        {footer.title}
                                    </Typography>
                                    <ul>
                                        {footer.description.map(item => (
                                            <li key={item}>
                                                <Link href="#" variant="subtitle1" color="textSecondary">
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            ))}
                        </Grid>
                    </footer>
                    {/* End footer */}
                </div>
            </div>
        </React.Fragment>
    );
}

Album.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);
