# آموزش Build های مختلف و نحوه گرفتن آنها


###### در vue زمانی که شما در حال توسعه و نوشتن کد برای  نرم افزار خود هستید. به این حالت dev یا در حال توسعه می گویند، اما زمانی می رسد که رسما می خواهید آن را منتشر کنید که به آن build می گویند. حال ما می خواهیم انواع build ها را در quasar مورد ارزیابی قرار دهیم.

###### اگر خاطرتان باشد، ما برای اینکه با ترمینال کار کنیم از مجموعه دستورات اصطلاحا cli استفاده می کردیم، حال برای build کردن هم همین کار را می کنیم. اگر فراموشتان شده است، می توانید بار دیگر <a href="https://quasar.dev/quasar-cli-vite/commands-list#build">Quasar Build Command</a> را مطالعه کنید.

###### ما انواع build داریم که به نوبت به هر یک می پردازیم.

###### اولی مدل SPA یا Single-page application است که می توانید برای مطالعه <a href="https://quasar.dev/quasar-cli-vite/developing-spa/introduction">Quasar SPA Mode</a> را مطالعه کنید. برای تولید این مدل می توانید دستور زیر را بزنید.
```bash
quasar build -m spa
```
###### مدل دیگر SSR یا Server-Side Rendering است که می توانید برای مطالعه آن <a href="https://quasar.dev/quasar-cli-vite/developing-ssr/introduction">Quasar SSR Mode</a> را مطالعه کنید، برای تولید این مدل می توان از دستور زیر استفاده نمود.
```bash
quasar build -m ssr
```

###### مدل دیگری که می توان از آن برای build استفاده نمود، PWA است که مخفف progressive web app است، که برای مطالعه بیشتر می توانید <a href="https://quasar.dev/quasar-cli-vite/developing-pwa/introduction">Quasar PWA Mode</a> را مطالعه کنید. برای اینکه بخواهیم به مدل pwa عمل build را انجام دهیم باید دستور زیر را اجرا کنیم.
```bash
quasar build -m pwa
```

###### روش دیگر که می توان به آن اشاره نمود مدل BEX یا همان Browser Extension است که برای مطالعه بیشتر می توانید به <a href="https://quasar.dev/quasar-cli-vite/developing-browser-extensions/introduction">Quasar Browser Extension</a> رجوع کنید و اگر بخواهید از این مدل build استفاده نمایید، باید دستور زیر را بنویسید.
```bash
quasar build -m bex
```

###### روش دیگر برای گوشی های همراه است که برای آن باید از cordova استفاده نمود. از همین رو ابتدا آن را نصب می کنیم.
```bash
npm install -g cordova
```
###### حال برای اینکه بخواهید در مورد cordova بیشتر بدانید، می توانید <a href="https://quasar.dev/quasar-cli-vite/developing-cordova-apps/introduction">Quasar Cordova Mode</a> را مطالعه کنید، اما برای اینکه دستور build بدهیم می توانیم از دستور زیر استفاده کنیم، دقت کنید که اگر android باشد به صورت زیر است.
```bash
quasar build -m cordova -T android
```
###### و اگر ios باشد، دستور زیر را باید اجرا کنید.
```bash
quasar build -m cordova -T ios
```

###### روش دیگر خروجی گرفتن برای حالت سیستم عامل  ویندوز است و framework ی که آن را پوشش می دهد، electron است، از همین رو برای مطالعه بیشتر در این زمینه می توانید <a href="https://quasar.dev/quasar-cli-vite/developing-electron-apps/introduction">Quasar Electron Mode</a> را مطالعه نمایید و اگر بخواهید نرم افزار خود را با این حالت build کنید می توانید از دستور زیر استفاده نمایید.
```bash
quasar build -m electron
```





