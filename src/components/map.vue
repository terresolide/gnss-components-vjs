<template>
  <div style="position:relative;overflow:clip visible;">
    <div class="form" >
      <div class="button fa fa-chevron-right" @click="closeForm()" ></div>
      <file-form mode="map"></file-form>
    </div>
   
    <div id="map" style="overflow:auto;"></div>
    <div  id="json" v-show="show" style="background:white;max-width:320px;min-height:400px;max-height:400px;">
      <div style="position: absolute;right:10px;top:10px;" @click="closePopup"><span class="fa fa-close"></span></div>
      <div style="min-height:100px;cursor:pointer;">
           <h4 v-if="selected" @click="goToStation($event)" >STATION {{selected.properties.name}}</h4>
           <ul v-if="selected"  class="menu-content">
              <li @click="mode = 'info'" >
             <span :class="{'selected': mode === 'station'}" >Informations</span>
            </li>
            <li @click="mode='image'" >
               <span :class="{'selected': mode === 'image'}" >Graphique</span>
            </li>
      
             </ul>
      <div v-if="selected">
      <div v-show="mode == 'info'" style="min-width:250px;">
	      <h5 style="margin-bottom:0;">Coordinates</h5>
	      
	       
	         <div style="margin-left:10px;margin-top:18px;">
	       
	         <div>Latitude: {{selected.geometry.coordinates[1].toLocaleString()}}°</div>
	         <div>Longitude: {{selected.geometry.coordinates[0].toLocaleString()}}°</div>
	         <div v-if="selected.properties.height">Height: {{selected.properties.height.toLocaleString()}} m</div>
	        </div>
	      <h5>Informations</h5>
	       <div style="margin-left:10px;margin-top:18px;">
	        <div v-if="selected.properties.status">Status: {{selected.properties.status}}</div>
	        <div v-if="selected.properties.m3g">M3g:  <a :href="selected.properties.m3g" target="_blank">sitelog</a></div>
	        <div>Domes: {{selected.properties.domes}}</div>
	        <div v-if="selected.properties.networks">Networks: {{selected.properties.networks.join(', ')}}</div>
	       </div>
	      </div>
	      <div v-if="selected" v-show="mode == 'image'" style="min-width:250px;">
	        <gnss-carousel :images="selected.properties.images" :height="300"></gnss-carousel>
	      </div>
     </div>
      </div>
      <div style="position:absolute;bottom:3px;right:10px;" title="See the station in full page">
        <span class="fa fa-arrows-alt button"  @click="goToStation($event)"></span>
      </div>
    </div>
   </div>
</template>

<script>
// const SsrCarousel () => import('vue-ssr-carousel')

import moment from 'moment'
// import FmtTimeline from './fmt-timeline.vue'
var L = require('leaflet')
import { Icon } from 'leaflet';
L.TilesControl = require('../modules/leaflet.tiles.js')
L.DivIcon.Arrow = require('../modules/leaflet.divicon.arrow.js')
L.Control.Form = require('../modules/leaflet.control.form.js')
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});
import FileForm from './file-form.vue'
require('leaflet-draw')
L.modLat = function( lat ){
     lat = lat%180;
     if( lat > 90 ){
          lat -= 180;
     }else if( lat < -90 ){
          lat += 180;
     }
     return lat;
}
L.modLng = function( lng ){
     lng = lng%360;
     if( lng > 180 ){
          lng -= 360;
     }else if( lng < -180 ){
          lng += 360;
     }
     return lng;
}
// const JsonDiv = () => import('./json-div.vue')
// const SpotginsGraph = () => import('./spotgins-graph.vue')
//const GnssCarousel = () => import('./gnss-carousel.vue')
import GnssCarousel from './gnss-carousel.vue'
// const DateNavigation = () => import('./date-navigation.vue')

