<template>
  <div class="background">
    <header class="header-shape grid-container">
      <div class="title-container">
        <h2 class="header-title">Album list</h2>
        <h3 class="header-subtitle">Top 10</h3>
      </div>
      <input
        class="search-field"
        type="search"
        v-model="search"
        placeholder="Search"
      />
    </header>
    <main class="grid-container">
      <section class="start">
        <div class="padding-buttons">
          <span class="All pointer">All</span>
          <span class="Today pointer">Featured</span>
        </div>
        <div
          class="card pointer"
          v-for="album in albumList"
          :key="album.id.attributes['im:id']"
          @click="openModal(album)"
        >
          <img class="album-photo" :src="album['im:image'][0].label" />
          <div class="float-left">
            <h3 class="title">{{ album["im:name"].label }}</h3>
            <span class="subtitle">{{ album["im:artist"].label }}</span>
          </div>
          <button class="featured-btn pointer">
            <span class="featured-text">FEATURED</span>
          </button>
        </div>
      </section>
    </main>
    <detail-view
      @close="closeModal"
      v-if="visibilityDetailView"
      :albumInfo="albumInfo"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailView from "@/components/DetailView.vue"; // @ is an alias to /src
import axios from "axios";

@Component({
  components: {
    DetailView
  }
})
export default class Home extends Vue {
  albumInfo: Object = [];
  albums: Array<Object> = [];
  search: String = "";
  visibilityDetailView: Boolean = false;
  mounted() {
    axios
      .get("https://itunes.apple.com/us/rss/topalbums/limit=10/json")
      .then(response => {
        this.albums = response.data.feed.entry;
      });
  }
  get albumList() {
    return this.albums.filter(post => {
      return (
        post["im:name"].label
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        post["im:artist"].label
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    });
  }
  openModal(album) {
    this.albumInfo = album;
    this.visibilityDetailView = true;
  }
  closeModal() {
    this.visibilityDetailView = false;
  }
}
</script>
