<template>
  <div class="color-palette">
    <md-icon>more_vert</md-icon>
    <div class="more-options">
    </div>
  </div>
</template>

<script>
export default {
  name: "FundooMore",
};
</script>

<style scoped>
.color-palette {
  cursor: pointer;
}

.more-options{
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 10%; 
}
</style>