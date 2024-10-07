require('./bootstrap');
window.$ = window.jQuery = require('jquery');

import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importing Routes

import DisplayMember from './components/DisplayMember';
import CreateMember from './components/CreateMember';
import UpdateMember from './components/UpdateMember';
import DisplayProject from './components/DisplayProject';
import CreateProject from './components/CreateProject';
import UpdateProject from './components/UpdateProject';
import AssignMember from './components/AssignMember';
import DetailProject from './components/DetailProject';

// Get the root element
const container = document.getElementById('crud-app');

// Create a root
const root = createRoot(container);

// Render the app
root.render(
    <BrowserRouter>
        <Routes> {/* Use Routes instead of Router */}
            <Route path="/" element={<DisplayMember />} />
            <Route path="/members" element={<DisplayMember />} />
            <Route path="/members/new" element={<CreateMember />} />
            <Route path="/members/edit/:id" element={<UpdateMember />} />
            <Route path="/projects" element={<DisplayProject />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/edit/:id" element={<UpdateProject />} />
            <Route path="/projects/assign" element={<AssignMember />} />
            <Route path="/projects/detail/:id" element={<DetailProject />} />
        </Routes>
    </BrowserRouter>
);
