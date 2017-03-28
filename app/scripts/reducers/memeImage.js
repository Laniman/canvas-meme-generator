export default function memeImage(state = 'undefined', action) {
	switch (action.type) {
		case 'SET_IMAGE':
			return action.image;
		default:
			return state;
	}
}
