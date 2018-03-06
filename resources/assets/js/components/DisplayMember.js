import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';
import MyGlobleSetting from './MyGlobleSetting';
class DisplayMember extends Component {
  constructor(props) {
   super(props);
   this.state = {value: '', members: '', messages: ''};
 }
 componentDidMount(){
   let url_browser = MyGlobleSetting.url + '/api/members';
   if (this.props.location.query.ACTION != undefined) {
    url_browser += '?ACTION=' + this.props.location.query.ACTION;
   }
   axios.get(url_browser)
   .then(response => {
     this.setState({ members: response.data.members, messages: response.data.messages});
   })
   .catch(function (error) {
     console.log(error);
   })
 }
 messages() {
   if(this.state.messages instanceof Array){
     return this.state.messages.map((object, i) => {
       return <div className="alert alert-success" key={i}>
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Success!</strong> {object}.
              </div>;
     })
   }
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
    <div className="invoice">
    <div className="row">
    <div className="col-md-10"></div>
    <div className="col-md-2">
      <a className className="btn btn-medium btn-default" href="/members/new">New Member</a>
    </div>
    </div><br />
    <div className="messages">
      {this.messages()}
    </div>
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