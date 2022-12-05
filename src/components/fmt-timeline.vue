<template>
<div><div class="fmt-timeline" :class="{disabled: drawing}"
 @mousemove="mouseover" @click="setSelected" @mouseleave="mouseout"></div></div>
</template>
<script>
import * as Highcharts from 'highcharts'
import moment from 'moment'
export default {
  name: 'FmtTimeline',
  props: {
    values: {
      type: Array|Object,
      default: null
    },
    defaut: {
      type: String,
      default: '2020-03-15'
    },
    reference: {
      type: String,
      default: '2017-02-27'
    }
  },
//   watch: {
//     values (newvalue) {
//       console.log('newvalue')
//       this.display(newvalue, 0)
//     } 
//   },
  data () {
    return {
     // dates: [],
      chart: null,
      max: 0,
      drawing: false,
      resizeListener: null,
      mode: 'date',
      listeners: {ref: null, date: null},
      width: window.innerWidth - 30
    }
  },
  created () {
    // this.width = window.innerWidth
    this.resizeListener = this.resize.bind(this)
    window.addEventListener('resize', this.resizeListener)
  },
  mounted () {
    // this.width = window.innerWidth
    console.log(this.width)
    console.log(this.reference)
    this.display()
  },
  destroy () {
    window.addEventListener('resize', this.resizeListener)
    this.resizeListener = null
  },
  methods: {
    mouseover (event) {
     var position = this.$el.querySelector('.fmt-timeline').getBoundingClientRect()
//       console.log(position)
//       var x = event.clientX - position.left - 35
      var x = event.clientX - position.left - this.chart.plotLeft;
      var value = this.chart.xAxis[0].toValue(x, true)
      var date = moment.unix(Math.round(value/1000))
      this.plotLine(value, date.format('ll') )
      
    },
    mouseout () {
      console.log('out')
      this.chart.xAxis[0].removePlotLine('highlight')
    },
    display () {
      var _this = this
//       if (!values) {
//         if (index >= this.dates.length) {
//           this.drawing = false
//           if (this.defaut) {
//             var date = moment.utc(this.defaut + 'T12:00:00.000Z')
//             this.drawLine(date.valueOf(), date.format('ll'))
            
//           }
//           if (this.reference) {
//             console.log('reference')
//             var date = moment.utc(this.reference + 'T12:00:00.000Z')
//             this.drawRef(date.valueOf(), date.format('ll'))
//           }
//           return
//         }
       
//         var length = 1000
//         for (var i = index; i < index + 1000  && i < this.dates.length; i++) {
//           this.chart.series[0].addPoint(this.dates[i], false)
//           if (this.max < this.dates[i][1]) {
//             this.max = this.dates[i][1]
//           }
//           length = i
//         }
//         this.chart.redraw()
        
// //         this.chart.xAxis[0].setExtremes(this.dates[0][0], this.dates[length][0], true, false)
//          this.chart.yAxis[0].setExtremes(0, this.max, true, false)
//          setTimeout(function() {
//           _this.display(null, index + 1000)
//         },0)
//         return
//       }
//       this.drawing = true
//       if (this.chart) {
//         this.chart.destroy()
//         this.chart = null
//       }
//       this.dates = []
//       if (Object.keys(values).length === 0) {
//         return
//       }
//       for (var key in values) {
//         this.dates.push([parseInt(key), values[key]])
//       }
      var container = this.$el.querySelector(".fmt-timeline")
      this.chart = Highcharts.chart(container, {
        
        chart:{
          height:100,
          width: _this.width,
          plotBorderColor: '#666666',
          plotBorderWidth: 0,
          type: 'area'
        //  type: 'column',
        //  zoomType: 'x'
        },
        exporting: {
          enabled: false
        },
        title: {
            text:"",
            align: "float"
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
          enabled: false,
//           positioner: function () {
//               return { x: 80, y: 0 };
//           },
          xDateFormat: '%b %e, %Y',
          shadow: false,
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.8)'
        },
//         plotOptions: {
//           column: {
//             stacking: 'normal',
//             pointPadding: 0,
//             borderWidth: 0.1,
//             groupPadding: 0,
//             shadow: false
//           }
//         },
//         plotOptions: {
//             series: {
//                 pointPadding: 0,
//                 borderWidth: 1,
//                // shadow: true
//             }
//         },
        xAxis: {
            type: 'datetime',
            lineColor:'#666',
            tickLength: 5,
            dateTimeLabelFormats: { // don't display the dummy year
               millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%e %b %Y',
                week: '%e. %b',
                month: '%b %y',
                year: '%Y'
            },
            min: _this.values[0][0],
            max: _this.values[_this.values.length -1][0],
            crosshair: {
              color: 'darkgrey',
              zIndex: 1000
            }
        },
        
        yAxis: {
//           title:{
//             margin: 15,
//             text:'Nb Stations'
//           },
          title: {
            enabled: false
          },
          allowDecimals: false,
          minRange: 5,
          min:0
        },
//         tooltip: {
//           shared: true,
//           crosshairs: [true, false, false]
//         },
        series: [{
          name: 'Nb Stations',
          color: 'darkblue',
          enableMouseTracking: false,
          states: {
            hover: {
                enabled: false
            }
          },
          data: _this.values,
 //         cursor: 'pointer',
//           events: {
//               click: function (e, s) {
//                   var date = moment.unix(e.point.x/1000)
//                   _this.plotLine(e.point.x, date.format('ll') )
//                   _this.$emit('select', date.format('YYYY-MM-DD'))
//               }
//           }
        }]
      })
      if (this.defaut) {
         var date = moment.utc(this.defaut + 'T12:00:00.000Z')
         this.drawLine(date.valueOf(), date.format('ll'))
            
       }
       if (this.reference) {
         console.log('reference')
         var date = moment.utc(this.reference + 'T12:00:00.000Z')
         this.drawRef(date.valueOf(), date.format('ll'))
       }
//       setTimeout(function() {
//         _this.display(null, index)
//       })
    },
    setSelected (event) {
      if (!this.chart) {
        return
      }
      var position = this.$el.querySelector('.fmt-timeline').getBoundingClientRect()
     // console.log(event)
//    var x = event.clientX - position.left - 35
		  var x = event.clientX - position.left - this.chart.plotLeft;
		  var value = this.chart.xAxis[0].toValue(x, true)
		  var date = moment.unix(Math.round(value/1000))
      // this.plotLine(value, date.format('ll') )
      
      if (!this.$el.classList.contains('ref')) {
        this.drawLine(value, date.format('ll'))
        this.$emit('select', date.format('YYYY-MM-DD'))
      } else {
        this.drawRef(value, date.format('ll'))
        this.$emit('setref', date.format('YYYY-MM-DD'))
      }
    },
    drawLine (x, date) {
      if (this.listeners.date) {
        this.listeners.date.remove()
      }
      this.chart.xAxis[0].removePlotLine('selectedDate')
      this.chart.xAxis[0].addPlotLine({
       color: '#222222',
       value:  x,
       width: 3,
       zIndex: 1000,
       id: 'selectedDate',
       label: {
         text: '<div class="date-tooltip draggable date">' + date + '</div>',
         align: 'center',
         useHTML: true,
         rotation:0,
         y:40
       }
      })
      var node = this.$el.querySelector('.date-tooltip.date')
      var self = this
      this.listeners.ref = node.addEventListener('click', function (e) {
        self.$el.classList.toggle('ref')
        e.stopPropagation()
      }) 
    },
    drawRef (x, date) {
     if (this.listeners.ref) {
       this.listeners.ref.remove()
     }
     this.chart.xAxis[0].removePlotLine('refDate')
     // var lines = this.chart.xAxis[0].
      this.chart.xAxis[0].addPlotLine({
       color: '#B80000',
       value:  x,
       width: 3,
       id: 'refDate',
       zIndex: 1001,
       label: {
         text: '<div class="date-tooltip draggable reference">' + date + '</div>',
         align: 'center',
         useHTML: true,
         rotation:0,
         y:40
       }
      })
      var node = this.$el.querySelector('.date-tooltip.reference')
      var self = this
      this.listeners.ref = node.addEventListener('click', function (e) {
        self.$el.classList.toggle('ref')
        e.stopPropagation()
      }) 
    },
    plotLine (x, date) {
      if (!this.chart) {
        return
      }
      var isRef = this.$el.classList.contains('ref')
      this.chart.xAxis[0].removePlotLine('highlight')
      this.chart.xAxis[0].addPlotLine({
       color: isRef ? '#B80000' : '#999999',
       value:  x,
       width: 2,
       zIndex: 1000,
       id: 'highlight',
       label: {
         text: '<div class="date-tooltip highlight">' + date + '</div>',
         align: 'center',
         useHTML: true,
         rotation:0,
         y:15
       }
     })
    },
    resize () {
      this.width = window.innerWidth - 30
      this.chart.setSize(this.width, null, true)
     
    }
  }
}
</script>
<style>
 .ref .date-tooltip.draggable.date,
 .date-tooltip {
   padding:3px 5px;
   background:rgba(255,255,255,0.8);
   border-radius: 3px;
   border: 1px dotted grey;
 }
 .ref .date-tooltip.draggable.reference,
.date-tooltip.draggable.date,
 .date-tooltip.draggable:hover {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid black;
 }
 .date-tooltip.reference,
 .ref .date-tooltip.highlight {
   color: darkred;
   border-color:darkred;
 }
</style>
<style scoped>
 .fmt-timeline {
   pointer-events:auto;
 }
 .fmt-timeline.disabled {
   pointer-events:  none;
   opacity:0.8;
 } 
</style>
