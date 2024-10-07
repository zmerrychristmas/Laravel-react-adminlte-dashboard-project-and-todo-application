import React, { Component } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import TableProjectRow from './TableProjectRow';
import MyGlobleSetting from './MyGlobleSetting';

class DisplayProject extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', projects: '', messages: '' };
  }

  componentDidMount() {
    const { search } = this.props.location; // This will be available in v5
    const url_browser = MyGlobleSetting.url + '/api/projects' + search; // Append query params directly
    axios
      .get(url_browser)
      .then(response => {
        this.setState({
          projects: response.data.projects,
          messages: response.data.messages,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  messages() {
    if (this.state.messages instanceof Array) {
      return this.state.messages.map((object, i) => {
        return (
          <div className="alert alert-success" key={i}>
            <a href="#" className="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Success!</strong> {object}.
          </div>
        );
      });
    }
  }

  tabRow() {
    if (this.state.projects instanceof Array) {
      return this.state.projects.map((object, i) => {
        return <TableProjectRow obj={object} key={i} />;
      });
    }
  }

  render() {
    return (
      <div className="invoice">
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/projects/new" className="btn btn-medium btn-default">
              New Project
            </Link>
          </div>
        </div>
        <br />
        <div className="messages">{this.messages()}</div>
        <table className="table table-hover table-bordered table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td width="30%">Information</td>
              <td>Deadline</td>
              <td>Type</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}

// Wrap the component to use the useLocation hook
const DisplayProjectWithLocation = (props) => {
  const location = useLocation();
  return <DisplayProject {...props} location={location} />;
};

export default DisplayProjectWithLocation;
