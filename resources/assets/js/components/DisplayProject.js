import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableProjectRow from './TableProjectRow';
import MyGlobleSetting from './MyGlobleSetting';
class DisplayProject extends Component {
  constructor(props) {
   super(props);
   this.state = {value: '', projects: '', messages: ''};
 }
 componentDidMount(){
   let url_browser = MyGlobleSetting.url + '/api/projects';
   if (this.props.location.query.ACTION != undefined) {
    url_browser += '?ACTION=' + this.props.location.query.ACTION;
   }
   axios.get(url_browser)
   .then(response => {
     this.setState({ projects: response.data.projects, messages: response.data.messages});
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
   if(this.state.projects instanceof Array){
     return this.state.projects.map((object, i) => {
       return <TableProjectRow obj={object} key={i} />;
     })
   }
 }
 render(){
  return (
    <div className="invoice">
    <div className="row">
    <div className="col-md-10"></div>
    <div className="col-md-2">
      <a className className="btn btn-medium btn-default" href="/projects/new">New Project</a>
    </div>
    </div><br />
    <div className="messages">
      {this.messages()}
    </div>
    <table className="table table-hover table-bordered table-striped">
    <thead>
      <tr>
        <td>Name</td>
        <td>Information</td>
        <td>Deadline</td>
        <td>Type</td>
        <td>Status</td>
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
export default DisplayProject;