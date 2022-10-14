<template>
  <div style="position:relative;">
  <h1>SPOT GINS TEST</h1>
    <div id="map" ></div>
    <div  id="json" style="background:white;max-width:450px;min-height:500px;max-height:500px;">
      <h4>{{selected}}</h4>
      <ul class="menu-content">
        <li @click="mode = 'station'" >
        <span :class="{'selected': mode === 'station'}" >Station</span>
        </li>
        <li @click="mode='graph'" >
            <span :class="{'selected': mode === 'graph'}" >Graphique</span>
        </li>
        <li @click="mode='data'" >
            <span :class="{'selected': mode === 'data'}" >Interactif</span>
        </li>
         <li @click="mode='download'" >
            <span :class="{'selected': mode === 'download'}" >Téléchargement</span>
        </li>
      </ul>
      <div v-show="mode === 'station'" style="max-height:420px;overflow-y:scroll;">
      <json-div :json="json" :selected="mode === 'station'" :deployed="true"></json-div>
      </div>
      <div v-show="mode === 'graph'" style="text-align:center;max-height:420px;overflow:scroll;">
       <div v-if="imgMin" v-show="loaded">
        <a :href="img" target="_blank">
          <img  :src="imgMin" width="350" @load="loaded = true">
        </a>
       </div>
      </div>
      <div v-show="mode === 'data'" style="text-align:center;max-height:420px;overflow:scroll;">
        <spotgins-graph :url="root" :id="datastreamId" :selected="mode === 'data'"></spotgins-graph>
      </div>
      <div v-show="mode === 'download'" style="margin:20px;">     
       <!--    <input type="button" value="Télécharger JSON" @click="download('json')"/><br /><br />-->
         <input type="button" value="Télécharger ASCII" @click="download('ascii')" />
      </div>
    </div>
   </div>
</template>

