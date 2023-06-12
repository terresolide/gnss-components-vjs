<template>
 <div class="page-station" style="width:100%;position:relative;overflow:hidden;">

  <gnss-menu :top="55"></gnss-menu>
    
 <div class="station-content" >
     <div class="station-header">
      <span v-if="!$route.query.newTab" class="close button" @click="close($event)" style="margin-right:20px;"><font-awesome-icon icon="fa-solid fa-close" /></span>
     
      <h2>Solution {{name}}</h2>
     </div>
      <div class="station-body" style="min-height:calc(100vh - 70px);">
        <pre v-if="metadata" style="width:auto;white-space: pre-wrap;">{{metadata}}</pre>
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
    this.name = this.$route.params.name
   
    this.get()
    window.scrollTo(0, 0)
  },
  computed: {
    api () {
      return this.$store.getters['api']
    }
  },
  data () {
    return {
      name: null,
      metadata: null,
      solution: null
    }
  },
  methods: {
    close (e) {
      this.$router.go(-1)
    },
    get () {
      this.$http.get(this.api + 'solutions/' + this.name)
      .then(resp => {
        if (resp.body.name) {
          this.solution = resp.body
          if (this.solution.metadata) {
            this.getMetadata()
          }
        }
      })
    },
    getMetadata () {
      if (this.solution.encodingType === 'text/plain')
      this.$http.get(this.solution.metadata)
      .then(resp => {this.metadata = resp.body})
    }
  }
}
</script>
<style>

</style>