import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Updated to use react-router-dom
import MyGlobleSetting from './MyGlobleSetting';
import axios from 'axios'; // Ensure axios is imported

class TableProjectRow extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const result = window.confirm("Want to delete?"); // Use window.confirm for better compatibility
    if (result) {
      const uri = `${MyGlobleSetting.url}/api/projects/${this.props.obj.id}`;
      axios
        .delete(uri)
        .then(response => {
          // Handle successful deletion, for example by notifying the user
          console.log('Project deleted successfully');
          // Optionally, you can update the parent component state here to remove the project
        })
        .catch(error => {
          console.error("There was an error deleting the project!", error);
        });
    }
  }

  projectInformation(information) {
    return information.length > 100 
      ? `${information.substring(0, 30)}...` 
      : information;
  }

  projectDeadline(deadline) {
    return deadline.split(" ")[0]; // Assuming the deadline is in "YYYY-MM-DD" format
  }

  projectStatus(status) {
    switch (status) {
      case '1':
        return 'Plan End';
      case '2':
        return 'On Hold';
      case '3':
        return 'Doing';
      case '4':
        return 'Done';
      case '5':
        return 'Cancelled';
      default:
        return 'Unknown Status'; // Return a default message for unexpected statuses
    }
  }

  render() {
    return (
      <tr id={`project_${this.props.obj.id}`}>
        <td>{this.props.obj.name}</td>
        <td>{this.projectInformation(this.props.obj.information)}</td>
        <td>{this.projectDeadline(this.props.obj.deadline)}</td>
        <td>{this.props.obj.type}</td>
        <td>{this.projectStatus(this.props.obj.status)}</td>
        <td>
          <form onSubmit={this.handleSubmit} method="delete">
            <Link to={`/projects/edit/${this.props.obj.id}`} className="btn btn-primary">Edit</Link>&nbsp;
            <Link to={`/projects/detail/${this.props.obj.id}`} className="btn btn-success">Show</Link>&nbsp;
            <input type="submit" value="Delete" className="btn btn-danger"/>
          </form>
        </td>
      </tr>
    );
  }
}

export default TableProjectRow;
