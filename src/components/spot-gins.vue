<template>
  <div style="position:relative;overflow:hidden;">
    <div class="form expand" >
    
      <div class="button fa fa-chevron-right" @click="closeForm()" ></div>
       <div v-if="solutions"> 
          <label>Solution</label>
          <select v-model="searchparams.solution" >
             <option :value="null">---</option>
             <option v-for="pt in solutions" :value="pt">{{pt}}</option>
          </select>
      </div>
       <div > 
          <label>From</label>
          <input type="date" v-model="searchparams.start" />
      </div>
       <div > 
       <label>To</label>
          <input type="date" v-model="searchparams.end" />
      </div>
      <div>
          <label style="width:auto;">Extend in (years)</label>
         
      </div>
      <div>
         <label style="margin-left:10px;width:90px;">min</label>
         <input type="number" v-model="searchparams.lenmin" style="width:80px;"/></div>
      <div>
          <label style="margin-left:10px;width:90px;">max</label>
          <input type="number" v-model="searchparams.lenmax" style="width:80px;"/>
      </div>
      <div>
          <label >fill rate > </label>
          <input type="number" v-model="searchparams.fill" min="0" max="100" style="width:80px;"/> %
      </div>
       <div v-if="productors"> 
          <label>Operator</label>
          <select v-model="searchparams.productor" >
             <option :value="null">---</option>
             <option v-for="pt in productors" :value="pt">{{pt}}</option>
          </select>
      </div>
      <div v-if="productTypes"> 
          <label>Product type</label>
          <select v-model="searchparams.productType" >
             <option :value="null">---</option>
             <option v-for="pt in productTypes" :value="pt">{{pt}}</option>
          </select>
      </div>
      <div style="width:100%;margin-bottom:5px;" v-if="networks">
          <label>Networks</label>
          <div style="">
            <span v-for="value in networks" style="display:inline-block;">
               <input v-model="searchparams.network" type="checkbox" :value="value"> {{value}}
            </span>
          </div>
      </div>
       <div v-if="constels"> 
          <label>Constel</label>
          <select v-model="searchparams.constel" >
             <option :value="null">---</option>
             <option v-for="pt in constels" :value="pt">{{pt}}</option>
          </select>
      </div>
      <div style="margin-top:10px;">
          <label></label>
          <button @click="reset()" type="button" >Resest</button>
          <button @click="search($event)" type="submit" >Search <i class="fa fa-search"></i></button>
      </div>
  
    </div>
   
    <div id="map" ></div>
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
     <!--  <ul class="menu-content">
        <li @click="getStation" >
        <span :class="{'selected': mode === 'station'}" >Station</span>
        </li>
        <li @click="mode='graph'" >
            <span :class="{'selected': mode === 'graph'}" >Graphique</span>
        </li>
      
         <li @click="mode='download'" >
            <span :class="{'selected': mode === 'download'}" >Téléchargement</span>
        </li>
         <li v-if="$route" @click="goToStation($event)" >
            <span :class="{'selected': mode === 'more'}" >Plus d'info</span>
        </li>
      </ul>
      <div v-show="mode === 'station'" style="max-height:500px;overflow-y:scroll;">
      <json-div :json="json" :selected="mode === 'station'" :deployed="true"></json-div>
      </div>
      <div v-show="mode === 'graph'" style="text-align:center;max-height:420px;overflow:scroll;">
       <div v-if="imgMin" v-show="loaded">
        <a :href="img" target="_blank">
          <img  :src="imgMin" width="350" @click="goToStation($event)" @load="loaded = true">
        </a>
       </div>
      </div>
      <div v-show="mode === 'data'" style="text-align:center;max-height:420px;overflow:scroll;">
        <spotgins-graph :url="root" :id="datastreamId" :average="average" :selected="mode === 'data'"></spotgins-graph>
      </div>
      <div v-show="mode === 'download'" style="margin:20px;">     
         <input type="button" value="Télécharger ASCII" @click="download('ascii')" />
      </div> -->
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
   // JsonDiv,
  //  SpotginsGraph,
 //   DateNavigation,
  //  FmtTimeline,
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
    },
    networks () {
      return this.$store.getters['networks']
    },
    productors () {
      return this.$store.getters['productors']
    },
    solutions () {
      return this.$store.getters['solutions']
    },
    productTypes () {
      return this.$store.getters['productTypes']
    },
    constels () {
      return this.$store.getters['constels']
    }
  },
  watch: {
    $route (newroute) {
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
      searchparams: {
        productType: null,
        solution: null,
        productor: null,
        network: [],
        constel: null,
        start: null,
        end: null,
        lenMin: null,
        lenMax: null,
        fill: null
        
      }
    }
  },
  created () {
    this.date = this.defaultDate
    
  },
  mounted () {
    this.initialize()
  },
  methods: {
    reset() {
      console.log('RESET')
      this.$router.push({name:'home', query: {}}).catch(()=>{})
    },
    search (event) {
      event.preventDefault()
      var self = this
      this.searchparams.network = this.searchparams.network.filter(nt => self.networks.indexOf(nt) >= 0)
      this.changeQuery(this.searchparams)
    },
    closeForm () {
      var elt = document.querySelector('.form')
      elt.classList.toggle('expand')
    },
    treatmentQuery (query) {
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
      for (var key in query) {
        if (key === 'network') {
          this.searchparams.network = query['network'].split(',')
        } else if (['center', 'radius', 'bbox'].indexOf(key) < 0) {
          this.searchparams[key] = query[key]
        }
      }
      console.log(query)
      for (var key in this.searchparams) {
        if (!query[key]) {
          if (key === 'network') {
            this.searchparams[key] = []
          } else {
            this.searchparams[key] = null
          }
        }
      }
      console.log(this.searchparams)
      this.load(0)
    },
    changeQuery (params) {
      var newquery = Object.assign({}, this.$route.query)
      newquery = Object.assign(newquery, params)
      // query = query.filter(x => x !== null)
      for (var key in newquery) {
        if (newquery[key] ===  null || newquery[key].length == 0) {
          delete newquery[key]
        }
        if (key === 'network' && Array.isArray(newquery['network'])){
            newquery['network'] = newquery['network'].join(',')
        }
      }
      console.log(newquery)
      this.$router.push({name: 'home', query: newquery}).catch(()=>{})
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
          console.log(e.layerType)
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
          // self.updateUrl()
        //  self.drawIntersection()
          // trigger event fmt:selectAreaChange
//           let event = new CustomEvent('fmt:selectAreaChange', {detail: self.bbox})
//           document.dispatchEvent(event)
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
//             switch(e.layerType){
// 	            case 'rectangle':
// 	              let layer = e.layer
// 	              let bounds = e.layer.getBounds()
// 	              self.bbox = self.drawValidBbox(bounds)
// 	              break
// 	            case 'circle':
// 	              console.log(e)
// 	              var center = e.layer.getLatLng()
// 	              var radius = e.layer.getRadius()
// 	              console.log(center)
// 	              console.log(radius)
// 	              self.changeQuery({center: center.lng + ',' + center.lat, radius: Math.round(radius)/1000})
// 	              // self.$router.push({name: 'home', query: {center: center.lng + ',' + center.lat, radius: Math.round(radius)/1000}})
// 	              break
// 	          }
          })
          // self.bbox = self.drawValidBbox(bounds)
          // self.updateUrl()
          // self.drawIntersection()
          // trigger event fmt:selectAreaChange
