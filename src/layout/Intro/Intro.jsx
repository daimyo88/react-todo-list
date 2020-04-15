import React from 'react';
import { Redirect } from 'react-router-dom';

const Intro = (props) => {

    const loginRedirect = props.logined === false && props.checkingUserStatus === false  ? <Redirect to="/login" /> : null;
    const tasksRedirect = props.logined === true && props.checkingUserStatus === false  ? <Redirect to="/tasks" /> : null;
    
    return (
        <React.Fragment>
            { loginRedirect }
            { tasksRedirect }
        </React.Fragment>
    )
}

export default Intro;