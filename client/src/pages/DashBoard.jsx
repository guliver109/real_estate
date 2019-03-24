import React, {Component} from 'react';
import Navbar from '../components/Navbar';

export default class DashBoard extends Component {

    componentDidMount() {
        // axios.post('/').then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     if (err) throw err;
        // })
    }

    render() {
        return(
            <div>
                <Navbar {...this.props}/>
            </div>
        )
    }
}