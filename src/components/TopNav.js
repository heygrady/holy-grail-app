import React from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames/bind'

import styles from './TopNav.module.css'

const cx = classnames.bind(styles)

const TopNav = () => (
  <div className={cx('TopNav')}>
    <NavLink
      to="/"
      exact
      activeClassName={cx('TopNav-selected')}
      className={cx('TopNav__Link')}
    >
      Home
    </NavLink>
    <NavLink
      to="/about"
      activeClassName={cx('TopNav-selected')}
      className={cx('TopNav__Link')}
    >
      About
    </NavLink>
  </div>
)

export default TopNav
