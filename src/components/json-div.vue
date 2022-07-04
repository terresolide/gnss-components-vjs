<template>
<div v-if="json" class="treeTable" v-show="deployed">
  <div v-for="(value, key) in json" :key="key" class="row">
  <span class="treeLabelCell">{{key}}</span>
  <span v-if="Array.isArray(value)">
    <div class="treeTable" v-for="(sub, index) in value" :key="index">{{sub}}</div>
  </span>
  <span v-else-if="typeof value === 'object'">
    <json-div :json="value" :root="false"></json-div>
  </span>
  <span v-else >{{value}}</span>
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
    deployed: {
      type: Boolean,
      default: false
    }
  },
  created () {
    
  }
  
}
</script>
<style>
div.row {
  margin-left: 8px;
  font-size: 0.9rem;
}
span.treeLabelCell {
 color: blue;
 display: inline-block;
 min-width: 180px;
}
</style>