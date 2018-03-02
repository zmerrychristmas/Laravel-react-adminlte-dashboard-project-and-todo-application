import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';
import MyGlobleSetting from './MyGlobleSetting';
class DisplayMember extends Component {
  constructor(props) {
   super(props);
   this.state = {value: '', members: ''};
 }
 componentDidMount(){
   axios.get(MyGlobleSetting.url + '/api/members')
   .then(response => {
     console.log(response);
     this.setState({ members: response.data });
   })
   .catch(function (error) {
     console.log(error);
   })
 }
 tabRow(){
   if(this.state.members instanceof Array){
     return this.state.members.map((object, i) => {
       return <TableRow obj={object} key={i} />;
     })
   }
 }

 render(){
  return (
    <div>
    <div className="row">
    <div className="col-md-10"></div>
    <div className="col-md-2">
      <a className className="btn btn-medium btn-default" href="/members/new">New Member</a>
    </div>
    </div><br />

    <table className="table table-hover table-bordered table-striped">
    <thead>
      <tr>
        <td>Avatar</td>
        <td>Name</td>
        <td>Phone</td>
        <td>Date Of Birth</td>
        <td>Position</td>
        <td>Gender</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
    {this.tabRow()}
    </tbody>
    </table>
    </div>
    )
  }
}
export default DisplayMember;