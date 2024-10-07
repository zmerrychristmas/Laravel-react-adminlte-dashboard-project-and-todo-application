import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import MyGlobleSetting from "./MyGlobleSetting";
import { withNavigation } from './withNavigation';
import "react-datepicker/dist/react-datepicker.css";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectInformation: "",
      projectDeadline: "",
      projectType: "lab",
      projectStatus: "1",
      errors: {},
    };

    // Bind methods to this context
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeInformation = this.handleChangeInformation.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e) {
    this.setState({ projectName: e.target.value });
  }

  handleChangeInformation(e) {
    this.setState({ projectInformation: e.target.value });
  }

  handleChangeDeadline(date) {
    this.setState({ projectDeadline: date });
  }

  handleChangeType(e) {
    this.setState({ projectType: e.target.value });
  }

  handleChangeStatus(e) {
    this.setState({ projectStatus: e.target.value });
  }

handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", this.state.projectName);
  formData.append("information", this.state.projectInformation);
  formData.append("deadline", this.state.projectDeadline);
  formData.append("type", this.state.projectType);
  formData.append("status", this.state.projectStatus);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const uri = `${MyGlobleSetting.url}/api/projects`;
  axios
    .post(uri, formData, config)
    .then((response) => {
      this.props.navigate('/projects?ACTION=2'); // Use navigate prop from withNavigation HOC
    })
    .catch((error) => {
      this.setState({
        errors: (error.response && error.response.data && error.response.data.errors) || {}
      });
    });
}


  render() {
    return (
      <div className="invoice">
        <form
          onSubmit={this.handleSubmit}
          className="form-horizontal"
          method="post"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">
              Name:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={this.handleChangeName}
                name="name"
                placeholder="Enter project name"
              />
              <p className="error">{this.state.errors.name}</p>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="information">
              Information:
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="information"
                onChange={this.handleChangeInformation}
                name="information"
                placeholder="Enter project information"
              ></textarea>
              <p className="error">{this.state.errors.information}</p>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="deadline">
              Deadline:
            </label>
            <div className="col-sm-10">
              <DatePicker
                id="example-datepicker"
                onChange={this.handleChangeDeadline}
                selected={this.state.projectDeadline}
                placeholderText="Select a date"
                className="form-control"
                dateFormat="yyyy-MM-dd"
              />
              <p className="error">{this.state.errors.deadline}</p>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="type">
              Type:
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                name="type"
                id="type"
                onChange={this.handleChangeType}
              >
                <option value="lab">lab</option>
                <option value="single">single</option>
                <option value="acceptance">acceptance</option>
              </select>
              <p className="error">{this.state.errors.type}</p>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="status">
              Status:
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                name="status"
                onChange={this.handleChangeStatus}
                id="status"
              >
                <option value="1">Planned</option>
                <option value="2">On Hold</option>
                <option value="3">Doing</option>
                <option value="4">Done</option>
                <option value="5">Cancelled</option>
              </select>
              <p className="error">{this.state.errors.status}</p>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withNavigation(CreateProject);
