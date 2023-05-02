<template>
<div class="page-list" style="width:100%;position:relative;overflow:hidden;">
  <div class="form" >
     <div>
        <file-form mode="map" ></file-form>
      </div>
      <div class="gnss-shortcut"   @click="toggleForm()"><font-awesome-icon icon="fa-solid fa-search" /></div>
    </div>
  <div style="position:absolute;top:5px;right:0;z-index:2">
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
             <font-awesome-icon icon="fa-solid fa-list" />
             View list</li>
         </ul>
       </div>
    </div>
   
 <div class="station-content" >
	 <div class="station-header">
	    <span class="close button" @click="close($event)" style="margin-right:20px;"><font-awesome-icon icon="fa-solid fa-close" /></span>
	    <h2 >List of files</h2>
	 </div>
  <div class="station-body">
    xxx
 </div>
 </div>
</div>
</template>

<script>

import moment from 'moment'

import FileForm from './file-form.vue'
export default {
  name: 'FileList',
  components: {FileForm},
  data () {
    return {
     
    }
  },
  computed: {
    api () {
      return this.$store.getters['api']
    }
  },
  watch: {
    $route (route) {
      
    }
  },
  created () {
   
  },
  destroyed () {
   
  },
  methods: {
    toggle () {
      
    },
    toggleForm() {
      
    },
    copyClipboard () {
      
    },
    close (event) {
      console.log(event)
      this.$router.push({name: 'home', query: this.$store.state.query})
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
  div.page-station div.form {
    top: 60px;
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
