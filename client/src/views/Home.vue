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
          <span
            :class="{ all: isFeatured, featured: !isFeatured }"
            class="pointer"
            @click="isFeatured = false"
            >All</span
          >
          <span
            :class="{ all: !isFeatured, featured: isFeatured }"
            class="pointer"
            @click="isFeatured = true"
            >Featured</span
          >
        </div>
        <transition-group name="slide">
          <div
            class="card"
            v-for="(album, index) in albumList"
            :key="album.id.attributes['im:id']"
          >
            <div class="pointer card-link" @click="openModal(album)">
              <img class="album-photo" :src="album['im:image'][0].label" />
              <div class="float-left album-info">
                <h3 class="title">{{ album["im:name"].label }}</h3>
                <span class="subtitle">{{ album["im:artist"].label }}</span>
              </div>
            </div>
            <button
              class="featured-btn pointer"
              v-if="album.isFeatured"
              @click="removeFromFeatured(index)"
            >
              <span class="featured-text">FEATURED</span>
            </button>
            <button
              class="btn add-featured pointer"
              v-else
              @click="addToFeatured(index)"
            >
              <span>Add to featured</span>
            </button>
          </div>
        </transition-group>
      </section>
    </main>
    <transition name="fade">
      <detail-view
        @close="closeModal"
        v-if="visibilityDetailView"
        :albumInfo="albumInfo"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailView from "@/components/DetailView.vue"; // @ is an alias to /src
import axios from "axios";
import store from "../store";

@Component({
  components: {
    DetailView
  }
})
export default class Home extends Vue {
  albumInfo: Object = [];
  albums: Array<Object> = [];
  filteredAlbums: Array<Object> = [];
  isFeatured: Boolean = false;
  search: String = "";
  visibilityDetailView: Boolean = false;
  mounted() {
    axios
      .get("https://itunes.apple.com/us/rss/topalbums/limit=10/json")
      .then(response => {
        this.albums = response.data.feed.entry;
        this.addFeaturedField();
      });
  }
  get albumList() {
    if (this.isFeatured) {
      this.filteredAlbums = store.getters.albumList;
    } else {
      this.filteredAlbums = this.albums;
    }
    return this.filteredAlbums.filter(post => {
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
  addFeaturedField() {
    this.albums.forEach(element => {
      element.isFeatured = false;
    });
  }
  addToFeatured(index) {
    // this.filteredAlbums[index].isFeatured = true;
    Vue.set(this.filteredAlbums[index], "isFeatured", true);
    this.reRender(index);
    store.dispatch(
      "addAlbums",
      this.filteredAlbums.filter(element => {
        return element.isFeatured === true;
      })
    );
  }
  removeFromFeatured(index) {
    Vue.set(this.filteredAlbums[index], "isFeatured", false);
    this.reRender(index);
    store.dispatch(
      "addAlbums",
      this.filteredAlbums.filter(element => {
        return element.isFeatured === true;
      })
    );
  }
  reRender(index) {
    let temp = this.filteredAlbums[index].id.attributes["im:id"];
    this.filteredAlbums[index].id.attributes["im:id"] = 4;
    this.filteredAlbums[index].id.attributes["im:id"] = temp;
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
