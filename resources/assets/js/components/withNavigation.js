import React from 'react';
import { useNavigate } from 'react-router-dom';

// Higher Order Component to pass down the navigate function
export function withNavigation(Component) {
  return function(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
