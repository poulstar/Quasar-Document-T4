# محدود کردن لیست داشبورد بر اساس نقش کاربر


###### برای اینکه بخواهیم از نوع کاربر، خروجی ای که باید ببیند را استخراج کنیم، باید به نقش آن توجه نماییم. از همین رو در DashboardLayout با قرار داد v-if می آییم دو نوع لیست می سازیم که یکی از آنها به نمایش در آید.
```bash
<q-list separator v-if="profileTemp.role == 'admin'">
  <q-item
    v-for="(item, index) in accessMenu"
    :key="index"
    :to="{ name: item.route }"
    v-ripple
    clickable
  >
    <q-avatar><q-icon :name="item.icon"></q-icon></q-avatar>
    <q-item-section>
      <q-item-label class="q-ml-sm"> {{ item.name }} </q-item-label>
    </q-item-section>
  </q-item>
</q-list>
<q-list separator v-else>
  <q-item
    v-for="(item, index) in accessMenu.slice(0, 3)"
    :key="index"
    :to="{ name: item.route }"
    v-ripple
    clickable
  >
    <q-avatar><q-icon :name="item.icon"></q-icon></q-avatar>
    <q-item-section>
      <q-item-label class="q-ml-sm"> {{ item.name }} </q-item-label>
    </q-item-section>
  </q-item>
</q-list>
```
###### در لیست اول اگر کاربر ما admin باشد، کل accessMenu اجرا می شود اما اگر کاربر ما admin نبود q-list بعدی اجرا می شود که روی لیست آن slice اجرا می شود و سه پارامتر اول تابع برای خروجی می رود. دقت کنید که این روش برای آموزش v-if بود، ولی اگر بخواهید اصولی این کار را انجام دهید. بهتر است تابع accessMenu را در MenuComponent مدیریت کنید تا متناسب با نقشی که به آن می دهید، خروجی متفاوت ارائه کند.








