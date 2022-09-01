
<template>
  <div class="container">
    <form @submit.prevent="login">
      <div class="input">
        <label for="email">Porodotto</label>
        <input
          class="form-control"
          type="text"
          name="prodotto"
          placeholder="prodotto"
        />
      </div>
      <div class="input">
        <label for="prezzo">Prezzo</label>
        <input
          class="form-control"
          type="text"
          name="prezzo"
        />
      </div>
      <div
        class="alert alert-warning alert-dismissible fade show mt-5 d-none"
        role="alert"
        id="alert_1"
      >
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        >Paga</button>
      </div>
    </form>
  </div>
</template>



<script>
export default {
  data() {
    return { message: "Hello Vue!" };
  },
};
</script>



