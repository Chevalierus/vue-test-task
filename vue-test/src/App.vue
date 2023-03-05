<template>
  <div class="container">
    <HouseTypes @house-type-selected="onHouseTypeSelected" @get-houses="getHouses" @change="updateUrl"></HouseTypes>
    <PriceNumbers @price-updated="updatePrice" @change="updateUrl"></PriceNumbers>
    <RoomsTypes @update-rooms="onSelectedRooms" @get-rooms="getRooms" @change="updateUrl"></RoomsTypes>
    </div>
</template>

<script>
import HouseTypes from './components/HouseTypes.vue'
import PriceNumbers from './components/PriceNumbers.vue'
import RoomsTypes from './components/RoomsCount.vue'

export default {
  name: 'App',
  components: {
    HouseTypes,
    PriceNumbers,
    RoomsTypes,
  },
  data() {
    return {
      minPrice: 100000,
      maxPrice: 200000000,
      selectedHouseType: null,
      selectedRoomsType: [],
      rooms: [],
      houses: [],
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search)
    const minPrice = params.get("minPrice")
    if (minPrice !== null) {
      this.minPrice = minPrice
    }
    const maxPrice = params.get("maxPrice")
    if (maxPrice !== null) {
      this.maxPrice = maxPrice
    }
    const selectedRoomsType = params.get("rooms")
    if (selectedRoomsType === null) {
      this.selectedRoomsType = selectedRoomsType.split(',')
    }
    const selectedHouseType = params.get("houses")
    if (selectedHouseType !== null) {
      this.selectedHouseType = selectedHouseType
    }
  },
  methods: {
    onHouseTypeSelected(value) {
      this.selectedHouseType = value;
      this.updateUrl
    },
    onSelectedRooms(value) {
      this.selectedRoomsType = value
      this.updateUrl
    },
    updatePrice(value) {
      this.minPrice = value[0]
      this.maxPrice = value[1]
      this.updateUrl
    },
    getRooms(rooms) {
      this.rooms = rooms
    },
    getHouses(houses) {
      this.houses = houses
    },
   updateUrl() {
      const params = new URLSearchParams()
      if (this.minPrice !== null) {
        params.set("minPrice", this.minPrice)
      }
      if (this.maxPrice !== null) {
        params.set("maxPrice", this.maxPrice)
      }
      if(this.selectedHouseType !== null) {
        params.set('houses', this.selectedHouseType)
      }
      this.selectedRoomsType.forEach(room => params.append("rooms", room))
      window.history.replaceState(null, "", `?${params.toString()}`)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 80%;
  margin: 0 auto;
}
</style>