//           let event = new CustomEvent('fmt:selectAreaChange', {detail: self.bbox})
//           document.dispatchEvent(event)
        })
      
        this.map.on(L.Draw.Event.DELETED , function (e) {
          self.drawLayers.clearLayers()
          self.changeQuery({bbox: null, center: null, radius: null})
         // self.drawIntersection()
          // trigger event fmt:selectAreaChange
//           let event = new CustomEvent('fmt:selectAreaChange', {detail: returnedBbox})
//           document.dispatchEvent(event)
        })
    },
    initialize () {
   
      this.map = L.map( "map", {scrollWheelZoom: true}).setView([20, -0.09], 3);
      this.layerControl = new L.TilesControl(null, null, {position: 'topleft'})
      this.layerControl.tiles.arcgisTopo.layer.addTo(this.map)
      this.layerControl.addTo(this.map)
      var control = new L.Control.Form()
      control.addTo(this.map)
      this.popup = L.popup({autoPan:false, minWidth: 300, minHeight:350, maxHeight:410, closeButton: false})
      this.initDrawControl()
      var node = document.querySelector('#json')
      this.popup.setContent(node)
      var self = this

      this.dateLayers = L.layerGroup()
      this.treatmentQuery(this.$route.query)
      // this.searchReferences('2017-02-27')
     
    },
//     changeRef (date) {
//       this.dateRef = date
//       this.searchReferences(date)
//     },
    closePopup() {
      this.selected = null
      this.map.closePopup()
    },
    goToStation (e) {
      e.preventDefault()
      e.stopPropagation()
      this.$store.commit('setQuery', this.$route.query)
      this.$router.push({ name: 'station', params: { id: this.selected.properties.name } })
    },
