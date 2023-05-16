<template>
<div class="page-station" style="width:100%;position:relative;overflow:hidden;">
  
 
  <file-form mode="station" ></file-form>
  <gnss-menu :top="55"></gnss-menu>
    
 <div class="station-content" >
	 <div class="station-header">
	    <span class="close button" @click="close($event)" style="margin-right:20px;"><font-awesome-icon icon="fa-solid fa-close" /></span>
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
	       <div v-if="location.properties.elevation"><label>Elevation:</label>{{location.properties.elevation.toLocaleString()}} m</div>

      <h3 style="margin-left:-10px;">Informations</h3>
       <div v-if="station.properties.m3g"><label>M3g:</label>  <a :href="m3gUrl+ 'sitelog/view?id=' + stationName.toUpperCase()" target="_blank">sitelog</a></div>
       <div v-if="station.properties.domes"><label>Domes:</label> {{station.properties.domes}}</div>
       <div v-if="station.properties.networks"><label>Networks:</label> {{station.properties.networks.join(', ')}}</div>
 
 
 
        <h3  v-if="stationId" style="margin-left:-10px;">Nearest stations
            <span class="fa button in-title" @click="show.nearest = !show.nearest">{{show.nearest ? '-' : '+'}}</span>
        </h3>
        <div  style="margin-left:10px;" :style="{display: show.nearest ? 'block': 'none'}">
          <div style="margin-bottom:10px;">
	            <input type="number" step="10" min="1" v-model="radius" @change="radiusChanged=true"
	           class="gnss-control" /> km &nbsp;
	           <button type="button" @click="getNeighbours()"
	           style="margin-right:20px;">Search</button>
	           <button type="button" v-if="onMap"
	              value="Remove" @click="removeNeighboursFromMap">Hide <font-awesome-icon icon="fa-solid fa-location-dot" /></button>
	           <button type="button" v-else title="Show on map" @click="addNeighboursToMap">Show <font-awesome-icon icon="fa-solid fa-location-dot" /></button>
          </div>
	        <div v-if="neighbours.length > 0">
		        <div  v-for="st in neighbours" class="gnss-neighbour">
		          <span class="station-link" @click="goToStation(st)" :title="'Go to station ' + st.name">{{st.name}}</span>
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
   
   <div v-if="Object.keys(files).length > 0"style="padding-top:10px;position:relative;">
   <div  v-if="selected" class="file-selected">
     <span class="close button" @click="unselect"><font-awesome-icon icon="fa-solid fa-close" /></span>
     <h3> {{selected.station}} {{selected.solution }} {{selected.productType}}</h3>
     <div v-if="plot.div" v-html="plot.div">STATION INCONNUE</div>
     <div v-else style="text-align:center;margin-top:45%;font-size:50px;">
        <font-awesome-icon icon="fa-sharp fa-spinner" spin></font-awesome-icon>
     </div>
   </div>
 
   <h3>Data</h3>
     <div style="margin-left:10px;"><label>Product type</label> 
     <select v-model="productType" class="gnss-control" style="max-width:160px;">
       <option v-for="group, key in files" :value="key">{{key}}</option>
     </select></div>
     <div class="slider" :style="{width: nbFiles * slideWidth + 'px'}">
         <div style="text-align:center;" v-if="nbFiles < files[productType].length">
           <span v-for="file, index in files[productType]" style="padding: 0 3px;">
              <span v-if="index >= curFile && index < curFile + nbFiles">
               <font-awesome-icon :icon="['fas', 'circle']" />
              </span>
              <span v-else>
                <font-awesome-icon :icon="['far', 'circle']" />
              </span>
           </span>
         </div>
       <div v-if="nbFiles < files[productType].length" class="btn-navigation" :class="{disabled: curFile === 0}" @click="curFile = curFile - 1" >
           <font-awesome-icon :icon="['fas', 'circle-chevron-left']" />
       </div>
        <div v-if="nbFiles < files[productType].length" class="btn-navigation"  :class="{disabled: curFile + nbFiles >= files[productType].length}" 
        style="right:0;" @click="curFile = curFile + 1">
           <font-awesome-icon :icon="['fas', 'circle-chevron-right']" />
       </div>
		   <div  v-for="file, index in files[productType]" class="file-container" :style="{transform: 'translateX(' + ((index - curFile) * slideWidth ) + 'px)'}" >
		     <div style="">
		       <!--  <a href="https://spotgins.formater/data/SPOTGINS/GROUP2/RSTL00FRA_SERIE.txt" download >lien truc</a>
		         -->
		        <div class="product-link">
		         <a v-if="file.solution === 'SPOTGINS' && file.productType === 'POSITION'"
		            :href="sari + '?server=formater&station=' + file.station + '&product=spotgins_pos'"
		            target="_blank">SARI</a> 
		         <a  :href="api + 'files/' + file.name + '/download'" :download="file.name" ><font-awesome-icon icon="fa-solid fa-download" /></a>
		        </div>
		       <div><label>Name</label>{{file.name}}</div>
		       <div style="font-size:0.8rem;height:160px;">
		        
		        <div><label>ProductType</label>{{file.productType}}</div>
		        <div><label>Phenomenon Time</label>{{date2str(file.tempStart)}} &rarr; {{date2str(file.tempEnd)}}</div>
		        <div><label>Updated</label>{{date2str(file.creationDate)}}</div>
		        <div v-for="value, key in file.properties" v-if="key !== 'img' && key!== 'file' && key !== 'fillRate'">
		          <label>{{key}}</label> {{value}}
		        </div>
		     </div>
		     <div style="text-align:center;"><img :src="file.properties.img"  title="Click to show interactive graph" @click="getSerie(file)" /></div>
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
import GnssMenu from './gnss-menu.vue'
// import Bokeh from '@bokeh/bokehjs/build/js/bokeh.esm.min.js';
export default {
  name: 'Station',
  components: {FileForm, GnssMenu},
  data () {
    return {
      sari: 'https://alvarosg.shinyapps.io/sari/',
      m3gUrl: 'https://gnss-metadata.eu/v1/' ,
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
      radius: 100,
      searchRadius: 100,
      files: [],
      productType: 'POSITION',
      translateX: 0,
      curFile: 0,
      nbFiles: 3,
      slideWidth: 455,
      selected: null,
      onMap: false,
      map: null,
      location: null,
      neighbours: [],
      show: {
        filter: false,
        nearest: false
      },
      resizeListener: null
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
      this.curFile = 0
      this.getStation()
      this.$store.commit('setReset', false)
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
    // test get sitelog
   
    this.resizeListener = this.countNbFiles.bind(this)
    window.addEventListener('resize', this.resizeListener)
    this.getStation()
  },
  destroyed () {
    if (this.script) {
      this.script.remove()
    }
    if (this.map) {
      this.map.off()
      this.map.remove()
      this.map = null
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener)
      this.resizeListener = null
    }
  },
  mounted () {
    this.countNbFiles()
  },
  methods: {
//     resize (e) {
//       console.log(e)
//       e.stopImmediatePropagation()
//       e.preventDefault()

//       return false
//     },
    countNbFiles () {
      var width = 1380
      this.curFile = 0
      if (this.$el && this.$el.querySelector && this.$el.querySelector('.station-body')) {
        width = this.$el.querySelector('.station-body').offsetWidth
      }
      this.nbFiles = parseInt(width / this.slideWidth)
      if (this.nbFiles === 0) {
        this.nbFiles = 1
      }
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
//     toggleForm () {
//       var elt = document.querySelector('.form')
//       elt.classList.toggle('expand')
//     },
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
            neighbours[index].distance = distance
          })
          neighbours.sort(function (a, b) {
            return a.distance > b.distance
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
      this.plot.div = null
      this.plot.script = null
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
    getInfo () {
      if (this.station.properties.m3g) {
        this.$http.get(this.api + 'stations/' + this.stationName + '/sitelog')
        .then(resp => {console.log(resp.body)})
      }
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
	            // this.getInfo()
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
      this.files = {}
      this.$http.get(this.api + 'stations/' + this.stationId + '/files', {params: this.$route.query})
      .then(resp => {
        var files = resp.body.files
        var self = this
        files.forEach(function (file) {
          if (!self.files[file.productType]) {
            self.files[file.productType] = []
          }
          self.files[file.productType].push(file)
        })
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
	      this.map.off('resize')
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
      this.$router.push({name: this.$store.state.query.name, query: this.$store.state.query.query})
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
  div.page-station div.form {
    top: 105px;
  }
  div.station-content {
    background:white;
    margin:auto;
    max-width:1400px;
    padding-bottom:20px;
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
     left:calc(50% - 400px);
     min-width:800px;
     min-height:800px;
     width:fit-content;
     height:fit-content;
     z-index: 5;
     top:-100px;
     box-shadow: 0 0 3px rgba(0,0,0,.5);
  }
  div.slider {
  position:relative;
  min-height: 660px;
  margin-left:0px;
  margin-top:5px;
  max-width:100%;
  overflow-x:hidden;
  overflow-y: visible;
  }
  div.file-container {
    position:absolute;
    margin:5px;
    padding:10px;
    border: 1px solid grey;
    border-radius:10px;
    width:445px;
    max-width:450px;
    min-height:630px;
    vertical-align:top;
    display:block;
    cursor:pointer;
    transition: all 0.5s;
  }
  div.file-container div.product-link {
    position: absolute;
    right:10px;
    top:5px;
    
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
  div.file-container img {
    max-width:96%;
  }
  div.file-container img:hover {
    max-width:98%;
    border: 1px solid lightgrey;
    border-radius:10px;
  }
  label{
    display: inline-block;
    min-width:138px;
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
  span.button.close {
    position: absolute;
    right: 15px;
    top:5px;
    opacity:1;
    border: 1px dotted transparent;
   
  }
  span.button.close:hover {
    border-color:grey;
  }

</style>
