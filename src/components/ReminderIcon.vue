<template>
  <div class="color-palette">
    <md-icon>add_alert</md-icon>
  </div>
</template>
<script>
export default {
  name: "ReminderIcon",
  props:["note"],
};
</script>
<style scoped>
.color-palette {
  cursor: pointer;
  margin-left: 5px;
}
</style>