# اجرا loading در پروژه quasar


###### برای اینکه بخواهیم ساختار loading را فعال کنیم، ابتدا بهتر است نگاهی  به <a href="https://quasar.dev/quasar-plugins/loading">Quasar Loading Plugin</a> بی اندازیم. گام بعدی به سراغ فایل quasar.config.js می رویم و مقدار Loading را به plugins موجود در framework می نویسیم.
```bash
plugins: [
  'LoadingBar',
  'Notify',
  'Loading'
]
```

###### برای نمونه یک مورد بر روی پروژه اجرا می کنیم، در صورت تمایل می توانید بر روی باقی پروژه نیز اجرا کنید. وارد بخش script می شویم و import مورد نظر خود را انجام می دهیم.
```bash
import { useQuasar } from 'quasar';
```
###### در پروژه خود ابتدا یک بار تابع useQuasar را اجرا می کنیم و در متغیری نگه می داریم.
```bash
const $q = useQuasar();
```
###### حال وقتی تابع register شروع شد، دستور زیر را اجرا می کنیم تا loading ما فعال شود.
```bash
$q.loading.show();
```
###### بعد اینکه نتیجه با موفقیت یا شکست رو به رو شد، نیز دستور زیر را اجرا می کنیم تا loading ما نیز بسته شود.
```bash
$q.loading.hide();
```

###### این مثال ساده ای بود از loading و نحوه استفاده ساده آن که شما می توانید به مدل دلخواه خود از آن استفاده نمایید.
