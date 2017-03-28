export default function bottomText(state = '', action) {
	switch (action.type) {
		case 'SET_BOTTOM_TEXT':
			return action.text;
		default:
			return state;
	}
}
