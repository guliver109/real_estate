import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DashBoard from './pages/DashBoard';
import axios from 'axios';
import CreateListingPage from './pages/CreateListingPage/CreateListingPage';
import ListingPage from './pages/ListingPage/ListingPage';
import LandingPage from './pages/LandingPage/LandingPage';



export default class App extends Component {
    state = {
        user: null
    }

    checkForUserData = (cb) => {
        console.log('hit check for user data in app');
        axios.post('/').then(result => {
            console.log(result, "that we took out")
            this.setState({
                user: result.data
            }, () => {
                console.log(this.state);
                cb();
            });
        }).catch(err => {
            if (err) throw err;
        })
    }

    componentDidMount() {
        this.checkForUserData(() => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={props => <LandingPage user={this.state.user} {...props} />} /> 
                    <Route exact path='/signup' render={props => <SignupPage user={this.state.user} {...props} />} />
                    <Route exact path='/login' render={props => <LoginPage {...props} checkForUserData={this.checkForUserData} />} />
                    <Route exact path='/dashboard' render={props => this.state.user ? <DashBoard {...props} user={this.state.user} /> : <LoginPage {...props} checkForUserData={this.checkForUserData} />} />
                    <Route exact path='/create' render={props => this.state.user ? <CreateListingPage {...props} user={this.state.user} /> : <LoginPage {...props} checkForUserData={this.checkForUserData} />} />
                    <Route exact path='/listings' render={props => <ListingPage {...props} user={this.state.user} />} />
                    {/* <Route exact path='/update' render={props => <ListingPage {...props} user={this.state.user} />} />
                    <Route exact path='/delete' render={props => <ListingPage {...props} user={this.state.user} />} /> */}
                </div>
            </Router>
        )
    }

}