<template>
  <div class="gnss-file">
      <div class="gnss-file-title">{{file.name}}</div>
      <div class="gnss-file-1"></div>
      <div class="gnss-file-2">
         <div><label>Station</label>:   
           <a class="station-link"  @click="goToStation($event)">{{file.station}}</a>
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
         <div><label>Productor</label>: {{file.properties.operator}}</div>
         <div v-if="file.properties.refFrame"><label>RefFrame</label>: {{file.properties.refFrame}}</div>
 
      </div>
      <div class="gnss-file-6">
         <div> 
           <a  :href="api + 'files/' + file.name + '/download'" :download="file.name" ><font-awesome-icon icon="fa-solid fa-download" /></a>
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
      this.$router.push({ name: 'station', params: { name: this.file.station, id: this.file.stationId}, query: query})

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
.gnss-file-3 {
  grid-column: 3;
  grid-row: 2;
}
.gnss-file-4 {
  grid-column: 4;
  grid-row: 2;
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
