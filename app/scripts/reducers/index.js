import memeImage from './memeImage';
import topText from './topText';
import bottomText from './bottomText';
import {combineReducers}from 'redux';

const memeGeneratorApp = combineReducers({
	memeImage,
	topText,
	bottomText
});

export default memeGeneratorApp;
