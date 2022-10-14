<template>
<div v-if="data" class="treeTable" >
  <span v-if="json">
      <span class="treeLabelCell">{{name}}</span>
      <span class="button" @click="deployed = !deployed">{{deployed ? '-' : '+'}}</span>
  </span>
  
  <div v-if="data" v-show="deployed">
	  <div v-for="(value, key) in data" :key="key" class="row">
	     <span v-if="typeof value === 'object'">
	      <json-div :name="key" :json="value" ></json-div>
	     </span>
	      <span v-else >
	         <span class="treeLabelCell">{{key}}</span>
	         <span>{{value}}</span>
	      </span>
	    
	  </div>
  </div>
</div>
</template>
<script>
import JsonDiv from './json-div.vue'
export default{
  name: 'JsonDiv',
  components: {JsonDiv},
  props: {
    json: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: null,
      deployed: true
    }
  },
  watch: {
    url (newvalue) {
      this.data = null
      if (newvalue) {
        this.deployed = true
      }
      this.load()
    },
    json (newvalue) {
      this.data = newvalue
    },
    selected (newvalue) {
      if (!this.data) {
        this.load()
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      if (this.json) {
        this.data = this.json
      } else if (this.url && this.selected && !this.data) {
        this.$http.get(this.url, {headers: 'accept: application/json'})
        .then(resp => {
          this.data = resp.body
         })
      }
    }
  }
  
}
</script>
<style>
div.row {
  margin-left: 8px;
  font-size: 0.8rem;
}

div.row span {
  display: inline-block;
  vertical-align: top;
  width: 100%;
}
span.treeLabelCell {
 color: blue;
 max-width: 150px;
}
span.treeLabelCell + span:not(.button) {
  max-width: calc(100% - 160px);
}
div.row span.button {
  padding:0px 3px;
  border: 1px dotted white;
  cursor: pointer;
  width: auto;
}
div.row span.button:hover {
  border-color: black;
}
</style>