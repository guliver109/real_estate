import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


// function MadeWithLove() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Built with love by the '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Material-UI
//       </Link>
//       {' team.'}
//     </Typography>
//   );
// }

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?buidings,houses)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing.unit * 0.5,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    margin: theme.spacing.unit * 1 * 6,
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
});



class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  changeState = (e, key) => {
    this.setState({
      [key]: e.target.value
    }, () => {
      console.log(this.state)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('hello login page');

    axios.post("/", this.state).then(res => {
      console.log(res)
      if (res.statusText === 'OK') {
        console.log(res);
        this.props.checkForUserData(() => {
          this.props.history.push('/listings');
          console.log('hit')
        });
      }
    }).catch(err => {
      if (err) throw err;
    })
  }

  formValid = () => {
    let { userName, password } = this.state;
    return (userName && password);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Button href="/">
              Listing page
              </Button>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Email Address"
                name="userName"
                autoComplete="userName"
                autoFocus
                onChange={(e) => this.changeState(e, 'userName')}
                value={this.state.userName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => this.changeState(e, 'password')}
                value={this.state.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.formValid()}
                onClick={this.handleSubmit}
              >
                Sign in
          </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Box mt={5}>
                <MadeWithLove />
              </Box> */}
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const LoginPageWrapped = withStyles(styles)(LoginPage);
export default LoginPageWrapped;