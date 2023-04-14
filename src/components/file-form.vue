<template>
<div class="file-form" >
  <div v-if="solutions">
    <label>Solution
    </label><select class="gnss-control" v-model="searchparams.solution">
       <option :value="null">---</option>
       <option v-for="pt in solutions" :value="pt">{{pt}}</option>
    </select>
  </div>
  <div class="temp-extent">
    <label >Temporal extent</label>
	  <div >
	    <label>From</label>
	    <input type="date" v-model="searchparams.from" class="gnss-control" />
	  </div>
	  <div >
	    <label>To</label>
	    <input type="date" v-model="searchparams.to" class="gnss-control" />
	  </div>
  </div>
   <div class="extent-years">
    <label style="margin-top:15px;display:block;width:auto;">Extend in years</label>
    <div >
      <span>
	      <label style="max-width:50px;margin-left:60px;">Min</label>
	      <input type="number" v-model="searchparams.lenmin" min="0" max="40" class="gnss-control" />
      </span>
      <span >
	      <label style="max-width:50px;margin-left:20px;"">Max</label>
	      <input type="number" v-model="searchparams.lenmax"  min="0" max="40" class="gnss-control" />
      </span>
    </div>
  </div>
  <div>
      <label>Fill rate > </label>
      <input type="number" v-model="searchparams.fill" class="gnss-control" />
      %
  </div>
  <div v-if="productors">
    <label>Operator</label>
    <select class="gnss-control" v-model="searchparams.productor">
       <option :value="null">---</option>
       <option v-for="pt in productors" :value="pt">{{pt}}</option>
    </select>
  </div>
  <div v-if="productTypes">
    <label>Product type</label>
    <select class="gnss-control" v-model="searchparams.productType">
       <option :value="null">---</option>
       <option v-for="pt in productTypes" :value="pt">{{pt}}</option>
    </select>
  </div>
  <div v-if="networks && mode === 'map'" class="gnss-networks"> 
     <label>Networks</label>
     <div >
         <span v-for="value in networks" class="network-span">
            <input v-model="searchparams.network" type="checkbox" :value="value" class="gnss-checkbox"> 
            <span >{{value}}</span>
         </span>
      </div>
  </div>   
   <div v-if="constels"> 
      <label>Constel</label>
      <select v-model="searchparams.constel" class="gnss-control" >
         <option :value="null">---</option>
         <option v-for="pt in constels" :value="pt">{{pt}}</option>
      </select>
   </div>
    <div style="margin-top:10px;">
          <label></label>
          <button @click="reset()" type="button" >Resest</button>
          <button @click="search($event)" type="submit" >Search <i class="fa fa-search"></i></button>
      </div>
   
</div>
</template>
<script>
export default {
  name: 'FileForm',
  props: {
    mode: {
      type: String,
      default: 'map'
    }
  },
  computed: {
    networks () {
      return this.$store.getters['networks']
    },
    productors () {
      return this.$store.getters['productors']
    },
    solutions () {
     return this.$store.getters['solutions']
    },
    productTypes () {
      return this.$store.getters['productTypes']
    },
    constels () {
      return this.$store.getters['constels']
    }
  },
  watch: {
    $route (newroute) {
     // this.treatmentQuery(newroute.query)
       this.initSearchParams(newroute.query)
    }
  },
  created () {
    this.initSearchParams(this.$route.query)
  },
  data () {
    return  {
      searchparams: {
	      productType: null,
	      solution: null,
	      productor: null,
	      network: [],
	      constel: null,
	      start: null,
	      end: null,
	      lenMin: null,
	      lenMax: null,
	      fill: null
      }
      
    }
  },
  methods: {
    search (event) {
      event.preventDefault()
      var self = this
      console.log(this.searchparams.network)
      this.searchparams.network = this.searchparams.network.filter(nt => self.networks.indexOf(nt) >= 0)
      this.changeQuery(this.searchparams)
    },
    initSearchParams (query) {
      for (var key in query) {
        if (key === 'network') {
          this.searchparams.network = query['network'].split(',')
        } else if (['center', 'radius', 'bbox'].indexOf(key) < 0) {
          this.searchparams[key] = query[key]
        }
      }
      for (var key in this.searchparams) {
        if (!query[key]) {
          if (key === 'network') {
            this.searchparams[key] = []
          } else {
            this.searchparams[key] = null
          }
        }
      }
    },
    changeQuery (params) {
      var newquery = Object.assign({}, this.$route.query)
      newquery = Object.assign(newquery, params)
      // query = query.filter(x => x !== null)
      for (var key in newquery) {
        if (newquery[key] ===  null || newquery[key].length == 0) {
          delete newquery[key]
        }
        if (key === 'network' && Array.isArray(newquery['network'])){
            newquery['network'] = newquery['network'].join(',')
        }
      }
      console.log(newquery)
      this.$router.push({name: 'home', query: newquery}).catch(()=>{})
    },
    reset() {
      console.log('RESET')
      this.$router.push({name:'home', query: {}}).catch(()=>{})
    },
    test () {
      console.log(this.searchparams.solution)
    }
  }
}

</script>
<style>
div.custom-checkbox label.custom-control-label {
  width:auto;
  min-width:0;
}
input[type="number"].gnss-control{
  width:100px;
}
input[id="fillrate"]::after {
  content: '%';
}
</style>
<style scoped>
.file-form {
  clear:both;
}
.file-form > div {
  margin: 3px 0;
}
.file-form > div > div {
  margin: 0px 0 2px 10px;
  width: calc(100% - 10px);
}
label {
  width: 110px;
  min-width:110px;
  color:#666;
  /** vertical-align: baseline;**/
}
.temp-extent > label {
  margin-top:15px;display:block;width:auto;
}
.temp-extent > div > label {
  min-width: 95px;
  width: 95px;
  
}
.extent-years label {
  width: 40px;
  min-width:40px;
}
.extent-years div {
  display: inline-block;
  width:auto;
  min-width:0;
  max-width:none;
}
.extent-years input[type="number"] {
  width:70px;
}
.form-group {
  margin-bottom:0;
  color: #222;
}
div.gnss-networks > label {
  vertical-align:top;
}
div.gnss-networks > div {
  display:inline-block;
  width:calc(100% - 140px);
}
span.network-span {
  display:inline-block;
  margin-left:-10px;
  margin-right:20px;
  color:#555;
  font-weight:700;
}
span.network-span span {
  line-height:1.3em;
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
input.gnss-checkbox {
	cursor: pointer;
	border-radius: .25em;
	margin-left: 0;
	width: 1.3em;
	height: 1.3em;
	margin-top: .25em;
	vertical-align: top;
	background-color: #fff;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	border: 1px solid rgba(0,0,0,.25);
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	-webkit-print-color-adjust: exact;
	color-adjust: exact;
}
input.gnss-checkbox:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
}
select {
	display: inline-block;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") right 0.75rem center/8px 10px no-repeat;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
 /* height: calc(1.5em + 0.5rem + 2px);
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  font-size: 0.875rem;*/
  width: calc(100% - 130px);
}
.gnss-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
[type="button"],
[type="submit"] {
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
</style>