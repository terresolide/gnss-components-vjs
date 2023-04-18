 L.Control.Form = L.Control.extend({
   options: {
     position: 'topright',
   },
    onAdd : function(map){
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        var a = L.DomUtil.create('a', 'fa fa-search leaflet-form-link')
        a.setAttribute('title', 'Search')
        container.appendChild(a)
        container.onclick = function(e){
          var elt = document.querySelector('.form')
          elt.classList.toggle('expand')
          L.DomEvent.stopPropagation(e)
        }
        return container
    }
 })
 module.exports = L.Control.Form
