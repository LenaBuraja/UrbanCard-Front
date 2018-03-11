import React from "react";
import DuckImage from "assets/images/Duck.jpg";

export default () => (
	<div className='home'>
		<h4>Welcome!</h4>
		<img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
	</div>
);
