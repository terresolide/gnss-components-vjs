/**
 * L control tiles with given default tiles
 */
/* eslint no-undef: 0 */
L.Control.Tiles = L.Control.Layers.extend({
  tiles: {
    osm: {
      name: 'OpenStreetMap',
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
  /*  osmFr: {
      name: 'OpenStreetMap France',
      url: '//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
    },*/
    opentopomap: {
      name: 'OpenStreetMap Topo',
      url: '//{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, <a href="http://viewfinderpanoramas.org">SRTM</a> | Kartendarstellung: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    },
    arcgisTopo: {
      name: 'ArcGIS World Topo Map',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    },
    arcgisSatellite: {
      name: 'ArcGIS Satellite Tiles',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">Arcgis</a>'
    },
  /*  arcgisRelief: {
      name: 'ArcGIS Relief Tiles',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer">Arcgis</a>'
    } */
  },
  initialize: function (baseLayers, overlays, options) {
    L.Control.Layers.prototype.initialize.call(this, baseLayers, overlays, options)
    // Default tiles already in control
    for (var key in this.tiles) {
      var layer = L.tileLayer(this.tiles[key].url, {attribution: this.tiles[key].attribution})
      this.tiles[key].layer = layer
      this.addBaseLayer(layer, this.tiles[key].name)
    }
  },
   _addItem: function (obj) {
      var container =  this._overlaysList ;
      if (obj.layer.first) {
        if (typeof obj.layer.first === 'object') {
          title = obj.layer.first.title
          var div = document.createElement('div')
          div.className = 'leaflet-control-layers-separator'
          container.appendChild(div)
        } else {
          title = obj.layer.first
        }
        // insert the title if there is a first attribute (containing title)
        var div = document.createElement('b')
        div.innerHTML = title
        this._overlaysList.appendChild(div)
      }
      L.Control.Layers.prototype._addItem.call(this, obj)
      if (obj.layer.last ) {
        var div = document.createElement('div')
        if (obj.layer.last.classname) {
          div.classList.add(obj.layer.last.classname)
        }
        if (obj.layer.last.funct) {
          div.style.textAlign = 'center'
          var input = document.createElement('input')
          input.setAttribute('type', 'button')
          input.setAttribute('value', obj.layer.last.name)
          if (obj.layer.last.title) {
            input.setAttribute('title', obj.layer.last.title)
          }
          input.addEventListener('click', function (e) {
            obj.layer.last.funct(e)
            e.stopPropagation()
          }, {once: true, useCapture: true})
           div.appendChild(input)
        } else {
          div.innerHTML = '<b>' + obj.layer.last.name + '</b>'
        }
       this._overlaysList.appendChild(div)
      }
    }
})
module.exports = L.Control.Tiles
