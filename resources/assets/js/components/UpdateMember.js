import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';
import $ from 'jquery';
import DatePicker from 'react-bootstrap-date-picker';

class UpdateMember extends Component {
  constructor(props) {
    super(props);
    this.state = {memberName: '', memberInformation: '', memberPhone: '', memberDob: '', memberPosition: 'intern', memberGender: '1', memberAvatar: null, errors: '', formattedValue: ''};
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
    axios.get(MyGlobleSetting.url + `/api/members/${this.props.params.id}`)
    .then(response => {
      this.setState({ memberName: response.data.name, memberInformation: response.data.information, memberPhone: response.data.phone, formattedValue: response.data.date_of_birth.split(" ")[0], memberPosition: response.data.position, memberGender: response.data.gender, memberAvatar: response.data.avatar });
      this.state.memberDob = new Date(this.state.formattedValue);
      this.setState({memberDob: this.state.memberDob.toISOString()});
      console.log(this.state.formattedValue, this.state.memberDob);
    }).catch(error => {
      this.setState({
        errors: error.response.data.errors
      });
    });
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
  handleChangeDob(e, formattedValue){
    this.setState({
      memberDob: e,
      formattedValue: formattedValue
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
    $('#img_avatar').remove();
    this.setState({
      memberAvatar: e.target.files[0]
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',this.state.memberName);
    formData.append('information',this.state.memberInformation);
    formData.append('avatar',this.state.memberAvatar);
    formData.append('dob',this.state.formattedValue);
    formData.append('phone',this.state.memberPhone);
    formData.append('position',this.state.memberPosition);
    formData.append('gender',this.state.memberGender);
    formData.append('_method', 'PUT');
    const config = {
         'Content-Type': 'multipart/form-data'
    }
    let uri = MyGlobleSetting.url + '/api/members/' + this.props.params.id;
    axios.post(uri, formData, config).then((response) => {
      browserHistory.push('/members?ACTION=2');
    }).catch(error => {
      this.setState({
        errors: error.response.data.errors
      });
    });
  }
  render(){
    return (
      <div className="invoice">
        <form onSubmit={this.handleSubmit} className="form-horizontal" >
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input type="text" value={this.state.memberName} className="form-control" id="name" onChange={this.handleChangeName} name="name" placeholder="Enter name" />
              <p className="error">{this.state.errors.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Avatar:</label>
            <div className="col-sm-10">
              <img src={this.state.memberAvatar} className="img-rounded" id="img_avatar"/>
              <input type="file" onChange={this.handleChangeAvatar} ref={this.state.memberAvatar} className="form-control" id="avatar" name="avatar"/>
              <p className="error">{this.state.errors.avatar}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="information">Information:</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="information" onChange={this.handleChangeInformation} name="information" value={this.state.memberInformation}></textarea>
              <p className="error">{this.state.errors.information}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="phone">Phone:</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChangePhone} value={this.state.memberPhone} className="form-control" id="phone" name="phone" placeholder="Enter Phone" />
              <p className="error">{this.state.errors.phone}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="date_of_birth">Date of birth:</label>
            <div className="col-sm-10">
              <DatePicker id="example-datepicker" onChange={this.handleChangeDob} dateFormat="YYYY-MM-DD" value={this.state.memberDob}/>
              <p className="error">{this.state.errors.dob}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="position">Position:</label>
            <div className="col-sm-10">
              <select className="form-control" value={this.state.memberPosition} name="position" id="position" onChange={this.handleChangePosition}>
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
              <select className="form-control" name="gender" value={this.state.memberGender} onChange={this.handleChangeGender} id="gender">
                <option value="1">male</option>
                <option value="2">female</option>
              </select>
              <p className="error">{this.state.errors.gender}</p>
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
export default UpdateMember;