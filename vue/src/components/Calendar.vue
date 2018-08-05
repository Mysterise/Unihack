<template>
  <div class="calendar-event">
    <div class="start">{{time}}</div>
    <div class="title">{{event.title}}</div>
      <div class="location">    {{event.location}}
      </div>
  </div>
</template>

<script>
  import * as dateFns from 'date-fns';


  export default {
    name: 'Calendar',
    time: '',
    data() {
      return {
        time: new Date()
      };
    },
    props: {
      event: Object
    },
    watch: {
      event: function() {
        this.time = dateFns.format(this.event.start, 'h:mm a');
      }
    }
  }
</script>

