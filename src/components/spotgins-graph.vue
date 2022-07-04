<template>
<div>
 <div id="graph_N" :style="{height:height + 'px'}" @mousemove="highlight($event, 'ns')">
   <div class="my-spinner">
      <span class="fa fa-spinner fa-spin fa-2x fa-fw"></span>
   </div>
</div>
 <div id="graph_E" :style="{height:height + 'px'}" @mousemove="highlight($event, 'ew')">
     <div class="my-spinner">
       <span class="fa fa-spinner fa-spin fa-2x fa-fw"></span>
 </div>
 </div>
 <div id="graph_U" :style="{height:height + 'px'}" @mousemove="highlight($event, 'magn')">
   <div class="my-spinner">
       <span class="fa fa-spinner fa-spin fa-2x fa-fw"></span>
    </div>
 </div>
</div>
</template>
<script>
/* eslint-disable */
import * as Highcharts from 'highcharts'
import moment from 'moment'
import HighchartsExporting from 'highcharts/modules/exporting'
//import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'
import Stock from 'highcharts/modules/stock'
import Data from 'highcharts/modules/data'
import Accessibility from 'highcharts/modules/accessibility'
import Indicators from 'highcharts/indicators/indicators'
import Regression from 'highcharts/indicators/regressions'
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  HighchartsMore(Highcharts) // init module
  Stock(Highcharts)
  Data(Highcharts)
 Accessibility(Highcharts)
 // Highstock(Highcharts)
 // for regression
 Indicators(Highcharts)
 Regression(Highcharts)
}

