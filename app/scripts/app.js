import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import Swiper from 'swiper';
import MemeGenerator from './MemeGenerator';

$(() => {
	svg4everybody();

	Object.create(new Swiper('.slider', {
		direction: 'horizontal',
		slidesPerView: 'auto',
		slideClass: 'slider__slide',
		wrapperClass: 'slider__wrapper'
	}));

	Object.create(new MemeGenerator('.hero', {
		initImageNode: document.querySelector('#previewImage'),
		topTextNode: document.querySelector('#inputTopText'),
		bottomTextNode: document.querySelector('#inputBottomText'),
		imagesNodesCollections: document.querySelectorAll('.slider__slide'),
		downloadNode: document.querySelector('.navbar__download')
	}));
});
