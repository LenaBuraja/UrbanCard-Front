import React from 'react';
import PropTypes from 'prop-types';
import Img0 from '../../assets/images/cards/cardDefault.png';
import Img1 from '../../assets/images/cards/cardGreen.png';
import Img2 from '../../assets/images/cards/cardPurple.png';
import Img3 from '../../assets/images/cards/cardYellow.png';

const images = [Img0, Img1, Img2, Img3];

class Card extends React.Component {
	render() {
		return <img src={images[Math.floor(this.props.id % images.length)]} alt="" />
	}
}

Card.propTypes = {
	id: PropTypes.number.isRequired,
};

export default Card;
