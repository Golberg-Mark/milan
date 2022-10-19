import React from 'react';

interface Props {
	color?: string
}

const SuccessIcon: React.FC<Props> = ({ color = '#25AE88' }) => {
  return (
		<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 50 50" enableBackground="new 0 0 50 50" xmlSpace="preserve">
				<circle fill={color} cx="25" cy="25" r="25"/>
				<polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="
			38,15 22,33 12,25 "/>
		</svg>
	);
};

export default SuccessIcon;
