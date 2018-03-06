import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';


class CreateMember extends Component {
  constructor(props){
    super(props);
    this.state = {memberName: '', memberInformation: '', memberPhone: '', memberDob: '', memberPosition: 'intern', memberGender: '1', memberAvatar: null, errors: ''};

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
      memberName: e.target.value
    })
  }
  handleChangeInformation(e){
    this.setState({
      memberInformation: e.target.value
    })
  }
  handleChangePhone(e){
    this.setState({
      memberPhone: e.target.value
    })
  }
  handleChangeDob(e){
    this.setState({
      memberDob: e.target.value
    })
  }
  handleChangePosition(e){
    this.setState({
      memberPosition: e.target.value
    })
  }
  handleChangeGender(e){
    this.setState({
      memberGender: e.target.value
    })
  }
  handleChangeAvatar(e){
    this.setState({
      memberAvatar: e.target.files[0]
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    this.state.memberDob = this.state.memberDob ? this.state.memberDob : $('#date_of_birth').val();
    formData.append('name',this.state.memberName);
    formData.append('information',this.state.memberInformation);
    formData.append('avatar',this.state.memberAvatar);
    formData.append('dob',this.state.memberDob);
    formData.append('phone',this.state.memberPhone);
    formData.append('position',this.state.memberPosition);
    formData.append('gender',this.state.memberGender);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    let uri = MyGlobleSetting.url + '/api/members';
    axios.post(uri, formData, config).then((response) => {
      browserHistory.push('/members?ACTION=1');
    }).catch(error => {
      this.setState({
        errors: error.response.data.errors
      });
    });
  }

  render() {
    return (
      <div className="invoice">
        <form onSubmit={this.handleSubmit} className="form-horizontal"  method="post" encType="multipart/form-data" >
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="name" required="required" onChange={this.handleChangeName} name="name" placeholder="Enter name" />
              <p className="error">{this.state.errors.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Avatar:</label>
            <div className="col-sm-10">
              <input type="file" onChange={this.handleChangeAvatar} ref={this.state.memberAvatar} className="form-control" id="avatar" name="avatar"/>
              <p className="error">{this.state.errors.avatar}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="information">Information:</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="information" onChange={this.handleChangeInformation} name="information"></textarea>
              <p className="error">{this.state.errors.information}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" required="required" htmlFor="phone">Phone:</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChangePhone} className="form-control" id="phone" name="phone" placeholder="Enter Phone" />
              <p className="error">{this.state.errors.phone}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2 datepicker" required="required" htmlFor="date_of_birth">Date of birth:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control datepicker" onChange={this.handleChangeDob} id="date_of_birth" name="date_of_birth" placeholder="Enter Date of birth" value={this.state.memberDob} />
              <p className="error">{this.state.errors.dob}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="position">Position:</label>
            <div className="col-sm-10">
              <select className="form-control" required="required" name="position" id="position" onChange={this.handleChangePosition}>
                <option value="intern">intern</option>
                <option value="junior">junior</option>
                <option value="senior">senior</option>
                <option value="pm">pm</option>
                <option value="ceo">ceo</option>
                <option value="cto">cto</option>
                <option value="bo">bo</option>
              </select>
              <p className="error">{this.state.errors.position}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="gender">Gender:</label>
            <div className="col-sm-10">
              <select className="form-control" required="required" name="gender" onChange={this.handleChangeGender} id="gender">
                <option value="1">male</option>
                <option value="2">female</option>
              </select>
              <p className="error">{this.state.errors.gender}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
      )
    }
  }
  export default CreateMember;