/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.sass';

export enum ButtonVariant {
  Success ='success',
  Primary = 'primary',
  Secondary = 'secondary',
  Link = 'link',
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }> = ({
  variant = ButtonVariant.Primary,
  className,
  children,
  ...rest }) => {
  return (
    <button {...rest} className={clsx(styles[`btn_${variant}`], className)}>{children}</button>
  )
}

export default Button