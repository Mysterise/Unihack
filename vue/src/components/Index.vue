<template>
	<div class='landing'>
		<div v-if='!settingsPage'>
			<div class="main">
				<div class="svg-action">
					<!-- <img :src="'../assets/' + svg_selected + '.svg'" class="svg-action"/> -->
					<div v-if='action_idx === 0'>
						<img src="../assets/moon.svg" class="svg-action"/>
					</div>
					<div v-if='action_idx === 1'>
						<img src="../assets/socks.svg" class="svg-action"/>
					</div>
					<div v-if='action_idx === 2'>
						<img src="../assets/train.svg" class="svg-action"/>
					</div>
					<div v-if='action_idx === 3'>
						<img src="../assets/sheep.svg" class="svg-action"/>
					</div>
					<!-- <img v-bind:src="`../assets/${svg_selected}.svg`"/> -->
					<!-- <img :src="'../assets/'+svg_selected" /> -->
				</div>
				<!-- <div v-if='arrived'>
					You've arrived!
				</div> -->
				<div v-if='!arrived'>
					<div class="countdown-timer">
						{{h}}:{{m}} to <br />
						{{ current_action }}
					</div>
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

import axios from 'axios';
  const au = new Audio("@/assets/He-man.mp3");
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

const all_actions = [
  "sleep",
  "wake up",
  "train arrives",
  "arriving at Central station"
];
const all_durations = [12, 15, 15, 15];
let action_idx = 0;

function secToMins(secs) {
	  return secs - secToHours(secs) * 60;
  }
  function secToHours(secs) {
	  return Math.floor(secs / 60);
  }
export default {
  data() {
    return {
      thingos,
      currentAction: "day",
      typeOfDay: "",
      startingTime: "",
      travelMethod: "",
      settingsPage: false,
      hours: secToHours(all_durations[0]),
	  minutes: secToMins(all_durations[0]),
	  action_idx: 0,
      dte: 0,
	  current_action: all_actions[0],
	  arrived: false
    };
  },
  created() {
    axios.get("http://localhost:9000/calendar_events").then(res => {
      console.log('res', res);
    });
  },
  mounted() {






    const sec = 100;
    this.dte = this.hours * 60 + this.minutes;
    setInterval(() => {
	  this.dte -= 1; //new Date(this.dte.setMinutes(this.dte.getMinutes() - 1));
	//   if (this.dte === 0 && this.action_idx === all_actions.length) {
	// 	  this.arrived = true;
    //   }
      if (this.dte === 0) {
        action_idx += 1;
        this.action_idx += 1;
        this.current_action = all_actions[action_idx];
        this.dte = all_durations[action_idx];
        this.hours = secToHours(all_durations[action_idx]);
        this.minutes = secToMins(all_durations[action_idx]);
      }
      this.hours = secToHours(this.dte); //this.dte.getMinutes();
      this.minutes = secToMins(this.dte); //this.dte.getHours();
    }, sec);
  },
  computed: {
    m: function() {
      var s = String("0" + this.minutes).slice(-2);
      return s > 0 ? s : "00";
    },
    h: function() {
      var s = String("0" + this.hours).slice(-2);
      return s > 0 ? s : "00";
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

