<template>
<div class="date-navigation" style="background: rgba(255,255,255,0.7)">
     <span class="serie-navigation" :class="{disabled: date === firstDate }">
       <span class="fa fa-angle-double-left" :style="{backgroundColor:color}" @click="goToFirst()"></span>
       <span class="fa fa-angle-left" :style="{backgroundColor:color}" @click="previous()"></span>
     </span>
     <span class="serie-navigation" style="display:inline-block;vertical-align:top;text-align:center;"  :class="{disabled: date === lastDate}">
        <div ><input type="date" v-model="date" @change="dateChange" /></div>
        <span class="fa" :class="timer ? 'fa-pause' : 'fa-play'"  :style="{backgroundColor:color}" @click="togglePlay"></span>
     </span>
     <span class="serie-navigation" :class="{disabled: date === lastDate }">
       <span class="fa fa-angle-right" :style="{backgroundColor:color}" @click="next()"></span>
       <span class="fa fa-angle-double-right" :style="{backgroundColor:color}" @click="goToLast()"></span>
     </span>
 </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'DateNavigation',
  props: {
    defaut: {
      type: String,
      value: null
    },
    firstDate: {
      type: String,
      default: '2020-01-01'
    },
    lastDate: {
      type: String,
      default: '2021-12-01'
    },
    color: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      date: '2020-12-01',
      timer: null,
      playerChangeListener: null
    }
  },
 
  created () {
    if (this.defaut) {
      this.date = this.defaut
    }
   //this.time = moment(this.date, 'YYYY-MM-DD')
    this.playerChangeListener = this.changePlayer.bind(this)
    document.addEventListener('SeriePlayerChange', this.playerChangeListener)
  },
  mounted (){
    // this.computeSerieDate(0)
  },
  destroyed () {
    if (this.main && this.timer) {
      clearInterval(this.timer)
      this.timer = false
    }
    document.removeEventListener('SeriePlayerChange', this.playerChangeListener)
    this.playerChangeListener = null
  },
  methods: {
//     computeSerieDate (serieName, index) {
//       if (!this.series || !this.series[serieName]) {
//         this.serieDate = 'Serie navigation'
//         return
//       }
//       var name = Object.keys(this.series)[0]
//       var date = this.series[this.serieName].images[index].date.substring(0, 8)
//       var date2 = this.series[this.serieName].images[index].date.substring(9)
//       this.serieDate = moment(date, 'YYYYMMDD').format('ll') 
//       if (date2) {
//         this.serieDate += ' &rarr; ' + moment(date2, 'YYYYMMDD').format('ll')
//       }
// //       } else {
// //         this.serieDate += '<br />' + moment(date2, 'YYYYMMDD').format('ll')
// //       }
//     },
    dateChange () {
      this.$emit('dateChange', this.date)
    },
    getTime () {
      return moment(this.date, 'YYYY-MM-DD')
    },
    goToFirst () {
      this.date = this.firstDate
      this.$emit('dateChange', this.firstDate)
    },
    goToLast () {
      console.log('go to last')
      this.date = this.lastDate
      this.$emit('dateChange', this.lastDate)
    },
    next () {
      if (this.date < this.lastDate) {
        var time = this.getTime()
        time.add(1, 'd')
        this.date = time.format('YYYY-MM-DD')
        this.$emit('dateChange', this.date )
      }
    },
    play () {
      if (this.timer) {
        return
      }
      this.timer = setInterval(this.next, 1000)
    },
    previous () {
      if (this.date > this.firstDate) {
        var time = this.getTime()
        time.add(-1, 'd')
        this.date = time.format('YYYY-MM-DD')
        this.$emit('dateChange', this.date )
      }
    },
    togglePlay () {
      var event = new CustomEvent('SeriePlayerChange')
      document.dispatchEvent(event)
    },
    changePlayer () {
      if (this.main) {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = false
        } else {
          this.play()
        }
      } else {
        this.timer = !this.timer
      }
    }
  }
}
</script>
<style scoped>
.fa, input[type="date"]{
  pointer-events:auto;
}
.date-navigation {
  background: #fff;
  border-radius: 5px;
  padding: 8px;
  font-size:0.8rem;
  border: 2px solid rgba(0,0,0,0.2);
  max-width:350px;
  text-align:center;
}
span.serie-navigation span{
  font-size: 1.3em;
  cursor: pointer;
  margin: 0 1px;
  padding:5px;
 cursor:pointer;
 border-radius:3px;
 /*background:#8c0209;*/
 background:grey;
 padding:3px 5px;
 color:white;
  vertical-align:middle;
  opacity:0.9;
}
span.serie-navigation.disabled span{
  opacity:0.3;
  cursor:not-allowed;
}
span.serie-navigation:not(.disabled) span:hover{
  opacity:1;
  font-size:1.31em;
}
</style>