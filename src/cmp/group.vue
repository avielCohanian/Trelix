<template>
    <section class="group">
        <div v-for="card in group" :key="card.id">
        <card :card="card"/>
        </div>
    </section>
    
</template>

<script>
import card from './card.vue';

export default {
  components: { card },
  props:['group'],
    name: 'group',
};
</script>

<style></style>