<template>
<span class="gnss-material">
 <label v-if="receivers && receivers.length > 0">Receivers</label>
 <div v-if="receivers" class="gnss-material-container" style="border:1px solid darkgrey;">
	 <div v-for="receiver in receivers" class="gnss-row">
	   <div class="gnss-row-1">
	   <div><label>From:</label> {{toDateStr(receiver.dateInstalled)}}</div>
	   <div><label>To:</label> {{toDateStr(receiver.dateRemoved)}}</div>
	   </div>
	   <div class="gnss-row-2">
	     <div v-for="key in ['receiverType', 'serialNumber', 'firmwareVersion']"><label>{{labelize(key)}}:</label> {{receiver[key]}}</div>
	   </div>
	   <div class="gnss-row-3">
	       <div v-for="key in ['elevationCutoffVal', 'temperatureStabiliz']"><label>{{labelize(key)}}:</label> {{receiver[key]}}</div>
	   
	   </div>
	   <div class="gnss-row-4">
	       <div v-for="key in ['satelliteSystem']"><label>{{labelize(key)}}:</label> {{receiver[key]}}</div>
	   </div>
	 </div>
 </div>
 <label v-if="antennas && antennas.length > 0" style="margin-top:15px;">Antennas</label>
 <div v-if="antennas" style="border:1px solid darkgrey;" class="gnss-material-container">
 <div v-for="antenna in antennas" class="gnss-row">
   <div class="gnss-row-1">
   <div><label>From:</label> {{toDateStr(antenna.dateInstalled)}}</div>
   <div><label>To:</label> {{toDateStr(antenna.dateRemoved)}}</div>
   </div>
   <div class="gnss-row-2">
     <div v-for="key in ['antenna', 'serialNumber']"><label>{{labelize(key)}}:</label> {{antenna[key]}}</div>
   </div>
   <div class="gnss-row-3">
       <div v-for="key in ['referencePoint', 'antennaRadomeType', 'alignmentFromTrueNVal']"><label>{{labelize(key)}}:</label> {{antenna[key]}}</div>
   
   </div>
   <div class="gnss-row-4">
       <div v-for="key in ['antennaCableLengthVal', 'antennaCableType']"><label>{{labelize(key)}}:</label> {{antenna[key]}}</div>
   
   </div>
   </div>
 </div>
</span>
</template>
<script>
import moment from 'moment'
export default{
  name: 'GnssMaterial',
  props: {
    antennas: {
      type: Array,
      default: () => []
    },
    receivers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      list: [],
      dates: []
    }
  },
  created () {
     this.orderList()
  },
  methods: {
    orderList() {
     
    },
    toDateStr (date) {
      // return date.substring(0,10)
      if (!date) {
        return '---'
      }
      return moment.utc(date).format('YYYY-MM-DD HH:mm')
    },
    labelize (label) {
      const result = label.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
  }
  
}
</script>
<style>
div.gnss-row:nth-child(2n + 1) {
   background: #eee;
  }
.gnss-row {
  display: grid;
  grid-template-columns:  minmax(100px,0.8fr) minmax(120px,1.3fr)  minmax(100px,1fr) minmax(160px,1.5fr) ;
  grid-gap: 5px;
  grid-template-rows: 45px; 
  /*grid-auto-rows: minmax(100px, auto);*/
  font-size:0.8em;
  
  border-bottom:1px solid lightgrey;
}
.gnss-material-container {
  border:1px solid grey;
  max-height:275px;
  overflow:scroll;
}
.gnss-row label {
  margin-bottom:2px;
}
.header .gnss-row-title {
  grid-column: 1/3;
  grid-row:1;
}
.gnss-row-1{
  padding-top:3px;
  padding-left:5px;
  grid-column: 1;
  grid-row: 1;
}
.gnss-row-1 label {
  margin:0;
  min-width: 40px;
}
.gnss-row-2 {
 padding-top:3px;
  grid-column: 2;
  grid-row: 1;;
}

.gnss-row-3 {
  padding-top:3px;
  grid-column: 3;
  grid-row: 1;;
}
.gnss-row-4 {
padding-top:3px;
  grid-column: 4;
  grid-row: 1;;
}

.gnss-row-5 {
  grid-column: 5;
  grid-row: 1;;
}

</style>