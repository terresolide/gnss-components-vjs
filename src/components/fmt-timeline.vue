<template>
<div><div class="fmt-timeline"></div></div>
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
      chart: null
    }
  },
  methods: {
    display (values, index) {
      var _this = this
      if (!values) {
        console.log(index)
        if (index >= this.dates.length) {
          return
        }
        var length = 1000
        for (var i = index; i < index + 1000  && i < this.dates.length; i++) {
          this.chart.series[0].addPoint(this.dates[i], false)
          length = i
        }
        this.chart.redraw()
        
//         this.chart.xAxis[0].setExtremes(this.dates[0][0], this.dates[length][0], true, false)
//         this.chart.yAxis[0].setExtremes(1, 3, true, false)
         setTimeout(function() {
          _this.display(null, index + 1000)
        },0)
        return
      }
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
          height:200,
          width: 1500,
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
          positioner: function () {
              return { x: 80, y: 0 };
          },
          xDateFormat: '%e %b %Y',
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
          title:{
            margin: 30,
            useHTML: true,
            text:'Nb Stations'
          },
          min:0,
          max:3
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
                  console.log(s)
                  console.log(e.point.x)
                  var date = moment.unix(e.point.x/1000).format('YYYY-MM-DD')
                  console.log(date)
                  _this.plotLine(e.point.x)
                  alert('You just clicked the graph');
              }
          }
        }]
      })
      setTimeout(function() {
        _this.display(null, index)
      })
    },
    plotLine (x) {
      this.chart.xAxis[0].removePlotLine('highlight')
      this.chart.xAxis[0].addPlotLine({
       color: '#999999',
       value:  x,
       width: 2,
       zIndex: 1000,
       id: 'highlight'
     })
    }
  }
}
</script>
