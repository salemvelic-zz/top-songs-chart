<template>
  <div class="background">
    <header class="header-shape grid-container">
      <div class="title-container">
        <h2 class="header-title">Album list</h2>
        <h3 class="header-subtitle">Top 10</h3>
      </div>
      <input class="search-field" type="search" placeholder="Search" />
    </header>
    <main class="grid-container">
      <section class="start">
        <div class="padding-buttons">
          <span class="All">All</span>
          <span class="Today">Featured</span>
        </div>
        <div class="card" v-for="album in albums" :key="album.id">
          <img
            class="slika1"
            src="..\assets\base\img\slika-1.png"
            srcset="img/slika-1@2x.png 2x, img/slika-1@3x.png 3x"
          />
          <div class="content">
            <h3 class="title">Feel Good Inc.</h3>
            <span class="subtitle">DEMON DAYS 2005</span>
          </div>
          <button class="featured-btn">
            <span class="featured-text">FEATURED</span>
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import axios from "axios";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  albums: Array<Object> = [{ id: "1" }, { id: "2" }];
}
</script>
