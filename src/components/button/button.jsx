import './button.scss';

const Button = ({children, severity="primary", ...rest}) => {
  return <button className={`custom-btn ${severity}`} {...rest}>{children}</button>;
};

export default Button;