<script>
var L = require('leaflet')
import { Icon } from 'leaflet';
L.TilesControl = require('../modules/leaflet.tiles.js')
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const JsonDiv = () => import('./json-div.vue')
const SpotginsGraph = () => import('./spotgins-graph.vue')
export default {
  name: 'SpotGins',
  components: {
    JsonDiv,
    SpotginsGraph
  },
  props: {
    root: {
      type: String,
      default: 'https://catalog.formater/FROST-Server/v1.1/'
    }
  },  
  data () {
    return {
      map: null,
      stations: [],
      scheme: {},
      json: null,
      datastreamId: null,
      baseUrl: null,
      layerControl: null,
      bounds: null,
      mode: 'graph',
      selected: null,
      dataJsonUrl: null,
      img: null,
      imgMin: null,
      dataAsciiUrl: null,
      sitelog: null,
      loaded: false,
      popup: null,
      groupLayers: []
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.map = L.map( "map", {scrollWheelZoom: true}).setView([20, -0.09], 3);
      this.layerControl = new L.TilesControl(null, null, {position: 'topright'})
      this.layerControl.tiles.arcgisTopo.layer.addTo(this.map)
      this.layerControl.addTo(this.map)
      this.popup = L.popup({minWidth: 450, minHeight:500, maxHeight:500})
      var node = document.querySelector('#json')
      // container.appendChild(node)
      this.popup.setContent(node)
      var self = this
//       this.map.on('popupclose', function (e) {
//         var json = e.target._container.querySelector('#json')
//         if (json) {
//           self.$el.appendChild(json)
//         }
//         self.reset()
//       })
      this.load()
    },
    load () {
      if (!this.root) {
        alert('Pas de fichier "root"!')
      }
      this.$http.get(this.root + 'Things?$expand=Locations,Datastreams')
      .then(
          resp => {this.display(resp.body)},
          resp => {alert('Erreur de chargement: ' + resp.status)}
       )
    },
    reset () {
      this.loaded = false
      this.img = null
      this.imgMin = null
      this.json = null
      this.dataJsonUrl = null
      this.dataAsciiUrl = null
      this.sitelog = null
    },
    addStation (index) {
      console.log(index)
      if (!this.stations[index]) {
        if (this.bounds) {
          this.map.fitBounds(this.bounds, {padding: [20,20]})
        }
        return
      }
      var groupId = this.stations[index].properties.groupId 
      var className = groupId === 1 ? 'marker-blue' : 'marker-red'
      var icon = L.divIcon({className: className})
      var self = this
      var layer = L.geoJSON(this.stations[index],{
        pointToLayer: function(feature, latlng) {
           var marker = L.marker(latlng, {icon: icon, title: feature.id})
           marker.on('click', self.getData )
           return marker
        }
      })
     // layer.addTo(this.map)
       if (!this.groupLayers[groupId]) {
        this.groupLayers[groupId] = L.layerGroup([layer])
        this.layerControl.addOverlay(this.groupLayers[groupId], 'Groupe ' + groupId +' <div class="' + className + '"></div>' )
        this.groupLayers[groupId].addTo(this.map)
      } else {
        this.groupLayers[groupId].addLayer(layer)
      }
      var bounds = layer.getBounds()
      if (!this.bounds) {
        this.bounds = bounds
      } else {
        this.bounds.extend(bounds)
      }
      this.stations[index].layer = layer
      this.addStation(index + 1)
    },
    display (data) {
      var self = this
      data.value.forEach(function (value) {
        if (value.Locations[0]) {
	        var station = value.Locations[0].location
	        station.properties = Object.assign({name: value.name, description: value.description}, value.properties)
	        station.datastream = value.Datastreams[0]
// 	        station.properties = value.properties
// 	        station.properties.name = value.name
// 	        station.properties.description = value.description
	       
	        station['@iot.id'] = value['@iot.id']
	        self.stations.push(station)
        }
      })
      this.addStation(0)
       
    },
    download (type) {
      console.log(type)
      var dataUrl = null
      if (type === 'json') {
        // var MIME_TYPE = "application/json";
        dataUrl = this.dataJsonUrl
        console.log(dataUrl)
      }
      if (type === 'ascii') {
        dataUrl = this.dataAsciiUrl
      }
      console.log(dataUrl)
      this.$http.get(dataUrl, {responseType: 'blob'}).then(
          resp => {
            console.log(resp.bodyBlob)
            if (resp.bodyBlob) {
             // var blob = new Blob(resp.bodyBlob);
              var url = window.URL.createObjectURL(resp.bodyBlob);
              const a = document.createElement('a')
              a.href = url
              a.download = dataUrl.split('/').pop()
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }
          }
      )
//       var blob = new Blob([data], {type: MIME_TYPE});
//       window.location.href = window.URL.createObjectURL(blob);
    },
    extractUrl (json) {
      var url = new URL(this.root)
      var base = url.pathname.split('/')
      base.pop()
      this.baseUrl = url.origin + base.join('/')
      var scheme = json.scheme
      for(var key in scheme) {
        console.log(key)
        this.scheme[key] = scheme[key].replace('[base_url]', this.baseUrl)
      }
      var self = this
      json.stations.forEach(function (url, index) {
         self.stations.push({
           id: index,
           url: url.replace('[base_url]', self.baseUrl)
         })
      })
      this.loadFeatures(0)
    },
    loadFeatures (index) {
      if (!this.stations[index]) {
        if (this.bounds) {
          this.map.fitBounds(this.bounds)
        }
        return
      }
      var self = this
      this.$http.get(this.stations[index].url)
      .then(resp => {
        console.log(resp.body)
        var className = resp.body.className
        var id = resp.body.id
        var icon = L.divIcon({className: className})
        this.stations[index].feature = L.geoJSON(resp.body,{
          pointToLayer: function(feature, latlng) {
             var marker = L.marker(latlng, {icon: icon, title: feature.id})
             marker.on('click', self.getData )
             return marker
          }
        }).addTo(this.map)
        var bounds = this.stations[index].feature.getBounds()
        if (!this.bounds) {
          this.bounds = bounds
        } else {
          this.bounds.extend(bounds)
        }
        this.layerControl.addOverlay(this.stations[index].feature, id +' <div class="' + className + '"></div>' )
        // this.map.fitBounds(this.stations.getBounds())
        this.loadFeatures(index + 1)
      }, resp => {
        alert('Erreur chargement station ' + (index + 1 ) + ': ' + resp.status)
        this.loadFeatures(index + 1)
      })
    },
    getData (e) {
      this.mode = 'graph'
       if (this.loaded === e.target.id) {
         return
       }
      this.img = e.target.feature.datastream.properties.img
      this.imgMin = this.img
      this.datastreamId = e.target.feature.datastream['@iot.id']
      this.dataAsciiUrl = e.target.feature.datastream.properties.file
     this.json = e.target.feature.properties
      this.popup.setLatLng(e.target.getLatLng())
      this.popup.openOn(this.map)
      
    },
    getDataOld (e) {
//       this.imgUrl = null
//       this.dataJsonUrl = null
//       this.json = null
//       this.dataAsciiUrl = null
      this.mode = 'graph'
      if (this.loaded === e.target.id) {
        return
      }
    
     // e.target.bindPopup('Recherche en cours ...', {minWidth: 500, minHeight:600})
     // e.target.openPopup()
      var id = e.target.feature.id
      this.loaded = id
      this.selected = id
      this.img = this.scheme.img.replaceAll('[id]', id)
      this.imgMin = this.scheme.imgMin.replaceAll('[id]', id)
      // console.log(url)
      this.popup.setLatLng(e.target.getLatLng())
     this.popup.openOn(this.map)
//        this.img = this.scheme.img.replaceAll('[id]', id)
//       this.imgMin = this.scheme.imgMin.replaceAll('[id]', id)
      this.dataJsonUrl = this.scheme.dataJSON.replaceAll('[id]', id)
      this.dataAsciiUrl = this.scheme.dataASCII.replaceAll('[id]', id)
       this.sitelog = this.scheme.sitelog.replaceAll('[id]', id)
     
      var self = this
      // self.createPopup(e.target)
      
      
    },
    createPopup(marker) {
     // marker.closePopup();
     // marker.unbindPopup();
      this.mode = 'graph'
     // var container = document.createElement('div')
//       var node = document.querySelector('#json')
//       container.appendChild(node)
     // marker.bindPopup(container, {minWidth: 450, minHeight:500}).openPopup()
      this.img = this.scheme.img.replaceAll('[id]', marker.feature.id)
      this.imgMin = this.scheme.imgMin.replaceAll('[id]', marker.feature.id)
      this.dataJsonUrl = this.scheme.dataJSON.replaceAll('[id]', marker.feature.id)
      this.dataAsciiUrl = this.scheme.dataASCII.replaceAll('[id]', marker.feature.id)
    }
  }
}
</script>
<style src='leaflet/dist/leaflet.css'>
    /* global styles */
