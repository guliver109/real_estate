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
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
// import styles from '../form-styles/styles';
// import Navbar from "../../components/Navbar";


const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?realestates)',
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

class SignIn extends Component {
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
    let { userName, password } = this.state,
      payload = { userName, password };
    axios.post("/signup", payload).then(res => {
      console.log(res)
      this.props.history.push('/dashboard');
    }).catch(err => {
      if (err) throw err;
    })
  }

  formValid = () => {
    let { userName, password, passwordConfirm } = this.state;
    return (userName && password && passwordConfirm === password);
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
                label="User Name"
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Password Confirm"
                type="password"
                id="passwordConfirm"
                autoComplete="current-passwordConfirm"
                onChange={(e) => this.changeState(e, 'passwordConfirm')}
                value={this.state.passwordConfirm}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
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
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              {/* <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="userName">User Name</InputLabel>
                <Input onChange={(e) => this.changeState(e, 'userName')} value={this.state.userName} id="userName" name="userName" autoComplete="userName" autoFocus />
              </FormControl> */}
              {/* <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input onChange={(e) => this.changeState(e, 'password')} value={this.state.password} name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl> */}
              {/* <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="passwordConfirm">Password Confirm</InputLabel>
                <Input onChange={(e) => this.changeState(e, 'passwordConfirm')} 
                value={this.state.passwordConfirm} 
                name="passwordConfirm" type="password" id="passwordConfirm" 
                autoComplete="current-passwordConfirm" />
              </FormControl> */}
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);