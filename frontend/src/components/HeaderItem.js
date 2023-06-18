import React from 'react';

import { Outlet, NavLink, Link } from 'react-router-dom';
import logo from '../logo.svg';

export const HeaderItem = () => {

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <Link to="/registration" className='navbar-brand'>
                    <img src={ logo } alt="logo" width="30" height="24"
                            className="d-inline-block align-text-top"/>
                    Covid Records
                </Link>
            </nav>
            <br />
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink
                        to="/registration"
                        className={ ({ isActive }) => 'nav-link ' + ( isActive ? 'active' : '')}
                    >
                        Registration
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/summary"
                        className={ ({ isActive }) => 'nav-link ' + ( isActive ? 'active' : '')}
                    >
                    Summary
                    </NavLink>
                </li>
            </ul>
            <div className="container-fluid">
                <Outlet />
            </div>
        </>
    )
}
