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
        <q-skeleton height="200px" />
        <q-btn class="bg-primary full-width">Search</q-btn>
      </q-card-section>
      <q-card-section class="row q-gutter-md justify-center">
        <transition-group
          appear
          enter-active-class="animated backInLeft"
          leave-active-class="animated backOutRight"
        >
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

const mapParameter = ref({
  lat: <number>0,
  long: <number>0,
  maximize: <boolean>false,
});

const fullMap = (lat: number, long: number) => {
  mapParameter.value.lat = lat;
  mapParameter.value.long = long;
  mapParameter.value.maximize = true;
};
</script>
