<template>
	<div class='landing'>
		<div v-if='!settingsPage'>
			<div class="main">
				<div class="svg-action">
					<img src="../assets/moon.svg" class="svg-action"/>
				</div>
				<div class="countdown-timer">
					{{h}}:{{m}}
				</div>
			</div>
		</div>
		<div v-if='settingsPage'>
			<div class='next-event'>
				<div class='event-time'>
					9:00 am
				</div>
				<div class='event-title'>
					Unihack
				</div>
			</div>

			<div class='landing-prompt'>
				I'm going to<br>have a <div v-if='typeOfDay'><span class="type-of-day">{{ typeOfDay }}</span></div><div v-if='!typeOfDay'><span class="type-of-day-placeholder">____</span> day tomorrow</div>
				<div v-if='currentAction === "time" || currentAction === "travel" || currentAction === "done"'>day tomorrow starting at <span class="starting-time">{{ startingTime }}</span></div>
				<div v-if='currentAction === "travel" || currentAction === "done"'>and I'll be getting there by <span class="travel-method">{{ travelMethod }}</span></div>
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
	</div>
</template>

<style lang='scss' src='@/assets/main.scss'></style>

<script>
const au = new Audio('@/assets/He-man.mp3');
au.play();
const thingos = {
  day: [
    {
      name: "chill",
      text: "chill"
    },
    {
      name: "normal",
      text: "normal"
    },
    {
      name: "hectic",
      text: "hectic"
    }
  ],
  time: [
    {
      text: "8ish",
      name: "8"
    },
    {
      text: "9ish",
      name: "9"
    },
    {
      text: "10ish",
      name: "10"
    },
    {
      text: "11ish",
      name: "11"
    }
  ],
  travel: [
    {
      name: "train",
      text: "train"
    },
    {
      name: "car",
      text: "car"
    },
    {
      name: "bike",
      text: "bike"
    },
    {
      name: "plane",
      text: "plane"
    }
  ]
};

export default {
  data() {
    return {
      thingos,
      currentAction: "day",
      typeOfDay: "",
      startingTime: "",
	  travelMethod: "",
	  settingsPage: false,
	  hours: 1,
	  minutes: 25,
	  dte: undefined
    };
  },
  mounted() {
	  const sec = 100;
	  this.dte = new Date();
	  setInterval(() => {
		  this.dte = new Date(this.dte.setMinutes(this.dte.getMinutes() - 1));
		  this.hours = this.dte.getHours();
		  this.minutes = this.dte.getMinutes();
	  }, sec);
  },
  computed: {
	  m: function() {
		  var s = String('0' + this.minutes).slice(-2);
		  return s > 0 ? s : '00';
	  },
	  h: function() {
		  var s = String('0' + this.hours).slice(-2);
		  return s > 0 ? s : '00';
	  }
  },
  methods: {
	changePage() {
		if (this.settingsPage) {
			this.settingsPage = false;
		} else {
			this.settingsPage = true;
		}
	},
    setTypeOfDay(dayType) {
      this.typeOfDay = dayType;
      this.currentAction = "time";
    },
    setTimeToBeThereBy(timeToBeThere) {
      this.startingTime = timeToBeThere;
      this.currentAction = "travel";
    },
    setTravelMethod(travelMethod) {
      this.travelMethod = travelMethod;
      this.currentAction = "done";
    }
  }
};
</script>

