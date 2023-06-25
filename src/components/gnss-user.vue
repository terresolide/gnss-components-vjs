<template>
 <div class="page-station" style="width:100%;position:relative;overflow:hidden;">
    <div class="station-content" >
     <div class="station-header">
      <span class="close button" @click="close($event)" style="margin-right:20px;"><font-awesome-icon icon="fa-solid fa-close" /></span>
     
      <h2>Your account</h2>
     </div>
     <div v-if="user">{{user.email}}</div>
    </div>
 </div>
</template>
<script>
export default {
  name: 'GnssUser',
  props: {
    top: {
      type: Number,
      default: 5
    }
  },
  computed: {
    user () {
      //return {'name': 'Elisabeth'}
      
      return this.$store.getters['user/get']
    }
  },
  created () {
    if (!this.user) {
      
    }
  },
  methods: {
    close(e) {
      this.$router.go(-1)
    }
    
  }
}
</script>
<style scoped>
  .gnss-user {
    position:absolute;
    top:5px;
    right:0;
    z-index:100
  }
 


</style>