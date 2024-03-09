<script lang="ts" setup>
// import SvgIcon from '@/libraries/storybook/svgIcon/SvgIcon.vue';
import { Project } from '../projectsViewModel';
import AppLink from '@/components/shared/AppLink/AppLink.vue';

interface SubProjectProps {
  subProject: Project;
}

const props = defineProps<SubProjectProps>();
</script>

<template>
  <a
    class="sub-project"
    :href="props.subProject.repositoryUrl"
    target="_blank"
    rel="noreferrer"
  >
    <h3 class="sub-project-heading">
      {{ props.subProject.name }}
    </h3>
    <div class="sub-project-container">
      <img
        loading="lazy"
        class="sub-project-image"
        :src="props.subProject.image"
        :alt="props.subProject.name"
      />
      <figcaption class="sub-project-caption">
        Run {{ props.subProject.name }}
      </figcaption>
      <img
        v-if="props.subProject.organisationLogo"
        loading="lazy"
        class="sub-project-organisation-logo"
        :src="props.subProject.organisationLogo"
        :alt="props.subProject.organisationLogo"
      />
    </div>

    <div class="sub-project-buttons">
      <AppLink
        v-if="props.subProject.link"
        type="secondary"
        :link="props.subProject.link"
      >
        <template #linkContent>Run</template>
      </AppLink>
      <!-- <button class="sub-project-button" :href="props.subProject.repositoryUrl">
        Open details
        <SvgIcon name="RightArrow" :size="{ height: 15, width: 15 }" />
      </button> -->
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

    // @media (hover: hover) {
    //   &:hover {
    //     filter: scale(1.1);
    //   }

    //   &:hover .sub-project-image {
    //     filter: saturate(0) blur(3px);
    //   }

    //   &:hover .sub-project-card-caption {
    //     top: 50%;
    //     transform: translate(-50%, -50%) rotateX(0deg);
    //     opacity: 1;
    //   }

    //   &:hover .sub-project-title {
    //     transform: rotateX(-45deg);
    //   }
    // }

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
