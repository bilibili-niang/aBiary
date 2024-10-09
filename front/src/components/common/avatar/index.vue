<script setup lang="ts">
import {defineProps, ref} from 'vue'
import {baseUrl} from "@/utils/config.js";

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  /**
   * size props
   * @emample{size}
   * n (default),s (small), l (large),ls (more large)
   */
  size: {
    type: String,
    default: 'n'
  },
  /**
   * round props
   * @emample{round}
   * true (50% border-radius), false (default border-radius)
   */
  round: {
    type: Boolean,
    default: false
  }
})

// 当 errorFlag 为false 时展示出错的图片
let errorFlag = ref(true)
let imgOnError = () => {
  errorFlag.value = false
}

</script>
<template>
  <div class="ice-avatar"
       :class="[
      size==='s'?'noMargin':''
  ]"
  >
    <img :src="errorFlag ? url: baseUrl+'/images/avatar.png'" class="ice-avatar-image"
         :class="[
        'size-'+size,
        round?'round':'noRound'
    ]"
         @error="imgOnError">
  </div>
</template>

<style scoped lang="less">
.ice-avatar{
  display: flex;
  margin: @margin-m;
  width: fit-content;
  height: fit-content;

  .ice-avatar-image{
    display: flex;
  }

  .size-s{
    width: 17vw;
    height: 17vw;
  }

  .size-n{
    width: 20vw;
    height: 20vw;
  }

  .size-l{
    width: 40vw;
    height: 40vw;
  }

  .size-l-s{
    width: 45vw;
    height: 45vw;
  }

  .size-full{
    width: 100%;
    height: 100%;
  }

  .noRound{
    border-radius: @radio-m;
  }

  .round{
    border-radius: 50%;
  }
}
</style>