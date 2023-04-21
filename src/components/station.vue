<template>
<div class="page-station" style="width:100%;">

 <div style="margin:auto;max-width:1400px;">
	 <div class="station-header">
	    <span class="fa fa-close button" @click="close($event)" style="margin-right:20px;"></span>
	    <h2 v-if="stationId">Station {{stationName}}</h2>
	    <h2 v-else-if="stations">{{stations.length}} stations with the identifier {{stationName}}</h2>
	    <h2 v-else>UNKNOWN STATION</h2>
	 </div>
  <div class="station-body">
  <div v-if="location || stations">
	  <div v-if="!station && stations" style="float:left;">
	      <div v-for="st in stations" class="box-station">
		       <router-link class="station-link"  :to="{name: 'station', params: {name: st.name, id: st.id}}">
		       
		       <h3>{{st.name}} N°{{st.id}}</h3>
		        <div>Latitude: {{st.location.geometry.coordinates[1].toLocaleString()}}°</div>
		        <div>Longitude: {{st.location.geometry.coordinates[0].toLocaleString()}}°</div>
		  
		      </router-link>
	      </div>
	  </div>
 
  
   
    <div v-if="location">
      <h3 style="margin-bottom:0;">Coordinates</h3>
      <div style="float:left;min-width:300px;width:40%;margin-left:10px;margin-top:18px;margin-right:50px;">
       
	       <div><label>Latitude:</label> {{location.geometry.coordinates[1].toLocaleString()}}°</div>
	       <div><label>Longitude:</label> {{location.geometry.coordinates[0].toLocaleString()}}°</div>
	       <div v-if="station.properties.height"><label>Height:</label>{{station.properties.height.toLocaleString()}} m</div>

      <h3 style="margin-left:-10px;">Informations</h3>
       <div v-if="station.properties.m3g"><label>M3g:</label>  <a :href="station.properties.m3g" target="_blank">sitelog</a></div>
       <div><label>Domes:</label> {{station.properties.domes}}</div>
 
 
 
        <h3  v-if="stationId" style="margin-left:-10px;">Nearest stations
            <span class="fa button in-title" @click="show.nearest = !show.nearest">{{show.nearest ? '-' : '+'}}</span>
        </h3>
        <div  style="margin-left:10px;" :style="{display: show.nearest ? 'block': 'none'}">
          <div style="margin-bottom:10px;">
	            <input type="number" step="10" v-model="radius" @change="radiusChanged=true"
	           class="gnss-control" /> km &nbsp;
	           <button type="button" @click="getNeighbours()"
	           style="margin-right:20px;">Search</button>
	           <button type="button" v-if="onMap"
	              value="Remove" @click="removeNeighboursFromMap">Hide <i class="fa fa-map-marker"></i></button>
	           <button type="button" v-else title="Show on map" @click="addNeighboursToMap">Display <i class="fa fa-map-marker"></i></button>
          </div>
	        <div v-if="neighbours.length > 0">
		        <div  v-for="st in neighbours" class="gnss-neighbour">
		          <span class="station-link" @click="goToStation(st)">{{st.name}}</span>
		          ({{Math.round(st.distance)}} km)
		        </div>
	        </div>
	        <div v-else ><em>No other stations within {{searchRadius}}km radius</em></div>
	        </div>
       </div>
      
    </div>
     <div v-show="station || stations" id="stationMap"  >
   </div>
    
  </div>
   <div style="clear:left;"> 
   </div>
   <h3 v-if="stationId">Filters 
      <span class="fa button in-title" @click="show.filter = !show.filter">{{show.filter ? '-' : '+'}}</span>
   </h3>
    <div :style="{display: show.filter ? 'block': 'none'}" style="margin-left:10px;max-width:950px;font-size:0.9rem;">
      <file-form mode="station"></file-form>
    </div>
   

   <div v-if="files.length > 0"style="padding-top:10px;position:relative;">
   <div  v-if="selected" class="file-selected">
     <span class="fa fa-close" @click="unselect"></span>
     <h3> {{selected.station}} {{selected.solution }} {{selected.productType}}</h3>
     <div v-html="plot.div" >STATION INCONNUE</div>
   </div>
 
   <h3>Data</h3>
     <div style="margin-left:10px;">
		   <div  v-for="file in files" class="file-container" >
		     <div style="">
		       <!--  <a href="https://spotgins.formater/data/SPOTGINS/GROUP2/RSTL00FRA_SERIE.txt" download >lien truc</a>
		         -->
		        <div class="product-link">
		         <a v-if="file.solution === 'SPOTGINS' && file.productType === 'POSITION'"
		            :href="sari + '?server=formater&station=' + file.station + '&product=spotgins_pos'"
		            target="_blank">SARI</a> 
		         <a  :href="api + 'files/' + file.name + '/download'" :download="file.name" ><span class="fa fa-download"></span></a>
		        </div>
		       <div><label>Name</label>{{file.name}}</div>
		       <div style="font-size:0.8rem;">
		        
		        <div><label>ProductType</label>{{file.productType}}</div>
		        <div><label>Phenomenon Time</label>{{date2str(file.tempStart)}} &rarr; {{date2str(file.tempEnd)}}</div>
		        <div><label>Updated</label>{{date2str(file.creationDate)}}</div>
		        <div v-for="value, key in file.properties" v-if="key !== 'img' && key!== 'file' && key !== 'fillRate'">
		        <label>{{key}}</label> {{value}}
		        </div>
		     </div>
		     <div><img :src="file.properties.img" style="max-width:500px;" @click="getSerie(file)" /></div>
		     </div>
		   </div>
	   </div>
   </div>
   
   
   <div v-if="!station && !stations">
      No station found with this code
   </div>
 </div>
 </div>
