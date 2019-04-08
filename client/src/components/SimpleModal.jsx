import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import ImagesGallery from './ImagesCarousel';
// import ListingPage from '../pages/ListingPage/ListingPage';
// import axios from 'axios';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    width: '70%',
    height: '70%'
  },
  root: {
    // width: '100%',
    marginBottom: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  root1: {
    // width: "100%",
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    // height: "100%",
    overflowX: 'auto',
  },
  // table: {
  //   minWidth: 700,
  // },
});


let id = 0;
function createData(name, beadrooms, bathrooms, squarefeet) {
  id += 1;
  return { id, name, beadrooms, bathrooms, squarefeet };
}

const rows = [
  createData('Bedrooms', 4),
  createData('Bathrooms', 3),
  createData('SquareFeet', 1500),
];

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


//   getListings = () => {
//     axios.get('/listings').then(res => {
//       console.log(res, "res from modal")
//       const listings = res.data;
//       console.log(listings)
//       this.setState({ listings }, () => {
//         console.log(this.state, "from sample modal state")
//       })
//     }).catch(err => {
//       if (err) throw err
//     }) 
// }

  componentDidMount() {
    console.log(this.props, "props didMount from samplemodal")
  }

  render() {
    const { classes, listing } = this.props;
    // const listings = this.props;
    return (
      <div>
        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
        {/* <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Button onClick={this.handleOpen} size="small" color="primary">View</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Button style={{ float: "right" }} onClick={this.handleClose} variant="contained" color="secondary" size="small">Close</Button>
            {/* <Grid container spacing={24}> */}
              {/* {this.state.listings.map((listings, index) => {
                return  */}
                <Grid container spacing={24}>
                  <Grid item xs={8}>
                    {/* <Paper className={classes.paper}>xs=12</Paper> */}
                    <ImagesGallery></ImagesGallery>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.root}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Description:</TableCell>
                            {/* <TableCell align="right">Description</TableCell> */}
                            <TableCell align="right">Number</TableCell>
                            {/* <TableCell align="right">Carbs (g)</TableCell>
                        <TableCell align="right">Protein (g)</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.beadrooms}</TableCell>
                              <TableCell align="right">{row.Bathrooms}</TableCell>
                              {/* {/* <TableCell align="right">{row.carbs}</TableCell> */}
                              <TableCell align="right">{row.squarefoot}</TableCell>
                          </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                    <Grid item xs={12}>
                      <Paper className={classes.root1}>
                        <Typography variant="subheading" gutterBottom>
                          Listing Address: {listing.address}
                      </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                          This is a sheet of paper.
                      </Typography>
                        <Typography component="p">
                          Paper can be used to build surface or other elements for your application.
                      </Typography>
                      </Paper>
                    </Grid>
                    {/* <Typography style = {{wordWrap: 'break-word'}} variant="subtitle1" id="simple-modal-description">
                    lsdbpeiq[egpqvbibvieboeoeogoboebveovoenknvknvknbjvojvn
                    </Typography> */}
                    {/* <SimpleModalWrapped /> */}
                  </Grid>
                </Grid>
              {/* })} */}
            {/* </Grid> */}
          </div>
        </Modal>
      </div >
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;