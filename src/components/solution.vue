<template>
 <div class="page-station" style="width:100%;position:relative;overflow:hidden;">

  <gnss-menu :top="55"></gnss-menu>
    
 <div class="station-content" >
     <div class="station-header">
      <span class="close button" @click="close($event)" style="margin-right:20px;"><font-awesome-icon icon="fa-solid fa-close" /></span>
      <h2 >Solution {{name}}</h2>
     </div>
      <div class="station-body" style="min-height:calc(100vh - 70px);">
      </div>
 </div>
 </div>
</template>
<script>
import GnssMenu from './gnss-menu.vue'
export default {
  name: 'Solution',
  components: {GnssMenu},
  created () {
    console.log(this.$route.params)
  },
  methods: {
    close (e) {
      
    }
  }
}
</script>