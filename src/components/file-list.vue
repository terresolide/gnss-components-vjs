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
	     <div class="gnss-file-title">Name  
	       <span class="gnss-sort" @click="changeSort('name')" :class="{unactive: !sort.name}" >{{sort.name === 'DESC' ? '&uarr;' : '&darr;' }}</span>
	     </div>
	     <div class="gnss-file-2">Station 
	        <span class="gnss-sort" @click="changeSort('station')" :class="{unactive: !sort.station}" >{{sort.station === 'DESC' ? '&uarr;' : '&darr;' }}</span>
	      </div>
	     <div class="gnss-file-3-header">
	       <div style="margin-top:5px;">Solution 
	         <span class="gnss-sort" @click="changeSort('solution')" :class="{unactive: !sort.solution}" >{{sort.solution === 'DESC' ? '&uarr;' : '&darr;' }}</span>
	       </div>
	       <div>ProductType
	          <span class="gnss-sort" @click="changeSort('productType')" :class="{unactive: !sort.productType}" >{{sort.productType === 'DESC' ? '&uarr;' : '&darr;' }}</span>
       
	       </div>
	      </div>
	     <div class="gnss-file-4-header">
	        <div style="margin-top:5px;">Start
	        <span class="gnss-sort" @click="changeSort('start')" :class="{unactive: !sort.start}" >{{sort.start === 'DEC' ? '&uarr;': '&darr;' }}</span>
           End  <span class="gnss-sort" @click="changeSort('end')" :class="{unactive: !sort.end}" >{{sort.end === 'DESC' ? '&uarr;' : '&darr;' }}</span>
	        </div>
	        <div>
	          Years<span class="gnss-sort" @click="changeSort('years')" :class="{unactive: !sort.years}" >{{sort.years === 'DESC' ? '&uarr;' : '&darr;' }}</span>
            FillRate<span class="gnss-sort" @click="changeSort('fill')" :class="{unactive: !sort.fill}" >{{sort.fill === 'DESC' ? '&uarr;' : '&darr;' }}</span>
         
	        </div>
	     </div>
	     <div class="gnss-file-5">Productor
	       <span class="gnss-sort" @click="changeSort('productor')" :class="{unactive: !sort.productor}" >{{sort.productor === 'DESC' ? '&uarr;' : '&darr;' }}</span>
       
	     </div>
	    </div>
	    
	    <div style="max-height:calc(100vh - 140px);overflow-y:scroll;">
	      <file-row v-for="file, index in files" :key="index" :file="file"></file-row>
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
      var obj = Object.assign({page: 1, maxRecords: 25, orderBy: 'station ASC,solution ASC'}, this.$store.getters['request'] )
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
      sort: {
        station: 'ASC',
        solution: 'ASC',
        name: null,
        productType: null,
        productor: null,
        start: null,
        end: null,
        fill: null,
        years: null
      },
      pagination: {
        page: 1,
        maxRecords: 25
      },
      orderBy: [{name: 'station',
                value: 'ASC'}, 
               {name: 'solution',
                value: 'ASC'}
              ]
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
    changeSort(name) {
      var index = this.orderBy.findIndex(el => el.name === name)
      if (index >= 0) {
        this.orderBy[index].value = this.orderBy[index].value === 'ASC' ? 'DESC' : 'ASC'
        if (index == 1) {
           this.orderBy = this.orderBy.reverse()
        }
      } else {
        this.orderBy.pop()
        this.orderBy.unshift({name: name, value: 'ASC'})
      }
      var orderBy = this.orderBy.map(el => el.name + ' ' + el.value).join(',')
      var query = Object.assign({}, this.$route.query)
      query.orderBy = orderBy
      this.$router.push({name: 'files', query: query})
    },
    copyClipboard () {
      var tooltip = this.$el.querySelector('.bookmark-tooltip')
      tooltip.style.display = 'block'
      setTimeout(function () {
          tooltip.style.display = 'none'
      }, 2000)
      var base = window.location.href.split(/#/)[0] + '#'
      var url = base + this.$route.fullPath
      navigator.clipboard.writeText(url);
    },
    display (data) {
      this.files = data.files
      this.pagination.tot = data.query.tot
      this.pagination.page = data.query.page
      this.pagination.maxRecords = data.query.maxRecords
    },
    goToMap () {
      var query = Object.assign({}, this.$route.query)
      delete query.page
      delete query.maxRecords
      this.$router.push({name: 'home', query: query})
    },
    paginationChange (event) {
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
      var params = Object.assign({}, this.defaultRequest)
      if (query.orderBy) {
        var sorts = query.orderBy.split(/\s*,\s*/)
        var sort = {}
        this.orderBy = []
        sorts.forEach(function (el) {
          console.log(el)
          var tab = el.split(/\s+/)
          sort[tab[0]] = tab[1].toUpperCase()
        })
        for (var key in this.sort) {
          if (sort[key]) {
            this.sort[key] = sort[key]
            this.orderBy.push({name: key, value: sort[key]})
          } else {
            this.sort[key] = null
          }
        }
      }
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
    top:5px;
    opacity:1;
    border: 1px dotted transparent;
   
  }
  span.button.close:hover {
    border-color:grey;
  }
  span.gnss-sort{
    padding: 0 3px;
    cursor: pointer;
    border: 1px dotted transparent;
  }
  span.gnss-sort.unactive {
    color: #555555;
  }
  span.gnss-sort:hover {
    border-color: black;
  }
</style>
