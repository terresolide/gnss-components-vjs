<template>
<div class="page-list" style="width:100%;position:relative;overflow:hidden;">
  <div class="form" >
     <div>
        <file-form mode="map" ></file-form>
      </div>
      <div class="gnss-shortcut"   @click="toggleForm()"><font-awesome-icon icon="fa-solid fa-search" /></div>
    </div>
  <div style="position:absolute;top:55px;right:0;z-index:2">
       <div class="gnss-shortcut gnss-bars" @click="toggle($event)"><font-awesome-icon icon="fa-solid fa-bars" /></div>
       <div class="gnss-bars-content" >
         <ul>
           <li class="gnss-bars-link" title="Record state in clipboard" @click="copyClipboard()">
                <font-awesome-icon icon="fa-solid fa-bookmark" />
           
               Record state url
                <div class="bookmark-tooltip" >The url has been copied to clipboard</div>
           </li>
           <li class="gnss-hr"><hr /></li>
           <li class="gnss-bars-link" style="margin-top:5px;" @click="goToMap()">
             <font-awesome-icon icon="fa-solid fa-map" />
             View Map</li>
         </ul>
       </div>
    </div>
   
 <div class="station-content" >
	 <div class="station-header">
	    <span class="close button" @click="close($event)" style="margin-right:20px;"><font-awesome-icon icon="fa-solid fa-close" /></span>
	    <h2 >List of files</h2>
	 </div>
  <div class="station-body" style="min-height:calc(100vh - 70px);">
	   <div><gnss-paging color="#b8412c" :page="pagination.page" :max-records="pagination.maxRecords" :count="files.length"
	   :total-results="pagination.tot" @change="paginationChange"></gnss-paging></div>
	   <div class="array-list">
	    <div class="gnss-file header">
	     <div class="gnss-file-1"></div>
	     <div class="gnss-file-2">Station</div>
	     <div class="gnss-file-3-header">
	       <div style="margin-top:5px;">Solution </div>
	       <div>ProductType</div>
	      </div>
	     <div class="gnss-file-4">Dates</div>
	     <div class="gnss-file-5">Productor</div>
	    </div>
	    
	    <div style="height:calc(100vh - 120px);overflow-y:scroll;">
	      <file-row v-for="file in files" :file="file"></file-row>
	    </div>
   </div>
 </div>
 </div>
</div>
</template>

<script>



import FileForm from './file-form.vue'
import FileRow from './file-row.vue'
import GnssPaging from './gnss-paging.vue'
export default {
  name: 'FileList',
  components: {FileForm, FileRow, GnssPaging},
  data () {
    return {
     
    }
  },
  computed: {
    api () {
      return this.$store.getters['api']
    },
    defaultRequest () {
      var obj = Object.assign({page: 1, maxRecords: 10}, this.$store.getters['request'] )
      return obj
    }
  },
  watch: {
    $route (newroute, oldroute) {
      this.treatmentQuery(newroute.query)
    }
  },
  data () {
    return {
      files: [],
      pagination: {
        page: 1,
        maxRecords: 10
      }
    }
  },
  created () {
    if (this.$route.query.page) {
      this.pagination.page = parseInt(this.$route.query.page)
    }
    if (this.$route.query.maxRecords) {
      this.pagination.maxRecords = parseInt(this.$route.query.maxRecords)
    }
    this.treatmentQuery(this.$route.query)
  },
  destroyed () {
    
  },
  methods: {
    copyClipboard () {
      
    },
    display (data) {
      this.files = data.files
      this.pagination.tot = data.query.tot
    },
    goToMap () {
      var query = Object.assign({}, this.$route.query)
      delete query.page
      delete query.maxRecords
      this.$router.push({name: 'home', query: query})
    },
    paginationChange (event) {
      console.log(event)
      var query = Object.assign({}, this.$route.query)
      query.page = event.page
      query.maxRecords = event.maxRecords
      this.$router.push({name: this.$route.name, query: query})
    },
    treatmentQuery (query) {
      if (!this.api) {
        alert('Pas de service SensorThings!')
      }
      var url = this.api + 'files/'
      console.log(this.defaultRequest)
      var params = Object.assign({}, this.defaultRequest)
      params = Object.assign(params, query)
      this.$http.get(url, {params: params})
      .then(
          resp => {this.display(resp.body)},
          resp => {alert('Erreur de chargement: ' + resp.status)}
       )
    },
    toggle () {
      var el  = event.target
      while ( !el.classList.contains('gnss-shortcut') && el.parentElement) {
        el = el.parentElement
      };
      
      if (el.classList.contains('selected')) {
        el.classList.remove('selected')
        return
      }
     
      el.classList.add('selected')
    },
    toggleForm () {
      var elt = document.querySelector('.form')
      elt.classList.toggle('expand')
    },
   
    close (event) {
      console.log(event)
      this.$router.push({name: 'home', query: this.$store.state.queryList})
    }
  }
}
</script>
<style>
div.box-station {
  display: inline-block;
overflow: hidden;
padding: 5px 20px 20px 20px;
margin:20px;
 border: 1px solid grey;
 border-radius: 10px;
-webkit-box-shadow: 0 0 3px rgba(0,0,0,.5);
box-shadow: 0 0 3px rgba(0,0,0,.5);
}
div.box-station h3 {
  margin-top: 10px;
}
div.box-station a.station-link {
  margin: 5px;
  line-height: 1.1;
  text-decoration: none;
  color: #000;
  cursor:pointer;
}

</style>
<style scoped>
  div.page-list {
    width:100%;
    background: url('./../assets/img/background-gnss.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  div.page-list div.form {
    top: 105px;
  }
  div.gnss-file:nth-child(2n) {
   background: #eee;
  }
  div.station-content {
    background:white;
    margin:auto;
    max-width:1400px;
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
  div.array-list {
    border:1px solid grey;
  }
  span.station-link {
    color: darkblue;
    padding: 2px 3px;
    cursor: pointer;
    line-height:1.5rem;
    border:1px dotted white;
  }
  span.station-link:hover {
    border-color: grey;
  }
 
  span.button.close {
    position: absolute;
    right: 15px;
    opacity:1;
    border: 1px dotted transparent;
   
  }
  span.button.close:hover {
    border-color:grey;
  }

</style>
