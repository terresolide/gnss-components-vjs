<template>
<div class="form-horizontal">
 <!--   <div class="button fa fa-chevron-right" @click="closeForm()" ></div>
-->
       <div v-if="solutions" style="margin-top:10px;"> 
          <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
               content-cols-lg="7" label="Solution" label-for="solution" >
              <b-form-select id="solution" v-model="searchparams.solution" :options="solutions" size="sm"  @change="test"></b-form-select>
          </b-form-group>
      </div>
      <div > 
       <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
               content-cols-lg="7" label="From" label-for="from" >
          <b-input-group >
             <b-form-input  id="from" v-model="searchparams.from" type="text"
			        placeholder="YYYY-MM-DD" autocomplete="off" size="sm"></b-form-input>
             <b-input-group-append>
                  <b-form-datepicker  v-model="searchparams.from" button-only right
                      locale="en-US" aria-controls="from"  size="sm" >
                  </b-form-datepicker>
             </b-input-group-append>
           </b-input-group>
        </b-form-group>
      </div>
      <div > 
       <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
               content-cols-lg="7" label="To" label-for="to" >
          <b-input-group >
             <b-form-input  id="to" v-model="searchparams.to" type="text"
              placeholder="YYYY-MM-DD" autocomplete="off" size="sm"></b-form-input>
             <b-input-group-append>
                  <b-form-datepicker  v-model="searchparams.to" button-only right
                      locale="en-US" aria-controls="to"  size="sm" >
                  </b-form-datepicker>
             </b-input-group-append>
           </b-input-group>
        </b-form-group>
      </div>
      <div style="margin-left:-10px;margin-top:10px;"><label style="width:auto;">Extend in years</label></div>
      <div style="margin-left:10px;margin-bottom:10px;"> 
	       <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
	               content-cols-lg="7" label="Min" label-for="min"  >
	             <b-form-input  id="min" v-model="searchparams.lenmin" type="number"
	              min="0" max="30" size="sm"></b-form-input>
	        </b-form-group>
	         <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
                 content-cols-lg="7" label="Max" label-for="max"  >
               <b-form-input  id="max" v-model="searchparams.lenmax" type="number"
                min="0" max="30" size="sm"></b-form-input>
          </b-form-group>

      </div>
       <div > 
         <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
                 content-cols-lg="7" label="Fill rate > " label-for="fillrate"  >
               <b-form-input  id="fillrate" v-model="searchparams.fill" type="number"
                min="0" max="100" size="sm"  placeholder="83%"></b-form-input>
          </b-form-group>
       </div>
        <div v-if="productors" > 
          <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
               content-cols-lg="7" label="Operator" label-for="productor" >
              <b-form-select id="productor" v-model="searchparams.productor" :options="productors" size="sm"  ></b-form-select>
          </b-form-group>
      </div>
       <div v-if="productTypes" > 
          <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
               content-cols-lg="7" label="Product Type" label-for="producttype" >
              <b-form-select id="producttype" v-model="searchparams.productType" :options="productTypes" size="sm"  ></b-form-select>
          </b-form-group>
      </div>
      <div v-if="networks && mode === 'map'" > 
          <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="3" content-cols-sm
               content-cols-lg="7" label="Networks" label-for="network" >
               <b-form-checkbox-group   id="network" v-model="searchparams.network"
                      :options="networks" >
               </b-form-checkbox-group>
          </b-form-group>
      </div>
       <div>
          <label>From</label>
          <input type="date" v-model="searchparams.start" />
      </div>
       <div > 
       <label>To</label>
          <input type="date" v-model="searchparams.end" />
      </div>
      <div>
          <label style="width:auto;">Extend in (years)</label>
         
      </div>
      <div>
         <label style="margin-left:10px;width:90px;">min</label>
         <input type="number" v-model="searchparams.lenmin" style="width:80px;"/></div>
      <div>
          <label style="margin-left:10px;width:90px;">max</label>
          <input type="number" v-model="searchparams.lenmax" style="width:80px;"/>
      </div>
      <div>
          <label >fill rate > </label>
          <input type="number" v-model="searchparams.fill" min="0" max="100" style="width:80px;"/> %
      </div>
       <div v-if="productors"> 
          <label>Operator</label>
          <select v-model="searchparams.productor" >
             <option :value="null">---</option>
             <option v-for="pt in productors" :value="pt">{{pt}}</option>
          </select>
      </div>
      <div v-if="productTypes"> 
          <label>Product type</label>
          <select v-model="searchparams.productType" >
             <option :value="null">---</option>
             <option v-for="pt in productTypes" :value="pt">{{pt}}</option>
          </select>
      </div>
      <div style="width:100%;margin-bottom:5px;" v-if="networks">
          <label>Networks</label>
          <div style="">
            <span v-for="value in networks" style="display:inline-block;">
               <input v-model="searchparams.network" type="checkbox" :value="value"> {{value}}
            </span>
          </div>
      </div>
       <div v-if="constels"> 
          <label>Constel</label>
          <select v-model="searchparams.constel" >
             <option :value="null">---</option>
             <option v-for="pt in constels" :value="pt">{{pt}}</option>
          </select>
      </div>
   
</div>
</template>
<script>
import {BFormCheckboxGroup, BFormDatepicker, BFormGroup, BFormInput, BFormSelect, BInputGroup, BInputGroupAppend} from 'bootstrap-vue'
export default {
  name: 'FileForm',
  components: {BFormCheckboxGroup, BFormDatepicker, BFormGroup, BFormInput, BFormSelect,  BInputGroup, BInputGroupAppend},
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
      return this.createOptions(this.$store.getters['productors'])
    },
    solutions () {
      var sols = this.$store.getters['solutions']
      return this.createOptions(sols)
    },
    productTypes () {
      return this.createOptions(this.$store.getters['productTypes'])
    },
    constels () {
      return this.createOptions(this.$store.getters['constels'])
    }
  },
  watch: {
    $route (newroute) {
     // this.treatmentQuery(newroute.query)
       Object.assign(this.searchparams, newroute.query)
    }
  },
  created () {
    Object.assign(this.searchparams, this.$route.query)
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
    closeForm() {
      this.$emit('close')
    },
    createOptions (list) {
      if (!list) {
        return null
      }
      var options = [{
        value: null,
        text: '---'
       }]
       var aux = list.map(v => {return {value: v, text: v}})
       options = options.concat(aux)

       return options
    },
    test () {
      console.log(this.searchparams.solution)
    }
  }
}

</script>
<style scoped>
.form-group {
  margin-bottom:0;
  color: #333;
}
div.custom-checkbox label.custom-control-label {
  width:auto;
  min-width:0;
}
input [id="fillrate"]::after {
  content: '%';
}
</style>