import * as React from 'react';

enum DayTypes {
	fallback = 'normal',
	busy = 'busy',
}

interface IDayType {
	name: DayTypes;
	text: string;
	className?: string;
}

interface IProps {

}

interface IState {
	dayType: DayTypes;
}

export class Landing extends React.Component<IProps, IState> {
	constructor() {
		super({});

		this.state = {
			dayType: DayTypes.fallback
		};
	}

	private getDayTypes(): { [index: string]: IDayType } {
		return {
			[DayTypes.fallback]: {
				name: DayTypes.fallback,
				text: 'epic',
				className: 'somewhat-hidden'
			},
			[DayTypes.busy]: {
				name: DayTypes.busy,
				text: 'super busy'
			}
		};
	}

	private changeDayType(newDayType: DayTypes): void {
		this.setState({ ...this.state, dayType: newDayType });
	}

	render() {
		return (
			<div className={'landing'}>
				I've got a <span className={this.getDayTypes()[this.state.dayType].className}>{ this.state.dayType }</span><br/>day tomorrow
				<br/>
				<button onClick={this.changeDayType.bind(this, DayTypes.busy)}>busy</button>
				<button onClick={this.changeDayType.bind(this, DayTypes.fallback)}>normal</button>
			</div>
		)
	}
}
