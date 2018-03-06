import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableMemberAssign from './TableMemberAssign';
import MyGlobleSetting from './MyGlobleSetting';
class DetailProject extends Component {
  constructor(props) {
   super(props);
   this.state = {value: '', project: '', member_roles: '', messages: ''};
 }
 componentDidMount(){
  axios.get(MyGlobleSetting.url + `/api/projects/detail/${this.props.params.id}`)
  .then(response => {
    this.setState({ project: response.data.project, member_roles: response.data.member_roles, messages: response.data.messages });
  })
  .catch(function (error) {
    console.log(error);
  })
 }
  projectStatus(status)
  {
    switch(status) {
      case '1': {
        return 'planend';
        break;
      }
      case '2': {
        return 'onhold';
        break;
      }
      case '3': {
        return 'doing';
        break;
      }
      case '4': {
        return 'done';
        break;
      }
      case '5': {
        return 'cancelled';
        break;
      }
      default : {
        return status;
        break;
      }
    }
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
   if(this.state.member_roles instanceof Array){
     return this.state.member_roles.map((object, i) => {
       return <TableMemberAssign obj={object} key={i} />;
     })
   }
 }
 render(){
  return (
    <section className="invoice">
      <div className="row">
        <div className="col-xs-12">
          <h2 className="page-header">
            <i className="fa fa-home"></i> {this.state.project.name}.
            <small className="pull-right">Date: {this.state.project.created_at}</small>
          </h2>
        </div>
      </div>

      <div className="row invoice-info">
        <div className="col-sm-2 invoice-col">
          <strong>Information:</strong>
        </div>
        <div className="col-sm-10 invoice-col">
          {this.state.project.information}
        </div>
        <div className="col-sm-2 invoice-col">
          <strong>Deadline:</strong>
        </div>
        <div className="col-sm-10 invoice-col">
          {this.state.project.deadline}
        </div>
        <div className="col-sm-2 invoice-col">
          <strong>Type:</strong>
        </div>
        <div className="col-sm-10 invoice-col">
          {this.state.project.type}
        </div>
        <div className="col-sm-2 invoice-col">
          <strong>Status:</strong>
        </div>
        <div className="col-sm-10 invoice-col">
          {this.projectStatus(this.state.project.status)}
        </div>
      </div>
      <div className="row no-print">
        <div className="col-xs-6">
        <h3>Members on project:</h3>
        </div>
        <div className="col-xs-6">
          <Link type="button" className="btn btn-primary pull-right" to={"/projects/assign?pid=" + this.state.project.id}>Add New
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 table-responsive">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    )
  }
}
export default DetailProject;