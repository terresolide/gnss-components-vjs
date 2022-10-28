<template>
<div><div class="fmt-timeline" :class="{disabled: drawing}"></div></div>
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
      value: '2020-03-15'
    }
  },
  watch: {
    values (newvalue) {
      console.log('newvalue')
      this.display(newvalue, 0)
    }
  },
  data () {
    return {
      dates: [],
      chart: null,
      max: 0,
      drawing: false,
      resizeListener: null,
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
    this.display(this.values, 0)
  },
  destroy () {
    window.addEventListener('resize', this.resizeListener)
    this.resizeListener = null
  },
  methods: {
    display (values, index) {
      var _this = this
      if (!values) {
        if (index >= this.dates.length) {
          this.drawing = false
          if (this.defaut) {
            var date = moment.utc(this.defaut + 'T12:00:00.000Z')
            this.plotLine(date.valueOf(), date.format('ll'))
            
          }
          return
        }
       
        var length = 1000
        for (var i = index; i < index + 1000  && i < this.dates.length; i++) {
          this.chart.series[0].addPoint(this.dates[i], false)
          if (this.max < this.dates[i][1]) {
            this.max = this.dates[i][1]
          }
          length = i
        }
        this.chart.redraw()
        
//         this.chart.xAxis[0].setExtremes(this.dates[0][0], this.dates[length][0], true, false)
         this.chart.yAxis[0].setExtremes(0, this.max, true, false)
         setTimeout(function() {
          _this.display(null, index + 1000)
        },0)
        return
      }
      this.drawing = true
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }
      this.dates = []
      if (Object.keys(values).length === 0) {
        return
      }
      for (var key in values) {
        this.dates.push([parseInt(key), values[key]])
      }
      
      var container = this.$el.querySelector(".fmt-timeline")
      this.chart = Highcharts.chart(container, {
        
        chart:{
          height:100,
          width: _this.width,
          plotBorderColor: '#666666',
          plotBorderWidth: 0,
          type: 'column',
          zoomType: 'x'
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
//           positioner: function () {
//               return { x: 80, y: 0 };
//           },
          xDateFormat: '%b %e, %Y',
          shadow: false,
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.8)'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            pointPadding: 0,
            borderWidth: 0.1,
            groupPadding: 0,
            shadow: false
          }
        },
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
            min: _this.dates[0][0],
            max: _this.dates[_this.dates.length -1][0],
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
          min:0,
          max:_this.max
        },
//         tooltip: {
//           shared: true,
//           crosshairs: [true, false, false]
//         },
        series: [{
          name: 'Nb Stations',
          type: "column",
          color: 'darkblue',
          data: [],
          cursor: 'pointer',
          events: {
              click: function (e, s) {
                  var date = moment.unix(e.point.x/1000)
                  _this.plotLine(e.point.x, date.format('ll') )
                  _this.$emit('select', date.format('YYYY-MM-DD'))
              }
          }
        }]
      })
      setTimeout(function() {
        _this.display(null, index)
      })
    },
    plotLine (x, date) {
      if (!this.chart) {
        return
      }
      this.chart.xAxis[0].removePlotLine('highlight')
      this.chart.xAxis[0].addPlotLine({
       color: '#999999',
       value:  x,
       width: 2,
       zIndex: 1000,
       id: 'highlight',
       label: {
         text: '<div class="date-tooltip">' + date + '</div>',
         align: 'center',
         useHTML: true,
         rotation:0,
         y:20
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
 .date-tooltip {
   padding:3px 5px;
   background:rgba(255,255,255,0.8);
   border-radius: 3px;
   border: 1px dotted grey;
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
