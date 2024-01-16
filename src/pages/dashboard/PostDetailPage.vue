<template>
  <div class="q-pa-xl overflow-auto window-height" v-if="postData">
    <q-card flat bordered class="q-mb-xl">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="postData.user_avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ postData.user_name }}</q-item-label>
          <q-item-label caption>
            {{ postData.user_email }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section class="row justify-center">
        <q-card-section class="col-sm-8">
          <q-img :ratio="16 / 9" :src="postData.post_image" />
          <q-card-section class="text-caption text-justify text-italic">
            {{ postData.post_description }}
          </q-card-section>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-sm-3">
          <q-card-section class="text-primary">
            Title:
            <span class="text-grey-7 text-caption">{{
              postData.post_title
            }}</span>
          </q-card-section>
          <q-card-section class="text-primary">
            Created At:
            <span class="text-grey-7 text-caption">{{
              postData.post_created_at
            }}</span>
          </q-card-section>
          <q-card-section class="text-primary">
            Updated At:
            <span class="text-grey-7 text-caption">{{
              postData.post_updated_at
            }}</span>
          </q-card-section>
          <q-card-section>
            <q-btn
              class="bg-primary text-white"
              icon-right="favorite"
              @click="like(postData.post_id)"
            >
              <span class="q-py-sm">{{
                `Like ${postData.post_up_vote_count} `
              }}</span>
            </q-btn>
          </q-card-section>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-section style="width: 100%; height: 300px">
        <MapView
          class="full-width full-height"
          :latitude="postData.post_latitude"
          :longitude="postData.post_longitude"
        ></MapView>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { Post } from 'src/models/post';
import MapView from 'src/components/vue/MapView.vue';

const route = useRoute();

const postData = ref();
const refresh = () => {
  Post.postDetail(Number(route.params.id)).then((response) => {
    postData.value = response;
  });
};
refresh();

const like = (id: number) => {
  Post.likePost(id).then((response) => {
    if (response.status == 200) {
      refresh();
    }
  });
};
</script>
