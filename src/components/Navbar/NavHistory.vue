<template>
  <drop-down id='history-dropdown' v-show="history.length > 0">
    <template slot='title'>History</template>
    <template slot='dropdown'>
      <li :id="'drop ' + standard.code" v-for='standard in history'><router-link :to="{name: 'standard', params: {standardId: standard.id}}">{{standard.code}}</router-link></li>
    </template>
  </drop-down>
</template>

<script>
import {getHistory} from 'src/api/standard'
import bus from 'src/bus'
import DropDown from 'components/widget/DropDown'
export default {
  components: {
    DropDown
  },
  mounted: function () {
    getHistory().then((response) => {
      this.history = response.data
    }).catch((e) => {
      this.history = []
    })

    bus.on('page-reset', (arg) => {
      if (arg === 'beforeRoute') {
        getHistory().then((response) => {
          this.history = response.data
        }).catch((e) => {
          this.history = []
        })
      }
    })
  },
  data () {
    return {
      history: [],
      open: false
    }
  }
}
</script>

<style scoped>

</style>