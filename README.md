# اجرای صفحه جزئیات و نمایش داده های یک پست به صورت کامل


###### برای اینکه بخواهیم صفحه جزئیات یک پست را داشته باشیم ابتدا لازم است که یک درخواست به سمت سرور بزنیم و داده های یکی پست را تحویل بگیریم. این کار را هم با توجه به الگویی که سرور تعیین نموده است انجام می دهیم. پس وارد مدل Post می شویم و قطعه کد زیر را در آن می نویسیم.

```bash
static async postDetail(id: number) {
  const response = await api.get<FetchResponse<Post>>(`api/view-post/${id}`);
  if (response.status == 200) {
    const detail = {
      post_id: response.data.data.id,
      user_name: response.data.data.user.name,
      user_email: response.data.data.user.email,
      user_avatar: this.serverRoute + response.data.data.user.media[0].url,
      post_image: this.serverRoute + response.data.data.media[0].url,
      post_title: response.data.data.title,
      post_description: response.data.data.description,
      post_latitude: response.data.data.latitude,
      post_longitude: response.data.data.longitude,
      post_up_vote_count: response.data.data.up_vote_count,
      post_created_at: response.data.data.created_at,
      post_updated_at: response.data.data.updated_at,
    };
    return detail;
  }
  throw Error('Deleted Failed');
}
```
###### در این درخواست تک تک داده های خود را مرتب می کنیم و متناسب با نیاز خود در یک متغیر می چینیم تا بعدا از آن استفاده کنیم.

###### حال وارد PostDetailPage می شویم و از بخش script شروع به کد نویسی می کنیم. اولین کاری که لازم است صورت گیرد این است مواردی که نیاز داریم را import کنیم.
```bash
import { ref } from 'vue';
import { Post } from 'src/models/post';
import MapView from 'src/components/vue/MapView.vue';
```

###### یک متغیر برای ذخیره سازی پست ها می سازیم و در آن داده بازگشتی از سمت مدل Post را نگه می داریم و تابعی می نویسیم که وظیفه صدا زدن تابع postDetail را داشته باشد.
```bash
const postData = ref();
const refresh = () => {
  Post.postDetail(Number(route.params.id)).then((response) => {
    postData.value = response;
  });
};
refresh();
```
###### حال نوبت آن است که در بخش جزئیات یک پست هم تابعی جهت لایک کردن پست داشته باشیم، از همین رو تابع لایک را هم می نویسیم.
```bash
const like = (id: number) => {
  Post.likePost(id).then((response) => {
    if (response.status == 200) {
      refresh();
    }
  });
};
```
###### حال نوبت آن است که وارد template شویم و شروع کنیم به نوشتن تگ هایی که می خواهیم تا الگو ما به وجود آید. ابتدا یک div می نویسیم تا در آن شروع کنیم  به نوشتن موارد دیگر.
```bash
<div class="q-pa-xl overflow-auto window-height" v-if="postData">

</div>
```
###### به آن padding می دهیم و اینکه اگر overflow کرد، به ما آن بخش را هم نشان دهد، به عبارتی scroll فعال کند. کل div را هم مشروط به آن می کنیم که اگر postData ما وجود داشت، به عبارتی با داده سمت سرور پر شد، آنگاه div را ظاهر کن.
###### برای اینکه داخل div یک حالت کارت مانند داشته باشیم، از q-card استفاده کردیم.
```bash
<q-card flat bordered class="q-mb-xl">

</q-card>
```
###### حال برای بخش اول که عکس کاربر را نشان دهیم با نام و پست الکترونیک، از q-item استفاده می کنیم.
```bash
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
```
###### برای اینکه خطی به وجو آوریم و مرز هر بخش را مشخص کنیم، از q-separator استفاده می کنیم.
```bash
<q-separator />
```
###### حال نوبت آن است بخش وسط کار یعنی جزئیات پست را بسازیم. برای این کار، سمت چپ را برای نمایش تصویر و توضیحات پست در نظر می گیریم و سمت چپ را برای نمایش جزئیات و عنوان پست.
```bash
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
```
###### برای ایجاد یک خط افقی دیگر از q-separator استفاده می کنیم.
```bash
<q-separator />
```
###### حال بخش سوم را برای نمایش نقشه و مکان ثبت شده پست می سازیم.
```bash
<q-card-section style="width: 100%; height: 300px">
  <MapView
    class="full-width full-height"
    :latitude="postData.post_latitude"
    :longitude="postData.post_longitude"
  ></MapView>
</q-card-section>
```
###### حال صفحه جزئیات آماده شده است و شما می توانید پست ها خود را با جزئیات مشاهده کنید.


