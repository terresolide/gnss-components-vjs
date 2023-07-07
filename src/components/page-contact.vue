<template>
 <div class="page-station" style="width:100%;position:relative;overflow:hidden;">

  <gnss-menu :top="55"></gnss-menu>
   
 <div class="station-content"  >
     <div class="station-header">
      <span v-if="!$route.query.newTab" class="close button" @click="close($event)" style="margin-right:20px;"><font-awesome-icon icon="fa-solid fa-close" /></span>
     
      <h2>Contact us</h2>
     </div>
      <div class="station-body"  >
        
      
      </div>
 </div>
 </div>
</template>
<script>
import GnssMenu from './gnss-menu.vue'
export default {
  name: 'PageContact',
  components: {GnssMenu},
  created () {
  },
  
  data () {
    return {
      
    }
  },
  methods: {
    close (e) {
      if (window.history.length <= 2) {
        this.$router.push({name: 'home'})
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
