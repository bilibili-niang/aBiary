<script setup lang="ts">
import {computed, defineEmits, defineProps} from 'vue';


const emits = defineEmits(['update:modelValue', 'clickTrigger'])

const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
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
  <div class="ice-textarea">
    <textarea class="inputArea" @click="clickEmit" :value="nativeInputValue" @input="handleChange" name="remark"
              placeholder="请输入备注"
              auto-focus="true"/>
  </div>
</template>

<style scoped lang="less">
.ice-textarea{
  border-radius: @radio-m;
  background: @bacColor-dark-bleak-bleak;
  padding: @padding-s;

  .inputArea{
    color: @fontColor;
    display: flex;
    flex: 1;
    font-size: @font-m;
  }
}
</style>