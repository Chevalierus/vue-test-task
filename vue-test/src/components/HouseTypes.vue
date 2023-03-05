<template>
   <Vueform>
    <SelectElement
      name="select-nedvizh"
      :native="false"
      placeholder="Тип недвижимости"
      :floating="false"
      v-model="selectedHouseType"
      @select="onSelectedHouseTypeChange"
      :items="[
        {
          value: `${getHouseTypes[0]}`,
          label: `${getHouseTypes[0]}`,
        },
        {
          value: `${getHouseTypes[1]}`,
          label: `${getHouseTypes[1]}`,
        },
        {
          value: `${getHouseTypes[2]}`,
          label: `${getHouseTypes[2]}`,
        },
      ]"
      size="md"
    />
   </Vueform>
</template>

<script>
import axios from 'axios'

export default {
data() {
    return {
        data: null,
        houses: [],
        selectedHouseType: null,
    }
},
computed: {
    getHouseTypes: function () {
        return this.data ?  this.data.map(e => (e.realEstateTypes).split(','))[0] : []
    },
},
methods: {
    updateHouses() {
      this.houses = this.getHouseTypes
      this.$emit('get-houses', this.houses)
    },
    getData() {
        axios.get('http://widget-server.m2lab.ru/getVillage/4985be39-cbea-4393-beef-2115868487ef', {
            params: {
                realEstateTypes: this.houses
            }
        })
    .then(response => {this.data = response.data, this.updateHouses()})
    },
    onSelectedHouseTypeChange(selectedHouseType) {
      this.$emit('house-type-selected', selectedHouseType);
    },
},
created() {
    this.getData();
}
}
</script>

<style>

</style>