</style> 
<style>

#map {
  min-height:500px;
  height:100vh;
  width:100%;
}
#map .leaflet-popup-scrolled {
  border: none;
  padding-top: 0;
}
#map h4 {
  margin:0;
}
h1 {
   position: fixed;
   bottom:0;
   width:100%;
   text-align:center;
   z-index:1000;
   pointer-events:none;
}
div.marker-red{
  width: 30px;
  height: 30px;
  background-color: darkred;
  border: 1px solid black;
  border-radius:3px;
}

div.marker-blue {
  width: 30px;
  height: 30px;
  background-color: blue;
  border: 1px solid black;
  border-radius:3px;
}
div.leaflet-control-layers-overlays div.marker-red,
div.leaflet-control-layers-overlays div.marker-blue {
  display:inline-block;
  width: 10px;
  height: 10px;
  vertical-align: middle;
} 
 ul.menu-content {
  font-size: 0.8rem;
  border-bottom: 1px solid #adadad;
  margin:5px 0;
  padding: 5px 0 0 0;
 }
 ul.menu-content li {
  display: inline-block;
   min-width: 50px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border: 1px solid #adadad;
  border-bottom: none;
  text-align: center;
  color: black;
  height: 30px;
  padding:0;
  vertical-align: middle;
  margin: 0;
  background: #efefef;
  text-transform: capitalize;
}

ul.menu-content li span {
    text-transform: capitalize;
    vertical-align: middle;
    height: 30px;
    min-width:50px;
    color:black;
    padding: 5px 10px 0 10px;
    text-decoration: none;
    display:inline-block;
    cursor:pointer;
}
ul.menu-content li span:hover {
  color:#b8412c;
}
ul.menu-content li span.selected {
  background:white;
  color:#b8412c;
}
</style>
