<template>
  <div class='range-slider'>
    <span class="ruble">₽</span>
    <input type="number" :min="getPrice[0]" :max="getPrice[1]" step="100000" v-model="sliderMin" @input="updatePrice">
    <input type="range" :min="getPrice[0]" :max="getPrice[1]" step="100000" v-model="sliderMin" @input="updatePrice">
    <input type="number" :min="getPrice[0]" :max="getPrice[1]" step="100000" v-model="sliderMax" @input="updatePrice">
    <input type="range" :min="getPrice[0]" :max="getPrice[1]" step="100000" v-model="sliderMax" @input="updatePrice">
  </div>
</template>

<script>
import axios from "axios"

export default {
data() {
    return {
      data: null,
      price: [],
      minAngle: null,
      maxAngle: null,
    }
},
computed: {
    sliderMin: {
      get: function() {
        let val = parseInt(this.minAngle);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val > this.maxAngle) {
          this.maxAngle = val;
        }
        this.minAngle = val;
      }
    },
    sliderMax: {
      get: function() {
        let val = parseInt(this.maxAngle);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val < this.minAngle) {
          this.minAngle = val;
        }
        this.maxAngle = val;
      }
    },
    getPrice: function () {
        return this.data ? this.data.map(e => (e.price).split(','))[0] : []
    },
},
methods: {
  getData() {
    axios.get('http://widget-server.m2lab.ru/getVillage/4985be39-cbea-4393-beef-2115868487ef', {
      })
    .then(response => this.data = response.data)
  },
  updatePrice() {
    this.$emit('price-updated', [this.sliderMin, this.sliderMax])
  }  
},
watch: {
  getPrice() {
    this.sliderMin = this.getPrice[0]
    this.sliderMax = this.getPrice[1]
  }
},
mounted() {
    this.getData();
}
}
</script>

<style>
.range-slider {
  width: 350px;
  margin: auto;
  text-align: center;
  position: relative;
  height: 100px;
}

.ruble {
  color: grey;
  padding: 5px;
  border: 1px solid gray;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  font-size: 16px;
}

.range-slider input[type=range] {
  position: absolute;
  right: 5px;
  bottom: 65px;
}


input[type=range] {
  -webkit-appearance: none;
  width: 91%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 94%;
  height: 5px;
  cursor: pointer;
  background: green;
  border-radius: none;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: none;
  border: none;
  height: 12px;
  width: 12px;
  border-radius: 25px;
  background: green;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -4px;
}

input[type=number] {
  width: 43.1%;
  padding: 5px;
  border: 1px solid gray;
  font-size: 16px;
}

input[type=number]:nth-child(4) {
  width: 43.1%;
  padding: 5px;
  border: 1px solid gray;
  font-size: 16px;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
</style>
