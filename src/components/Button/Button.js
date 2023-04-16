import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  primary = true,
  label,
  icon,
  iconOnly = false,
  onClick,
  ...otherProps
}) => {
  const buttonClassName = primary
    ? styles.primaryButton
    : styles.secondaryButton;
  const content = iconOnly ? (
    icon
  ) : (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && <span className={styles.label}>{label}</span>}
    </>
  );

  return (
    <button className={buttonClassName} onClick={onClick} {...otherProps}>
      {content}
    </button>
  );
};

export default Button;
