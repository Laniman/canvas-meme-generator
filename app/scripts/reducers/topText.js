export default function topText(state = '', action) {
	switch (action.type) {
		case 'SET_TOP_TEXT':
			return action.text;
		default:
			return state;
	}
}
