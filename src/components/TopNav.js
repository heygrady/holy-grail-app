import React from 'react'
import { NavLink } from 'react-router-dom'

import './TopNav.css'

const TopNav = () => (
  <div>
    <NavLink to="/" exact activeClassName="selected">
      Home
    </NavLink>
    <NavLink to="/about" activeClassName="selected">
      About
    </NavLink>
  </div>
)

export default TopNav
