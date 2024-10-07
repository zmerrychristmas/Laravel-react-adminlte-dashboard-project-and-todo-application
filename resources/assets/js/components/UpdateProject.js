import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Make sure to use react-router-dom
import MyGlobleSetting from "./MyGlobleSetting";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import moment from "moment"; // Import moment

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectInformation: "",
      projectDeadline: null,
      projectType: "lab",
      projectStatus: "1",
      errors: {},
    };

    // Binding methods
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeInformation = this.handleChangeInformation.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let projectId = this.props.params ? this.props.params.id : undefined;
      if (!projectId) {
        console.error('Project ID is not defined');
        console.log(this.props.params);
        projectId = MyGlobleSetting.getID(projectId);
      }
      console.log(projectId);
      const response = await axios.get(
        `${MyGlobleSetting.url}/api/projects/${projectId}`
      );
      const { name, information, deadline, type, status } = response.data.project;
      // const formattedDeadline = deadline.split(" ")[0];
      
      this.setState({
        projectName: name || "",
        projectInformation: information || "",
        projectDeadline: moment(deadline), // Convert to Date object
        projectType: type || "lab",
        projectStatus: status || "1",
      });
      // this.setState({ projectDeadline: moment(deadline) });
      console.log(this.projectName, this.projectDeadline, moment(deadline));
    } catch (error) {
      console.error("Error fetching project data:", error);
      this.setState({ errors: (error.response && error.response.data && error.response.data.errors) || {} });
    }
  }

  handleChangeName(e) {
    this.setState({ projectName: e.target.value });
  }

  handleChangeInformation(e) {
    this.setState({ projectInformation: e.target.value });
  }

  handleChangeDeadline(date) {
    console.log("Selected date:", date); // Added for debugging
    this.setState({ projectDeadline: date });
    return this.projectDeadline;
  }

  handleChangeType(e) {
    this.setState({ projectType: e.target.value });
  }

  handleChangeStatus(e) {
    this.setState({ projectStatus: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.projectName);
    formData.append("information", this.state.projectInformation);
    formData.append("deadline", this.state.projectDeadline ? this.state.projectDeadline.toISOString() : ""); // Convert Date to ISO string
    formData.append("type", this.state.projectType);
    formData.append("status", this.state.projectStatus);
    formData.append("_method", "PUT");

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(
        `${MyGlobleSetting.url}/api/projects/${this.props.params.id}`,
        formData,
        config
      );
      this.props.history.push("/projects?ACTION=2"); // Use history prop from react-router
    } catch (error) {
      console.error("Error updating project:", error);
      this.setState({ errors: (error.response && error.response.data && error.response.data.errors) || {} });
    }
  }

  render() {
    return (
      <div className="invoice">
        <form
          onSubmit={this.handleSubmit}
          className="form-horizontal"
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
                value={this.state.projectName}
                onChange={this.handleChangeName}
                placeholder="Enter name"
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
                value={this.state.projectInformation}
                onChange={this.handleChangeInformation}
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
                selected={this.state.projectDeadline}
                onChange={this.handleChangeDeadline}
                className="form-control"
                placeholderText="Select a date"
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
                value={this.state.projectType}
                onChange={this.handleChangeType}
                id="type"
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
                value={this.state.projectStatus}
                onChange={this.handleChangeStatus}
                id="status"
              >
                <option value="1">planned</option>
                <option value="2">onhold</option>
                <option value="3">doing</option>
                <option value="4">done</option>
                <option value="5">cancelled</option>
              </select>
              <p className="error">{this.state.errors.status}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateProject;
