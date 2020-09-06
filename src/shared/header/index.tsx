import './header.scss';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

export const Header: FC = () => (
  <nav className="navbar bg-white justify-content-between">
    <a className="navbar-brand" href="/">
      <img src={logo} alt="Logo" style={{"width":"100px"}} />
    </a>
    <form className="form-inline mr-2">
      <Link to="/allevents">All events</Link>
      <Link to="/myevents">My events</Link>
      <Link to="/about">About</Link>
    </form>
  </nav>
)

