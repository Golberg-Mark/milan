import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLOrSVGElement> {

}

const SuccessIcon: React.FC<Props> = (props) => {
  return (
	  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		  <path d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM12.585 7.275L8.3325 11.5275C8.2275 11.6325 8.085 11.6925 7.935 11.6925C7.785 11.6925 7.6425 11.6325 7.5375 11.5275L5.415 9.405C5.1975 9.1875 5.1975 8.8275 5.415 8.61C5.6325 8.3925 5.9925 8.3925 6.21 8.61L7.935 10.335L11.79 6.48C12.0075 6.2625 12.3675 6.2625 12.585 6.48C12.8025 6.6975 12.8025 7.05 12.585 7.275Z" fill="#27A376"/>
	  </svg>
  );
};

export default SuccessIcon;
