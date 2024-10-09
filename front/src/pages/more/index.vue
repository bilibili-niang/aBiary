<script setup lang="ts">
import topBar from '@/components/common/topBar/index.vue'
import TabBar from '@/components/common/tabBar/tabBar.vue'
import Text from '@/components/common/Text/index.vue'
</script>

<template>
  <div class="more">
    <topBar title="更多"></topBar>
    <Text>
      未完待续...
    </Text>

  </div>
  <TabBar/>
</template>

<style scoped lang="less">
.more {
  padding: @padding-n;
}

</style>