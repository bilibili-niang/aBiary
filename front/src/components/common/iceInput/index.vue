<script setup lang="ts">
import {computed, defineEmits, defineProps} from 'vue';

const emits = defineEmits(['update:modelValue', 'clickTrigger'])
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  /**
   * 是否开启input禁用
   */
  disable: {
    type: Boolean,
    default: false
  },
  /**
   *  输入框右侧的icon
   */
  icon: {
    type: String,
    default: ''
  },
  placeholderText: {
    type: String,
    default: "请输入"
  }
})

const nativeInputValue = computed(() =>
    props.modelValue === null || props.modelValue === undefined
        ? ""
        : String(props.modelValue)
)

const handleChange = (e: any) => {
  const value = e.target.value
  if (value === nativeInputValue.value) return
  emits("update:modelValue", value)
}
const clickEmit = () => {
  emits("clickTrigger")
}
</script>

<template>
  <div class="ice-input" @click="clickEmit">
    <div class="ice-text inputBlock" v-if="disable">
      {{ nativeInputValue || placeholderText }}
    </div>
    <input type="text" :value="nativeInputValue" :disable="disable"
           :placeholder="placeholderText"
           @input="handleChange" class="inputContent ice-text" v-else>
  </div>
</template>

<style scoped lang="less">
ice-input{
  width: 100%;
}
.ice-input{
  width: 100%;
  min-width: 40vw;

  .inputBlock{
    border-bottom: @fontColor-gray-bleak 1px solid;
    color: @fontColor-gray-bleak;
  }

  .inputContent{
    width: 100%;
    transition-duration: @time-m;
    border-bottom: @borderColor 1px solid;
  }
}

</style>