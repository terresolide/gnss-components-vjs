<template>
  <div class="gnss-menu" :style="{top: top + 'px'}">
       <div class="gnss-shortcut gnss-bars" @click="toggle($event)"><font-awesome-icon icon="fa-solid fa-bars" /></div>
       <div class="gnss-bars-content" >
         <ul>
           <li class="gnss-bars-link" title="Record state in clipboard" @click="copyClipboard($event)">
                <font-awesome-icon icon="fa-solid fa-bookmark" />
           
               Record state url
                <div class="bookmark-tooltip" >The url has been copied to clipboard</div>
           </li>
          
           <li v-if="$route.name === 'home'" class="gnss-bars-link"  @click="goToList()">
             <font-awesome-icon icon="fa-solid fa-list" />
             View list</li>
            <li v-if="$route.name === 'files'" class="gnss-bars-link" style="margin-top:5px;" @click="goToMap()">
             <font-awesome-icon icon="fa-solid fa-map" />
             View Map</li>
          <li class="gnss-hr" style="margin-bottom:5px;"><hr /></li>
           <li v-if="$route.query.newTab" class="gnss-bars-link" @click="goTo($event, 'home')" >
              <font-awesome-icon icon="fa-solid fa-home"  /> Home
           </li>
          <li class="gnss-bars-link disabled" @click="goTo($event,'solutions')">Solutions</li>
          <li class="gnss-bars-link disabled" @click="goTo($event, 'productTypes')">Product Types</li>
          <li class="gnss-bars-link disabled" @click="goTo($event, 'about')">About</li>
          
         </ul>
   </div>
 </div>
</template>
<script>
export default {
  name: 'GnssMenu',
  props: {
    top: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      clickListener: null
    }
  },
  created () {
    this.clickListener = this.closeMenu.bind(this) 
    document.addEventListener('click', this.clickListener)
  },
  destroyed () {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener)
      this.clickListener = null
    }
  },
  methods: {
    closeMenu() {
      var node = this.$el.querySelector('.gnss-shortcut.selected')
      if (node) {
        node.classList.remove('selected')
        return
      }
    },
    copyClipboard (event) {
      event.stopPropagation()
      var tooltip = this.$el.querySelector('.bookmark-tooltip')
      tooltip.style.display = 'block'
      var self = this
      setTimeout(function () {
          tooltip.style.display = 'none'
          self.closeMenu()
      }, 2000)
      if (this.$route.name === 'home') {
        var url = this.$parent.getUrl()
      } else {
        var base = window.location.href.split(/#/)[0] + '#'
        var url = base + this.$route.fullPath
      }
      navigator.clipboard.writeText(url);
    },
    goTo(event, name) {
      if (name === 'home') {
         this.$router.push({name: name})
      }
      // event.stopPropagation()
      return
      var query = Object.assign({}, this.$route.query)
      if (this.$route.name === 'home') {
        query = this.$parent.getQuery()
      }
      this.$store.commit('setQuery',{name: this.$route.name, query: query})
      if (this.$route.name === 'home') {
         this.$store.commit('setStations', this.$parent.stations)
      }
      return
      this.$router.push({name: name})
    },
    goToList () {
      var query = Object.assign({}, this.$route.query)
      this.$store.commit('setQueryList', this.$parent.getQuery())
      if (this.$route.name === 'home') {
         this.$store.commit('setStations', this.$parent.stations)
      }
      var query = Object.assign({}, this.$route.query)
      delete query.selected
      delete query.bounds
      delete query.expand
      this.$router.push({ name: 'files', params: {}, query: query})
    },
    goToMap () {
      var query = Object.assign({}, this.$route.query)
      this.$store.commit('resetStations')
      delete query.page
      delete query.maxRecords
      this.$router.push({name: 'home', query: query})
    },
    toggle (event) {
      event.stopPropagation()
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
  }
}
</script>
<style scoped>
  .gnss-menu {
    position:absolute;
    top:5px;
    right:0;
    z-index:2
  }
  .gnss-bars-content {
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
  cursor: not-allowed;
}
.gnss-bars-content ul li.gnss-bars-link:not(.disabled):hover {
  background: #777;
}
.gnss-hr hr {
  margin:0;
  color:#919187;
  margin-top:5px;
}
</style>