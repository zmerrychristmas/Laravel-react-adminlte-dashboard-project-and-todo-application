import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class CreateProject extends Component {
  constructor(props){
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
    this.setState({
      projectAvatar: e.target.files[0]
    })
  }
  handleSubmit(e){
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
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    let uri = MyGlobleSetting.url + '/api/projects';
    axios.post(uri, formData, config).then((response) => {
      browserHistory.push('/projects?ACTION=1');
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal"  method="post" encType="multipart/form-data" >
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="name" onChange={this.handleChangeName} name="name" placeholder="Enter name" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Avatar:</label>
            <div className="col-sm-10">
              <input type="file" onChange={this.handleChangeAvatar} ref={this.state.projectAvatar} className="form-control" id="avatar" name="avatar"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="information">Information:</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="information" onChange={this.handleChangeInformation} name="information"></textarea>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="phone">Phone:</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChangePhone} className="form-control" id="phone" name="phone" placeholder="Enter Phone" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="date_of_birth">Date of birth:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" onChange={this.handleChangeDob} id="date_of_birth" name="date_of_birth" placeholder="Enter Date of birth" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="position">Position:</label>
            <div className="col-sm-10">
              <select className="form-control" name="position" id="position" onChange={this.handleChangePosition}>
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
              <select className="form-control" name="gender" onChange={this.handleChangeGender} id="gender">
                <option value="1">male</option>
                <option value="2">female</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Submit</button>
            </div>
          </div>
        </form>
      </div>
      )
    }
  }
  export default CreateProject;