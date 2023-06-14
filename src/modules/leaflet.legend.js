 L.Control.Legend= L.Control.extend({
    options: {
        position: 'topleft',
    },
   
    _data: {
      blue: 'has data this last year',
      orange: 'has data the 5 last years',
      red: 'no data this last 5 years'
    },
   
    _addLegend (container) {
      // this._legend = url
      var div = L.DomUtil.create('div');
      for (var color in this._data) {
        var row = L.DomUtil.create('div');
        var span = L.DomUtil.create('span', 'marker-' + color, row);
        var text = document.createTextNode(' ' + this._data[color])
        row.appendChild(text)
        div.appendChild(row)
      }
      container.appendChild(div)
    },
 
    onAdd : function(map){
        
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control lfh-control-legend');
        var a = L.DomUtil.create('a', 'icon-palette')
        container.appendChild(a)
        
        this._addLegend(container)
        return container
    },
   
})

module.exports = L.Control.Legend