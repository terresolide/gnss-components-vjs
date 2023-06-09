<template>
 <div class="page-station" style="width:100%;position:relative;overflow:hidden;">

  <gnss-menu :top="55"></gnss-menu>
    
 <div class="station-content" >
     <div class="station-header">
      <h2>Solution {{name}}</h2>
     </div>
      <div class="station-body" style="min-height:calc(100vh - 70px);">
        <pre v-if="metadata">{{metadata}}</pre>
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
    this.getMetadata()
  },
  data () {
    return {
      name: null,
      metadata: null,
    }
  },
  methods: {
    close (e) {
      
    },
    get () {
      
    },
    getMetadata () {
      this.$http.get('https://spotgins.formater/documentation/spotgins.acn')
      .then(resp => {this.metadata = resp.body})
    }
  }
}
</script>
<style>

</style>