import React, { Component } from 'react';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var result = confirm("Want to delete?");
    if (result) {
      let uri = MyGlobleSetting.url + `/api/members/${this.props.obj.id}`;
      axios.delete(uri).then(response => {
        $('#member_' + this.props.obj.id).remove();
        $('.alert-success').remove();
       }).catch(function (error) {
         console.log(error);
      });
      browserHistory.push('/members');
    }
  }
  render() {
    return (
      <tr id={"member_" + this.props.obj.id}><td><img src={this.props.obj.avatar} className="img-rounded"/></td>
      <td>{this.props.obj.name}</td>
      <td>{this.props.obj.phone}</td>
      <td>{this.props.obj.date_of_birth}</td>
      <td>{this.props.obj.position}</td>
      <td>{this.props.obj.gender}</td>
      <td><form onSubmit={this.handleSubmit} method="delete">
      <Link to={"/members/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
      <input type="submit" value="Delete" className="btn btn-danger"/>
      </form></td>
      </tr>
      );
    }
  }

  export default TableRow;