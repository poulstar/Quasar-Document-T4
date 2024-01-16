# آموزش ارسال پارامتر بر روی route و دریافت آن در صفحه جدید


###### برای اینکه بتوانیم پارامتری  را روی route ارسال کنیم ابتدا وارد فایل routes می شویم و در بخش dashboard مسیر جدیدی را به وجود می آوریم.
```bash
{
  path: 'postDetail/:id/:name?',
  name: 'postDetail',
  component: () => import('src/pages/dashboard/PostDetailPage.vue'),
},
```
###### بر روی path با قرار دادن : بر هر واژه مانند id و name آن ها را متغیر معرفی کرده ایم که به عنوان پارامتر های route ما شناخته می شوند و name را می بینید که ? سوال دارد که به این منظور است ، می شود مقدار name را پر نکرد. حال نوبت آن است که

###### مرحله بعدی به سراغ ساخت فایل PostDetailPage از نوع vue می رویم. در داخل پوشه pages، پوشه dashboard مکانی است که فایل را داخل آن می سازیم.

###### برای بخش template ان به صورت موقت قطعه کد زیر را می نویسیم.
```bash
<template>
  <div>

  </div>
</template>
```
###### برای بخش script هم به صورت زیر عمل می کنیم.
```bash
<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

console.log(route.params.id);

</script>
```
###### ابتدا useRoute را از کتابخانه vue-router برای خود import می کنیم و یکبار تابع useRoute را اجرا می کنیم و در داخل متغیری به نام route نگه می داریم. حال از طریق route می توانیم به param های یک path دسترسی داشته باشیم و از آن استفاده کنیم. حال نوبت آن رسیده تا صفحاتی که با پست در گیر است را ویرایش کنیم و route را روی آنها اجرا کنیم تا به محض کلیک شدن بر روی آنها، به صفحه جزئیات برود.

###### ابتدا وارد IndexPage می شویم. سه پست برتر و پست هایی که به صورت صفحه بندی نمایش می دهد را قابلیت لینک شدن می کنیم.
###### برای سه پست برتر به صورت زیر می نویسیم.
```bash
<router-link
  :to="{
    name: 'postDetail',
    params: { id: item.id, name: item.title },
  }"
>

</router-link>
```
###### هر پستی که قرار است به عنوان پست برتر به نمایش در آید، کل محتوا آن را تبدیل به لینک می کنیم.

###### برای تمام پست ها هم به صورت زیر عمل می کنیم.
```bash
<router-link
  :to="{
    name: 'postDetail',
    params: { id: post.id, name: post.title },
  }"
>

</router-link>
```
###### دقت کنید که همه داده های پست را لینک نمی کنیم، فقط تصویر و عنوان را لینک می کنیم. کد فوق برای لینک کردن تصویر است. حال نوبت عنوان هر پست است. به صورت زیر می نویسیم.
```bash
<router-link
  :to="{
    name: 'postDetail',
    params: { id: post.id, name: post.title },
  }"
  style="color: inherit; text-decoration: none"
>

</router-link>
```
###### در اینجا برای اینکه متن ما به دلیل لینک بودن زیرش خط کشیده نشود و رنگش عوض نشود ، به آن style دادیم.
###### همین کار را در داده های لیست MyPostPage می کنیم. روی هر کدام کلیک کرد، بتواند وارد صفحه جزئیات آن بشود.
```bash
<router-link
  :to="{
    name: 'postDetail',
    params: { id: props.row.id, name: props.row.title },
  }"
  style="color: inherit; text-decoration: none"
>
  {{ col.value }}
</router-link>
```
###### به دلیل یکسان بودن لیست های AllPostPage با MyPostPage، همین کار را بر روی آن هم انجام می دهیم.
```bash
<router-link
  :to="{
    name: 'postDetail',
    params: { id: props.row.id, name: props.row.title },
  }"
  style="color: inherit; text-decoration: none"
>
  {{ col.value }}
</router-link>
```
