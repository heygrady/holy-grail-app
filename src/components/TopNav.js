import React from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames/bind'

import withCriticalStyles from '../utils/with-critical-styles'

import styles from './TopNav.module.css'

const cx = classnames.bind(styles)

const TopNav = () => (
  <div className={cx('TopNav')}>
    <NavLink
      to="/"
      exact
      activeClassName={cx('selected')}
      className={cx('link')}
    >
      Home
    </NavLink>
    <NavLink
      to="/about"
      activeClassName={cx('selected')}
      className={cx('link')}
    >
      About
    </NavLink>
  </div>
)

export default withCriticalStyles(styles)(TopNav)
