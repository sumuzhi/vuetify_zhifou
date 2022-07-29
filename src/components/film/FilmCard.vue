<template>
  <v-sheet :width="width">
    <v-img class="rounded-lg" :height="height" :src="filmItem.pic">
      <span class="white--text" style="position: absolute; top: 5px; right: 0">
        <slot name="topLabel" :topLabel="filmItem.topLabel"></slot>
      </span>
      <span class="white--text" style="position: absolute; bottom: 5px; right: 5px">
        <slot name="bottomSlot" :bottomLabel="filmItem.bottomLabel"></slot>
      </span>
    </v-img>
    <div class="my-1 text-body-1">{{ filmItem.title }}</div>
    <div class="my-1 grey--text text--darken-1 text-body-2">
      {{ filmItem.subtitle }}
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'FilmCard',
  props: {
    filmItem: {
      type: Object,
    },
    width: { type: String, default: '216' },
    height: { type: String, default: '280' },
  },
}
</script>

<style></style>
