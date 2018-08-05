<template>
  <div class="trip">
    <div class="dots">
      ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    </div>
    <div class="inner">
      <div class="origin">{{trip.origin}}</div>
      <div class="duration">25 minutes</div>
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

