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
<style> </style> 
