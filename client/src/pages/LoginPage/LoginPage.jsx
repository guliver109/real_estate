import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import styles from '../form-styles/styles';
import Navbar from '../../components/Navbar';

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
      <main className={classes.main}>
        <Navbar {...this.props} />
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
        </Typography>
          <div className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="userName">User Name</InputLabel>
              <Input onChange={(e) => this.changeState(e, 'userName')} value={this.state.userName} id="userName" name="userName" autoComplete="userName" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={(e) => this.changeState(e, 'password')} value={this.state.password} name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
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
          </div>
        </Paper>
      </main>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);