//     load (index, next) {
//       if (!this.root) {
//         alert('Pas de service SensorThings!')
//       }
//       var url = next ? next : this.root + 'Datastreams?$expand=Thing($select=name)&$top=' + this.top 
//       this.$http.get(url)
//       .then(
//           resp => {this.display(resp.body, index)},
//           resp => {alert('Erreur de chargement: ' + resp.status)}
//        )
//     },
    load (i) {
      if (!this.api) {
        alert('Pas de service SensorThings!')
      }
      var url = this.api + 'stations/'
      this.$http.get(url, {params: this.$route.query})
      .then(
          resp => {this.display(resp.body, i)},
          resp => {alert('Erreur de chargement: ' + resp.status)}
       )
    },
//     reset () {
//       this.loaded = false
//       this.img = null
//       this.imgMin = null
//       this.stationId = null
//       this.json = null
//     //  this.dataJsonUrl = null
//       this.dataAsciiUrl = null
//     //  this.sitelog = null
//     },
    display (data, index) {
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
          feature.id = value.name
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
      if (this.drawLayers.getBounds()) {
        this.bounds.extend(this.drawLayers.getBounds())
      }
      this.map.fitBounds(this.bounds)
      
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
    getSymbol (networks) {
      if (networks && networks.length > 0) {
        var symbol = 'circle'
        var text = ''
        if (networks.indexOf('RENAG')>= 0) {
          symbol = 'caret-up'
          if (networks.indexOf('EPOS') >= 0) {
            symbol = 'star'
          }
        } else if (networks.indexOf('EPOS') >= 0) {
           symbol = ''
           text = '&#9660;'
        } else if (networks.indexOf('IGS') >= 0) {
          symbol = 'square'
        }
        return '<span class="fa fa-' + symbol + '" style="font-size:8px;">' + text + '</span>' 
      } else {
        return ''
      }
    },
    addStation(feature) {
      this.stations.push(feature)
      var groupId = this.getStatus(feature)
      var html = this.getSymbol(feature.properties.networks)
      var className = this.getClassname(feature.properties.status)
      var icon = L.divIcon({
        className: 'icon-marker marker-' + className, 
        iconSize: [15,15],
        html: html})

      var self = this
      var layer = L.geoJSON(feature,{
        pointToLayer: function(feature, latlng) {
           var marker = L.marker(latlng, {icon: icon, title: feature.id})
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
    getData (e) {
      if (this.selected && this.selected.id === e.target.feature.id) {
        this.closePopup()
        return
      }
      this.mode = 'image'
      this.selected = e.target.feature
      this.show = true
      this.popup.setLatLng(e.target.getLatLng())
      this.popup.openOn(this.map)
      return false
    },
//     getData (e) {
//       this.mode = 'graph'
//        
//       this.show = true
//       console.log('loaded', this.loaded)
//       console.log(e.target.feature)
//       this.stationId = e.target.feature.properties.Thing.name
//       this.selected = e.target.feature.properties.name
//       this.img = e.target.feature.properties.properties.img
//       this.imgMin = this.img
//       this.datastreamId = e.target.feature.properties['@iot.id']
//       this.average = e.target.feature.properties.properties.average
//       this.feature = e.target.feature
//       this.dataAsciiUrl = e.target.feature.properties.properties.file
//      // this.json = e.target.feature.properties

      
//     },
    getStation () {
      this.mode = 'station'

      if (!this.json || this.json['@datastream.id'] !== this.datastreamId) {
        this.json = null
        this.$http.get(this.feature.properties['Thing@iot.navigationLink'])
        .then(resp => {
          this.json = resp.body
          this.json['@datastream.id'] = this.datastreamId})
      }
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
//       this.img = this.scheme.img.replaceAll('[id]', marker.feature.id)
//       this.imgMin = this.scheme.imgMin.replaceAll('[id]', marker.feature.id)
//       this.dataJsonUrl = this.scheme.dataJSON.replaceAll('[id]', marker.feature.id)
//       this.dataAsciiUrl = this.scheme.dataASCII.replaceAll('[id]', marker.feature.id)
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
div.form label {
  width: 100px;
  min-width:100px;
  vertical-align: baseline;
}
div.form > div {
  margin-bottom: 5px;
}
div.form label + div {
  vertical-align: top;
  display:inline-block;width: calc(100% - 120px);
  text-align: justify;
}
div.form label + div > span {
  margin-right: 8px;
}
div.form {
  position: absolute;
  transform: translateX(400px);
  height: 400px;
  width: 320px;
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
