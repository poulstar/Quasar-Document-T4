# نمایش پست های دریافتی و اجرا Pagination بر روی پست ها موجود


###### برای اینکه pagination  را فعال کنیم؛ ابتدا باید برای کار خود وارد مدل Post شویم و کمی searchPost را ویرایش کنیم. به بخش return آن رفته مقدار زیر را می نویسیم.
```bash
page_data: {
  current_page: response.data.posts.current_page,
  last_page: response.data.posts.last_page,
},
```
###### در بخش script فایل SearchPage مقدار زیر جهت مدیریت pagination می نویسیم تا بتوانیم از آن استفاده کنیم و ساختار pagination را فعال کنیم.
```bash
const pagination = ref({
  current_page: 1,
  last_page: 4,
  per_page: 4,
});
```
###### حال تابع search خود را ویرایش می کنیم و pagination را روی آن اجرا می کنیم تا بتواند روی عمل جست و جو تاثیر بگذارد.
```bash
const search = () => {
  Post.searchPost(
    pagination.value.current_page,
    pagination.value.per_page,
    mapParameter.value.lat,
    mapParameter.value.long
  ).then((response) => {
    posts.value = response.posts;
    pagination.value.current_page = response.page_data.current_page;
    pagination.value.last_page = response.page_data.last_page;
  });
};
```
###### در بخش template نیز تگ مربوط به صفحه بندی را می نویسیم، این کار را در بخشی انجام می دهیم که پست ها به نمایش در می آید، چون در حالت skeleton نیاز به pagination نیست.
```bash
<div class="q-gutter-md q-pa-lg">
  <q-pagination
    class="d-flex justify-center"
    v-model="pagination.current_page"
    :max="pagination.last_page"
    direction-links
    push
    color="primary"
    active-design="push"
    active-color="orange"
    :max-pages="7"
    @update:model-value="search"
  />
</div>
```

###### باید دقت کنیم که تک pagination را بعد از تگی بنویسیم که v-for بر روی آن اجرا شده است.




