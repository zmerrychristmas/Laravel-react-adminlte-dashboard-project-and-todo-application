require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import DisplayMember from './components/DisplayMember';
import CreateMember from './components/CreateMember';
import UpdateMember from './components/UpdateMember';
import DisplayProject from './components/DisplayProject';
import CreateProject from './components/CreateProject';
import UpdateProject from './components/UpdateProject';
import AssignMember from './components/AssignMember';
import DetailProject from './components/DetailProject';

render(
    <Router history={browserHistory}>
        <Route path="/" component={DisplayMember} >
        </Route>
        <Route path="/members" component={DisplayMember} />
        <Route path="/members/new" component={CreateMember} />
        <Route path="/members/edit/:id" component={UpdateMember} />
        <Route path="/projects" component={DisplayProject} />
        <Route path="/projects/new" component={CreateProject} />
        <Route path="/projects/edit/:id" component={UpdateProject} />
        <Route path="/projects/assign" component={AssignMember} />
        <Route path="/projects/detail/:id" component={DetailProject} />
    </Router>,
    document.getElementById('crud-app'));