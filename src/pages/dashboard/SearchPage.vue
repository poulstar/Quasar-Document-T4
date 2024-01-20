<template>
  <q-page class="overflow-auto window-height q-pa-xs">
    <q-page-container class="q-mb-xl">
      <q-card-section>
        <q-toolbar class="bg-primary rounded-borders">
          <q-toolbar-title>
            <q-btn flat round dense icon="search" />
            Choose your location for finding posts
          </q-toolbar-title>
        </q-toolbar>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <MapView
          v-if="MapView"
          v-model:latitude="mapParameter.lat"
          v-model:longitude="mapParameter.long"
          state="move"
        ></MapView>
        <q-skeleton v-else height="200px" />
        <q-btn class="bg-primary full-width" @click="search()">Search</q-btn>
      </q-card-section>
      <q-card-section>
        <transition-group
          appear
          enter-active-class="animated backInLeft"
          leave-active-class="animated backOutRight"
        >
          <div v-if="posts" class="row q-gutter-md justify-center">
            <div v-for="(post, index) in posts" :key="index">
              <q-card class="my-card" style="width: 300px">
                <router-link
                  :to="{
                    name: 'postDetail',
                    params: { id: post.id, name: post.title },
                  }"
                >
                  <q-img :src="post.image" width="100%" height="300px" />
                </router-link>
                <q-card-section>
                  <q-btn
                    fab
                    color="light-blue-8"
                    icon="place"
                    class="absolute"
                    style="
                      top: 0;
                      right: 12px;
                      transform: translateY(-50%);
                      z-index: 10;
                    "
                    @click="fullMap(post.latitude, post.longitude)"
                  />
                  <div class="row no-wrap items-center">
                    <router-link
                      :to="{
                        name: 'postDetail',
                        params: { id: post.id, name: post.title },
                      }"
                      style="color: inherit; text-decoration: none"
                    >
                      <div class="col text-h6 ellipsis">
                        {{ post.title }}
                      </div>
                    </router-link>
                  </div>
                  <div class="row">
                    <div class="col-6 row">
                      <span class="q-mr-xs">Lat: </span
                      ><span
                        class="text-info"
                        v-location="post.latitude"
                      ></span>
                    </div>
                    <div class="col-6 row">
                      <span class="q-mr-xs">Long: </span
                      ><span
                        class="text-info q-ma-xs"
                        v-location="post.longitude"
                      ></span>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="text-subtitle1">
                    {{ post.username }}
                  </div>
                  <div class="text-caption text-grey">
                    {{ post.description.substring(0, 40) }} ...
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-actions>
                  <q-btn
                    color="light-blue-8"
                    icon-right="favorite"
                    :label="`Like (${post.upVoteCount})`"
                    @click="like(post.id)"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div v-else class="row q-gutter-md justify-center">
            <div v-for="(post, index) in [1, 2, 3, 4]" :key="index">
              <q-card class="my-card" style="width: 300px">
                <q-skeleton width="100%" height="300px" />
                <q-card-section>
                  <q-btn
                    fab
                    color="light-blue-8"
                    icon="place"
                    class="absolute"
                    style="
                      top: 0;
                      right: 12px;
                      transform: translateY(-50%);
                      z-index: 10;
                    "
                    @click="fullMap(mapParameter.lat, mapParameter.long)"
                  />
                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                      <q-skeleton type="text" width="100px" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 row">
                      <span class="q-mr-xs">Lat: </span
                      ><q-skeleton type="text" width="50%" />
                    </div>
                    <div class="col-6 row">
                      <span class="q-mr-xs">Long: </span
                      ><q-skeleton type="text" width="50%" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="text-subtitle1">
                    <q-skeleton type="text" width="40%" />
                  </div>
                  <div class="text-caption text-grey">
                    <q-skeleton type="text" width="100%" />
                    <q-skeleton type="text" width="100%" />
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-actions>
                  <q-skeleton type="QBtn" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </transition-group>
      </q-card-section>
    </q-page-container>
  </q-page>
  <q-dialog
    v-model="mapParameter.maximize"
    persistent
    :maximized="mapParameter.maximize"
  >
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup></q-btn>
      </q-bar>
      <q-skeleton width="100%" height="100%" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Post } from 'src/models/post';
import MapView from 'src/components/vue/MapView.vue';

const mapParameter = ref({
  lat: <number>37.28,
  long: <number>49.6,
  maximize: <boolean>false,
});

const fullMap = (lat: number, long: number) => {
  mapParameter.value.lat = lat;
  mapParameter.value.long = long;
  mapParameter.value.maximize = true;
};

const posts = ref();
const search = () => {
  Post.searchPost(1, 4, mapParameter.value.lat, mapParameter.value.long).then(
    (response) => {
      posts.value = response.posts;
    }
  );
};

const vLocation = {
  beforeMount(el, binding) {
    el.innerText = parseFloat(binding.value).toFixed(2);
  },
  updated(el, binding) {
    el.innerText = parseFloat(binding.value).toFixed(2);
  },
};

const like = (id: number) => {
  Post.likePost(id).then(() => {
    search();
  });
};
</script>
