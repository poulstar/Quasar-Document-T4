# ایجاد صفحه Search engine برای یافتن پست بر اساس نقطه جغرافیایی


###### برای اینکه یک صفحه برای جست و جو پست بر اساس موقعیت جغرافیایی داشته باشیم ابتدا شروع می کنیم ظاهر اولیه آن را می سازیم. دقت کنید که ما می توانیم از <a href="https://quasar.dev/vue-components/skeleton">Quasar Skeleton</a> استفاده کنیم و بعد در آینده داده که دریافت شد، جایگزین کنیم.

###### از همین رو شروع می کنیم در صفحه SearchPage درست کردن تگ هایی که می خواهیم. ابتدا به بخش script می رویم و اقدام به نوشتن مواردی که نیاز داریم می کنیم. ابتدا import های مورد نیاز خود را انجام می دهیم.
```bash
import { ref } from 'vue';
```
###### حال با استفاده از ref شروع می کنیم متغیر هایی که نیاز داریم را می نویسیم.
```bash
const mapParameter = ref({
  lat: <number>0,
  long: <number>0,
  maximize: <boolean>false,
});
```
###### حال نوبت آن است برای اینکه تابعی درست کنیم تا نقشه ای در ابعاد کل صفحه می سازیم.
```bash
const fullMap = (lat: number, long: number) => {
  mapParameter.value.lat = lat;
  mapParameter.value.long = long;
  mapParameter.value.maximize = true;
};
```
###### حال شروع می کنیم به توسعه template. ابتدا تگ div را پاک می کنیم و بعد یک تگ q-page می سازیم، تا کل داده های خود را در آن جای دهیم.
```bash
<q-page class="overflow-auto window-height q-pa-xs">

</q-page>
```
###### داخل q-page داریم تا یک q-page-container داشته باشیم تا به صورت الگویی که ما می خواهیم منظم شود.
```bash
<q-page-container class="q-mb-xl">

</q-page-container>
```
###### برای کار خود به صورت فعلی سه بخش در نظر می گیریم. بخش اول یک نوع نمایش عنوان صفحه یا  معرفی کاری که قرار است صورت بگیرد. در فاز دوم نمایش جایگاه نقشه و امکان انتخاب آن برای فیلتر شدن پست ها و بخش سوم جایگاه نمایش پست های ماست.
###### ابتدا بخش اول را با q-card-section به صورت زیر پیاده سازی می کنیم.
```bash
<q-card-section>
  <q-toolbar class="bg-primary rounded-borders">
    <q-toolbar-title>
      <q-btn flat round dense icon="search" />
      Choose your location for finding posts
    </q-toolbar-title>
  </q-toolbar>
</q-card-section>
```
###### بخش بعد برای نمایش نقشه و انتخاب کاربر از یک skeleton و btn استفاده می کنیم تا فضای مورد نظر خود را نمایش دهیم که در آینده وقتی نقشه را فعال کردیم بتواند جایگزین آن شود.
```bash
<q-card-section class="q-pa-lg">
  <q-skeleton height="200px" />
  <q-btn class="bg-primary full-width">Search</q-btn>
</q-card-section>
```
###### حال نوبت آن رسیدن که چهار پست را بسازیم و جای داده های آن از skeleton استفاده کنیم.
```bash
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
```
###### دقت کنید برای اینکه نقشه ما در حالت تمام صفحه اجرا شود، نیاز به یک dialog داریم. از همین رو آن را بعد از q-page می نویسیم.
```bash
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
```
###### حال کل صفحه ما آماده است جهت نبودن داده های خود که در بخش بعدی برای جایگزینی  آن اقدام می کنیم.

