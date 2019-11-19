<template>
<div>
  <vue-headful title="QR Code scannen" />
  <p v-if="!allowCamera" id="camera-status">{{cameraStatus}}</p>
  <qrcode-reader v-if="showCamera" @init="onInit" @decode="onDecode" :paused="paused"></qrcode-reader>
  <h4 class="mt-4">QR Code scannen</h4>
  <p>Richten Sie Ihre Kamera auf den QR Code eines Ausstellungsstückes, um das Ausstellungsstück als Ereignis auszuwählen. Falls der QR Code nicht erkannt werden kann, entfernen Sie die Kamera ein Stück.</p>
  <div class="modal fade" id="cameraModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Bitte stimmen Sie der Verwendung der Kamera zu</h5>
        </div>
        <div class="modal-body">
          <p class="m-0">Ihr Browser wird Sie eventuell gleich fragen, ob Sie der Verwendung der Kamera zustimmen möchten. Bitte stimmen Sie dieser zu, damit Sie einen QR Code scannen können.</p>
        </div>
        <div class="modal-footer">
          <button @click="back()" type="button" class="btn btn-secondary btn-block mt-0">Zurück</button>
          <button @click="closeModal()" type="button" class="btn btn-primary btn-block mt-0">Okay</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'
import {
  QrcodeReader
} from 'vue-qrcode-reader/dist/vue-qrcode-reader.common'
import ExhibitCard from '@/components/ExhibitCard.vue'

export default {
  name: 'qr-scan',
  components: {
    "qrcode-reader": QrcodeReader,
    ExhibitCard
  },
  data() {
    return {
      allowCamera: false,
      showCamera: false,
      cameraStatus: "Bitte erlauben Sie Ihrem Browser, die Kamera zu verwenden, damit Sie einen QR Code scannen können.",
      paused: false
    }
  },
  computed: {
    cameraAllowed() {
      return this.$store.state.cameraAllowed;
    }
  },
  mounted() {
    if (this.cameraAllowed) {
      this.showCamera = true;
    } else {
      $('#cameraModal').modal('show');
    }
  },
  methods: {
    onDecode(content) {
      this.paused = true;
      this.$router.push({
        path: '/erstellen/qr/exhibit',
        query: {
          id: content
        }
      });
    },
    async onInit(promise) {
      try {
        await promise
        // successfully initialized
        this.allowCamera = true;
        this.$store.commit('cameraAllowed', true);
      } catch (error) {
        console.log(error);
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
          this.cameraStatus = "Sie haben der Verwendung Ihrer Kamera nicht zugestimmt."
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
          this.cameraStatus = "Die Kamera wurde nicht gefunden."
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
          this.cameraStatus = "Die Kamera wird bereits von einem anderen Programm verwendet."
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
          this.cameraStatus = "Die Kamera wurde nicht gefunden."
        } else {
          this.cameraStatus = "Ihr Browser wird nicht unterstützt. Bitte gehen Sie auf die vorangegangene Seite und wählen Sie das Ereignis manuell aus."
        }
      }
    },
    closeModal() {
      $('#cameraModal').modal('hide');
      this.showCamera = true;
    },
    back() {
      $('#cameraModal').modal('hide');
      this.$router.push('/erstellen/ereignis');
    }
  }
}
</script>

<style lang="scss">
qrcode-reader {
    font-size: 1em;
}
.scan-box {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 10rem;
    height: 10rem;
    border: 0.5rem solid rgba(0, 0, 0, .6);
}

// .qrcode-reader__camera {
//     height: 200px;
//     margin-left: auto;
//     margin-right: auto;
// }
//
// .qrcode-reader {
//     height: 50%;
// }
</style>
