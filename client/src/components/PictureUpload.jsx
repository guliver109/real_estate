import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const styles = theme => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: theme.spacing.unit,
    },
});

class PictureUpload extends Component {
    state = {
        file: null
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            file: event.target.files[0]
        }, () => {
            console.log(this.state)
        });
    };

    handlePictureSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // let file = document.getElementById('image-file').files[0];
        // console.log(file)

        formData.append('image', this.state.file);
        // console.log(formData)
        // console.log(imagefile.files)
        const config = {
            headers: {
                'content-type': "multipart/form-data"
            }
        }

        // this.setState({ picture: file }, () => {
        console.log(this.state)
        axios.post('/upload', formData, config).then(res => {
            console.log(res);
            alert('This file is uploaded successfully')
            // this.props.setPicture(res.data)
        }).catch(err => {
            if (err) throw err;
        })
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
        // });
    }

    // handlePictureSubmit = () => {

    // }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    Upload Property Pictures
                    </Typography>
                <form>
                    <label htmlFor="image-file">
                        <Button>
                            <input
                                acction="/upload/photo"
                                accept="image/*"
                                className={classes.input}
                                id="image-file"
                                multiple
                                type="submit"
                                name="image-file"
                            />

                        </Button>
                        <label htmlFor="text-button-file">
                            <Button component="span" className={classes.button} onClick={this.handlePictureFile}>
                                Upload
                                </Button>
                        </label>
                        {/* <form action="/upload/photo" enctype="multipart/form-data" method="POST">
                            <input type="file" name="myImage" accept="image/*" />
                            <input type="submit" value="Upload Photo" />
                        </form> */}

                        <Button variant="contained" color="secondary" className={classes.button}>
                            Delete Picture
                            <DeleteIcon className={classes.rightIcon} />
                        </Button>
                    </label>
                </form>
            </div>
        );
    }
}


PictureUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PictureUpload);