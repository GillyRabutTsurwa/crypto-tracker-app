<template>
  <div>
    <input @input="test" type="text" id="name" class="form__input" placeholder="Search by Full Name or Acronym" required="" />
    <label for="name" class="form__label">Full Name</label>

  </div>
</template>

<script setup>
/**
 * NOTE: trying out the object syntaxe with defineEmits
 * this link has excellent documentation all about vue emits: https://learnvue.co/tutorials/vue-emit-guide
 */
const emit = defineEmits({
  testEvent: (payload) => {
    if (payload && typeof payload === "string") {
      return true;
    } else {
      console.warn(`Invalid submit event payload!`);
      return false;
    }
  },
});
const test = (e) => {
  emit("testEvent", e.target.value);
};
</script>

<style lang="scss" scoped>
.form {
  &__input {
    display: block;
    font-size: 1.5rem;
    font-family: inherit;
    color: variables.$colour-secondary;
    padding: 1.5rem 2rem;
    margin: 0 auto;
    border-radius: 2px;
    background-color: variables.$colour-primary;
    border: none;
    border-bottom: 3px solid transparent;
    width: 40%;
    -webkit-transition: all 0.8s ease;
    transition: all 0.8s ease;

    ::placeholder {
      color: variables.$colour-secondary;
    }

    &:placeholder-shown + .form__label {
      opacity: 0;
      visibility: hidden;
      -webkit-transform: translateY(-4rem);
      transform: translateY(-4rem);
    }
  }
  &__label {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 0.7rem;
    margin-left: 2rem;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
  }
}
</style>