</div>
</template>

<script>
var L = require('leaflet')
import { Icon } from 'leaflet';
import Util from '../modules/util.js'
import moment from 'moment'
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});
import FileForm from './file-form.vue'
// import Bokeh from '@bokeh/bokehjs/build/js/bokeh.esm.min.js';
export default {
  name: 'Station',
  components: {FileForm},
  data () {
    return {
      sari: 'https://alvarosg.shinyapps.io/sari/',
      plot: {div: null, script: null},
      script: null,
      stationId: null,
      stationName: null,
      station: null,
      stations: null,
      icon: null,
      stationLayer: null,
      neighboursLayer: null,
      radiusChanged:true,
      resizeListener: null,
      radius: 100,
      searchRadius: 100,
      files: [],
      selected: null,
      onMap: false,
      map: null,
      location: null,
      neighbours: [],
      show: {
        filter: false,
        nearest: false
      }
    }
  },
  computed: {
    api () {
      return this.$store.getters['api']
    }
  },
  watch: {
    $route (route) {
      this.initStation()
      this.stationName = route.params.name
      if (route.params.id) {
        this.stationId = route.params.id
      } 
      this.getStation()
    }
  },
  created () {
    console.log(window.location)
    if (!this.$route.params.name) {
      return
    } 
    this.stationName = this.$route.params.name
    if (this.$route.params.id) {
      this.stationId = this.$route.params.id
    } else {
      this.stationId = null
    }
    this.resizeListener = this.resize.bind(this)
    window.addEventListener('resize', this.resizeListener)
    this.getStation()
  },
  destroyed () {
    if (this.script) {
      this.script.remove()
    }
    window.removeEventListener('resize', this.resizeListener)
  },
  methods: {
    resize (e) {
      console.log(e)
      e.stopImmediatePropagation()
      e.preventDefault()

      return false
    },
    initStation () {
      this.station = null
      this.stations = null
      this.stationId = null
      this.location = null
      this.neighbours = []
      this.files = []
      this.map = null
    },
    addNeighboursToMap () {
      if (this.neighboursLayer) {
        this.neighboursLayer.addTo(this.map)
        this.onMap = true
        this.stationLayer.bringToFront()
      }
    },
    date2str(date, small){
      var format = small ? 'll': 'lll'
      if (date ) {
        return moment(date).format('ll')
      }
      return ''
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
      this.$http.get(this.api + "stations/?center=" + center.join(',') + "&radius=" + this.radius)
      .then(resp => {
        if (resp.body.stations && resp.body.stations.length > 0) {
          this.initNeighboursLayer()
          this.searchRadius = this.radius
          var neighbours = resp.body.stations
          var center = this.location.geometry.coordinates
          neighbours = neighbours.filter(st => st.id !== this.stationId)
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
    getSerie (file) {
      this.selected = file
      if (this.script) {
        this.script.remove()
        this.script = null
      }
      this.$http.get(this.api + 'files/' + file.name + '/component' )
      .then(resp => {
        this.plot.div = resp.body.div
        this.plot.script = resp.body.script
        this.script = document.createElement('script')
        this.script.append(this.plot.script)
        this.$el.appendChild(this.script)
      })
    },
    unselect () {
      this.selected = null
    },
    getStation () {
        this.initNeighboursLayer()
        // this.$http.get(this.root + "/Things?$filter=substringof('" + this.stationId + "',name)&$expand=Locations($top=1)")
        var url = this.api + 'stations/' + this.stationName
        if (this.stationId) {
          url += '/' + this.stationId
        }
        this.$http.get(url)
        .then(resp => {
          if (resp.body.id) {
            if (resp.body.name === this.stationName) {
	            this.station = resp.body
	            this.stationId = this.station.id
	            this.location = this.station.location
	            this.getFiles()
	            this.$nextTick(() => this.initMap())
            } else {
              this.setNoStation()
            }
          } else if (resp.body.stations && resp.body.stations.length > 0) {
            this.stations = resp.body.stations
            this.$nextTick(() => this.initMap())
          } else {
            this.setNoStation()
          }
        })
    },
    getFiles() {
      this.files = []
      this.$http.get(this.api + 'stations/' + this.stationId + '/files', {params: this.$route.query})
      .then(resp => {
        this.files = resp.body.files
        console.log(this.files)
      })
    },
    goToStation (station) {
      this.$router.push({name: 'station', params: {name: station.name, id: station.id}})
    },
    setNoStation () {
      if (this.stationLayer) {
        this.stationLayer.remove()
      }
      this.stationName = null
      this.stationId = null
    },
    
    initMap (map) {
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
	   if (this.location) {
	     this.stationLayer = L.geoJSON(this.location, {
	       pointToLayer: function (feature, latlng) {
	         return L.marker(latlng, {title: self.station.name, icon: self.icon})
	       }
	     }).addTo(this.map)
	     this.map.setView([this.location.geometry.coordinates[1], this.location.geometry.coordinates[0]], 6)
       this.getNeighbours()
     } else if (this.stations) {
       this.stationLayer = L.featureGroup().addTo(this.map)
       var self = this
       this.stations.forEach(function (st) {
         var coords = st.location.geometry.coordinates
         var marker = L.marker([coords[1],coords[0]], {icon: self.icon, title: 'Station N°' + st.id})
         self.stationLayer.addLayer(marker)
       })
       var bounds = this.stationLayer.getBounds()
       this.map.fitBounds(bounds)
     }
     
    },
    close (event) {
      console.log(event)
      this.$router.push({name: 'home', query: this.$store.state.query})
    }
  }
}
</script>
<style>
div.box-station {
  display: inline-block;
overflow: hidden;
padding: 5px 20px 20px 20px;
margin:20px;
 border: 1px solid grey;
 border-radius: 10px;
-webkit-box-shadow: 0 0 3px rgba(0,0,0,.5);
box-shadow: 0 0 3px rgba(0,0,0,.5);
}
div.box-station h3 {
  margin-top: 10px;
}
div.box-station a.station-link {
  margin: 5px;
  line-height: 1.1;
  text-decoration: none;
  color: #000;
  cursor:pointer;
}

div[id="stationMap"] {
  position: relative;
  width:300px;
  height:200px;
  z-index:0;
  float:left;
}
</style>
<style scoped>
  div.page-station {
    width:100%;
    background: url('./../assets/img/background-gnss.png') no-repeat center center fixed;
     -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  }
  div.page-station > div {
    background:white;
    box-shadow: 0 0 3px rgba(0,0,0,.5);
  }
  div.gnss-neighbour {
    margin:3px 20px 3px 0;
    display:inline-block;
    width:200px;
  }
  div.file-selected {
     position:absolute;background:white;top:0;
     border:1px solid lightgrey;
     border-radius:10px;
     padding:10px;
     min-width:800px;
     min-height:800px;
     width:fit-content;
     height:fit-content;
     z-index: 1;
     box-shadow: 0 0 3px rgba(0,0,0,.5);
  }
  div.file-container {
    position:relative;
    margin:5px;
    padding:10px;
    border: 1px solid grey;
    border-radius:10px;
    max-width:550px;
    min-width:500px;
    vertical-align:top;
    display:inline-block;
    cursor:pointer;
  }
  div.file-container div.product-link {
    position: absolute;
    right:10px;
    top:5px;
    
  }
  label{
    display: inline-block;
    min-width:130px;
    text-transform: capitalize;
  }
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
  span.in-title {
    font-size: 1rem;
  }
  span.fa-close {
    position: absolute;
    right: 15px;
   
  }

</style>
