import React, { SVGAttributes } from 'react';

interface Props extends SVGAttributes<HTMLOrSVGElement> {

}

const ErrorIcon: React.FC<Props> = (props) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2.5C6.49 2.5 2 6.99 2 12.5C2 18.01 6.49 22.5 12 22.5C17.51 22.5 22 18.01 22 12.5C22 6.99 17.51 2.5 12 2.5ZM15.36 14.8C15.65 15.09 15.65 15.57 15.36 15.86C15.21 16.01 15.02 16.08 14.83 16.08C14.64 16.08 14.45 16.01 14.3 15.86L12 13.56L9.7 15.86C9.55 16.01 9.36 16.08 9.17 16.08C8.98 16.08 8.79 16.01 8.64 15.86C8.35 15.57 8.35 15.09 8.64 14.8L10.94 12.5L8.64 10.2C8.35 9.91 8.35 9.43 8.64 9.14C8.93 8.85 9.41 8.85 9.7 9.14L12 11.44L14.3 9.14C14.59 8.85 15.07 8.85 15.36 9.14C15.65 9.43 15.65 9.91 15.36 10.2L13.06 12.5L15.36 14.8Z" fill="#DD5757"/>
    </svg>
  );
};

export default ErrorIcon;
