<template>
 <span>
 <div style="overflow:hidden;position:relative;" :style="{width:(nbSlides * slideWidth) + 'px'}">
    <div style="text-align:center;" v-if="nbSlides < $slots.slide.length">
           <span v-for="file, index in $slots.slide" style="padding: 0 3px;">
              <span v-if="index >= curSlide && index < curSlide + nbSlides">
               <font-awesome-icon :icon="['fas', 'circle']" />
              </span>
              <span v-else>
                <font-awesome-icon :icon="['far', 'circle']" />
              </span>
           </span>
         </div>
       <div v-if="nbSlides < $slots.slide.length" class="btn-navigation" :class="{disabled: curSlide === 0}" @click="curSlide= curSlide - 1" >
           <font-awesome-icon :icon="['fas', 'circle-chevron-left']" />
       </div>
        <div v-if="nbSlides < $slots.slide.length" class="btn-navigation"  :class="{disabled: curSlide + nbSlides >= $slots.slide.length}" 
        style="right:0;" @click="curSlide = curSlide + 1">
           <font-awesome-icon :icon="['fas', 'circle-chevron-right']" />
       </div>
   <div class="slider-container" :style="{width: $slots.slide.length * slideWidth + 'px',  transform: 'translateX(' + ((index - curSlide) * slideWidth ) + 'px)'}">
        
      <!--  <div  v-for="slide, index in $slots.slide" class="slide-container"  :style="{width: slideWidth + 'px', transform: 'translateX(' + ((index - curSlide) * slideWidth ) + 'px)'}" > -->
         <slot name="slide" ></slot>
      <!--  </div> -->
       </div>
 </div>
 </span>
</template>
<script>
export default {
  name: 'GnssCarousel',
  components: {
  },
  
  props: {
    
    slideWidth: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      nbSlides: 1,
      curSlide: 0,
      index:0
    }
  }
}
</script>
<style scoped>
div.slider {
  position:relative;
  min-height: 660px;
  margin-left:0px;
  margin-top:5px;
  overflow-x:visible;
  overflow-y: hidden;
  }
  div.slide-container {
    position:absolute;
    border-radius:10px;
    width:445px;
    min-height:630px;
    vertical-align:top;
    display:block;
    transition: all 0.5s;
  }
  div.btn-navigation {
    position:absolute; 
    top:45%;
    z-index:4;
    font-size:30px;
    opacity:0.8;
    cursor:pointer;
  }
  div.btn-navigation.disabled {
    opacity:0.5;
    pointer-events:none;
  }
  div.btn-navigation:hover {
    opacity:1;
  }
</style>
