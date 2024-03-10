<script> </script> 
<template> 
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
 </template> 
<style>
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
</style>
