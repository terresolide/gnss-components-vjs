<template>
 <span>
  <ssr-carousel :key="componentKey" :value="index" :show-dots="images.length > 1" :show-arrows="images.length > 1"> 
             <div v-for="img, id in images"  :key="id" class="slide" style="text-align:center;">
               <img :src="img" :height="height"/>
             </div>
  </ssr-carousel> 
 </span>
</template>
<script>
import SsrCarousel from 'vue-ssr-carousel'
export default {
  name: 'GnssCarousel',
  components: {
   SsrCarousel
  },
  watch: {
    images (newimgs) {
      this.index = 0
      this.componentKey = this.componentKey + 1
      this.$forceUpdate()
    }
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      componentKey: 0,
      index: 1
    }
  }
}
</script>
<style src="vue-ssr-carousel/index.css"></style>
