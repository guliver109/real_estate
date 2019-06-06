import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import RaisedButton from '@material-ui/core/RaisedButton';
import Fab from '@material-ui/core/Fab';

import axios from 'axios';
import styles from '../CreateListingForm/CreateListingFormStyle';
// import PictureUpload from '../PictureUpload';

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
    initialState = {
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        first_name: '',
        last_name: '',
        officePhone: '',
        cellPhone: '',
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
        file: null
    };
    state = this.initialState;

    handleChange = name => event => {
        if (event.target.files) {
            this.setState({
                [name]: event.target.value,
                file: event.target.files[0]
            }, () => {
                console.log(this.state);
            });
        } else {
            this.setState({
                [name]: event.target.value,
            }, () => {
                console.log(this.state)
            })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (let i = 0; i < document.getElementById('image-file').files.length; i++) {
            formData.append('image-file', document.getElementById('image-file').files[i]);
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post('/listings', formData, config).then(res => {
            console.log(res);
            this.props.history.push('/listings');
        }).catch(err => {
            if (err) throw err;
        })
    }
    handleLeaveFrom = (e) => {
        e.preventDefault();
        this.props.history.push('/listings');
    }

    handleResetForm = (e) => {
        e.preventDefault();
        this.setState(this.initialState);
    }

    render() {
        const { classes } = this.props;

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
                        <div className={classes.root}>
                            <Grid container spacing={0}>
                                <Grid item xs={7}>
                                    <Typography component="h1" variant="h5" align="left">
                                        Listing Upload Form
                                </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button color="secondary" onClick={this.handleResetForm} className={classes.button}>
                                        Clear Form
                                    </Button>
                                </Grid>
                                <Grid item xs={2} align="right">
                                        <Fab aria-label="Delete" onClick={this.handleLeaveFrom} size="medium" className={classes.fab}>
                                            <DeleteIcon />
                                        </Fab>
                                </Grid>
                            </Grid>
                        </div>
                        <br></br>
                        <br></br>
                        <Typography variant="h6" gutterTop>
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
                                    value={this.state.address}
                                    onChange={this.handleChange('address')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address2"
                                    name="address2"
                                    label="Address line 2"
                                    fullWidth
                                    autoComplete="address-line2"
                                    value={this.state.address}
                                    onChange={this.handleChange('address')}
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
                                    value={this.state.city}
                                    onChange={this.handleChange('city')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="state"
                                    name="state"
                                    label="State/Province/Region"
                                    fullWidth
                                    value={this.state.state}
                                    onChange={this.handleChange('state')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    value={this.state.zip_code}
                                    onChange={this.handleChange('zip_code')}
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
                                    value={this.state.country}
                                    onChange={this.handleChange('country')}
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
                                    value={this.state.first_name}
                                    onChange={this.handleChange('first_name')}
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
                                    value={this.state.last_name}
                                    onChange={this.handleChange('last_name')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <InputLabel htmlFor="formatted-text-mask-input">
                                    Cell Phone
                                </InputLabel>
                                <Input
                                    value={cellPhone}
                                    onChange={this.handleChange('cellphone')}
                                    id="formatted-text-mask-input"
                                    inputComponent={CellPhoneCustom}
                                    fullWidth
                                /> */}
                                <TextField
                                    required
                                    id="CellPhone"
                                    name="CellPhone"
                                    label="Cell Phone"
                                    fullWidth
                                    autoComplete="lname"
                                    value={this.state.cellPhone}
                                    onChange={this.handleChange('cellPhone')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <InputLabel htmlFor="formatted-text-mask-input">
                                    Office Phone
                                    </InputLabel>
                                <Input
                                    value={officePhone}
                                    onChange={this.handleChange('officephone')}
                                    id="formatted-text-mask-input"
                                    inputComponent={OfficePhoneCustom}
                                    fullWidth
                                /> */}
                                <TextField
                                    required
                                    id="OfficePhone"
                                    name="OfficePhone"
                                    label="Office Phone"
                                    fullWidth
                                    autoComplete="lname"
                                    value={this.state.officePhone}
                                    onChange={this.handleChange('officePhone')}
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
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="About Me"
                                    multiline
                                    rowsMax="4"
                                    fullWidth
                                    value={this.state.about_me}
                                    onChange={this.handleChange('about_me')}
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
                                    value={this.state.number_bedrooms}
                                    onChange={this.handleChange('number_bedrooms')}
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
                                    value={this.state.number_bathrooms}
                                    onChange={this.handleChange('number_bathrooms')}
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
                                    fullWidth
                                    value={this.state.short_description}
                                    onChange={this.handleChange('short_description')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Full Property Description"
                                    multiline
                                    rowsMax="4"
                                    value={this.state.full_description}
                                    onChange={this.handleChange('full_description')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Property Price"
                                    value={this.state.price}
                                    onChange={this.handleChange('price')}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        {/* <PictureUpload></PictureUpload> */}
                        <Typography variant="h6" gutterBottom>
                            Upload Property Pictures
                        </Typography>
                        {/* <PictureUpload></PictureUpload> */}
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="image-file">
                                <Button>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="image-file"
                                        multiple
                                        type="file"
                                        name="image-file"
                                    // onChange={this.onChange}
                                    />

                                </Button>
                                {/* <label htmlFor="text-button-file">
                                <Button component="span" className={classes.button} onClick={this.handlePictureFile}>
                                Upload
                                </Button>
                            </label>
                            {/* <h1>File Upload</h1>
                            // // <input type="file" name="myImage" onChange={this.onChange} />
                            <button type="submit">Upload</button> */}

                                <Button variant="contained" color="secondary" className={classes.button}>
                                    Delete
                                <DeleteIcon className={classes.rightIcon} />
                                </Button>
                            </label>
                        </form>
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