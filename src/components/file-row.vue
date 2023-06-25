<template>
  <div class="gnss-file">
      <div class="gnss-file-title">{{file.name}}</div>
      <div class="gnss-file-1"></div>
      <div class="gnss-file-2">
         <div><label>Station</label>:   
           <a class="station-link"  @click="goToStation($event)" style="position:relative;" @contextmenu="menuContext($event)">{{file.station}}
               <div  class="menu-context" @click="closeMenuContext($event)">
                <ul>
                   <li title="Open in new tab">
                       <a  :href="$store.state.location + 'station/'+ file.station + '/' + file.stationId + '?newTab=true'" 
                       @contextmenu="$event.target.click()" target="_blank">Open in new tab</a>
                   </li></ul>
               </div>
           </a>
         </div>
         <div v-if="file.networks"><label>Networks</label>: {{file.networks.join(', ')}}</div>
      </div>
      <div class="gnss-file-3">
         <div><label>Solution</label>: {{file.solution}}</div>
         <div><label>ProductType</label>: {{file.productType}}</div>
 
      </div>
      <div class="gnss-file-4">
         <div><label>Temporal</label>:  {{toDateStr(file.tempStart)}} &rarr; {{toDateStr(file.tempEnd)}}</div>
         <div><label>Years</label>: {{Math.round(file.years)}}<label style="margin-left:20px;">FillRate</label>: {{(Math.round(file.properties.fillRate * 100)).toLocaleString()}}%</div>
 
      </div>
      <div class="gnss-file-5">
         <div><label>AnalysisCenter</label>: {{file.properties.operator || file.properties.producer || file.properties.analysisCenter}}</div>
         <div v-if="file.properties.refFrame"><label>RefFrame</label>: {{file.properties.refFrame}}</div>
 
      </div>
      <div class="gnss-file-6">
         <div> 
           <a v-if="$store.state.auth && !$store.getters['user/email']" @click="$parent.$parent.service.login()"><font-awesome-icon icon="fa-solid fa-download" /></a>
           <a v-else :href="api + 'products/' + file.name + '/download'" :download="file.name" ><font-awesome-icon icon="fa-solid fa-download" /></a>
          </div>
 
      </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'FileRow',
  props: {
    file: {
      type: Object,
      default: null
    }
  },
  computed: {
    api () {
      return this.$store.getters['api']
    }
  },
  methods: {
    goToStation (e) {
      e.preventDefault()
      e.stopPropagation()
      var query = Object.assign({}, this.$route.query)
      this.$store.commit('setQuery',{name: 'files', query: query})
      var query = Object.assign({}, this.$route.query)
      delete query.network
      delete query.several
      this.$router.push({ name: 'station', params: { name: this.file.station, id: this.file.stationId}, query: query})

    },
    closeMenuContext(e) {
      e.stopPropagation()
      this.$parent.$parent.removeContextMenu()
    },
    menuContext (e) {
      e.preventDefault()
      var target = e.target
      while (target.tagName === 'svg' || target.tagName === 'path') {
        target = target.parentNode
      }
     // if (target.classList.contains('link-area')) {
        var menu = target.querySelector('.menu-context')
        if (menu) {
        menu.style.top = e.offsetY + 'px'
        menu.style.left = e.offsetX + 'px'
       }
     // }
      this.$parent.$parent.removeContextMenu()
      target.classList.add('context')
    },
    toDateStr (date) {
      return date.substring(0,10)
      return moment.utc(date).format('ll')
    }
  }
}
</script>
<style >
.gnss-file a.station-link {
  line-height: 1;
  text-decoration: none;
  color: #337ab7;
  cursor:pointer;
}
.gnss-file {
  display: grid;
  grid-template-columns: 10px minmax(120px,1fr) minmax(120px,0.8fr)  minmax(150px,1.2fr) minmax(100px,0.8fr) minmax(50px,0.3fr);
  grid-gap: 5px;
  grid-template-rows: 14px 30px; 
  /*grid-auto-rows: minmax(100px, auto);*/
  font-size:0.8em;
  
  border-bottom:1px solid lightgrey;
}
.header.gnss-file {

  background: #ddd;
  font-weight:600;
  color:black;
  border-bottom:1px solid grey;
}

.gnss-file-title{
  grid-column: 1/5;
  grid-row: 1;
  padding-left: 5px;
  padding-top:5px;
  font-size: 1em;
  font-weight:600;
  color: black;
}
.header .gnss-file-title {
  grid-column: 1/3;
  grid-row:1;
}
.gnss-file-1{
  grid-column: 1;
  grid-row: 2;
}

.gnss-file-2 {
  grid-column: 2;
  grid-row: 2;
}
.gnss-file-3-header {
  grid-column: 3;
  vertical-align: middle;
  grid-row: 1/3;
}
.gnss-file-3-header > div {
  line-height: 1.5;
}
.gnss-file-4-header {
  grid-column: 4;
  vertical-align: middle;
  grid-row: 1/3;
}
.gnss-file-4-header > div {
  line-height: 1.5;
}
.gnss-file-3 {
  grid-column: 3;
  grid-row: 2;
}
.gnss-file-4 {
  grid-column: 4;
  grid-row: 2;
}
.gnss-file-4-top {
  grid-column: 4;
  grid-row:1;
}
.gnss-file-4-bottom {
  grid-column: 4;
  grid-row:2;
}
.gnss-file-5 {
  grid-column: 5;
  grid-row: 2;
}
.gnss-file-6{
  grid-column: 6;
  grid-row: 2;
}
.gnss-file label {
  font-weight: normal;
  color: black;
  line-height:1;
  margin:0;
}
</style>
