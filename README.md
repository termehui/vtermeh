# vTermeh

[Termeh](https://github.com/termehui/termeh) based component for vue 3.

## Installation

You must import and register components manually.

### CDN

This package published as `vTermeh` module in umd.

```html
<script src="https://unpkg.com/@termehui/vtermeh"></script>
```

### NPM

```bash
npm i @termehui/vtermeh
```

## Choose

Choose component. You can set default slot to change default item template.

```vue
<template>
  <vChoose :items="items" v-model="item">
    <template #default="{ item, failed, disabled }">
      {{ item == "first" ? "1th" : item == "second" ? "2th" : item }}
    </template>
  </vChoose>
</template>
<script lang="ts" setup>
import { vChoose } from "@termehui/vtermeh";
const items = ref(["first", "second", "third"]);
const item = ref("");
</script>

<style lang="scss">
@import "@termehui/vtermeh/choose.scss";
@import "@termehui/vtermeh/dist/choose.scss"; // old node version
</style>
```

| Property   | Type      | Description                                             |
| :--------- | :-------- | :------------------------------------------------------ |
| items      | `Array`   | List of items                                           |
| disabled   | `Boolean` | disabled state                                          |
| failed     | `Boolean` | failed state (error)                                    |
| identifier | `String`  | id field of item, empty identifier for non-object items |

Choose component have following classes:

- **is-stacked**: set choose direction as vertical.
- **is-{device}-stacked**: set choose direction as vertical for device.
- **is-{size}**: set choose size to size.
- **is-{color}**: set choose color to registered iterable colors.

| variable | description                                           | default |
| :------- | :---------------------------------------------------- | :------ |
| sizes    | list of non-iterable sizes to include in choose sizes | `()`    |

## Columns

Responsive columns generator.

**Note:** child items must have `column-item` class and `data-priority` attribute.

**Note:** this component does not support dynamic fields.

**Note:** you can use `update` exposed function to manually update layout.

```vue
<template>
  <vColumns>
    <div
      v-for="(v, i) in items"
      :key="i"
      class="column-item"
      :data-priority="i + 1"
    >
      {{ v }}
    </div>

    <div class="column-item" data-priority="0">AA</div>
  </vColumns>
</template>
<script lang="ts" setup>
import { vColumns } from "@termehui/vtermeh";
import { ref } from "vue";

const items = ref(["hi", "a", "b", "c"]);
</script>

<style lang="scss">
@import "@termehui/vtermeh/columns.scss";
@import "@termehui/vtermeh/dist/columns.scss"; // old node version
</style>
```

| Property | Type     | Description                            | Default                            |
| :------- | :------- | :------------------------------------- | ---------------------------------- |
| mobile   | `number` | column count on mobile device          | 1                                  |
| tablet   | `number` | column count on tablet device          | 2                                  |
| desktop  | `number` | column count on desktop device         | 3                                  |
| wide     | `number` | column count on wide device and higher | 4                                  |
| mobileQ  | `string` | query string for mobile                | `"screen and (max-width: 768px)"`  |
| desktopQ | `string` | query string for desktop               | `"screen and (min-width: 1024px)"` |
| wideQ    | `string` | query string for wide                  | `"screen and (min-width: 1408px)"` |

Columns component have following classes:

- **is-gapless**: remove gap between columns.
- **is-{gap}-gaped**: set options gap to registered iterable gaps.

| variable | description                                          | default |
| :------- | :--------------------------------------------------- | :------ |
| gaps     | list of non-iterable gaps to include in columns gaps | `()`    |

## Dropdown

Dropdown component.

```vue
<template>
  <vDropdown :items="items" v-model="item" v-model:searchValue="search">
    <template #icon="{ isEmpty, isOpen, isFiltered, failed, disabled }">
      Icon
    </template>
    <template #selected="{ item, failed, disabled }"> Single item </template>
    <template #selected="{ item, remove, failed, disabled }">
      Multi Select items
    </template>
    <template #action="{ isEmpty, isOpen, isFiltered, failed, disabled }">
      action
    </template>
    <template #menu="{ isEmpty, isOpen, isFiltered, failed, disabled }">
      <div class="item" v-if="isFiltered">Add new</div>
    </template>
    <template #default="{ id, selected, active, failed, disabled, item }">
      Menu Item
    </template>
  </vDropdown>
</template>
<script lang="ts" setup>
import { vDropdown } from "@termehui/vtermeh";
const items = ref([{...}, {...}]);
const item = ref();
</script>

<style lang="scss">
@import "@termehui/vtermeh/dropdown.scss";
@import "@termehui/vtermeh/dist/dropdown.scss"; // old node version
</style>
```

**Note:** if you return true from key handler function, default dropdown keyboard handler not fired!

**Note:** you can use `close` exposed function to manually close dropdown.

| Property    | Type                                               | default     | Description                                             |
| :---------- | :------------------------------------------------- | :---------- | ------------------------------------------------------- |
| search      | `Boolean`                                          | `false`     | allow search                                            |
| delete      | `Boolean`                                          | `true`      | allow delete item with `ctrl+backspace`                 |
| autoClose   | `Boolean`                                          | `true`      | close dropdown after select on single mode              |
| multiple    | `Boolean`                                          | `false`     | allow multiple selection                                |
| disabled    | `Boolean`                                          | `false`     | disabled state                                          |
| failed      | `Boolean`                                          | `false`     | failed state (error)                                    |
| placeholder | `String`                                           | `'Select'`  | placeholder text                                        |
| identifier  | `String`                                           | `''`        | id field of item, empty identifier for non-object items |
| items       | `Array`                                            | `[]`        | items list                                              |
| searchValue | `String`                                           | `''`        | search model value                                      |
| modelValue  | `any`                                              | `undefined` | model value                                             |
| keyHandler  | `(e: KeyboardEvent, selected: unknown) => boolean` | `undefined` | custom keyboard handler                                 |

## Field

Field wrapper component (based on termeh form field).

```vue
<template>
  <vField
    :errors="errors"
    :messages="messages"
    label="Enter name"
    help="enter your full name"
    default="name is invalid"
    :required="true"
    :fit="true"
  >
    <template #default="{ id }">
      <div class="input">
        <input :id="id" v-model="name" />
      </div>
    </template>
  </vField>
</template>
<script lang="ts" setup>
import { vField } from "@termehui/vtermeh";
</script>
<style lang="scss">
@import "@termehui/vtermeh/field.scss";
@import "@termehui/vtermeh/dist/field.scss"; // old node version
</style>
```

| Property | Type     | Description                                                 |                                          |
| :------- | :------- | :---------------------------------------------------------- | ---------------------------------------- |
| errors   | `Array   | Object`                                                     | list of error keys or error with message |
| messages | `Object` | list of error messages (can override default error message) |                                          |
| label    | `string` | label text                                                  |                                          |
| help     | `string` | help text                                                   |                                          |
| default  | `string` | default error message                                       |                                          |
| required | `bool`   | mark field as required                                      |                                          |
| fit      | `bool`   | add `is-marginless` to field                                |                                          |

## FileUpload

File upload with preview. You can get selected files from `@select` event.

**Note:** You can call `clear` inner method to clear input (e.g. `refVar.value.clear()`);

```vue
<template>
  <vFileUpload
    :multiple="true"
    accept="image-*"
    :icons="{ '.*/x-zip.*': 'zip.png', '*': 'default.png' }"
    @select="log_file_list"
  >
    <template #thumbnails>
      <img src="default thumb.jpg" />
    </template>
    <template v-slot="{ count }">
      <div v-if="count == 0">Please select image</div>
      <div v-else>{{ count }} Image</div>
    </template>
  </vFileUpload>
</template>

<script lang="ts" setup>
import { vFileUpload } from "@termehui/vtermeh";
const page = ref(0);
</script>

<style lang="scss">
@import "@termehui/vtermeh/file-upload.scss";
@import "@termehui/vtermeh/dist/file-upload.scss"; // old node version
</style>
```

| Property | Type      | Description                                                                    |
| :------- | :-------- | :----------------------------------------------------------------------------- |
| multiple | `boolean` | allow select multiple file                                                     |
| accept   | `string`  | accept pattern                                                                 |
| icons    | `object`  | key/value object of file type pattern (regex or \* for default) with icon path |

File upload component use default termeh `.input` for styling.

| variable | description           | default |
| :------- | :-------------------- | :------ |
| width    | thumbnail icon width  | `4em`   |
| height   | thumbnail icon height | `4em`   |
| opacity  | hover state opacity   | `0.1`   |

You must use `"file-upload"` as component name for overriding variable in termeh.

## Icon Toggle

Icon toggle component. you must set `icon` and `active` slot to set different state icons.

```vue
<template>
  <vIconToggle v-model="selected" class="is-large is-primary">
    <template #icon>
      <Star />
    </template>
    <template #active>
      <StarFill />
    </template>
  </vIconToggle>
</template>
<script lang="ts" setup>
import { vIconToggle } from "@termehui/vtermeh";
const selected = ref(false);
</script>

<style lang="scss">
@import "@termehui/vtermeh/icon-toggle.scss";
@import "@termehui/vtermeh/dist/icon-toggle.scss"; // old node version
</style>
```

Icon toggle follow icon styling.

## Jalaali Date Picker

Create jalaali date picker input.

**Caution:** you must install `vue3-persian-datetime-picker` and register component as `v3-datetime-picker` to make date picker work!

**Note:** you must set picker color using `color` option on register time or color property.

```vue
<template>
  <vJalaaliPicker v-model="jalaali" type="datetime" />
  <br />
  <vJalaaliPicker v-model="jalaali" :icon="true">
    <template #icon="{ show }">
      <div class="button is-primary" @click="show()">Select</div>
    </template>
  </vJalaaliPicker>
  <br />
  <vJalaaliPicker v-model="jalaalies" :range="true" clear="CLS" />
  <br />
  <vJalaaliPicker
    v-model="jalaalies"
    :multiple="true"
    :icon="true"
    clear="CLEAR"
  />
</template>
<script lang="ts" setup>
import { vJalaaliPicker } from "@termehui/vtermeh";
const jalaali = ref();
const jalaalies = ref([]);
</script>

<style lang="scss">
@import "@termehui/vtermeh/jalaali-picker.scss";
@import "@termehui/vtermeh/dist/jalaali-picker.scss"; // old node version
</style>
```

| Property     | Type      | Description                                                    |
| :----------- | :-------- | :------------------------------------------------------------- |
| rtl          | `Boolean` | make input layout rtl                                          |
| range        | `Boolean` | allow select date range                                        |
| multiple     | `Boolean` | allow select multiple date                                     |
| icon         | `Boolean` | make action date picker (no input field) date                  |
| inputMode    | `String`  | input mode, default to `numeric`                               |
| colorClass   | `String`  | set elements color (icon, input, button), default to `primary` |
| placeholder  | `String`  | input placeholder text                                         |
| clear        | `String`  | set clear button title and enable clearing from dialog         |
| closeOnClear | `Boolean` | close date picker by clear button                              |
| editable     | `Boolean` | allow edit , default `false`                                   |

**Note:** this component accept all `vue3-persian-datetime-picker` properties.

Jalaali picker component have following slots:

```vue
<template>
  <vJalaaliPicker>
    <!-- only in non-icon mode for add extra content to input -->
    <template #input="{ show, clear }"></template>
    <!-- input calendar icon in non-icon and action icon in icon mode -->
    <template #input="{ show }"></template>
  </vJalaaliPicker>
</template>
```

## Options

options component. You can set default slot to change default item template.

```vue
<template>
  <vOptions :items="items" v-model="item">
    <template #default="{ item, disabled }">
      {{ item == "first" ? "1th" : item == "second" ? "2th" : item }}
    </template>
  </vOptions>
</template>
<script lang="ts" setup>
import { vOptions } from "@termehui/vtermeh";
const items = ref(["first", "second", "third"]);
const item = ref("");
</script>

<style lang="scss">
@import "@termehui/vtermeh/options.scss";
@import "@termehui/vtermeh/dist/options.scss"; // old node version
</style>
```

| Property   | Type    | Description                                             |
| :--------- | :------ | :------------------------------------------------------ |
| items      | `Array` | List of items                                           |
| identifier | String  | id field of item, empty identifier for non-object items |
| disabled   | Boolean | disabled state                                          |
| multiple   | Boolean | allow multiple selection                                |

Options component have following classes:

- **is-gapless**: remove item gaps.
- **is-{gap}-gaped**: set options gap to registered iterable gaps.
- **is-{color}**: set options color to registered iterable colors.

| variable | description                                         | default |
| :------- | :-------------------------------------------------- | :------ |
| gaps     | list of non-iterable gaps to include in option gaps | `()`    |

## Pagination

Pagination component. You can fill default slot for change template of empty pagination.

```vue
<template>
  <vPagination :count="5" :total="23" v-model="page"> No Records </vPagination>
</template>
<script lang="ts" setup>
import { vPagination } from "@termehui/vtermeh";
const page = ref(0);
</script>

<style lang="scss">
@import "@termehui/vtermeh/pagination.scss";
@import "@termehui/vtermeh/dist/pagination.scss"; // old node version
</style>
```

| Property | Type     | Description                  |
| :------- | :------- | :--------------------------- |
| count    | `number` | number of pagination buttons |
| total    | `number` | total page count             |

pagination component have following classes:

- **is-flat**: remove paginator border and paddings.
- **is-disabled**: disable pagination component.
- **is-rounded**: make page buttons corner round.
- **is-{color}**: set pagination color to registered iterable colors.

| variable | description                                                 | default |
| :------- | :---------------------------------------------------------- | :------ |
| colors   | list of non-iterable colors to include in pagination colors | `()`    |

## Pie

Pie chart component. You can fill default slot to set label content.

```vue
<template>
  <vPie :percent="75" class="is-primary">
    <span>Interaction percent</span>
  </vPie>
</template>
<script lang="ts" setup>
import { vPie } from "@termehui/vtermeh";
</script>

<style lang="scss">
@import "@termehui/vtermeh/pie.scss";
@import "@termehui/vtermeh/dist/pie.scss"; // old node version
</style>
```

| Property | Type     | Description        |
| :------- | :------- | :----------------- |
| percent  | `number` | chart fill percent |

pie component have following classes:

- **is-{color}**: set pie color to registered iterable colors.

| variable | description                                          | default |
| :------- | :--------------------------------------------------- | :------ |
| sizes    | list of pie sizes `("small" 10em, "medium" 20em)`    | `()`    |
| colors   | list of non-iterable colors to include in pie colors | `()`    |

## Simple Pagination

Simple pagination component. You can fill `default` slot for change template of empty pagination. pagination contains `prev-icon` and `next-icon` slots to change pagination icons.

```vue
<template>
  <vSimplePagination :total="23" v-model="page" next="Go Next" prev="Go Prev">
    <template #prev-icon>...</template>
    <template #next-icon>...</template>
    <template #default> No Records </template>
  </vSimplePagination>
</template>
<script lang="ts" setup>
import { vPagination } from "@termehui/vtermeh";
const page = ref(0);
</script>

<style lang="scss">
@import "@termehui/vtermeh/simple-pagination.scss";
@import "@termehui/vtermeh/dist/simple-pagination.scss"; // old node version
</style>
```

| Property | Type     | Description      |
| :------- | :------- | :--------------- |
| total    | `Number` | total page count |
| prev     | `String` | prev button text |
| next     | `String` | next button text |

pagination component have following classes:

- **is-disabled**: disable pagination component.
- **is-{color}**: set pagination color to registered iterable colors.

| variable | description                                                 | default |
| :------- | :---------------------------------------------------------- | :------ |
| colors   | list of non-iterable colors to include in pagination colors | `()`    |

## Tab

Tab component.

```vue
<template>
  <vTab class="is-large-padded is-primary" v-model:tab="tab" animation="slide">
    <template #tabs="{ style }">
      <div class="tab" :class="style('A')" @click="tab = 'A'">A</div>
      <div class="tab" :class="style('B')" @click="tab = 'B'">B</div>
      <div class="tab" :class="style('C')" @click="tab = 'C'">C</div>
    </template>
    <template #A>A Content</template>
    <template #B>B Content</template>
    <template #C>C Content</template>
  </vTab>
</template>
```

| Property  | Type     | Description                                                                               |
| :-------- | :------- | :---------------------------------------------------------------------------------------- |
| animation | `String` | tab animation. contains slide animation by default. _custom animation style must defined_ |
| tab       | `String` | active tab name                                                                           |

tab component have following events:

| Property | Description                                     |
| :------- | :---------------------------------------------- |
| changed  | called when tab changed and animation completed |

tab component have following classes:

- **is-centered**: center aligned tab content.
- **is-paddingless**: remove tab content padding.
- **is-{gap}-padded**: set tab content padding.
- **is-{color}**: set tab header color.

| variable | description                                          | default |
| :------- | :--------------------------------------------------- | :------ |
| gaps     | list of non-iterable gaps to include in tab gaps     | `()`    |
| colors   | list of non-iterable colors to include in tab colors | `()`    |

## Tile

Create optimized tile layout.

**Caution:** if your content size changed you must call `update()` method on tile component.

```vue
<template>
  <vTile ref="el" class="is-large-gaped" :horizontalOrder="false">
    <div class="tile is-2">...</div>
    <div class="tile">...</div>
    <div class="tile">...</div>
    <div class="tile">...</div>
    <div class="tile">...</div>
    <div class="tile">...</div>
    <div class="tile">...</div>
  </vTile>
</template>
```

| Property        | Type      | Description                                          |
| :-------------- | :-------- | :--------------------------------------------------- |
| rtl             | `Boolean` | generate rtl layout                                  |
| horizontalOrder | `Boolean` | lays out items to (mostly) maintain horizontal order |
| originTop       | `Boolean` | attach items to top                                  |

tile component have following classes:

- **is-{gap}-gaped**: set tile items gap to registered iterable gaps.
- **is-{column}**: set tile item width to column. e.g. `tile is-2`

| variable | description                                       | default |
| :------- | :------------------------------------------------ | :------ |
| columns  | tiles column count                                | `3`     |
| gaps     | list of non-iterable gaps to include in tile gaps | `()`    |

## Toggle

Toggle component. You can fill default slot to change label content.

```vue
<template>
  <vToggle :disabled="false" v-model="isEnabled">Reporting Service</vToggle>
</template>
<script lang="ts" setup>
import { vToggle } from "@termehui/vtermeh";
const isEnabled = ref(true);
</script>

<style lang="scss">
@import "@termehui/vtermeh/toggle.scss";
@import "@termehui/vtermeh/dist/toggle.scss"; // old node version
</style>
```

| Property | Type      | Description            |
| :------- | :-------- | :--------------------- |
| disabled | `boolean` | disable toggle control |

toggle component have following classes:

- **is-rounded**: make page buttons corner round.
- **is-{color}**: set toggle color to registered iterable colors.

| variable | description                                             | default |
| :------- | :------------------------------------------------------ | :------ |
| colors   | list of non-iterable colors to include in toggle colors | `()`    |

## Toman

Persian currency (تومان) component with icon.

```vue
<template>
  <vToman :value="1200000" class="is-primary" />
  <h6>
    <vToman :value="9310500" class="is-error" />
  </h6>
</template>
<script lang="ts" setup>
import { vToman } from "@termehui/vtermeh";
</script>

<style lang="scss">
@import "@termehui/vtermeh/toman.scss";
@import "@termehui/vtermeh/dist/toman.scss"; // old node version
</style>
```

| Property   | Type      | Description                                             |
| :--------- | :-------- | :------------------------------------------------------ |
| items      | `Array`   | List of items                                           |
| disabled   | `Boolean` | disabled state                                          |
| failed     | `Boolean` | failed state (error)                                    |
| identifier | `String`  | id field of item, empty identifier for non-object items |

Toman component have following classes:

- **is-{color}**: set toman color to registered iterable colors.

| variable | description                                           | default |
| :------- | :---------------------------------------------------- | :------ |
| sizes    | list of non-iterable sizes to include in choose sizes | `()`    |
