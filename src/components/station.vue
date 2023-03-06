<template>
 <div >
	 <div class="station-header">
	    <span class="fa fa-close" @click="close"></span>
	    <h2 v-if="stationId">Station {{stationId}}</h2>
	    <h2 v-else>UNKNOWN STATION</h2>
	 </div>
  <div class="station-body">
  <div v-if="location">
   
    <div>
    <h3 style="margin-bottom:0;">Coordinates</h3>
      <div style="float:left;min-width:300px;width:40%;margin-left:10px;margin-top:18px;margin-right:50px;">
       
	       <div>Latitude: {{location.geometry.coordinates[1].toLocaleString()}}°</div>
	       <div>Longitude: {{location.geometry.coordinates[0].toLocaleString()}}°</div>
  
       <div v-if="neighbours.length > 0" style="margin-left:-10px;">
        <h3>Nearest stations</h3>
        <div v-if="map && neighboursLayer" style="margin-left:10px;">
           <button v-if="onMap"
              title="Remove from map" @click="removeNeighboursFromMap">Remove from map</button>
           <button v-else title="Show on map" @click="addNeighboursToMap">Show on map</button>
        </div>
        <div v-for="st in neighbours" style="margin-left:10px;">
          <span class="station-link" @click="goToStation(st)">{{st.name}}</span>
          ({{Math.round(st.distance)}} km)
        </div>
       </div>
      </div>
      <div id="stationMap"  >
      </div>
    </div>
   </div>
   <div style="clear:left;padding-top:10px;" v-if="stationId">
     <h3>Time Series Plots</h3>
     <div v-html="plot.div" style="max-width:600px;">STATION INCONNUE</div>
   </div>
   <div v-else>
      No station found with this code
   </div>
  </div>
 </div>
</template>

