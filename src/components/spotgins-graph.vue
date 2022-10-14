<template>
<div>
 <div id="graph_E" :style="{height:height + 'px'}" @mousemove="highlight($event, 'E')">
    <div class="my-spinner">
       <span class="fa fa-spinner fa-spin fa-2x fa-fw"></span>
    </div>
 </div>
 <div id="graph_N" :style="{height:height + 'px'}" @mousemove="highlight($event, 'N')">
    <div class="my-spinner">
       <span class="fa fa-spinner fa-spin fa-2x fa-fw"></span>
    </div>
</div>

 <div id="graph_U" :style="{height:height + 'px'}" @mousemove="highlight($event, 'U')">
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
      type: Number,
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
      this.reset()
      console.log(this.selected)
      if (this.selected) {
        this.load()
      }
    },
    id () {
      this.reset()
      console.log(this.selected)
      if (this.selected) {
        this.load()
      }
    },
    selected (newvalue) {
      if (this.results.N.length === 0 && newvalue) {
        this.load()
      }
    }
  },
  data () {
    return {
      height: 150,
      next: null,
      currentIndex: 0,
      results: { E: [],N: [], U: []},
      dates: [],
      types:['E', 'N',  'U'],
      pointDate: {date: null, N: null, E: null, U: null},
      graphs: {N: null, E: null, U: null},
      colors:{
        N: 'blue',
        E: '#f00',
        U: '#006400'
       },
       plotlines: [],
       min: {E: null, N: null,  U: null},
       max: {E: null, N: null,  U: null},
       title: {E: 'East (mm)', N: 'North (mm)',  U: 'Up (mm)'}
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
      if (!this.url) {
        return
      }
      this.navigationLink = this.url + 'Datastreams(' + this.id + ')'
      this.$http.get(this.navigationLink + '/Observations?$top=1000&$select=phenomenonTime,result,resultQuality&$format=dataArray', {headers: 'accept: application/json'})
      .then(resp => {
        if (resp.body.value && resp.body.value[0]) {
          // check if it's always the same Datastream
          if (resp.body.value[0]['Datastream@iot.navigationLink'] === this.navigationLink) {
	          this.next = null
	          if (resp.body.value[0].dataArray) {
		          this.extractData(resp.body.value[0].dataArray)
		          if (resp.body['@iot.nextLink']) {
		            this.next = resp.body['@iot.nextLink']
		          }
	          }
          }
        }
//         this.initDates()
//         this.extractData()
       })
    },
    searchNext () {
      if (!this.next) {
        return
      }
      this.$http.get(this.next, {headers: 'accept: application/json'})
      .then(resp => {
        if (resp.body.value && resp.body.value[0] && 
            resp.body.value[0]['Datastream@iot.navigationLink'] === this.navigationLink) {
          this.next = null
          if (resp.body.value[0].dataArray) {
            if (resp.body['@iot.nextLink']) {
              this.next = resp.body['@iot.nextLink']
            }
	          this.addData(resp.body.value[0].dataArray)
	          
          }
        }
//         this.initDates()
//         this.extractData()
        
       })
    },
//     initDates () {
// //       var dates = this.values.map(result => result[0])
// //       console.log(dates)
//       this.dates = this.values.map(result => result[0])
//     },
    extractData (data) {
     
      var self = this
     // this.dates = this.values.map(result => result[0])
      this.min = {
        E: data[0][1][0],
        N: data[0][1][1],
        U: data[0][1][2]
      }
      this.max = {
        E: data[0][1][0],
        N: data[0][1][1],
        U: data[0][1][2]
      }
      data.forEach (function (result, n) {
        var time = moment(result[0], 'YYYY-MM-DDThh:mm:ssZ').valueOf()
        var value = {}
        var quality = {}
        value.E = result[1][0]
        quality.E = result[2][0]
        value.N = result[1][1]
        quality.N = result[2][1]
        value.U = result[1][2]
        quality.U = result[2][2]
        self.dates.push(time)
	       // data.push([time, result])
	      if (n%7 === 0) {
	        self.types.forEach(function (type) {
	          self.results[type].push(
	             [time, 
	             value[type],
	             Math.round((value[type] + quality[type]) * 100) / 100,
	             Math.round((value[type] - quality[type]) * 100) / 100,
	             value[type]
	          ]) 
	          if (quality.N < 10) {
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
      this.currentIndex = data.length - 1
      setTimeout(function () {
        self.buildGraph(0)
      }, 0)
    },
    addData (data) {
      var self = this
      var dates = []
      var results = {E: [], N: [], U: []}
      data.forEach (function (result, n) {
        var time = moment(result[0], 'YYYY-MM-DDThh:mm:ssZ').valueOf()
        var value = {}
        var quality = {}
        value.E = result[1][0]
        quality.E = result[2][0]
        value.N = result[1][1]
        quality.N = result[2][1]
        value.U = result[1][2]
        quality.U = result[2][2]
        
        dates.push(time)
         // data.push([time, result])
        if ((self.currentIndex + n)%7 === 0) {
          self.types.forEach(function (type) {
            results[type].push(
               [time, 
               value[type],
               Math.round((value[type] + quality[type]) * 100) / 100,
               Math.round((value[type] - quality[type]) * 100) / 100,
               value[type]
            ]) 
            if (quality.N < 10) {
              if (self.min[type] > value[type]) {
                self.min[type] = value[type]
              } else if (self.max[type] < value[type]) {
                self.max[type] = value[type]
              }
            }
          })
        }
      })
      this.currentIndex = this.currentIndex + dates.length
      this.addPointsToGraphs(dates, results)
      this.searchNext()
    },
    addPointsToGraphs(dates, results) {
      var self = this
      this.dates = this.dates.concat(dates)
      this.types.forEach(function(type) {
         self.results[type] = self.results[type].concat(results[type])
      })
      
      this.types.forEach(function (type) {
        if (self.graphs[type]) {
	        results[type].forEach(function (result) {
	          self.graphs[type].series[0].addPoint(result, false)
	        })
	        self.graphs[type].redraw()
	        self.graphs[type].xAxis[0].setExtremes(self.dates[0], self.dates[self.dates.length - 1], true, false)
	        self.graphs[type].yAxis[0].setExtremes(self.min[type], self.max[type], true, false)
        }
      })
      
    },
    buildGraph (index) {
      var _this = this
      if (!this.types[index]) {
        if (this.next) {
          this.searchNext()
        }
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
//       this.pointDate.date = moment.unix(point.x / 1000).format('ll')
//       this.pointDate[type] = point.open
      for (var key in this.types) {
        var tp = this.types[key]
        var chart = this.graphs[tp];
        if (chart && typeof chart !== 'undefined') {
  //        var pt = chart.series[0].points.find(el => el.x === point.x )
//           if (pt !== undefined) {
//            this.pointDate[key] = pt.open
//           }
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
    var min = Math.floor(this.min[type])
    var max = Math.ceil(this.max[type])
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
        zoomType: 'x'
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
                 var quality = Math.round((pt.high - pt.open) * 100) / 100
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
<style>
.my-spinner {
  width:100%;
  padding-top:30px;
  text-align:center;
}
.my-spinner .fa {
  vertical-align: middle;
}
</style>