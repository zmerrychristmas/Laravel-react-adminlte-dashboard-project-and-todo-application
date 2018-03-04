import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';
import $ from 'jquery';

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {projectName: '', projectInformation: '', projectPhone: '', projectDob: '', projectPosition: 'intern', projectGender: '1', projectAvatar: null};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeInformation = this.handleChangeInformation.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeDob = this.handleChangeDob.bind(this);
    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(MyGlobleSetting.url + `/api/projects/${this.props.params.id}`)
    .then(response => {
      this.setState({ projectName: response.data.name, projectInformation: response.data.information, projectPhone: response.data.phone, projectDob: response.data.date_of_birth, projectPosition: response.data.position, projectGender: response.data.gender, projectAvatar: response.data.avatar });
    })
    .catch(function (error) {
      console.log(error);
    })
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
  handleChangePhone(e){
    this.setState({
      projectPhone: e.target.value
    })
  }
  handleChangeDob(e){
    this.setState({
      projectDob: e.target.value
    })
  }
  handleChangePosition(e){
    this.setState({
      projectPosition: e.target.value
    })
  }
  handleChangeGender(e){
    this.setState({
      projectGender: e.target.value
    })
  }
  handleChangeAvatar(e){
    $('#img_avatar').remove();
    this.setState({
      projectAvatar: e.target.files[0]
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',this.state.projectName);
    formData.append('information',this.state.projectInformation);
    formData.append('avatar',this.state.projectAvatar);
    formData.append('dob',this.state.projectDob);
    formData.append('phone',this.state.projectPhone);
    formData.append('position',this.state.projectPosition);
    formData.append('gender',this.state.projectGender);
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
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal" >
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input type="text" value={this.state.projectName} className="form-control" id="name" onChange={this.handleChangeName} name="name" placeholder="Enter name" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Avatar:</label>
            <div className="col-sm-10">
              <img src={this.state.projectAvatar} className="img-rounded" id="img_avatar"/>
              <input type="file" onChange={this.handleChangeAvatar} ref={this.state.projectAvatar} className="form-control" id="avatar" name="avatar"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="information">Information:</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="information" onChange={this.handleChangeInformation} name="information" value={this.state.projectInformation}></textarea>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="phone">Phone:</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChangePhone} value={this.state.projectPhone} className="form-control" id="phone" name="phone" placeholder="Enter Phone" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="date_of_birth">Date of birth:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" onChange={this.handleChangeDob} id="date_of_birth" name="date_of_birth" placeholder="Enter Date of birth" value={this.state.projectDob} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="position">Position:</label>
            <div className="col-sm-10">
              <select className="form-control" value={this.state.projectPosition} name="position" id="position" onChange={this.handleChangePosition}>
                <option value="intern">intern</option>
                <option value="junior">junior</option>
                <option value="senior">senior</option>
                <option value="pm">pm</option>
                <option value="ceo">ceo</option>
                <option value="cto">cto</option>
                <option value="bo">bo</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="gender">Gender:</label>
            <div className="col-sm-10">
              <select className="form-control" name="gender" value={this.state.projectGender} onChange={this.handleChangeGender} id="gender">
                <option value="1">male</option>
                <option value="2">female</option>
              </select>
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