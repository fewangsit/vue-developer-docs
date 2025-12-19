---
icon: vuejs
---

# Vue Code Structure

In the previous section, we covered the project structure. This section will focus on the code structure, specifically SFC, API services, types, DTOs, and more.

***

### 1. SFC - How to write clean Vue TypeScript Single File Components

When creating an SFC (.vue) file, you **must** use the `PascalCase` naming convention.

The code should be organized in the following way:

#### 1.1 The SFC Tags Arrangement

You should place the script tag at the top of the SFC, the template in the middle, and the style at the bottom.

So, your SFC file should look like this:

```vue
<script setup lang="ts">
/**
 * The Component Logic
 */
</script>

<template>
    <!-- the Component Template -->
</template>

<style scoped>
    /* The Component Style */
</style>
```

***

#### 1.2 The Script Code Arrangement

Group your code by type. Follow this structure:

* Import order:
  * **Start with named imports**, followed by default imports.
  * **Separate named imports and default imports with an empty line**.
  *   When the import statement spans multiple lines, **add a line break after the statement.**
* Define Props, Emits, Models, Options, Slots if any.
* Group Vue.js lifecycle hooks.

> The order matters: `onBeforeMount`, `onMounted`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmounted`, `onRenderTracked`, `onRenderTriggered`, `onErrorCaptured`.

* Group Vue Router hooks.
* Define the store, router, toast, and any other Vue plugin setup.
* Group `interface`, `type`, `constants`, `shallowRef`, `ref`, `reactive`, `computed`, `inject`, and methods together. Separate each group with an empty line.
* Define watchers.
* `defineExpose` at the most bottom.

#### 1.3 Example

```vue
<script setup lang="ts">
import {
  Ref,
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue';

import { useStore, createStore } from 'vuex';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { ApprovalDto } from '@/dto/approval.dto.ts';
import { Menus } from '@/types/breadcrumb';
import type { User } from '@/types/user'
import type { AxiosResponse } from 'axios'

import Button from 'primevue/button';
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import HistoryButtons from '@/components/modules/History/HistoryButtons.vue';
import AssetsService from '@/services/assets.service';
import SettingsService from '@/services/settings.service';
import useToast from '@/utils/toast.util';

/**
 * Defining props, emit, and model
 */
const props = defineProps<{
  propsName: string;
}>();

const emit = defineEmits<{
  updateKey: [key: string];
}>();

const visible = defineModel<boolean>('visible', { required: true });

/**
 * Grouping Vue.JS Lifecycle hooks
 */
onMounted(() => console.log('Component mounted'));
onUnmounted(() => console.log('Component unmounted'));

/**
 * Grouping Vue Router hook
 */
onBeforeRouteLeave(() => console.log('Route will be leave'));
// etc.

/**
 * Define the store, router, toast, and any other Vue plugin setup.
 */
const store = useStore();
const router = useRoute();
const toast = useToast();

/**
 * Defining interfaces, types, and constant variables
 */
type ColumnFields =
  | 'assetName'
  | 'reportedBy'
  | 'staff'
  | 'assetGroup';

const COLUMNS: TableColumn[] = [
  {
    field: 'pipeline.accountManager.fullName',
    header: 'Account Manager',
    sortable: true,
    bodyClass: 'max-w-[300px]',
  },
]

/**
 * Defining inject, ref, reactive, computed, provide, and method. Separated by an empty line.
 */
const injectedValue = inject(ExampleKey, defaultExampleValue);
  
const componentName = shallowRef<string>('Component Name');
const componentState = shallowRef<boolean>(false);
const componentVariable = shallowRef<string>('Example Component');

const formatedComponentName = computed<string>(() =>
  componentName.value.toLocaleUpperCase()
);

// Grouping Provide statement.
provide('provideKey', dataToProvide);
provide('anotherProvideKey', anotherDataToProvide);

const componentMethod = (): void => {
  componentName.value = 'Example Component Edited';
};

watch(formatedComponentName, (newName: string) => {
  console.log(`New name: ${newName}`);
});

defineExpose({
  componentVariable,
  formatedComponentName,
  componentMethod,
});
</script>

<template>
  <Button @click="componentMethod">Click</Button>
</template>
```
