import {createStore}from 'redux';
import {devToolsEnhancer}from 'redux-devtools-extension/logOnlyInProduction';

import calculateAspectRatioFit from './helpers/calculateAspectRatioFit';
import memeGeneratorApp from './reducers';
import {setImage, setTopText, setBottomText}from './actions';

export default class MemeGenerator {
	constructor(container, options) {
		this.container = document.querySelector(container);
		this.canvas = this.container.querySelector('canvas');
		this.context = this.canvas.getContext('2d');

		const defaults = {
			initImageNode: this.container.querySelector('.meme-generator-init-image'),
			topTextNode: document.querySelector('.meme-generator-top-text'),
			bottomTextNode: document.querySelector('.meme-generator-bottom-text'),
			imagesNodesCollections: document.querySelectorAll('.meme-generator-img'),
			downloadNode: document.querySelector('.meme-generator-download-meme'),
			textStyle: {
				font: '60pt Impact',
				strokeStyle: '#000000',
				fillStyle: '#ffffff',
				textAlign: 'center',
				textBaseline: 'top',
				lineCap: 'round'
			}
		};
		this.config = {
			...defaults,
			...options
		};

		this.store = createStore(
			memeGeneratorApp, {
				memeImage: this.config.initImageNode,
				topText: this.config.topTextNode.value,
				bottomText: this.config.bottomTextNode.value
			},
			devToolsEnhancer()
		);

		this.config.imagesNodesCollections.forEach(el => {
			el.addEventListener('click', () => {
				this.clickImageEventHandler(el);
			});
		});

		this.config.topTextNode.addEventListener('input', e => {
			this.inputTopTextEventHandler(e.target.value);
		});

		this.config.bottomTextNode.addEventListener('input', e => {
			this.inputBottomTextEventHandler(e.target.value);
		});

		this.config.downloadNode.addEventListener('click', e => {
			e.target.href = this.canvas.toDataURL();
		});

		this.store.subscribe(() => {
			this.update();
		});
		this.render();
	}

	clickImageEventHandler(image) {
		this.store.dispatch(setImage(image));
	}

	inputTopTextEventHandler(text) {
		this.store.dispatch(setTopText(text));
	}

	inputBottomTextEventHandler(text) {
		this.store.dispatch(setBottomText(text));
	}

	update() {
		const {
			memeImage,
			topText,
			bottomText
		} = this.store.getState();
		console.dir(memeImage);
		const {width, height} = calculateAspectRatioFit(memeImage.width, memeImage.height, this.container.offsetWidth, this.container.offsetHeight);
		this.canvas.width = width;
		this.canvas.height = height;
		this.context.drawImage(memeImage, 0, 0, width, height);

		Object.assign(this.context, this.config.textStyle);
		// console.log(this.context);

		this.context.fillText(topText, this.canvas.width / 2, 0);
		this.context.strokeText(topText, this.canvas.width / 2, 0);
		this.context.fillText(bottomText, this.canvas.width / 2, this.canvas.height - 100);
		this.context.strokeText(bottomText, this.canvas.width / 2, this.canvas.height - 100);
	}

	render() {
		this.update();
	}
}
