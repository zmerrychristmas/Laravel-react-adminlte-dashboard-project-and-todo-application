import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for query params
import TableRow from './TableRow';
import MyGlobleSetting from './MyGlobleSetting';

const DisplayMember = () => {
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const location = useLocation(); // Get the location object

    useEffect(() => {
        let url_browser = MyGlobleSetting.url + '/api/members';
        const params = new URLSearchParams(location.search); // Get query parameters

        if (params.get('ACTION')) {
            url_browser += '?ACTION=' + params.get('ACTION');
        }

        axios.get(url_browser)
            .then(response => {
                setMembers(response.data.members);
                setMessages(response.data.messages);
            })
            .catch(error => {
                console.log(error);
            });
    }, [location]); // Re-run when location changes

    const renderMessages = () => {
        if (Array.isArray(messages)) {
            return messages.map((object, i) => (
                <div className="alert alert-success" key={i}>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Success!</strong> {object}.
                </div>
            ));
        }
    };

    const tabRow = () => {
        if (Array.isArray(members)) {
            return members.map((object, i) => (
                <TableRow obj={object} key={i} />
            ));
        }
    };

    return (
        <div className="invoice">
            <div className="row">
                <div className="col-md-10"></div>
                <div className="col-md-2">
                    <Link className="btn btn-medium btn-default" to="/members/new">New Member</Link>
                </div>
            </div><br />
            <div className="messages">
                {renderMessages()}
            </div>
            <table className="table table-hover table-responsive table-bordered table-striped">
                <thead>
                    <tr>
                        <td>Avatar</td>
                        <td>Name</td>
                        <td>Phone</td>
                        <td>Date Of Birth</td>
                        <td>Position</td>
                        <td>Gender</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {tabRow()}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayMember;
