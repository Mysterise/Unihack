import * as React from 'react';

import { Landing } from '@/components/Landing';

document.body.onclick = () => {
	window.navigator.vibrate([1000, 100, 1000, 100, 1000]);
}

export class App extends React.Component {
	render() {
		return (
			<div>
				<Landing/>
			</div>
		)
	}
}
