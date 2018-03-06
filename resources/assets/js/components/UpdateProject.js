import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';
import $ from 'jquery';

class UpdateProject extends Component {
  constructor(props) {
   super(props);
   this.state = {projectName: '', projectInformation: '', projectDeadline: '', projectType: 'lab', projectStatus: '1', errors: ''};

   this.handleChangeName = this.handleChangeName.bind(this);
   this.handleChangeInformation = this.handleChangeInformation.bind(this);
   this.handleChangeDeadline = this.handleChangeDeadline.bind(this);
   this.handleChangeType = this.handleChangeType.bind(this);
   this.handleChangeStatus = this.handleChangeStatus.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 componentDidMount(){
  axios.get(MyGlobleSetting.url + `/api/projects/${this.props.params.id}`)
  .then(response => {
    console.log(response);
    this.setState({ projectName: response.data.project.name, projectInformation: response.data.project.information, projectDeadline: response.data.project.deadline, projectType: response.data.project.type, projectStatus: response.data.project.status });
  }).catch(error => {
      this.setState({
        errors: error.response.data.errors
      });
    });
}
handleChangeName(e){
  this.setState({
    projectName: e.target.value
  })
}
handleChangeInformation(e){
  this.setState({
    projectInformation: e.target.value
  })
}
handleChangeDeadline(e){
  this.setState({
    projectDeadline: e.target.value
  })
}
handleChangeType(e){
  this.setState({
    projectType: e.target.value
  })
}
handleChangeStatus(e){
  this.setState({
    projectStatus: e.target.value
  })
}

handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData();
  this.state.projectDeadline = $('#deadline').val();
  formData.append('name',this.state.projectName);
  formData.append('information',this.state.projectInformation);
  formData.append('deadline',this.state.projectDeadline);
  formData.append('type',this.state.projectType);
  formData.append('status',this.state.projectStatus);
  const config = {
   'Content-Type': 'multipart/form-data'
 }
 let uri = MyGlobleSetting.url + '/api/projects/' + this.props.params.id;
 axios.post(uri, formData, config).then((response) => {
  browserHistory.push('/projects?ACTION=2');
});
}
render(){
  return (
         <div className="invoice">
        <form onSubmit={this.handleSubmit} className="form-horizontal"  method="post" encType="multipart/form-data" >
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="name" value={this.state.projectName} onChange={this.handleChangeName} name="name" placeholder="Enter name" />
              <p className="error">{this.state.errors.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="information">Information:</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="information" value={this.state.projectInformation} onChange={this.handleChangeInformation} name="information"></textarea>
              <p className="error">{this.state.errors.information}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="deadline">Deadline:</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChangeDeadline} value={this.state.projectDeadline} className="form-control datepicker" id="deadline" name="deadline" placeholder="Enter Deadline" />
              <p className="error">{this.state.errors.deadline}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="type">Type:</label>
            <div className="col-sm-10">
              <select className="form-control" value={this.state.projectType} name="type" id="type" onChange={this.handleChangeType}>
                <option value="lab">lab</option>
                <option value="single">single</option>
                <option value="acceptance">acceptance</option>
              </select>
              <p className="error">{this.state.errors.type}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="status">Status:</label>
            <div className="col-sm-10">
              <select className="form-control" name="status" value={this.state.projectStatus} onChange={this.handleChangeStatus} id="status">
                <option value="1">planned</option>
                <option value="2">onhold</option>
                <option value="3">doing</option>
                <option value="4">done</option>
                <option value="5">cancelled</option>
              </select>
              <p className="error">{this.state.errors.status}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Update</button>
            </div>
          </div>
        </form>
      </div>
    )
}
}
export default UpdateProject;