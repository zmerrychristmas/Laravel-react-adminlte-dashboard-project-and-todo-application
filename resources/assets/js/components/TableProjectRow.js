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
  render() {
    return (
      <tr id={"project_" + this.props.obj.id}><td><img src={this.props.obj.avatar} className="img-rounded"/></td>
      <td>{this.props.obj.name}</td>
      <td>{this.props.obj.information}</td>
      <td>{this.props.obj.deadline}</td>
      <td>{this.props.obj.type}</td>
      <td>{this.props.obj.status}</td>
      <td><form onSubmit={this.handleSubmit} method="delete">
      <Link to={"/projects/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
      <input type="submit" value="Delete" className="btn btn-danger"/>
      </form></td>
      </tr>
      );
    }
  }

  export default TableRow;