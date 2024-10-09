<template>
  <div class="container">
    <Index v-if="global.$state.activeKey===1"/>
    <More v-if="global.$state.activeKey===2"/>
    <Mine v-if="global.$state.activeKey===3"/>

    <TabBar/>
  </div>
</template>
<script setup lang="ts">
import TabBar from '@/components/common/tabBar/tabBar.vue'
import Index from '@/pages/index/index.vue'
import More from '@/pages/more/index.vue'
import Mine from '@/pages/mine/index.vue'
import { globalState } from '@/stores/modules/gloal'

const global = globalState()

</script>
<style lang="less" scoped>

</style>
