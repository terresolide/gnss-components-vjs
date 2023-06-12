<template>
 <div class="gnss-terresolide" style="position:relative;" @click="removeContextMenu">
 <!--   <spot-gins root="https://catalog.formater/FROST-Server/v1.1/" ></spot-gins>
 -->
 <div  id="page">
     <div class="gnss-attribution">Component by <a href="https://www.poleterresolide.fr" title="ForM@Ter"><img :src="require('./assets/img/favicon.png').default" width="24" /></a></div>
     <router-view></router-view>
 </div>
 </div>
</template>

<script>
// import SpotGins from './components/spot-gins.vue'

export default {
  name: 'App',
  components: {
    // SpotGins
  },
  created () {
    this.searchCodeLists()
   
    
  },
  mounted () {
    let bokeh = document.createElement('script')
    bokeh.setAttribute('src', 'https://cdn.pydata.org/bokeh/release/bokeh-2.4.3.min.js')
    document.head.appendChild(bokeh)
    var location = window.location.href
    var pos = location.indexOf('#')
    this.$store.state.location = location.substring(0, pos +2)
  },
  methods: {
    removeContextMenu () {
      var nodes = document.querySelectorAll('.context')
      nodes.forEach(function (node) {
        node.classList.remove('context')
      })
    },
    searchCodeLists () {
      var url = this.$store.getters['api'] + 'codelists/'
      if (this.$store.state.solution) {
        url += this.$store.state.solution
      } else if (this.$store.state.productor) {
        url += this.$store.state.productor
      }
      this.$http.get(url)
      .then(resp => {
        this.$store.commit('setCodeList', resp.body)
      })
    }
  }
}
</script>
<style src='./assets/fontello/css/fontello.css' />
<style>
ul[id="shortcuts"] {
 display:none;
}
.gnss-terresolide {
  font-family: sans-serif;
  line-height:1;
}
.gnss-terresolide h3{
  font-family: sans-serif;
  line-height:1;
  margin-top:20px;
}
.gnss-attribution {
  position:absolute;
  bottom:0px;
  left:0px;
  padding: 0 6px;
  font-size:0.8rem;
  background: rgba(255,255,255,0.2);
  z-index:10;
}

div.menu-context {
  display:none;
  position: absolute;
  border-radius: 5px;
  font-size:1rem;
  font-weight:400;
  left:0;
  top:20px;
  background: #444;
  color: #f9f9f9;
  min-width:200px;
  padding:0px;
  z-index:1;
   border:1px solid white;
   box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
.context > div.menu-context {
  display:block;
}
div.menu-context ul {
  margin:0;
  padding:0;
  list-style-type:none;
}
div.menu-context ul li {
  padding:2px 5px;
  border-radius:5px;
  margin:2px
}
div.menu-context ul li a{
  text-decoration:none;
  color: #f9f9f9;
   min-width:200px;
  display:inline-block;
  background: transparent;
}
div.menu-context ul li:hover {
  background:#f4661b;
}
 div.page-station {
    width:100%;
    background: url('./assets/img/background-gnss.png') no-repeat center center fixed;
     -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  }
  div.station-content {
    background:white;
    margin:auto;
    max-width:1400px;
    min-height:100vh;
    padding-bottom:20px;
    box-shadow: 0 0 3px rgba(0,0,0,.5);
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
.gnss-attribution img {
  vertical-align:middle;
}
/** .gnss-bars-content {
  display:none;
  background:white;
  position:absolute;
  top:0px;
  right:50px;
  padding:5px;
  background: #555;
  padding: 2px;
  -webkit-border-radius: 0 4px 4px 4px;
  border-radius: 4px 0px 4px 4px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
.gnss-shortcut.selected + .gnss-bars-content {
  display:block;
}
.gnss-bars-content ul {
  list-style: none;
  margin: 0;
  padding: 0;
  left: 26px;
  top: 0;
  padding: 4px;
  color: white;
  white-space: nowrap
}
.gnss-bars-content ul li.gnss-bars-link{
  background: #919187;
  color: white;
  padding: 4px 6px ;
  margin:2px 0;
  cursor: pointer;
  border-radius:0;
}
.gnss-bars-content ul li.gnss-bars-link.disabled{
  opacity:0.7;
  cursor: pointer;
  pointer-events:none;
}
.gnss-bars-content ul li.gnss-bars-link:hover {
  background: #777;
}
/** .gnss-bars:hover + .gnss-bars-content {
  display:block;
}
.gnss-bars-content:hover {
  display:block;
} 
.gnss-hr hr {
  margin:0;
  color:#919187;
  margin-top:5px;
}*/
#page {
  width:100%;
  height: auto;
  min-height:500px;
  top:0;
  left:0;
  margin:0;
  padding:0;
  background: white;
}
.fa.button {
  color:black;
  cursor: pointer;
  padding: 5px;
  min-width:25px;
  text-align: center;
  display: inline-block;
  border: 1px dotted lightgrey;
}
.fa.button:hover {
   border-color:black;
}
.gnss-control {
   display: inline-block;
   color: #495057;
   vertical-align: middle;
   background-color: #fff;
   background-clip: padding-box;
   border: 1px solid #ced4da;
   transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   height: calc(1.3em + 0.5rem + 2px);
   padding: 0.2rem 0.5rem;
  font-size: 0.875rem;
   line-height: 1.5;
  border-radius: 0.2rem;
   max-width: calc(100% - 140px);
   width:calc(100% - 140px);
   cursor:pointer;
}
.gnss-terresolide [type="button"],
.gnss-terresolide [type="submit"] {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  padding: .35rem .7rem;
  font-size: 0.9rem;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  color: #000;
  background-color: #f8f9fa;
  border-color: #f0F0F0;
  cursor: pointer;
}
[type="button"]:hover,
[type="submit"]:hover{
  color: #000;
  background-color: #f0F0F0;
  border-color: #f9fafb;
}
[type="button"]:active,
[type="submit"]:active {
  color: #212529;
  background-color: #dae0e5;
  border-color: #d3d9df;
}
.bookmark-tooltip,
.gdm-tooltip {
  position:absolute;

  padding:5px;
  z-index:10;
  background-color: #fafafa;
  border: 1px solid #a3a3a3;
  font-size: smaller;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
  color:#666;
  display:none;
}
.bookmark-tooltip {
  max-width:180px;
  white-space: normal;
}
.gdm-tooltip {
  top:18px;
  max-width:270px;
  min-width: 200px;
}
.gdm-tooltip > div {
  font-weight: 500;
}
.gdm-tooltip h4 {
  margin: 3px 0;
  text-align:left;
  font-weight:800;
  font-size:1em;
  font-color:black;
  opacity:1;
}

.tooltip-show + .gdm-tooltip {
  display:block;
}
div.gnss-shortcut {
  float:right;
  cursor:pointer;
  font-size:22px;
  background:#b8412c;
  color:white;
  padding:12px 15px 12px 12px;
  margin-right:-1px;
  font-weight:700;
  border-radius: 5px 0 0 5px;
  vertical-align:top;
  box-shadow: -1px 1px 5px rgba(0,0,0,0.5);
}

div.form.expand div.gnss-shortcut,
div.gnss-shortcut.selected {
  background: #8c0209;
}
div.gnss-shortcut:hover
 {
  background:#7b080e;
}
/*.gnss-hr hr {
  margin:0;
  color:#919187;
  margin-top:5px;
}*/

</style>
