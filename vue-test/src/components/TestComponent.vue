<template>
  <div>
    <div>
      <label>Rooms:</label>
      <div v-for="room in rooms" :key="room">
        <input type="checkbox" :value="room" v-model="selectedRooms" @change="updateUrl">
        <span>{{room}}</span>
      </div>
    </div>
    <div>
      <label>Price:</label>
      <div>
        <input type="number" v-model="minPrice" @change="updateUrl">
        <span>to</span>
        <input type="number" v-model="maxPrice" @change="updateUrl">
      </div>
    </div>
    <div>
      <label>Real Estate Type:</label>
      <div v-for="type in realEstateTypes" :key="type">
        <input type="checkbox" :value="type" v-model="selectedTypes" @change="updateUrl">
        <span>{{type}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRooms: [],
      minPrice: null,
      maxPrice: null,
      selectedTypes: [],
      rooms: ["1", "2", "3"],
      realEstateTypes: ["House", "Duplex", "Apartment"]
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search)
    const rooms = params.getAll("rooms")
    if (rooms.length > 0) {
      this.selectedRooms = rooms
    }
    const minPrice = params.get("minPrice")
    if (minPrice !== null) {
      this.minPrice = minPrice
    }
    const maxPrice = params.get("maxPrice")
    if (maxPrice !== null) {
      this.maxPrice = maxPrice
    }
    const types = params.getAll("realEstateTypes")
    if (types.length > 0) {
      this.selectedTypes = types
    }
  },
  methods: {
    updateUrl() {
      const params = new URLSearchParams()
      this.selectedRooms.forEach(room => params.append("rooms", room))
      if (this.minPrice !== null) {
        params.set("minPrice", this.minPrice)
      }
      if (this.maxPrice !== null) {
        params.set("maxPrice", this.maxPrice)
      }
      this.selectedTypes.forEach(type => params.append("realEstateTypes", type))
      window.history.replaceState(null, "", `?${params.toString()}`)
    }
  }
}
</script>



