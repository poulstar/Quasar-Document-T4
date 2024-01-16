# آموزش استفاده از Quasar Responsive


###### برای اینکه بخواهیم از قواعد responsive استفاده کنیم. بهتر است ابتدا <a href="https://quasar.dev/vue-components/responsive/">Quasar Responsive</a> و <a href="https://quasar.dev/style/visibility">CSS Visibility</a> را مطالعه کرده باشیم. دقت کنید که شما می توانید با استفاده از این الگو ها نرم افزاری responsive تر داشته باشید که بر روی قالب دستگاه ها به خوبی اجرا شود. اما یکی از راحت ترین ابزار ها استفاده از کلاس lt یا gt است که به منظور اگر بزرگ تر از این بود اجرا کن و برعکس اگر کوچک تر از این بود اجرا کن. حال ما چند نمونه از این موارد را در بخش های از نرم افزار اجرا نموده ایم که می توان به آن اشاره کرد. ابتدا به صفحه DashboardLayout رفته ایم و logo نرم افزار را در حالت گوشی مخفی می کنیم.
```bash
<q-toolbar-title>
  <q-avatar class="gt-xs">
    <img src="../../../public/images/logo.png" />
  </q-avatar>
  Menu
</q-toolbar-title>
```
###### یا در نمونه دیگر در صفحه PostDetailPage دکمه بازگشت به عقب را در حالت گوشی بر می داریم.
```bash
<q-btn class="bg-primary text-white gt-xs" @click="$router.back()">
  &leftarrow; Go Back
</q-btn>
```
###### یا در مثال دیگر در صفحه IndexPage وقتی صفحه کمتر از 600 پیکسل است، نمایش آن را از بین می بریم.
```bash
<div class="q-pa-sm gt-xs">
  <q-carousel
    v-model="slide"
    control-color="amber"
    navigation
    padding
    arrows
    height="300px"
    class="rounded-borders bg-transparent"
  >
    <q-carousel-slide
      v-for="(item, index) in top_posts"
      :key="index"
      :name="index + 1"
      class="column no-wrap"
    >
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <div class="rounded-borders col-6 full-height">
          <MapView
            class="full-width full-height"
            :latitude="item.latitude"
            :longitude="item.longitude"
          >
            <template v-slot:username>
              <div>
                {{ item.username }}
              </div>
            </template>
            <template v-slot:email>
              <div>
                {{ item.email }}
              </div>
            </template>
          </MapView>
        </div>
        <div class="rounded-borders col-6 full-height">
          <router-link
            :to="{
              name: 'postDetail',
              params: { id: item.id, name: item.title },
            }"
          >
            <div class="full-width full-height relative-position">
              <q-img
                :src="item.image"
                class="full-width full-height detail"
              />
              <div class="cover"></div>
              <div class="overlay">
                <p class="overlay-title">{{ item.title }}</p>
                <p class="overlay-owner">{{ item.username }}</p>
                <p class="overlay-text">
                  {{ item.description.substring(0, 100) }} ...
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</div>
```
###### یا به عنوان مثال در صفحه MyPostPage برای جدول آن دو مدل نمایش لحاظ می کنیم، یک جدول که در بالای 600 پیکسل به نمایش در می آید و یکی که در کمتر از 600 پیکسل.
###### بالای 600 پیکسل
```bash
<q-table
  class="q-mb-xl gt-xs"
  :grid="$q.screen.xs"
  title="My Posts"
  :rows="rows"
  :columns="columns"
  row-key="name"
  :filter="filter"
  :rows-per-page-options="[pagination.rowsPerPage]"
  v-model:pagination="pagination"
  @request="onRequest"
>
  <template v-slot:top-right>
    <q-input
      class="bg-white gt-xs"
      borderless
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-btn
      label="Create New Post"
      color="light-blue-8"
      class="q-ml-md"
      @click="createPost()"
    />
  </template>
  <template v-slot:header="props">
    <q-tr :props="props">
      <q-th v-for="col in props.cols" :key="col.name" :props="props">
        {{ col.label }}
      </q-th>
      <q-th auto-width> Tools </q-th>
    </q-tr>
  </template>
  <template v-slot:body="props">
    <q-tr :props="props">
      <q-td v-for="col in props.cols" :key="col.name" :props="props">
        <router-link
          :to="{
            name: 'postDetail',
            params: { id: props.row.id, name: props.row.title },
          }"
          style="color: inherit; text-decoration: none"
        >
          {{ col.value }}
        </router-link>
      </q-td>
      <q-td auto-width>
        <q-btn
          class="q-ma-sm"
          size="md"
          color="warning"
          dense
          icon="update"
          @click="updatePost(props.row)"
        />
        <q-btn
          class="q-ma-sm"
          size="md"
          color="red"
          dense
          icon="delete"
          @click="deletePost(props.row)"
        />
      </q-td>
    </q-tr>
  </template>
</q-table>
```
###### زیر 600 پیکسل
```bash
<q-table
  class="bg-grey q-mb-xl lt-sm"
  :grid="$q.screen.xs"
  title="My Posts"
  :rows="rows"
  :columns="columns"
  row-key="name"
  :filter="filter"
  :rows-per-page-options="[pagination.rowsPerPage]"
  v-model:pagination="pagination"
  @request="onRequest"
>
  <template v-slot:top-right>
    <q-input
      class="bg-white gt-xs"
      borderless
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-btn
      label="Create New Post"
      color="light-blue-8"
      class="q-ml-md"
      @click="createPost()"
    />
  </template>
  <template v-slot:header="props">
    <q-tr :props="props">
      <q-th v-for="col in props.cols" :key="col.name" :props="props">
        {{ col.label }}
      </q-th>
    </q-tr>
  </template>
  <template v-slot:body="props">
    <q-tr :props="props">
      <q-td v-for="col in props.cols" :key="col.name" :props="props">
        <router-link
          :to="{
            name: 'postDetail',
            params: { id: props.row.id, name: props.row.title },
          }"
          style="color: inherit; text-decoration: none"
        >
          {{ col.value }}
        </router-link>
      </q-td>
    </q-tr>
  </template>
</q-table>
```
###### این موارد نمونه هایی از ایجاد فضایی جهت responsive شدن نرم افزار ماست، شما می توانید به موارد بیشتری بپردازید. مانند استفاده از q-responsive و کار با کلاس های col.