export default {
  props: {
    id: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    url () {
      this.load()
    }
  },
  data () {
    return {
      height: 150,
      results: {N: [], E: [], U: []},
      dates: [],
      types:['N', 'E', 'U'],
      pointDate: {date: null, N: null, E: null, U: null},
      graphs: {N: null, E: null, U: null},
      colors:{
        N: 'blue',
        E: '#f00',
        U: '#006400'
       },
       plotlines: [],
       min: {N: null, E: null, U: null},
       max: {N: null, E: null, U: null},
       title: {N: 'North', E: 'East', U: 'Up'}
    }
  },
  methods: {
    reset () {
      // reset graph
      var self = this
      this.dates = []
      this.types.forEach(function (type) {
        if (self.graphs[type]) {
          self.graphs[type].destroy()
          self.graphs[type] = null
          self.addSpinner(type)
        }
        self.results[type] = []
        self.min[type] = null
        self.max[type] = null
      })
      
    },
    load () {
      this.reset()
      if (!this.url) {
        return
      }
      this.$http.get(this.url, {headers: 'accept: application/json'})
      .then(resp => {
        if (resp.body.value && resp.body.value.dataArray) {
          this.extractData(resp.body.value.dataArray)
        }
//         this.initDates()
//         this.extractData()
        
       })
    },
    initDates () {
//       var dates = this.values.map(result => result[0])
//       console.log(dates)
      this.dates = this.values.map(result => result[0])
    },
    extractData (data) {
     
      var self = this
     // this.dates = this.values.map(result => result[0])
      this.min = {
        N: data[0][1][0],
        E: data[0][1][1],
        U: data[0][1][2]
      }
      this.max = {
        N: data[0][1][0],
        E: data[0][1][1],
        U: data[0][1][2]
      }
      data.forEach (function (result, n) {
        var time = moment(result[0], 'YYYY-MM-DD').valueOf()
        var value = {}
        var quality = {}
        value.E = result[1][0]
        quality.E = result[1][3]
        value.N = result[1][1]
        quality.N = result[1][4]
        value.U = result[1][2]
        quality.U = result[1][5]
        self.dates.push(time)
	       // data.push([time, result])
	      if (n%7 === 0) {
	        self.types.forEach(function (type) {
	          self.results[type].push(
	             [time, 
	             value[type],
	             value[type] + quality[type],
	             value[type] - quality[type],
	             value[type]
	          ]) 
	          if (quality.N < 0.05) {
              if (self.min[type] > value[type]) {
                self.min[type] = value[type]
              } else if (self.max[type] < value[type]) {
                self.max[type] = value[type]
              }
            }
	        })
	       }
// 	      if (result[0].substring(4) === '01-01') {
// 	        self.plotlines.push({
// 	          color: '#ccd6eb',
// 	          value: time,
// 	          width: 1,
// 	          id: n
// 	        })
// 	      }
      })
      setTimeout(function () {
        self.buildGraph(0)
      }, 0)
    },
    buildGraph (index) {
      var _this = this
      if (!this.types[index]) {
        return
      }
      var type = this.types[index]
      _this.draw(type)
      setTimeout(function () {
        _this.buildGraph(index + 1)
      }, 0)
    },
    highlight (e, type) {
//    if (!this.graphs[type]) {
//      this.tooltip = false
//      return
//    }
     // console.log(e)
      var chart,
        point,
        i,
        event;
      var _this = this
      if (!this.graphs[type]) {
        return false
      }
      event = this.graphs[type].pointer.normalize(e);
      var point = this.graphs[type].series[0].searchPoint(event, true);
      if (!point) {
        return
      }  
      this.pointDate.date = moment.unix(point.x / 1000).format('ll')
      this.pointDate[type] = point.open
      for (var key in this.graphs) {
        var chart = this.graphs[key];
        if (chart && typeof chart !== 'undefined') {
          var pt = chart.series[0].points.find(el => el.x === this.point.x )
          if (pt !== undefined) {
           this.pointDate[key] = pt.open
          }
          chart.xAxis[0].removePlotLine('highlight')
          chart.xAxis[0].addPlotLine({
           color: '#999999',
           value:  point.x,
           width: 1,
           id: 'highlight'
         })
        }
      }    
    },
    addSpinner (type) {
      var spinner = document.createElement('div')
      spinner.setAttribute('class', 'my-spinner')
      var content = document.createElement('span')
      content.setAttribute('class', 'fa fa-spinner fa-spin fa-2x fa-fw')
      spinner.appendChild(content)
      this.$el.querySelector('#graph_' + type).appendChild(spinner)
      
   },
    draw (type) {
 // remove graph if exists
   
//     var ivalue = 0
//     var idelta = 3
//     switch (type) {
//       case 'N':
//         ivalue = 1
//         idelta = 4
//         break
//       case 'U':
//         ivalue = 2
//         idelta = 5
//         break
//     }
//     var data = []
    var min = this.min[type]
    var max = this.max[type]
//     // var delta = []
//     var plotlines = []
//     var regData = []
//     var dates = []
//     var data = []
//     // fill data
    var _this = this
   
//     this.dates.forEach (function (date, n) {
//          var time = moment(date, 'YYYY-MM-DD').valueOf()
//          var result = _this.values[n][1][ivalue]
//          var quality = _this.values[n][1][idelta]
//         // data.push([time, result])
//         if (quality < 0.01) {
// 	          data.push([
// 	            time, 
// 	            result,
// 	            result + quality,
// 	            result - quality,
// 	            result
// 	         ])
// 	         if (quality < 0.01 ) {
// 	           if (min > result) {
// 	             min = result
// 	           }
// 	           if (max < result) {
// 	             max = result
// 	           }
// 	         }
//         }
//          if (date.substring(-2) === '01') {
// 	         plotlines.push({
// 	           color: '#ccd6eb',
// 	           value: time,
// 	           width: 1,
// 	           id: n
// 	         })
//          }
//     })

//     console.log(max)
//     if (data.length === 0) {
//       return
//   }
//     var reg = regression(regData, dates)
//     // var _this = this
//    // var chartIndex = Object.keys(this.graphs).findIndex(key => key === type)
//     quality = Math.round(quality * 100) / 100
     var color = this.colors[type]
     var title = this.title[type]
     var data = this.results[type]
     var plotlines = this.plotlines
     var _this = this
//     var lightColor = this.$shadeColor(color, 0.4)
    this.graphs[type] = Highcharts.chart('graph_' + type, {
      chart: {
        zoomType: 'xy'
      },
      title: 'Test',
      width: '680px',
      height: _this.height + 'px',
      credits: {
        enabled:false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        formatter (e) {
          if (!this.point) {
            return false
          }
          var values = []
          for (var key in _this.types) {
            var type = _this.types[key]
            var chart = _this.graphs[type];
            if (chart && typeof chart !== 'undefined') {
               var pt = chart.series[0].points.find(el => el.x === this.point.x )
               if (pt !== undefined) {
                 _this.pointDate[type] = pt.open
                 var quality = Math.round((pt.high - pt.open) * 1000000) / 1000000
                 values.push('<div><span style="color:'+ pt.color +';">&#9632;</span> ' + type.toUpperCase() + ': ' + pt.open + ' &pm; ' + quality + '</div>')
               }
               if (key !== type) {
                 chart.tooltip.hide();
               }
            }
             
          }
          _this.pointDate.date = moment.unix(this.point.x/ 1000).format('ll')
          var s = '<b>' + moment.unix(this.point.x/ 1000).format('ll') + '</b><br />'
          return s + values.join('<br />')
        },
        shared: false
      },
      plotOptions: {},
      xAxis: {
         type: 'datetime',
         lineColor:'#666',
         events: {
//            setExtremes (e) {
//              _this.syncExtremes(e, type)
//            },
           afterSetExtremes (e) {
             var xMin = e.min
             var xMax = e.max
             for(var key in _this.graphs) {
               if (key !== type && _this.graphs[key]) {
                 _this.graphs[key].xAxis[0].setExtremes(xMin, xMax, true, false)
               }
             }
           }
         },
         gridLineWidth: 0,
         plotLines: plotlines,
       },
       yAxis: {
           title: {
               text: title
           },
           min: min,
           max: max,
           plotLines: [{
             value: 0,
             color: 'lightgrey',
             width: 2
           }]
       },
       series: [{
           name: type,
           color: 'darkblue',
           id: type,
           type: 'ohlc',
           zIndex:10,
           data:data,
           lineWidth: 1
       },
       {
         type: "linearRegression",
         linkedTo: type,
         color: 'darkred',
         enableMouseTracking: false,
         zIndex: 11,
         params: {
           period: 30
         },
         lineWidth: 1
       },
    ]})
 },
  }
}
</script>