<script>
var L = require('leaflet')
import { Icon } from 'leaflet';
import Util from '../modules/util.js'
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});
// import Bokeh from '@bokeh/bokehjs/build/js/bokeh.esm.min.js';
export default {
  name: 'Station',
  data () {
    return {
      plot: {div: null, script: null},
      script: null,
      stationId: null,
      station: null,
      icon: null,
      stationLayer: null,
      neighboursLayer: null,
      onMap: false,
      map: null,
      location: null,
      neighbours: [],
      root: 'https://catalog.formater/FROST-Server/v1.1/'
    }
  },
  watch: {
    $route (route) {
      this.stationId = route.params.id
      this.getStation()
    }
  },
  mounted () {
    if (!this.$route.params.id) {
      return
    } 
    
    this.stationId = this.$route.params.id
    this.getStation()
//     this.$http.get('https://catalog.formater/flask/component/' + this.stationId)
//     .then(resp => {
//       this.plot.div = resp.body.div
//       this.plot.script = resp.body.script
//       this.script = document.createElement('script')
//       this.script.append(this.plot.script)
//       this.$el.appendChild(this.script)
//     })
  },
  destroyed () {
    if (this.script) {
      this.script.remove()
    }
  },
  methods: {
    addNeighboursToMap () {
      if (this.neighboursLayer) {
        this.neighboursLayer.addTo(this.map)
        this.onMap = true
        this.stationLayer.bringToFront()
      }
    },
    initNeighboursLayer () {
      if (this.neighboursLayer) {
        this.neighboursLayer.clearLayers()
        this.neighboursLayer.remove()
      } else {
        this.neighboursLayer = L.featureGroup()
      }
    },
    removeNeighboursFromMap () {
      if (this.neighboursLayer) {
        this.neighboursLayer.remove()
        this.onMap = false
      } 
    },
    getNeighbours () {
      if (!this.location) {
        return
      }
      var center = this.location.geometry.coordinates
      this.$http.get(this.root + "/Locations?$filter=geo.distance(location,geography'POINT(" + center.join(' ') + ")') lt 2 and not name eq '"+ this.stationId + "'")
      .then(resp => {
        if (resp.body.value && resp.body.value.length > 0) {
          var neighbours = resp.body.value
          var center = this.location.geometry.coordinates
          neighbours.forEach(function (st, index) {
            var pos = st.location.geometry.coordinates
            var distance  = Util.getDistanceFromLatLonInKm(pos[1], pos[0], center[1], center[0])
            console.log(distance)
            neighbours[index].distance = distance
          })
          this.neighbours = neighbours

          var self = this
          this.neighbours.forEach(function (st) {
            var layer = L.geoJSON(st.location, {
              pointToLayer (feature, latlng) {
                return L.marker(latlng, {title: st.name})
              }
            })
            self.neighboursLayer.addLayer(layer)
          })
          if (this.onMap) {
            this.addNeighboursToMap()
          }
        }      
      })
    },
    getSerie () {
      this.$http.get('https://spotgins.formater/api/stations/' + this.stationId + '/component' )
      .then(resp => {
        this.plot.div = resp.body.div
        this.plot.script = resp.body.script
        this.script = document.createElement('script')
        this.script.append(this.plot.script)
        this.$el.appendChild(this.script)
      })
    },
    getStation () {
        this.initNeighboursLayer()
        this.$http.get(this.root + "/Things?$filter=substringof('" + this.stationId + "',name)&$expand=Locations($top=1)")
        .then(resp => {
          if (resp.body.value && resp.body.value.length > 0) {
            if (resp.body.value[0].name === this.stationId) {
	            this.station = resp.body.value[0]
	            this.location = this.station.Locations[0].location
	           // this.initMap()
	            this.getSerie()
	            this.$nextTick(() => this.initMap())
            } else {
              this.setNoStation()
            }
            //             var self = this
//             setTimeout(function () {self.initMap()}, 0)
          } else {
            this.setNoStation()
          }
        })
    },
    goToStation (station) {
      this.$router.push({name: 'station', params: {id: station.name}})
    },
    setNoStation () {
      if (this.stationLayer) {
        this.stationLayer.remove()
      }
      this.stationId = null
    },
    
    initMap () {
      if (!this.map) {
	      this.map= L.map( "stationMap", {scrollWheelZoom: true})
	      var tile = {
	        name: 'ArcGIS World Topo Map',
	        url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
	        attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
	      }
	     L.tileLayer(tile.url, {attribution: tile.attribution})
	     .addTo(this.map)
     }
     if (this.stationLayer) {
       this.stationLayer.remove()
     }
     if (!this.icon) {
       this.icon = new L.Icon({
         // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('../assets/img/marker-icon-red.png').default,
          shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
          iconRetinaUrl: require('../assets/img/marker-icon-2x-red.png').default,
         // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
     }
     var self = this
     this.stationLayer = L.geoJSON(this.location, {
       pointToLayer: function (feature, latlng) {
         return L.marker(latlng, {title: self.station.name, icon: self.icon})
       }
     }).addTo(this.map)
     this.map.setView([this.location.geometry.coordinates[1], this.location.geometry.coordinates[0]], 6)
     this.getNeighbours()
    },
    close () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>
<style>
div[id="stationMap"] {
  position: relative;
  width:300px;
  height:200px;
  float:left;
}
</style>
<style scoped>
  div.station-header {
    position:relative;
    background: lightgrey;
    margin: 0;
    padding: 3px 5px;
  }
   div.station-body {
    padding: 3px 10px;
  }
  div.station-header h2 {
    padding:0;
    margin:5px;
  }
  span.station-link {
    color: darkblue;
    padding: 2px 3px;
    cursor: pointer;
    line-height:1.5rem;
    border:1px dotted white;
  }
  span.station-link:hover {
    border-color: grey;
  }
  span.fa-close {
    position: absolute;
    right: 5px;
    cursor: pointer;
    padding: 5px;
    border: 1px dotted lightgrey;
  }
  span.fa-close:hover {
    border-color: black;
  }
</style>
