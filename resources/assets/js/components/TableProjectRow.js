import React, { Component } from 'react';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class TableProjectRow extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var result = confirm("Want to delete?");
    if (result) {
      let uri = MyGlobleSetting.url + `/api/projects/${this.props.obj.id}`;
      axios.delete(uri).then(response => {
        $('#project_' + this.props.obj.id).remove();
        $('.alert-success').remove();
       }).catch(function (error) {
         console.log(error);
      });
      browserHistory.push('/projects');
    }
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
  render() {
    return (
      <tr id={"project_" + this.props.obj.id}>
      <td>{this.props.obj.name}</td>
      <td>{this.props.obj.information}</td>
      <td>{this.props.obj.deadline}</td>
      <td>{this.props.obj.type}</td>
      <td>{this.projectStatus(this.props.obj.status)}</td>
      <td><form onSubmit={this.handleSubmit} method="delete">
      <Link to={"/projects/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link> /
      <Link to={"/projects/detail/"+this.props.obj.id} className="btn btn-success">Show</Link> /<input type="submit" value="Delete" className="btn btn-danger"/>
      </form></td>
      </tr>
      );
    }
  }

  export default TableProjectRow;