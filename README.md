# ایجاد مکانیزم نقشه و ارسال نقطه انتخاب شده به سرور و دریافت اطلاعات پست ها


###### برای  اینکه بتوانیم پست های نزدیک  به مکان مورد نظر خود را بیابیم، ابتدا تابع درخواست دهنده به سمت سرور را متناسب با الگویی که سرور تعیین کرده در مدل Post می سازیم و بعد درخواست  را در موقع لزوم ارسال کنیم.
```bash
static async searchPost(page: number, per_page: number, latitude: number, longitude: number) {
  const response = await api.get<FetchResponse<Post>>(
    `api/search-post?page=${page}&per_page=${per_page}&latitude=${latitude}&longitude=${longitude}`
  );
  if (response.status == 200) {
    const posts: any = [];

    response.data.posts.data.forEach((post) => {
      posts.push({
        id: post.id,
        image: this.serverRoute + post.media[0].url,
        latitude: post.latitude,
        longitude: post.longitude,
        title: post.title,
        username: post.user.name,
        description: post.description,
        upVoteCount: post.up_vote_count,
      });
    });

    return {
      posts: posts,
    }
  }
  throw Error('Deleted Failed');
}
```
###### تابع مورد نظر خود را می نویسیم و چهار پارامتر در ورودی دریافت می کنیم. اول شماره صفحه ای که می خواهیم، دوم تعداد پست هایی که در یک صفحه می خواهیم و سوم طول جغرافیایی و چهارم عرض جغرافیایی. سپس به سراغ در داخل تابع وقتی وضعیت بازگشتی از سمت سرور برابر با 200 بود، اطلاعات پست های خود را متناسب با الگویی که می خواهیم در متغیر پست ذخیره می کنیم و به جایی که این تابع را فراخوانده، باز می گردانیم.

###### حال نوبت آن رسیده که وارد صفحه SearchPage شویم و تغییرات مورد نظر خود را اعمال کنیم.

###### ابتدا به سراغ بخش script می رویم. اول مواردی که نیاز داریم را import  می کنیم.
```bash
import { Post } from 'src/models/post';
import MapView from 'src/components/vue/MapView.vue';
```
###### به تابع search نیاز داریم تا بتوانیم درخواست را به سمت سرور ارسال کنیم، اما سعی می کنیم فعلا صفحه اول و 4 پست ابتدایی را درخواست کنیم.

```bash
const posts = ref();
const search = () => {
  Post.searchPost(1, 4, mapParameter.value.lat, mapParameter.value.long).then(
    (response) => {
      posts.value = response.posts;
    }
  );
};
```
###### برای اجرا v-location پست خود، نیاز داریم تا دوباره directive خود را بنویسیم.
```bash
const vLocation = {
  beforeMount(el, binding) {
    el.innerText = parseFloat(binding.value).toFixed(2);
  },
  updated(el, binding) {
    el.innerText = parseFloat(binding.value).toFixed(2);
  },
};
```
###### برای اینکه بتوانیم پست های خود را لایک کنیم، تابع لایک را می نویسیم تا در template استفاده کنیم.
```bash
const like = (id: number) => {
  Post.likePost(id).then(() => {
    search();
  });
};
```
###### وارد template می شویم و شروع می کنیم به ویرایش مواردی که می خواهیم. ابتدا از آن بالا، q-card-section دوم که نقشه را جهت نمایش اولیه و انتخاب کاربر فراهم می کند را به صورت زیر اجرا می کنیم.
```bash
<MapView
  v-if="MapView"
  v-model:latitude="mapParameter.lat"
  v-model:longitude="mapParameter.long"
  state="move"
></MapView>
<q-skeleton v-else height="200px" />
```

###### گام بعدی نوبت q-card-section سوم است که در آن شروع می کنیم به نوشتن حالت ها مختلف. حال نوبت آن است تغییرات را به ترتیب با هم انجام دهیم.

###### ابتدا دو div داخل transition-group می سازیم و بعد کلاسی که  به q-card-section داده بودیم  را به آن ها می دهیم و div های را شرطی می کنیم که اگر post های دریافت شده بود ، آن ها را نمایش دهد و اگر هنوز  درخواستی صورت نگرفته است، همان skeleton را نمایش دهد.
```bash
<div v-if="posts" class="row q-gutter-md justify-center">

</div>
<div v-else class="row q-gutter-md justify-center">

</div>
```
###### حال در div اول همان الگو اجرا شدن پست ها را پیاده سازی می کنیم.
```bash
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
```
###### حالت قبلی ای که ساخته بودیم را هم در else قرار می دهیم، یعنی همان شاکله skeleton.
```bash
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
```
###### حال همه چی آماده است تا بتوان برای هر دو حالت آماده باشیم و پست ها را نمایش دهیم.






