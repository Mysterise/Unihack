<template>
  <div class="trip">
    <div class="inner">
      <div class="origin">{{trip.origin}}</div>
      <div class="duration">{{Math.round(trip.duration/60)}} minutes</div>
      <div class="destination">    {{trip.destination}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Location',
    props: {
      trip: Object
    }
  }
</script>

