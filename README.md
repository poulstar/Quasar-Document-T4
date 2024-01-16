# پیاده سازی breadcrumb بر روی جزئیات یک پست و پیاده سازی بازگشت به عقب بر روی جزئیات یک صفحه


###### برای اینکه بخواهیم در صفحه جزئیات خود breadcrumb استفاده کنیم. ابتدا باید <a href="https://quasar.dev/vue-components/breadcrumbs/">Quasar Breadcrumb</a> را مطالعه کنیم. به همین منظور ما یک الگو از آن را در جزئیات هر پست پیاده سازی می کنیم. برای این کار ابتدا وارد PostDetailPage می شویم و بالای q-item خود، یک q-item دیگر برای breadcrumb به وجود می آوریم و ما بین breadcrumb و اطلاعات کاربر ما، از یک q-separator استفاده می کنیم.
```bash
<q-item>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        style="cursor: pointer"
        icon="navigation"
        label="back"
        @click="$router.back()"
      />
      <q-breadcrumbs-el :label="postData.post_title" icon="widgets" />
    </q-breadcrumbs>
  </div>
</q-item>
<q-separator />
```
###### بر روی q-breadcrumbs-el یک قابلیت کلیک شدن می گذاریم که به محض کلیک شدن، یک مرحله به عقب برود و این کار را برای ما متغیر router انجام می دهد و تابع back ما را به عقب باز می گرداند.

###### حال با این قابلیت می توانیم دکمه ای تعبیه کنیم که ما را به عقب ببرد، می توانیم این دکمه را در بخش مشخصات کاربر جای گذاری کنیم.
```bash
<q-btn class="bg-primary text-white" @click="$router.back()">
  &leftarrow; Go Back
</q-btn>
```
###### برای درک بهتر مبحث routing می توانید <a href="https://quasar.dev/layout/routing-with-layouts-and-pages/">Quasar Routing with Layouts and Pages</a> و <a href="https://quasar.dev/quasar-cli-vite/routing">Quasar App Routing</a> و همچنین مستند خود Vue  که بحث <a href="https://router.vuejs.org/">Vue Router</a> است را مطالعه کنید.




