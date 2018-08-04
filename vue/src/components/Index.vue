<template>
	<div class='landing'>
		<div>
			I'm going to have a {{ typeOfDay }}
			<div v-if='currentAction === "time" || currentAction === "travel" || currentAction === "done"'>day tomorrow starting at {{ startingTime }}</div>
			<div v-if='currentAction === "travel" || currentAction === "done"'>and I'll be getting there by {{ travelMethod }}</div>
		</div>

		<div class='landing-buttons'>
			<div v-if='currentAction === "day"'>
				<button v-for='thingo in thingos.day' @click.prevent='setTypeOfDay(thingo.name)'>{{thingo.text}}</button>
			</div>

			<div v-if='currentAction === "time"'>
				<button v-for='thingo in thingos.time' @click.prevent='setTimeToBeThereBy(thingo.name)'>{{thingo.text}}</button>
			</div>

			<div v-if='currentAction === "travel"'>
				<button v-for='thingo in thingos.travel' @click.prevent='setTravelMethod(thingo.name)'>{{thingo.text}}</button>
			</div>
		</div>
	</div>
</template>

<style lang='scss' src='@/assets/main.scss'></style>

<script>
	const thingos = {
		day: [
			{
				name: 'chill',
				text: 'chill'
			},
			{
				name: 'normal',
				text: 'normal'
			},
			{
				name: 'hectic',
				text: 'hectic'
			}
		],
		time: [
			{
				text: '8ish',
				name: '8'
			},
			{
				text: '9ish',
				name: '9'
			},
			{
				text: '10ish',
				name: '10'
			},
			{
				text: '11ish',
				name: '11'
			}
		],
		travel: [
			{
				name: 'train',
				text: 'train'
			},
			{
				name: 'car',
				text: 'car'
			},
			{
				name: 'bike',
				text: 'bike'
			},
			{
				name: 'plane',
				text: 'plane'
			},
		]
	}

	export default {
		data() {
			return {
				thingos,
				currentAction: 'day',
				typeOfDay: '',
				startingTime: '',
				travelMethod: ''
			};
		},
		methods: {
			setTypeOfDay(dayType) {
				this.typeOfDay = dayType;
				this.currentAction = 'time';
			},
			setTimeToBeThereBy(timeToBeThere) {
				this.startingTime = timeToBeThere;
				this.currentAction = 'travel'
			},
			setTravelMethod(travelMethod) {
				this.travelMethod = travelMethod;
				this.currentAction = 'done';
			}
		}
	}
</script>

