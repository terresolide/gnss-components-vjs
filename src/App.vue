<template>
 <div class="gnss-terresolide" style="position:relative;">
 <!--   <spot-gins root="https://catalog.formater/FROST-Server/v1.1/" ></spot-gins>
 -->
 <div  id="page">
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
    if (this.$route) {
      console.log(this.$route)
    }
  },
  methods: {
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
<style>
.gnss-terresolide {
  font-family: sans-serif;
  line-height:1;
}
.gnss-terresolide h3{
  font-family: sans-serif;
  line-height:1;
  margin-top:20px;
}
#page {
  width:100%;
  height: 100vh;
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
.gdm-tooltip {
  position:absolute;
  top:18px;
  padding:5px;
  z-index:10;
  background-color: #fafafa;
  border: 1px solid #a3a3a3;
  font-size: smaller;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
  max-width:270px;
  min-width: 200px;
  display:none;
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
</style>
