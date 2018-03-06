import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class AssignMember extends Component {
  constructor(props){
    super(props);
    this.state = {projectId: '', memberId: '', role: '', projects: '', members: '', errors: ''};

    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeMember = this.handleChangeMember.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.state.projectId = this.props.location.query.pid != undefined ? this.props.location.query.pid : '';
    this.state.memberId = this.props.location.query.mid != undefined ? this.props.location.query.mid : '';
    let url_browser = MyGlobleSetting.url + '/api/members';
    if (this.state.projectId) {
      url_browser = MyGlobleSetting.url + '/api/members?pid=' + this.state.projectId;
    }
    axios.get(url_browser)
    .then(response => {
     this.setState({ members: response.data.members});
   })
    .catch(function (error) {
     console.log(error);
   })
    url_browser = MyGlobleSetting.url + '/api/projects';
    axios.get(url_browser)
    .then(response => {
     this.setState({ projects: response.data.projects});
   })
    .catch(function (error) {
     console.log(error);
   })
  }

  handleChangeProject(e){
    let url_browser = MyGlobleSetting.url + '/api/members' + '?pid=' + e.target.value;
    axios.get(url_browser)
    .then(response => {
     this.setState({ members: response.data.members});
   })
    this.setState({
      projectId: e.target.value
    })
  }
  handleChangeMember(e){
    this.setState({
      memberId: e.target.value
    })
  }
  handleChangeRole(e){
    this.setState({
      role: e.target.value
    })
  }
  projectOption() {
   if(this.state.projects instanceof Array){
     return this.state.projects.map((object, i) => {
      if (this.props.location.query.pid != undefined) {
        return  <option key={i} value={object.id} disabled="disabled">{object.name}</option>;
      } else {
         return  <option key={i} value={object.id}>{object.name}</option>;
      }
     })
   }
   return '';
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
  memberOption() {
   if(this.state.members instanceof Array){
     return this.state.members.map((object, i) => {
       return  <option key={i} value={object.id}>{object.name}</option>;
     })
   }
   return '';
  }
  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('project_id',this.state.projectId);
    formData.append('member_id',this.state.memberId);
    formData.append('role',this.state.role);

    let uri = MyGlobleSetting.url + "/api/project/assign";
    axios.post(uri, formData).then((response) => {
      let url = '/projects/detail/' + this.state.projectId + '?ACTION=1';
      browserHistory.push(url);
    }).catch(error => {
      this.setState({
        errors: error.response.data.errors
      });
    });
  }
  setErrors() {
    console.log('1234');
  }
  render() {
    return (
      <div className="invoice">
      <div className="messages">
        {this.messages()}
      </div>

      <form onSubmit={this.handleSubmit} className="form-horizontal"  method="post">
      <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="type">Project:</label>
      <div className="col-sm-10">
      <select className="form-control" name="type" id="type" required="required" value={this.state.projectId} onChange={this.handleChangeProject}>
      <option value="">Choose a project</option>
      {this.projectOption()}
      </select>
      <p className="error">{this.state.errors.project_id}</p>
      </div>
      </div>
      <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="status" >Member:</label>
      <div className="col-sm-10">
      <select className="form-control" name="status" required="required" value={this.state.memberId} onChange={this.handleChangeMember} id="status">
      <option value="">Choose a member</option>
      {this.memberOption()}
      </select>
      <p className="error">{this.state.errors.member_id}</p>
      </div>
      </div>
      <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="name">Role:</label>
      <div className="col-sm-10">
      <select className="form-control" name="role" required="required" onChange={this.handleChangeRole} id="role">
        <option value=''>Choose a role</option>
        <option value="dev">dev</option>
        <option value="pl">pl</option>
        <option value="pm">pm</option>
        <option value="po">po</option>
        <option value="sm">sm</option>
      </select>
      <p className="error">{this.state.errors.role}</p>
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
export default AssignMember;