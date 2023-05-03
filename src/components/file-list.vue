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
           <li class="gnss-bars-link" style="margin-top:5px;">
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
    <div class="file-header">
      header
    </div>
    <div style="height:calc(100vh - 120px);overflow-y:scroll;">
      <file-row v-for="file in files" :file="file"></file-row>
    </div>
 </div>
 </div>
</div>
</template>

<script>



import FileForm from './file-form.vue'
import FileRow from './file-row.vue'
export default {
  name: 'FileList',
  components: {FileForm, FileRow},
  data () {
    return {
     
    }
  },
  computed: {
    api () {
      return this.$store.getters['api']
    },
    defaultRequest () {
      var obj = Object.assign({page: 1, maxRecords: 50}, this.$store.getters['request'] )
    }
  },
  watch: {
    $route (newroute, oldroute) {
      this.treatmentQuery(newroute.query)
    }
  },
  data () {
    return {
      files: []
    }
  },
  created () {
    this.treatmentQuery(this.$route.query)
  },
  destroyed () {
    
  },
  methods: {
    copyClipboard () {
      
    },
    display (data) {
      this.files = data.files
    },
    treatmentQuery (query) {
      if (!this.api) {
        alert('Pas de service SensorThings!')
      }
      console.log(this.$route.query)
      var url = this.api + 'files/'
      var params = Object.assign({}, this.defaultRequest)
      params = Object.assign(params, this.$route.query)
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
      console.log(el)
      
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
