<template>
  <div>
    <nav class=" navbar navbar-default" role="navigation">
      <div class="navbar-header">         
        <a class="navbar-brand cursor" id='standard-menu-button' @click='toggleMenu'><span class="glyphicon glyphicon-th"></span></a>
        
        <button type="button" class="navbar-toggle" @click="toggleOption">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

      </div>
      <div v-bind:class="['navbar-collapse', optionOpen ? 'collapse-in' : 'collapse']">
        <ul class="nav navbar-nav">
          <nav-history></nav-history>
          <nav-user></nav-user>
        </ul>
        <ul v-if="admin" class="nav navbar-nav">
          <nav-admin></nav-admin>
        </ul>
        <search></search>
      </div>
      </nav>
      <standard-menu :enable='menuOpen' class="col-xs-12 col-md-6 col-lg-4 float"></standard-menu> 
      <div class="dim" @click="close" v-if="menuOpen || optionOpen"></div>
    </div>
</template>

<script>
  import Search from './Search'
  import StandardMenu from './StandardMenu'
  import NavHistory from './NavHistory'
  import NavAdmin from './NavAdmin'
  import NavUser from './NavUser'
  import bus from 'src/bus'
  import {togglers} from 'src/plugins/mixins'

  export default {
    mixins: [togglers],
    mounted: function () {
      bus.on('page-reset', (arg) => {
        if (arg !== 'drop-down') {
          this.optionOpen = false
        }
        this.menuOpen = false
      })
    },
    components: {
      Search,
      StandardMenu,
      NavHistory,
      NavAdmin,
      NavUser
    },
    data () {
      return {
        menuOpen: false,
        mobileNav: false,
        optionOpen: false
      }
    },
    computed: {
      admin () {
        return this.$store.getters.isAdmin
      },
      editStandard () {
        var standardId = this.$route.params.standardId
        return `{name: "editStandard", params:{standardId: "${standardId}"}}`
      }
    },
    methods: {
      toggleOption: function () {
        let tempStatus = !this.optionOpen
        bus.emit('page-reset')
        this.optionOpen = tempStatus
      },
      close: function () {
        this.optionOpen = false
        this.menuOpen = false
      },
      createStandard: function () {
        this.$router.push('/admin/standard/create')
      },
      toggleMenu: function () {
        let tempStatus = !this.menuOpen
        bus.emit('page-reset')
        this.menuOpen = tempStatus
      }
    }
  }
</script>

<style scoped>
  .navbar {
    margin-bottom:0px;
  }
  .float {
    position: relative;
    top: 0px;
    z-index: 1000;
    border-radius: 0;
  } 
  .dim {
    height:100%;
    width:100%;
    position:fixed;
    left:0;
    top:0;
    z-index:1 !important;
    background-color:black;
    filter: alpha(opacity=75); /* internet explorer */
    -khtml-opacity: 0.75;      /* khtml, old safari */
      -moz-opacity: 0.75;      /* mozilla, netscape */
           opacity: 0.75;      /* fx, safari, opera */
  }
  .cursor {
    cursor: pointer;
  }
</style>
