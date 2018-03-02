import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let uri = MyGlobleSetting.url + `/api/members/${this.props.obj.id}`;
    axios.delete(uri);
    browserHistory.push('/');
  }
  render() {
    return (
      <tr><td><img src={this.props.obj.avatar} className="img-rounded"/></td>
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