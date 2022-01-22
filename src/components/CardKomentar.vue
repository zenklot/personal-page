<template>
  <div class="card p-3 mb-3">
    <div class="d-flex justify-content-between">
      <span class="fs-4 font-weight-bold text-primary"
        >{{ komentar.nama }}
      </span>
      <small class="font-weight-bold"> {{ komentar.body }}</small>
      <small class="text-secondary fst-italic">{{ komentar.created_at }}</small>
    </div>
    <div class="action d-flex justify-content-between mt-2 align-items-center">
      <div class="reply">
        <small
          @click="showDeleteModal(komentar.id)"
          data-bs-toggle="modal"
          data-bs-target="#modal"
          >Hapus</small
        >
        <span class="dots"></span>
        <small
          @click="showEditModal(komentar.id)"
          data-bs-toggle="modal"
          data-bs-target="#modal"
          >Edit</small
        >
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ jenis == "edit" ? "Edit Komentar" : "Delete Komentar" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text">Nama</span>
            <input
              type="text"
              class="form-control"
              placeholder="Nama"
              aria-label="Nama"
              aria-describedby="basic-addon1"
              v-model="komen.nama"
              :disabled="jenis == 'delete'"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text">Komentar</span>
            <textarea
              class="form-control"
              aria-label="Komentar"
              v-model="komen.body"
              :disabled="jenis == 'delete'"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            @click="
              jenis == 'edit'
                ? editKomentar(komen.id)
                : deleteKomentar(komen.id)
            "
            :class="jenis == 'edit' ? 'btn btn-primary' : 'btn btn-danger'"
            data-bs-dismiss="modal"
          >
            {{ jenis == "edit" ? "Edit Komentar" : "Delete Komentar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jenis: "",
    };
  },
  computed: {
    komen() {
      return this.$store.getters.getKomen;
    },
  },
  props: ["komentar"],
  methods: {
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
    showEditModal(id) {
      let loader = this.$loading.show();
      this.jenis = "edit";
      this.axios
        .get("/komentar/" + id)
        .then((respon) => {
          this.$store.commit("setKomen", respon.data);
        })
        .catch(() => {
          this.$store.dispatch("getKomentarArray", id);
        })
        .finally(() => {
          loader.hide();
        });
    },
    showDeleteModal(id) {
      let loader = this.$loading.show();
      this.jenis = "delete";
      this.axios
        .get("/komentar/" + id)
        .then((respon) => {
          this.$store.commit("setKomen", respon.data);
        })
        .catch(() => {
          this.$store.dispatch("getKomentarArray", id);
        })
        .finally(() => {
          loader.hide();
        });
    },
    editKomentar(id) {
      let loader = this.$loading.show();
      this.axios
        .put("/komentar/" + id, this.form)
        .then(() => {
          this.showToast("success", "Update Sukses");
        })
        .catch(() => {
          this.showToast("error", "Gagal Update");
        })
        .finally(() => {
          loader.hide();
        });
    },
    deleteKomentar(id) {
      this.$swal
        .fire({
          title: "Yakin Menghapus Komentar Ini?",
          text:
            "Kamu tidak dapat mengembalikan komentar dengan id : " +
            id +
            " setelah dihapus",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            let loader = this.$loading.show();
            this.axios
              .delete("/komentar/" + id)
              .then(() => {
                this.showToast("success", "Delete Sukses");
              })
              .catch(() => {
                this.showToast("error", "Delete Gagal");
              })
              .finally(() => {
                loader.hide();
              });
          }
        });
    },
  },
};
</script>

<style>
</style>