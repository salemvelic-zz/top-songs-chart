<template>
  <div>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="pointer btn-close" @click="$emit('close')">
              <img src="../assets/base/img/exit-icon.svg" alt="" />
            </button>
            <h4 class="artist-title">{{ albumInfo["im:artist"].label }}</h4>
            <h1 class="album-title">{{ albumInfo["im:name"].label }}</h1>
          </div>
          <div class="modal-body">
            <img
              class="album-image"
              :src="albumInfo['im:image'][2].label"
              :alt="albumInfo.title.label"
            />
            <div class="album-description">
              <span class="album-description-title">Release date</span>
              <p class="album-description-content">
                {{ albumInfo["im:releaseDate"].attributes.label }}
              </p>
              <span class="album-description-title">Price</span>
              <p class="album-description-content">
                {{ albumInfo["im:price"].label }}
              </p>
              <span class="album-description-title">Rights</span>
              <p class="album-description-content">
                {{ albumInfo.rights.label }}
              </p>
              <a class="album-link" :href="albumInfo.id.label" target="_blank"
                >Buy now on itunes &raquo;</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DetailView extends Vue {
  @Prop() private albumInfo: Object;
}
</script>
