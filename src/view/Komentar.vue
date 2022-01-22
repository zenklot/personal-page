<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <div
          class="
            headings
            d-flex
            justify-content-between
            align-items-center
            mb-3
          "
        >
          <h5>Unread comments(6)</h5>
          <div class="buttons">
            <span class="badge bg-white d-flex flex-row align-items-center">
              <router-link to="/" class="text-primary p-2 text-decoration-none"
                ><b-icon-house-fill /> Home</router-link
              >
            </span>
          </div>
        </div>

        <CardFormKomentar />

<CardKomentar v-for="komen in komentar" :key="komen.id" :komentar="komen"/>
        


      </div>
    </div>
  </div>
</template>

<script>
import CardKomentar from '../components/CardKomentar.vue'
import CardFormKomentar from '../components/CardFormKomentar.vue'
export default {
components:{
  CardKomentar,
  CardFormKomentar
},
mounted(){
  this.$store.dispatch('loadKomentar')
},
computed:{
  komentar(){
    return this.$store.getters.getKomentar
  }
}
};
</script>

<style>
</style>