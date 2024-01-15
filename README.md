# پیاده سازی لایک کردن و بروز رسانی شدن پست ها


###### برای اینکه تابع لایک کردن هر پست را بسازیم، ابتدا باید تابع درخواست دهنده به سرور را در مدل Post بسازیم و مطابق الگو سرور درخواست را ارسال کنیم. دقت کنید که این مکانیزم بدین صورت کار می کند، اگر تاکنون لایک نکرده باشید، یکی به لایک پست اضافه می شود و اگر لایک کرده باشید، از لایک آن کم می شود.
```bash
static async likePost(id: number) {
  const response = await api.get<FetchResponse<Post>>(`api/posts/${id}/like`);
  if (response.status == 200) {
    return response;
  }
  throw Error('Deleted Failed');
}
```
###### گام بعدی نوبت آن است که ما تابعی که به محض صدا شدن آن، شناسه پست را به تابع likePost بدهیم و بعد لایک، پست های ما بروز شوند.
```bash
const likePost = (id:number) => {
  Post.likePost(id).then((response) => {
    if (response.status == 200) {
      refresh();
    }
  });
};
```

###### تابع likePost را می سازیم و شناسه را وقتی دریافت کردیم، دستور می دهیم تابع likePost در مدل Post اجرا شود. بعد اینکه جواب بازگشت، مجدد پست ها را بروز می کنیم تا پست ها که بر اساس لایک مرتب می شوند، مرتب شود و پستی که لایک کرده ایم بالا تر بیاید.
###### حال نوبت آن است که export خود را ویرایش کنیم.
```bash
export { posts, refresh, pagination, top_posts, likePost };
```

###### بعد از این که کار در component تمام شد، به سراغ IndexPage می رویم و شروع به ویرایش می کنیم. برای شروع ابتدا import های IndexComponent را ویرایش کنیم.
```bash
import {
  posts,
  refresh,
  pagination,
  top_posts,
  likePost
} from 'components/ts/IndexComponent';
```
###### مرحله بعدی باید تابع like را بروز کنیم.
```bash
const like = (id: number) => {
  likePost(id);
};
```
###### تابع likePost را که import کرده بودیم، در تابع like می نویسیم و id هر پست که موقع کلیک شدن دریافت می کنیم به تابع می دهیم.

###### حال فرآیند like کردن ما آماده است و می توانیم آن را استفاده کنیم.



