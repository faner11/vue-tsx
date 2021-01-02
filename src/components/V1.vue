<template>
  <p>vue file</p>
  <Stateless name="王五" :age="age" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Stateless from './Stateless'
export default defineComponent({
  components: { Stateless },
  setup() {
    const age = ref(12)
    return { age }
  }
})
</script>
