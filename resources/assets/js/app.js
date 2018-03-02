require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import DisplayMember from './components/DisplayMember';
import CreateMember from './components/CreateMember';
import DisplayProduct from './components/DisplayProduct';
import UpdateMember from './components/UpdateMember';

render(
    <Router history={browserHistory}>
        <Route path="/" component={DisplayMember} >
        </Route>
        <Route path="/members" component={DisplayMember} />
        <Route path="/members/new" component={CreateMember} />
        <Route path="/members/edit/:id" component={UpdateMember} />
    </Router>,
    document.getElementById('crud-app'));