export default {
  name: 'SpotGins',
  components: {
    FileForm,
    GnssCarousel
  },
  props: {
    
    top: {
      type: Number,
      default: 20
    }
  },  
  computed: {
    root () {
      return this.$store.getters['frost']
    },
    api () {
      return this.$store.getters['api']
    }
  },
  watch: {
    $route (newroute, oldroute) {
      if (newroute.name === oldroute.name && newroute.query.hasOwnProperty('bounds')
         && (newroute.query.selected !== oldroute.query.selected ||
           newroute.query.bounds !== oldroute.query.bounds)) {
        // open close popup
        console.log('gestion des popups')
        return
      }
      this.treatmentQuery(newroute.query)
    }
  },
  data () {
    return {
      map: null,
      stationId: null,
      stations: [],
//       scheme: {},
      json: null,
//      baseUrl: null,
      layerControl: null,
      bounds: null,
      mode: 'graph',
      selected: null,
//      dataJsonUrl: null,
      show: false,
      popup: null,
      groups: [],
      groupLayers: [],
      classnames: {
        1: 'blue',
        2: 'red',
        3: 'orange'
      },
      drawControl: null,
      drawLayers: null,
      
    }
  },
  created () {
    
    
  },
  mounted () {
    this.initialize()
  },
  methods: {
    
    changeQuery (params) {
      var newquery = Object.assign({}, this.$route.query)
      newquery = Object.assign(newquery, params)
      // query = query.filter(x => x !== null)
      for (var key in newquery) {
        if (newquery[key] ===  null || newquery[key].length == 0) {
          delete newquery[key]
        }
      }
      this.$router.push({name: 'home', query: newquery}).catch(()=>{})
    },
    closeForm () {
      var elt = document.querySelector('.form')
      elt.classList.toggle('expand')
    },
    treatmentQuery (query, first) {
      this.drawLayers.clearLayers()
      if (query.center && query.radius) {
        var point = query.center.split(',')
        var circle = L.circle([point[1],point[0]], query.radius * 1000, {color: 'red', weight: 1})
        this.drawLayers.addLayer(circle)
      } else if (query.bbox) {
        var tab = query.bbox.match(/\-{0,1}\d+(?:\.\d+)?/g).map(Number)
        if (tab.length == 4) {
          var rectangle = L.rectangle([[tab[1], tab[0]], [tab[3], tab[2]]], {color: 'red', weight: 1})
          this.drawLayers.addLayer(rectangle)
        } else {
          // remove query bbox?
        }
      }
      console.log('first dans trq ', first)
      this.load(0, first)
    },
   
    initDrawControl () {
        if (this.drawControl) {
          return
        }
        this.drawLayers = new L.FeatureGroup()
        this.map.addLayer(this.drawLayers)
        this.drawControl = new L.Control.Draw({
          draw: {
            rectangle: {
              shapeOptions: {
                color: '#ff0000',
                weight: 1
              }
            },
            circlemarker: false,
            circle: {
              shapeOptions: {
                color: '#ff0000',
                weight: 1
              }
            },
            marker: false,
            polygon: false,
            polyline: false
          },
          edit: {
            featureGroup: this.drawLayers
          }
        })
        this.drawControl.addTo(this.map)
        this.layerControl.addOverlay(this.drawLayers, 'Selected area')
        var self = this
        this.map.on(L.Draw.Event.CREATED, function (e) {
          switch (e.layerType) {
	          case 'rectangle':
		          let layer = e.layer
		          let bounds = e.layer.getBounds()
		          self.changeQuery({bbox: bounds.toBBoxString(), center: null, radius: null})
		          return
		          break
	          case 'circle':
	            var center = e.layer.getLatLng()
	            var radius = e.layer.getRadius()
	            self.changeQuery({bbox: null, center: center.lng + ',' + center.lat, radius: Math.round(radius)/1000})
              return
	            break
          }
        
        })
      
        this.map.on(L.Draw.Event.EDITED, function (e) {
          let bounds
          e.layers.eachLayer(function (layer) {
            if (layer instanceof L.Circle) {
              console.log(e)
              var center = layer.getLatLng()
              var radius = layer.getRadius()
              self.changeQuery({center: center.lng + ',' + center.lat, radius: Math.round(radius)/1000})
              // self.$router.push({name: 'home', query: {center: center.lng + ',' + center.lat, radius: Math.round(radius)/1000}})
           
            } else if (layer instanceof L.Rectangle) {
              let bounds = layer.getBounds()
              self.changeQuery({bbox: bounds.toBBoxString(), center: null, radius: null})
            }
          })
        })
      
        this.map.on(L.Draw.Event.DELETED , function (e) {
          self.drawLayers.clearLayers()
          self.changeQuery({bbox: null, center: null, radius: null})
        })
    },
    initialize () {
      console.log('initialize')
      this.map = L.map( "map", {scrollWheelZoom: true}).setView([20, -0.09], 3);
      this.layerControl = new L.TilesControl(null, null, {position: 'topleft'})
      this.layerControl.tiles.arcgisTopo.layer.addTo(this.map)
      this.layerControl.addTo(this.map)
      var control = new L.Control.Form()
      control.addTo(this.map)
      this.popup = L.popup({autoPan:true, minWidth: 300, minHeight:350, maxHeight:410, closeButton: false})
      this.initDrawControl()
      var self = this
//       this.map.whenReady(function (e) {
//         var container = self.map.getContainer()
//         var panes = self.map.getPanes()
//         console.log(container)
//         console.log(panes)
// //         var div = L.DomUtil.create('div', 'gnss-panes leaflet-pane leaflet-map-pane')
// //         container.append(div)
//         for (var name in panes) {
// //           if (name !== 'popupPane') {
// //             div.append(panes[name])
// //           }
//         }
//       })
      this.map.on('zoomend moveend', function (e) {
        var bbox = self.map.getBounds().toBBoxString()
        var query = Object.assign({}, self.$route.query)
        query.bounds = bbox
        self.$router.push({name: 'home', query: query}).catch(()=>{})
      })
      var node = document.querySelector('#json')
      this.popup.setContent(node)
      var self = this

      this.dateLayers = L.layerGroup()
      this.treatmentQuery(this.$route.query, true)
     
    },
    closePopup() {
      this.selected = null
      this.map.closePopup()
    },
    goToStation (e) {
      e.preventDefault()
      e.stopPropagation()
      this.$store.commit('setQuery', this.$route.query)
      var query = Object.assign({}, this.$route.query)
      delete query.network
      delete query.selected
      delete query.bounds
      this.$router.push({ name: 'station', params: { name: this.selected.properties.name, id: this.selected.id}, query: query})
    },

    load (i, first) {
      console.log('first dans load', first)
      if (!this.api) {
        alert('Pas de service SensorThings!')
      }
      var url = this.api + 'stations/'
      this.$http.get(url, {params: this.$route.query})
      .then(
          resp => {this.display(resp.body, i, first)},
          resp => {alert('Erreur de chargement: ' + resp.status)}
       )
    },
    display (data, index, init) {
      var self = this
      if (index === 0) {
        for (var key in this.groupLayers) {
          if (this.groupLayers[key]) {
	          this.groupLayers[key].clearLayers()
	          this.groupLayers[key].remove(this.map)
	          this.layerControl.removeLayer(this.groupLayers[key])
	          this.groupLayers[key] = null
          }
        }
        this.groupLayers = []
        this.stations = []
        this.groups = []
        this.bounds = null
      }
      data.stations.forEach(function (value) {
          var feature = value.location
          feature.id = value.id
          if (!value.properties) {
            value.properties =  {}
          }
          value.properties.name= value.name,
          value.properties.description= value.description
          value.properties.images = value.images
          feature.properties = value.properties
          
	        self.addStation(feature)
      })
      // next step
      // add layer to control
      this.groups.sort()
      var self = this
      var first = 'STATION STATUS'
      this.groups.forEach(function (group) {
        self.groupLayers[group].first = first ? {title:first,separator:true}:false
        first = false
        var className = self.getClassname(group)
        self.layerControl.addOverlay(self.groupLayers[group],  group +' <div class="marker-' + className + '"></div>' )
      })
      if (!init) {
        this.closePopup()
      }
      if (init && this.$route.query.selected) {
        var station = this.stations.find(st => st.id === parseInt(this.$route.query.selected))
        this.openPopup(station)
      }
      if (init && this.$route.query.bounds) {
        var tab = this.$route.query.bounds.split(',')
        if (tab.length === 4) {
          this.bounds = [
            [parseFloat(tab[1]), parseFloat(tab[0])],
            [parseFloat(tab[3]), parseFloat(tab[2])]
          ]
        }
      } 
      if (!this.bounds && this.drawLayers.getBounds()) {
        if (!this.bounds) {
          this.bounds = this.drawLayers.getBounds()
        } else {
          this.bounds.extend(this.drawLayers.getBounds())
        }
      }
      if (this.bounds) {
          this.map.fitBounds(this.bounds)
      }
      
    },
    getClassname (status) {
      console.log(status)
      switch (status) {
        case 'PERMANENT':
          return 'red'
        case 'MOBILE':
          return 'orange'
        default:
          return 'blue'
      }
    },
    getStatus (feature) {
      switch (feature.properties.status){
        case 'PERMANENT':
        case 'MOBILE':
          return feature.properties.status
        default:
          return 'Unknown'
      }
    },
    addStation(feature) {
      this.stations.push(feature)
      var groupId = this.getStatus(feature)
      var html = '<span>' + feature.properties.images.length + '</span>'
      var className = this.getClassname(feature.properties.status)
      var icon = L.divIcon({
        className: 'icon-marker marker-' + className, 
        iconSize: [15,15],
        html: html})

      var self = this
      var layer = L.geoJSON(feature,{
        pointToLayer: function(feature, latlng) {
           var marker = L.marker(latlng, {icon: icon, title: feature.properties.name})
           marker.on('click', self.getData )
          // L.marker(latlng, {icon: arrow}).addTo(self.map)
           return marker
        }
      })
       if (!this.groupLayers[groupId]) {
        this.groupLayers[groupId] = L.layerGroup([layer])
   //     this.stationLayers.addLayer(this.groupLayers[groupId])
      //  this.groupLayers[groupId].first = first ? {title:first,separator:true}:false
        this.groups.push(groupId)
        this.groupLayers[groupId].addTo(this.map)
        console.log('add layer ' + groupId)
        // this.layerControl.addOverlay(this.groupLayers[groupId],  groupId +' <div class="marker-' + className + '"></div>' )
      } else {
        this.groupLayers[groupId].addLayer(layer)
      }
      this.stations[this.stations.length - 1].layer = layer
      var bounds = layer.getBounds()
      if (!this.bounds) {
        this.bounds = bounds
      } else {
        this.bounds.extend(bounds)
      }
    },
    download (type) {
      var dataUrl = null
      if (type === 'json') {
        // var MIME_TYPE = "application/json";
        dataUrl = this.dataJsonUrl
      }
      if (type === 'ascii') {
        dataUrl = this.dataAsciiUrl
      }
      this.$http.get(dataUrl, {responseType: 'blob'}).then(
          resp => {
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
    openPopup (station) {
	      this.selected = station
	      this.mode = 'image'
	      var coord = station.geometry.coordinates
	      this.show = true
	      this.popup.setLatLng([coord[1], coord[0]])
	      this.popup.openOn(this.map)
    },
    getData (e) {
      var query = Object.assign({}, this.$route.query)
      if (this.selected && this.selected.id === e.target.feature.id) {
        delete query['selected']
        this.$router.push({name: 'home', query: query}).catch(()=>{})
        
        this.closePopup()
        return
      }
      this.mode = 'image'
      this.selected = e.target.feature
      this.show = true
      this.popup.setLatLng(e.target.getLatLng())
      this.popup.openOn(this.map)
      
      query.selected = e.target.feature.id
      this.$router.push({name: 'home', query: query}).catch(()=>{})
      return false
    },

//     getStation () {
//       this.mode = 'station'

//       if (!this.json || this.json['@datastream.id'] !== this.datastreamId) {
//         this.json = null
//         this.$http.get(this.feature.properties['Thing@iot.navigationLink'])
//         .then(resp => {
//           this.json = resp.body
//           this.json['@datastream.id'] = this.datastreamId})
//       }
//     },
    createPopup(marker) {
      this.mode = 'graph'
    }
  }
}
</script>
<style src='leaflet/dist/leaflet.css' />

    /* global styles */
</style> 
<style src="leaflet-draw/dist/leaflet.draw.css"></style>
<!--  <style src='../assets/css/leaflet.divicon.arrow.css'></style>-->

<style>
div.gnss-panes {
  overflow:hidden;
}
.button.fa-chevron-right {
  float:right;
  cursor: pointer;
  padding: 3px 5px;
  border-radius:3px;
  border:1px dotted white;
}
.button.fa-chevron-right:hover {
  border-color: grey;
}
.leaflet-touch .leaflet-control-layers-toggle {
  width: 30px;
  height: 30px;
}
 a.leaflet-form-link {
   width: 44px;
  height: 44px;
  line-height:44px;
  font-size: 1.2rem;
  cursor: pointer;
}
div.leaflet-marker-icon {
  margin-left: -7px;
margin-top: -7px;
width: 15px;
height: 15px;
transform: translate3d(255px, -215px, 0px);
z-index: -215;
outline: none;
}
div[id="map"] a.leaflet-draw-draw-circle:before {
  content:"\f111";
  font-family: "FontAwesome"
}

div[id="map"] a.leaflet-draw-draw-rectangle:before{
  content:"\f04d";
  font-family: "FontAwesome"
}
div[id="map"] a.leaflet-draw-edit-edit:before{
  content:"\f040";
  font-family: "FontAwesome"
}
div[id="map"] a.leaflet-draw-edit-remove:before{
  content:"\f1f8";
  font-family: "FontAwesome"
}
 /** menu leaflet draw */
  div[id="map"] .leaflet-container .leaflet-draw-section a {
    color: #fff;
    font-weight: 700;
  }
    div[id="map"] .leaflet-draw-actions li a {
    color: #fff;
  }
  div[id="map"] .leaflet-draw-actions li {
    display: block;
    margin: 0 0 1px 0;
    border-radius: 0;
  }
  div[id="map"] .leaflet-draw-actions {
    background: #555;
    margin-left:5px;
    padding: 2px;
    -webkit-border-radius: 0 4px 4px 4px;
    border-radius: 0 4px 4px 4px;
  }
  div[id="map"] .leaflet-draw-actions li:first-child a{
    -webkit-border-radius: 0 4px 0 0;
    border-radius: 0 4px 0 0;
  }
  div[id="map"] .leaflet-draw-actions li:last-child a{
    -webkit-border-radius: 0 0px 4px 4px;
    border-radius: 0 0px 4px 4px;
  }
div[id="json"] .fa-close {
  padding:3px;
  border: 1px dotted white;
  border-radius: 3px;
  cursor: pointer;
}
div[id="json"] .fa-close:hover {
 border-color: grey;
}
.step {
 /* margin-right:45px;*/
  text-align: left;
  font-size:10px;
  width:30px;height:5px;
}
.step:first-child:after {
 content:' 350';
 /* margin-right: -30px;*/
  margin-left:35px;
 }
 .step:nth-child(15):before {
 content:'0';
 width:40px;
 margin-left:35px;
 }
 .step:last-child:before {
 content:'-350';
margin-left:35px;
 }
#map {
  min-height:500px;
  height:100vh;
  width:100%;
  overflow: visible;
}
#map .leaflet-popup-scrolled {
  border: none;
  padding-top: 0;
}
#map h4 {
  margin:0;
}
div.navigator {
 position: fixed;
   bottom:5px;
   width:auto;
   left:50%;
   -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
   text-align:center;
   z-index:1000;
   pointer-events:none;
}
 
