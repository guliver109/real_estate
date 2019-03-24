import React, {Component} from 'react';
import Navbar from '../../components/Navbar'; 
import CreateListingForm from '../../components/CreateListingForm/CreateListingForm';

export default class CreateListingPage extends Component {
    state = {};

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return(
            <div>
                <Navbar {...this.props}/>
                <CreateListingForm {...this.props}/>
            </div>
        )
    }
}