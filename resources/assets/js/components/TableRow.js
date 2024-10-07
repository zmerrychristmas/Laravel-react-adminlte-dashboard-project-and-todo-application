import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Use 'react-router-dom' for routing
import axios from 'axios'; // Import axios for HTTP requests
import MyGlobleSetting from './MyGlobleSetting';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  dateofbirth(date_of_birth) {
    if (date_of_birth) {
      date_of_birth = date_of_birth.split(" ");
      return date_of_birth[0];
    }
    return '';
  }

  handleSubmit(event) {
    event.preventDefault();
    const result = confirm("Want to delete?");
    if (result) {
      const uri = `${MyGlobleSetting.url}/api/members/${this.props.obj.id}`;
      axios.delete(uri)
        .then(response => {
          // Remove the row from the DOM
          document.getElementById("member_" + this.props.obj.id).remove();
          // Show a success message if needed
        })
        .catch(error => {
          console.log(error);
        });
      // Navigate to members list after deletion (using useHistory or Link)
      // Consider handling navigation more appropriately
    }
  }

  render() {
    return (
      <tr id={"member_" + this.props.obj.id}>
        <td><img src={this.props.obj.avatar} className="img-rounded avt-thumbnail" alt="Avatar"/></td>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.phone}</td>
        <td>{this.dateofbirth(this.props.obj.date_of_birth)}</td>
        <td>{this.props.obj.position}</td>
        <td>{this.props.obj.gender === 1 ? 'Male' : 'Female'}</td>
        <td>
          <form onSubmit={this.handleSubmit}>
            <Link to={"/members/edit/" + this.props.obj.id} className="btn btn-primary">Edit</Link>&nbsp;
            <input type="submit" value="Delete" className="btn btn-danger" />
          </form>
        </td>
      </tr>
    );
  }
}

export default TableRow;
