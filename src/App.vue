<template>
  <div id="app">
    <app-header />
    <router-view class="main-layout"></router-view>
  </div>
</template>

<script>
import appHeader from '../src/cmp/app-header';

export default {
  data() {
    return {
      loadUser: false,
    };
  },
//   async created() {
//     try {
//       await this.$store.dispatch({ type: 'logIn', user: { email: 'p', password: 'p' } });
//       this.loadUser = true;
//     } catch (err) {
//       console.log(err);
//     }
//   },
  components: {
    appHeader,
  },
  computed: {},
  methods: {},
};
</script>
