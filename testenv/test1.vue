<script lang="ts" setup>

</script>

<template>
  <a
    class="sub-project"
    target="_blank"
    rel="noreferrer"
  >
    <h3 class="sub-project-heading">
    </h3>
    <div class="sub-project-container">
      <img
        loading="lazy"
        class="sub-project-image"
      />
      <figcaption class="sub-project-caption">
      </figcaption>
      <img
        loading="lazy"
      />
    </div>

    <div class="sub-project-buttons">
      <AppLink
      >
        <template #linkContent>Run</template>
      </AppLink>
    </div>
  </a>
</template>

<style lang="scss">
.sub-project {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .sub-project-heading {
    color: $color-white;
    font-size: 2.2rem;
  }

  .sub-project-container {
    position: relative;
    padding: 10%;
    background-color: $background-color-4;
    cursor: pointer;
    perspective: 100px;

    .sub-project-image {
      position: relative;
      width: 100%;
      aspect-ratio: 5 / 3;
      object-fit: cover;
      transition: 0.3s;
    }

    .sub-project-caption {
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%) rotateX(-45deg) scale(0.7);
      color: black;
      transition: all 0.5s;
      text-align: center;
      font-size: 2.5rem;
      font-weight: 600;
      color: $color-primary;
      opacity: 0;
      backface-visibility: hidden;
    }

    .sub-project-organisation-logo {
      position: absolute;
      bottom: 7rem;
      right: 5rem;
      height: 6rem;
      width: 6rem;
      object-fit: cover;
    }
  }

  .sub-project-buttons {
    display: flex;
    gap: 2rem;
  }
}

.sub-project-button {
  border-radius: $border-radius;
  padding: 1rem 3.5rem;
  color: $color-primary;
  font-size: 2.2rem;
  line-height: 1;
  font: $font-link;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 0 5px black;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      transform-origin: center;
      filter: brightness(1.1);
      box-shadow: 0 3px 5px black;
    }
  }

  @media only screen and (max-width: $bp-medium) {
    font-size: 1.5rem;
    gap: 1rem;
  }
}
</style>
