import React from 'react'
import { NavLink } from 'react-router-dom'

import './TopNav.css'

const TopNav = () => (
  <div className="TopNav">
    <NavLink
      to="/"
      exact
      activeClassName="TopNav-selected"
      className="TopNav__Link"
    >
      Home
    </NavLink>
    <NavLink
      to="/about"
      activeClassName="TopNav-selected"
      className="TopNav__Link"
    >
      About
    </NavLink>
  </div>
)

export default TopNav
