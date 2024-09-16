import classNames from 'classnames';
import scss from './index.module.scss';
import { NavLink as RNavLink } from 'react-router-dom';

export default function NavLink({ children, className, ...rest }) {
  return (
    <RNavLink
      {...rest}
      className={({ isActive }) => classNames(scss.link, className, isActive && scss.isActive)}
    >
      {children}
    </RNavLink>
  );
}
