import * as React from 'react';
import sleep from 'assets/action_sleep.svg';
import Actions from '@/constants/Actions';

export class Countdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			action
		}
	}
	render() {
		return (
			<div>
				<img src={svg_action} className="action-svg" alt="status of the current action" />
			</div>
		)
	}
}
