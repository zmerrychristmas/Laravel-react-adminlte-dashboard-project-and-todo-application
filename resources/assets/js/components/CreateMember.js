import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyGlobleSetting from "./MyGlobleSetting";
import DatePicker from "react-datepicker";
import axios from "axios";

const CreateMember = () => {
  const navigate = useNavigate();
  const [memberName, setMemberName] = useState("");
  const [memberInformation, setMemberInformation] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberDob, setMemberDob] = useState(null);
  const [memberPosition, setMemberPosition] = useState("intern");
  const [memberGender, setMemberGender] = useState("1");
  const [memberAvatar, setMemberAvatar] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    avatar: "",
    information: "",
    gender: "",
    dob: "",
    position: "",
    phone: "",
  });

  const handleChangeName = (e) => {
    setMemberName(e.target.value);
  };

  const handleChangeInformation = (e) => {
    setMemberInformation(e.target.value);
  };

  const handleChangePhone = (e) => {
    setMemberPhone(e.target.value);
  };

  const handleChangeDob = (date) => {
    setMemberDob(date);
  };

  const handleChangePosition = (e) => {
    setMemberPosition(e.target.value);
  };

  const handleChangeGender = (e) => {
    setMemberGender(e.target.value);
  };

  const handleChangeAvatar = (e) => {
    setMemberAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", memberName);
    formData.append("information", memberInformation);
    formData.append("avatar", memberAvatar);
    formData.append("dob", memberDob || "");
    formData.append("phone", memberPhone);
    formData.append("position", memberPosition);
    formData.append("gender", memberGender);
    formData.append("MAX_FILE_SIZE", 10240);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      const uri = `${MyGlobleSetting.url}/api/members`;
      await axios.post(uri, formData, config);
      navigate("/members?ACTION=1");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="invoice">
      <form
        onSubmit={handleSubmit}
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
              required
              onChange={handleChangeName}
              placeholder="Enter name"
            />
            <p className="error">{errors.name}</p>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="avatar">
            Avatar:
          </label>
          <div className="col-sm-10">
            <input
              type="file"
              onChange={handleChangeAvatar}
              className="form-control"
              id="avatar"
            />
            <p className="error">{errors.avatar}</p>
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
              onChange={handleChangeInformation}
            ></textarea>
            <p className="error">{errors.information}</p>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="phone">
            Phone:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              onChange={handleChangePhone}
              className="form-control"
              id="phone"
              placeholder="Enter Phone"
            />
            <p className="error">{errors.phone}</p>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 datepicker" htmlFor="date_of_birth">
            Date of birth:
          </label>
          <div className="col-sm-10">
            <DatePicker
              id="date_of_birth"
              onChange={handleChangeDob}
              className="form-control"
              selected={memberDob}
            />
            <p className="error">{errors.dob}</p>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="position">
            Position:
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              required
              onChange={handleChangePosition}
              id="position"
            >
              <option value="intern">Intern</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="pm">PM</option>
              <option value="ceo">CEO</option>
              <option value="cto">CTO</option>
              <option value="bo">BO</option>
            </select>
            <p className="error">{errors.position}</p>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="gender">
            Gender:
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              required
              onChange={handleChangeGender}
              id="gender"
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
            <p className="error">{errors.gender}</p>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMember;
