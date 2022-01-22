<template>
  <div class="card p-3 mb-3">
          <div class="input-group mb-3">
            <span class="input-group-text">Nama</span>
            <input
              type="text"
              id="nama"
              class="form-control"
              placeholder="Nama" 
            />
          </div>
          <div class="input-group">
            <span class="input-group-text">Komentar</span>
            <textarea
              class="form-control" id="body"
            ></textarea>
          </div>

          <button class="mt-3 btn btn-primary" @click="postKomentar()">Kirim komentar</button>
        </div>
</template>

<script>
export default {
  data(){
    return{
      komentar_post:{
        id:"",
        nama:"",
        body:"",
        created_at:""
      },
    }
  },
  computed:{
    komentar(){
      return this.$store.getters.getKomentar
    }
  },
  methods:{
     showAlert(icon, title, message = "") {
      this.$swal.fire(title, message, icon);
    },
    showToast(icon, message) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: icon,
        title: message,
      });
    },
    postKomentar(){
       let loader = this.$loading.show()
      let nama = document.getElementById('nama').value
      let body = document.getElementById('body').value
      let tanggal = new Date()
      let komentar_baru = {
        id: this.komentar.length + 1,
        nama,
        body,
        created_at:tanggal.toISOString()
      }
      
      if(nama.length > 3 && body.length > 6){
        this.axios.post('/komentar', komentar_baru).then(()=>{
          this.showToast('success','Komentar baru Ditambahkan')
        }).catch(()=>{
          this.showAlert('error','Gagal Menambahkan Komentar Baru')
        }).finally(()=>{
          this.$store.commit('setPushKomentar', komentar_baru)
          this.showToast('info','Komentar baru Ditambahkan (Lokal)')
          document.getElementById('nama').value = ''
          document.getElementById('body').value = ''
           loader.hide()
        })
      }else{
         this.showAlert('warning','Gagal Menambahkan Komentar Baru','Mohon Masukan Inputan Dengan Benar!')
      }
    }
  }

}
</script>

<style>

</style>