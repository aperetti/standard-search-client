<template>
<!-- Standard PDF Viewer -->
  <div class='row' style="position: fixed; height: 100%; min-height: 95%; width: 100%; z-index: 9999">
    <div class='dim' @click='$emit("close")'></div>
    <div class='close' @click='$emit("close")'><span class='glyphicon glyphicon-remove-circle'></span></div>
    <div class='col-xs-12 col-md-8 col-md-offset-2 col-xs-offset' style="height: calc( 100% - 100px );">
      <iframe id='pdf' class='pdf-frame' :src="standardUrl" frameborder="0" wmode="transparent"></iframe>
    </div>
  </div>
</template>

<script>
  import {withToken, apiGetStandardPdf} from 'src/api/config'
  import {addHistory} from 'src/api/standard'

  export default {
    props: ['standard'],
    data () {
      return {
        close: false
      }
    },
    mounted () {
      this.$watch('standard', () => {
        addHistory(this.standard).then().catch(e => console.log('Failed to add Histroy'))
          // TODO: HANDLE ERROR WHEN STANDARD IS NOT ADDED. IS THIS NEEDED?)
      })
    },
    computed: {
      standardUrl: function () {
        var standardUrl = withToken(apiGetStandardPdf(this.standard))
        var iFrameUrl = `https://docs.google.com/gview?url=${standardUrl}&embedded=true`
        return iFrameUrl
      }
    }
  }
</script>

<style scoped>
.close {
  margin-top: 50px;
  color: #fff;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10000;
}
.pdf-frame {
  position: absolute;
  right: 0;
  margin-top: 100px;
  width: 100%;
  height: 100%;
  z-index: 2;
  }
.row {
  top: 0px;
  left: 15px;
  right: 15px;
}
.dim {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

</style>
