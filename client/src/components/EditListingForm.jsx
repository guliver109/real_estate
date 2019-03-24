import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';
// import Button from '../Button';
import styles from '../CreateListingForm/CreateListingFormStyle'


function CellPhoneCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

CellPhoneCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function OfficePhoneCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

OfficePhoneCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="$ "
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

class CreateListingForm extends React.Component {
    state = {
        address: '',
        city: '',
        state: '',
        zip_code: '',
        Country: '',
        first_name: '',
        last_name: '',
        officePhone: '(  )    -    ',
        cellPhone: '(  )    -    ',
        email: '',
        date_listed: '',
        about_me: '',
        number_bedrooms: '',
        number_bathrooms: '',
        short_description: '',
        full_description: '',
        price: '',
        picture: '',
        // numberformat: ' ',
        // street: '',
        // street_number: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        let payload = {};
        for (let key in this.state){
            if (this.state[key]){
                payload[key] = this.state[key];
            }
        }
        axios.post('/listings', this.state).then(res => {
            console.log(res);
        }).catch(err => {
            if (err) throw err;
        })
    }

    render() {
        const { classes } = this.props;
        const { cellPhone, officePhone, numberformat } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            New Listing Upload
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Listing Upload Form
                        </Typography>
                        <br></br>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Listing address
                        </Typography>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address1"
                                    name="address1"
                                    label="Address line 1"
                                    fullWidth
                                    autoComplete="address-line1"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address2"
                                    name="address2"
                                    label="Address line 2"
                                    fullWidth
                                    autoComplete="address-line2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    autoComplete="billing address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="country"
                                    name="country"
                                    label="Country"
                                    fullWidth
                                    autoComplete="billing country"
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Listings Holder Info
                        </Typography>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="fname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="formatted-text-mask-input">
                                    Cell Phone
                                </InputLabel>
                                <Input
                                    value={cellPhone}
                                    onChange={this.handleChange('cellphone')}
                                    id="formatted-text-mask-input"
                                    inputComponent={CellPhoneCustom}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="formatted-text-mask-input">
                                    Office Phone
                                    </InputLabel>
                                <Input
                                    value={officePhone}
                                    onChange={this.handleChange('officephone')}
                                    id="formatted-text-mask-input"
                                    inputComponent={OfficePhoneCustom}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="email-input"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required id="expDate"
                                    label="Date Listed"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="About Me"
                                    multiline
                                    rowsMax="4"
                                    value={this.state.multiline}
                                    onChange={this.handleChange('multiline')}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Property Info
                        </Typography>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="standard-number"
                                    label="Number of Bedrooms"
                                    value={this.state.bedrooms}
                                    onChange={this.handleChange('bedrooms')}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="standard-number"
                                    label="Number of Bathrooms"
                                    value={this.state.bathrooms}
                                    onChange={this.handleChange('bathrooms')}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Short Property Description/100 words max"
                                    multiline
                                    rowsMax="4"
                                    value={this.state.multiline}
                                    onChange={this.handleChange('multiline')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Full Property Description"
                                    multiline
                                    rowsMax="4"
                                    value={this.state.multiline}
                                    onChange={this.handleChange('multiline')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Property Price"
                                    value={numberformat}
                                    onChange={this.handleChange('numberformat')}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Upload Property Pictures
                        </Typography>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="default" className={classes.button}>
                                Upload
                                <CloudUploadIcon className={classes.rightIcon} />
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.button}>
                                Delete
                                <DeleteIcon className={classes.rightIcon} />
                            </Button>
                        </label>
                        <br></br>
                        <br></br>
                        <React.Fragment>
                            <Button 
                                    size="large"
                                    variant="contained"
                                    color="primary" 
                                    className={classes.button} 
                                    // callback={this.handleSubmit}
                                    // onClick={props.callback}
                                    onClick={this.handleSubmit}>
                                <SaveIcon 
                                    className={classNames(classes.leftIcon, classes.iconSmall)} 
                                />
                                Save
                            </Button>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            callback={this.handleSubmit}>
                            Submit
                            </Button> */}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment >
        );
    }
}

CreateListingForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateListingForm);