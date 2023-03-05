<template>
  <Vueform>
    <TagsElement
      name="tags"
      :close-on-select="false"
      @change="onSelected"
      :items="[
        {
          value: `${getRooms[0]}`,
          label: `${getRooms[0]}`,
        },
        {
          value: `${getRooms[1]}`,
          label: `${getRooms[1]}`,
        },
        {
          value: `${getRooms[2]}`,
          label: `${getRooms[2]}`,
        },
        {
          value: `${getRooms[3]}`,
          label: `${getRooms[3]}`,
        },
                {
          value: `${getRooms[4]}`,
          label: `${getRooms[4]}`,
        },
      ]"
      />
  </Vueform>
</template>

<script>
import axios from "axios"

export default {
data() {
    return {
      data: null,
      rooms: [],
      selectedItems: null
    }
},
computed: {
    getRooms: function () {
        return this.data ? this.data.map(e => (e.rooms).split(','))[0] : []
    },
},
mounted() {
    this.getData();
},
methods: {
    updateRooms() {
      this.rooms = this.getRooms
      this.$emit('get-rooms', this.rooms)
    },
    getData() {
        axios.get('http://widget-server.m2lab.ru/getVillage/4985be39-cbea-4393-beef-2115868487ef', {
        })
    .then(response => {this.data = response.data, this.updateRooms()})
    },
    onSelected(selectedItems) {
      this.$emit('update-rooms', selectedItems);
    },
},
}

</script>

<style>

</style>