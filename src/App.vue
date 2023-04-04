<template>
 <div class="spotgins" style="position:relative;">
 <!--   <spot-gins root="https://catalog.formater/FROST-Server/v1.1/" ></spot-gins>
 -->
 <div  id="page">
           <router-view ></router-view>
 </div>
 </div>
</template>

<script>
// import SpotGins from './components/spot-gins.vue'

export default {
  name: 'App',
  components: {
    // SpotGins
  },
  created () {
    this.searchCodeLists()
  },
  mounted () {
    if (this.$route) {
      console.log(this.$route)
    }
  },
  methods: {
    searchCodeLists () {
      this.$http.get(this.$store.getters['api'] + 'codelists/')
      .then(resp => {
        this.$store.commit('setCodeList', resp.body)
      })
    }
  }
}
</script>
<style>
.spotgins {
  font-family: sans-serif;
  line-height:1;
}
#page {
  position: absolute;
  width:100%;
  height: 100vh;
  width: 100vw;
  min-height:500px;
  top:0;
  left:0;
  margin:0;
  padding:0;
  z-index:3000;
  background: white;
}
</style>
