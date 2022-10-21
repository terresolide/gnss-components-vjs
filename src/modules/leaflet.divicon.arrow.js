/**
 * L 
 */
/* eslint no-undef: 0 */
L.DivIcon.Arrow = L.DivIcon.extend({
  options: {
   /*
    * @options color: String blue
    */
    color: 'blue',
   /*
    * @options stroke: Number 20
    */
    stroke: 20,
   /*
    * @option iconAnchor: Array [30, 30]
    * overwrite Icon default
    */
    iconAnchor: [30, 30],
   /*
    * @option iconSize: Array [60, 60]
    */
    iconSize: [60,60],
   /*
    * @option viewBox: String = '0 0 1500 1500'
    */
    viewBox: '0 0 1500 1500',
    /*
    * @option center: Array = [750, 750]
    */
    center: [750, 750],
    /*
     * @option arraw: Array = [East, North]
     */
    arrow: [100, 300],
    className: 'leaflet-div-icon'
  },
//  initialize (options) {
//    L.setOptions(options)
//    console.log(this.options)
//  },
  
  createIcon (oldIcon) {
    const div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
      options = this.options
    console.log(options)
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('viewBox', options.viewBox)
    svg.setAttribute('style', 'width:' + options.iconSize[0] + 'px;height:' + options.iconSize[1] + 'px')
    div.appendChild(svg)
    // appendChild defs
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
    let defid = 'arrowhead' + this.options.color
    marker.setAttribute('id', defid)
    marker.setAttribute('markerWidth', 10)
    marker.setAttribute('markerHeight', 7)
    marker.setAttribute('refX', 10)
    marker.setAttribute('refY', 3.5)
    marker.setAttribute('orient', 'auto')
    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    polygon.setAttribute( 'points', "2.5 3.5, 0 0, 10 3.5, 0 7")
    polygon.setAttribute('fill', options.color)
    marker.appendChild(polygon)
    defs.appendChild(marker)
    svg.appendChild(defs)
    // appendChild group
    let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    group.setAttribute('transform', 'translate(' + this.options.center.join(',') + ')')
    svg.appendChild(group)
     // appendChild Arrow
    let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    arrow.setAttribute('stroke', options.color)
    arrow.setAttribute('stroke-width', options.stroke)
    arrow.setAttribute('marker-end', 'url(#' + defid + ')')
    arrow.setAttribute('x1', 0)
    arrow.setAttribute('y1', 0)
    arrow.setAttribute('x2', options.arrow[0])
    arrow.setAttribute('y2', options.arrow[1] * (-1))
    group.appendChild(arrow)
    console.log(div)
    this.options.html = svg
    this._setIconStyles(div, 'icon')
    return div
    
  }
})
 module.exports = L.DivIcon.Arrow
//export function arrow(options) {
//  return new L.DivIcon.Arrow(options);
//}
