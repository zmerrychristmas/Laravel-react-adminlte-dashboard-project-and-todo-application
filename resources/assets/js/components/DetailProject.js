import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Updated to use react-router-dom
import TableProjectRow from './TableProjectRow';
import MyGlobleSetting from './MyGlobleSetting';

class DetailProject extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', projects: [], messages: [], error: null };
    this._isMounted = false; // Flag to track component mount status
  }

  componentDidMount() {
    this._isMounted = true;
    const url_browser = MyGlobleSetting.url + '/api/projects';
    
    axios.get(url_browser)
      .then(response => {
        if (this._isMounted) {
          this.setState({ projects: response.data.projects, messages: response.data.messages });
        }
      })
      .catch(error => {
        if (this._isMounted) {
          this.setState({ error: error.message });
          console.error('API call error:', error);
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false; // Clean up
  }

  render() {
    const { projects, messages, error } = this.state;

    return (
      <div className="invoice">
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/projects/new" className="btn btn-medium btn-default">New Project</Link>
          </div>
        </div>
        <br />
        <div className="messages">
          {messages && messages.map((msg, i) => (
            <div className="alert alert-success" key={i}>
              <strong>Success!</strong> {msg}
            </div>
          ))}
          {error && <div className="alert alert-danger"><strong>Error:</strong> {error}</div>}
        </div>
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
          <tbody>
            {projects.map((project, i) => <TableProjectRow obj={project} key={i} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DetailProject;
