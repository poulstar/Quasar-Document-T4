# آموزش ساخت notification و نمایش آن در مکان دلخواه


###### برای اینکه بخواهیم notification را در quasar فعال کنیم، ابتدا باید مطالعه ای بر روی <a href="https://quasar.dev/quasar-plugins/notify/">Quasar Notify</a> بی اندازیم. بعد شروع کنیم مرحله به مرحله پیش رفتن تا به نتیجه مطلوب خود برسیم.

###### ابتدا باید plugin مربوطه خود را یعنی Notify را در quasar.config.js وارد کنیم. پس وارد فایل شده و به بخش framework می رویم و در لیست plugins مقدار Notify را اضافه می کنیم.
```bash
plugins: [
  'LoadingBar',
  'Notify',
]
```
###### حال همه چی آماده است که ما بخواهیم از notification استفاده کنیم. بدین منظور وارد صفحه LoginPage می شویم و بر روی آن این مورد را پیاده سازی می کنیم.

###### در بخش script آن، تابع login قبلا اگر موفق بود بلافاصله ما را به صفحه index در داشبورد منتقل می کرد و اگر با خطا مواجه بود در console برای ما با log خطا مورد نظر را نمایش می داد. حال برای به کار گیری notification ابتدا import مورد نظر را وارد می کنیم.
```bash
import { useQuasar } from 'quasar';
```
###### بعد اینکه import خود را نوشتیم، تابع useQuasar را اجرا کرده و در یک متغیر نگه می داریم، تا در موقع لزوم به آن رجوع کنیم.
```bash
const $q = useQuasar();
```
###### حال وارد بخش موفقیت تابع login می شویم و قطعه کد زیر را می نویسیم.
```bash
$q.notify({
  message: 'Login Accepted.',
  color: 'positive',
  position: 'bottom-right',
});
setTimeout(() => {
  router.replace({ name: 'index' });
}, 1000);
```
###### همانطور که می بینید، متغیر q را استفاده کردیم و در آن notify را صدا زدیم. در داخل آن پیام خود را در message و رنگ notification را positive و جایگاه آن را در position برابر با bottom-right گذاشتیم که یعنی در پایین صفحه سمت را به نمایش در آید. به همین راحتی می توان یک notification اجرا نمود. بعد آن هم برای زیبایی کار برای انتقال به صفحه index داشبورد یک تاخیر 1 ثانیه ای ایجاد نمودیم.

###### همین کار را در بخش خطا تابع login انجام می دهیم، با این تفاوت که پیام را بر اساس خطایی که از سمت سرور آمده پر می کنیم.
```bash
$q.notify({
  message: error.response.data.message,
  color: 'negative',
  position: 'bottom-right',
});
```
###### حال می توان این قابلیت را در تمام بخش های نرم افزار استفاده نمود و برای کار خود اگر نیاز بود، یک notification تولید کنیم.


