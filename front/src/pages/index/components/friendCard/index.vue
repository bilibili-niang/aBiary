<script setup lang="ts">
import {defineProps} from "vue";
import iceAvatar from '@/components/common/avatar/index.vue'


let props = defineProps({
  item: {
    type: Object
  },
  bacColor: {
    type: String
  },
  borderColor: {
    type: String
  },
  avatar: {
    type: String
  }
})
</script>

<template>
  <div class="friendCard" :style="{
    'backgroundColor': props.bacColor,
    'borderColor': props.borderColor
  }" :class="[
      borderColor?'borderStyle':''
  ]" @click="$emit('click', $event)">
    <div class="ice-row">
      <div class="imageLim" :style="{ 'backgroundColor': props.bacColor }">
        <ice-avatar size="s" :url="props.avatar"></ice-avatar>
      </div>
      <div class="textLim">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.borderStyle{
  border-style: dashed;
  border-width: 1px;
}
.friendCard{
  margin-bottom: @margin-s;
  margin-left: @margin-s;
  margin-right: @margin-s;
  padding: @padding-n;
  border-radius: @radio-m;

  .imageLim{
    padding: @padding-s;
    display: flex;
    border-radius: @radio-m;
  }

  .textLim{
    margin-left: @margin-l;
    flex: 1;
  }
}
</style>