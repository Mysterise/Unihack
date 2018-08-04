import * as React from 'react';

import { Landing } from '@/components/Landing';
import { Countdown } from '@/components/Countdown';

export class App extends React.Component {
	render() {
		return (
			<div>
				<Countdown />
				<Landing/>
			</div>
		)
	}
}