.leaflet-div-icon {
  /**  position: relative;
    top: -50%;
    left: -50%; **/
 
}
div.icon-marker {
  color: white;
  width: 12px;
  height: 12px;
  border: 1px solid black;
  border-radius:3px;
  text-align:center;
  line-height:12px;
}
div.icon-marker span {
  line-height:12px;
  font-weight:700;
  vertical-align: middle;
}
div.marker-red{
  background-color: darkred;
}

div.marker-blue {
  background-color: #0000CD;
}
div.marker-orange {

  background-color: darkorange;

}
div.arrow-down {
  width: 20px;
  height: 20px;
  
  background-size: 50% 100%;
  background-repeat: no-repeat;
  background-position: left, right;
  line-height:20px;
  vertical-align: middle;
  color:white;
  text-align:center;
}
div.a-red {
  background-image:
    linear-gradient(to bottom right, transparent 50%, darkred 0),
    linear-gradient(to top right, darkred 50%, transparent 0);
}
div.a-orange {
  background-image:
    linear-gradient(to bottom right, transparent 50%, darkorange 0),
    linear-gradient(to top right, darkorange 50%, transparent 0);
}
div.a-blue {
  background-image:
    linear-gradient(to bottom right, transparent 50%,  #0000CD 0),
    linear-gradient(to top right,  #0000CD 50%, transparent 0);
}
div.leaflet-control-layers-overlays div.marker-red,
div.leaflet-control-layers-overlays div.marker-blue, 
div.leaflet-control-layers-overlays div.marker-orange {
  display:inline-block;
  width: 15px;
  height: 15px;
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
  vertical-align:top;
}
.wrapper-content ul.menu-content li:last-child, 
.wrapper-layout ul.menu-content li:last-child {
  margin-bottom:0;
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
div.form {
  position: absolute;
  transform: translateX(400px);
  height: 450px;
  width: 350px;
  z-index: 1001;
  background: white;
  right: 10px;
  top: 10px;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid rgba(0,0,0,0.2);
  background-clip: padding-box;
  transition: transform 330ms ease-in-out;
  font-size: 0.8rem;
  box-sizing:content-box;
}
div.form.expand {
  transform: translateX(0px);
  transition: transform 330ms ease-in-out;
}
</style>
