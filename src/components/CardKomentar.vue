<template>
  <div class="card p-3 mb-3">
          <div class="d-flex justify-content-between ">
            <span class="fs-4 font-weight-bold text-primary">{{komentar.nama}} </span>
            <small class="font-weight-bold"> {{komentar.body}}</small>
            <small class="text-secondary fst-italic">{{komentar.created_at}}</small>
          </div>
          <div
            class="
              action
              d-flex
              justify-content-between
              mt-2
              align-items-center
            "
          >
            <div class="reply">
              <small>Hapus</small> <span class="dots"></span>
              <small>Edit</small>
            </div>
          </div>
        </div>
</template>

<script>
export default {
props:['komentar']
}
</script>

<style>

</style>