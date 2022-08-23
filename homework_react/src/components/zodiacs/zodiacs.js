import React from 'react';
import './style/zodiac.css';
import oven from './img/oven.jpg';
import taurus from './img/taurus.jpg';
import twins from './img/twins.jpg';
import crayfish from './img/crayfish.jpg';
import lion from './img/lion.jpg';
import virgo from './img/virgo.jpg';
import scales from './img/scales.jpg';
import scorpion from './img/scorpion.jpg';
import sagittarius from './img/sagittarius.jpg';
import capricorn from './img/capricorn.jpg';
import aquarius from './img/aquarius.jpg';
import fish from './img/fish.jpg';


function Zodiacs() {
	return (
		<div className='box'>
			<div className='box-zodiacs'>
				<h3>Овен</h3>
				<img src={oven} alt="Oven"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Телец</h3>
				<img src={taurus} alt="Taurus"/>
			</div>	
			<div className='box-zodiacs'>
				<h3>Близнецы</h3>
				<img src={twins} alt="Taurus"/>
			</div>	
			<div className='box-zodiacs'>
				<h3>Рак</h3>
				<img src={crayfish} alt="Сrayfish"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Лев</h3>
				<img src={lion} alt="lion"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Дева</h3>
				<img src={virgo} alt="Virgo"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Весы</h3>
				<img src={scales} alt="Scales"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Скорпион</h3>
				<img src={scorpion} alt="Scorpion"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Стрелец</h3>
				<img src={sagittarius} alt="sagittarius"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Козерог</h3>
				<img src={capricorn} alt="Capricorn"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Водолей</h3>
				<img src={aquarius} alt="Aquarius"/>
			</div>
			<div className='box-zodiacs'>
				<h3>Рыбы</h3>
				<img src={fish} alt="Fish"/>
			</div>
		</div>
		)
}

export default Zodiacs;