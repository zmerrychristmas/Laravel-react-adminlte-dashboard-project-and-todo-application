import React, { Component } from 'react';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class TableMemberAssign extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var result = confirm("Want to delete?");
    if (result) {
      let uri = MyGlobleSetting.url + `/api/project/detach/${this.props.obj.pm_id}`;
      axios.delete(uri).then(response => {
        $('#member_role' + this.props.obj.id).remove();
        $('.alert-success').remove();
       }).catch(function (error) {
         console.log(error);
      });
    }
  }
  render() {
    return (
      <tr id={"member_role" + this.props.obj.id}>
      <td>{this.props.obj.name}</td>
      <td>{this.props.obj.role}</td>
      <td><form onSubmit={this.handleSubmit} method="delete">
      <input type="submit" value="Delete" className="btn btn-danger"/>
      </form></td>
      </tr>
      );
    }
  }

  export default TableMemberAssign;