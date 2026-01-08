icon: brackets-curly
---

These guidelines help maintain consistent, readable code across all projects. Following these standards makes collaboration easier and keeps our codebase maintainable for everyone on the team.

## 1. General Code Principles

### 1.1 Naming Conventions

#### File Naming

**Vue Components & Module Folders:** Use `PascalCase` **TypeScript Files:** Use `camelCase` for `.ts` files (types, DTOs, utils, etc.)

**Use full words, not abbreviations:**

```plaintext
✅ Good
MultiNameContainer.vue

❌ Avoid
MultiNC.vue
```

**Exception:** Well-known abbreviations (RFID, KPI, PBI) should be treated as single words:

```plaintext
✅ Good
PbiDialogForm.vue
tagRfid.dto.ts

❌ Avoid
PBIDialogForm.vue
tagRFID.dto.ts
```

#### Component Organization

Organize components hierarchically from general to specific. This makes finding and understanding components much easier as your app grows.

**Naming Pattern:**

```plaintext
[Module][Feature][Component][Subcomponent].vue
```

**Structure breakdown:**

* **Module**: Main feature area (e.g., "Borrow")
* **Feature**: Specific section (e.g., "History")
* **Component**: UI element type (e.g., "Page", "Table")
* **Subcomponent**: Specific functionality (e.g., "Filter", "Buttons")

**Example Structure:**

```plaintext
📁 Borrow/
  📁 BorrowHistory/
    📄 BorrowHistoryPage.vue        # Main page component
    📄 BorrowHistoryFilter.vue      # Search and filter controls
    📄 BorrowHistoryTable.vue       # Data table display
  📁 BorrowTransaction/
    📄 BorrowTransactionPage.vue    # Transaction overview page
    📄 BorrowTransactionForm.vue    # Create/edit transaction form
    📄 BorrowTransactionDetails.vue # Transaction detail view
  📁 Borrowed/
    📄 BorrowedList.vue             # List of borrowed items
    📄 BorrowedItemDetail.vue       # Individual item details
```

#### Variable Naming Conventions

To ensure readability, maintainability, and consistency across your codebase, follow these naming conventions:

1. **PascalCase**
   * **Use for:** Types, interfaces, and classes.
   * **Example:**
     * `UserProfile`
     * `ApiResponse`
     * `ProductItem`
2. **camelCase**
   * **Use for:** Variables, methods, and function names.
   * **Example:**
     * `userProfile`
     * `getUserInfo()`
     * `setUserDetails()`
     * `totalAmount`
3. **UPPERCASE\_SNAKE\_CASE** (for constants)
   * **Use for:** Constants or values that should remain unchanged throughout the program.
   * **Example:**
     * `MAX_USER_COUNT`
     * `API_URL`
4. **Descriptive Naming:**
   * **Use meaningful names** that clearly describe the variable's purpose.
   * Avoid vague names like `data`, `temp`, `obj`, and `stuff`. Instead, use names like `userProfile`, `productList`, or `orderDetails`.
5. **Boolean Variables:**
   * **Use** `is`, `has`, or `can` as prefixes for boolean variables to indicate true/false values.
   * **Example:**
     * `isLoggedIn`
     * `hasPermission`
     * `canSubmitForm`

### 1.2 Import and Export Conventions

#### Prefer Named Imports Over Default

Use named imports for clarity and tree-shaking benefits.

```typescript
// Good
import { computed, ref } from 'vue';

// Avoid (unless necessary for default exports)
import Vue from 'vue';
```

#### Use Absolute Paths with Aliases

Leverage Vite's path aliases (e.g., `@/components`) for imports longer than 2 levels.

```typescript
// Good
import UserCard from '@/components/UserCard.vue';

// Avoid (for deep paths)
import UserCard from '../../../components/UserCard.vue';
```

### 1.3 General Best Practices

#### Use `let` Only in Block Scope

Use `let` only inside block or function scopes. Avoid using it in global scope to ensure proper scoping and prevent unexpected behavior.

**Example:**

```typescript
export const getStatusSeverity = (status?: string): Severity => {
  let severity: Severity;

  switch (status) {
    case 'Available':
      severity = 'success';
      break;
    case 'Damaged':
      severity = 'danger';
      break;
    default:
      severity = 'primary';
  }

  return severity;
};
```

**Avoid:**

```vue
<script setup lang="ts">
let count = 0;  // Avoid using `let` in the global scope of the script
</script>
```


#### Don't Ignore ESLint Warnings

Always address warnings and errors from **ESLint**. This tools help maintain code quality by enforcing consistent style and catching potential issues.

By addressing the warnings and fixing them, you ensure cleaner, more maintainable code.

Some warning or errors can be autofixed by ESLint. Run `pnpm lint` to fix them.


#### Avoid Installing New Libraries Unless You Really Need Them

Try to write your code using plain TypeScript or libraries you already have.

For example, when formatting dates, you could install a library to help, but it's better to format them using TypeScript instead.


#### Don't Hardcode URLs or Sensitive Data

Sensitive information, like API keys or API URLs, should never be hardcoded in your source code. Instead:

* Use a `.env` file to store them securely.
* Access the values in your code using environment variables (e.g., `import.meta.env.VITE_API_URL`). [Environment Variables](#3-configuration--environment-31-environment-variables)


#### Use Template Literals with Backticks

When combining strings or embedding variables, prefer **template literals** (backticks `` ` ``) over traditional string concatenation (`+`).

**Example:**

**Avoid** (String Concatenation):

```typescript
const name = "Alice";
const message = "Hello, " + name + "! Welcome to " + new Date().getFullYear() + ".";
```

**Prefer** (Template Literals):

```typescript
const name = "Alice";
const message = `Hello, ${name}! Welcome to ${new Date().getFullYear()}.`;
```


## 2. Vue.js Specific Guidelines

### 2.1 Vue Template Guidelines

Keep templates clean and readable by following these simple rules.

#### Keep Templates Simple

Move complex logic to computed properties or methods instead of cluttering your template.

**Don't:**
```html
<div>
  {{
    fullName
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }}
</div>
```

**Do:**
```typescript
<div>{{ formatFullName(fullName) }}</div>

// In script setup
const formatFullName = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
```


### 2.2 Script Setup & TypeScript

#### Defining Props

Always use type-based declarations for better TypeScript support and code clarity.

```typescript
const props = defineProps<{
  userName: string;
  isActive: boolean;
}>();
```

**Naming:** Use camelCase in script, kebab-case in templates

```typescript
// In component
defineProps<{
  userName: string;
}>();
```

```html
<!-- In parent template -->
<MyComponent user-name="John" />
```

#### Defining Emits

Use type-based declarations for emits to get better TypeScript support.

```typescript
const emit = defineEmits<{
  statusChanged: [status: string, timestamp: number];
}>();
```

**Usage in parent:**

```html
<UserList 
  @status-changed="handleStatusChange" 
/>
```

```typescript
const handleStatusChange = (status: string, timestamp: number) => {
  console.log(`Status: ${status} at ${timestamp}`);
};
```

#### Defining Models

Use `defineModel` for v-model support in Vue 3.4+. It simplifies two-way data binding between parent and child components.

Always provide explicit typing for the model value.

**Basic Usage:**

```typescript
const modelValue = defineModel<string>();
```

**With Options (e.g., custom name, required, default):**

```typescript
const visible = defineModel<boolean>('visible', { 
  required: true,
  default: () => false 
});
```

**Parent Usage:**

```html
<!-- Default v-model -->
<MyComponent v-model="userInput" />

<!-- Custom model name -->
<MyComponent v-model:visible="isModalVisible" />
```

This macro automatically handles the prop and emit for two-way binding, reducing boilerplate compared to manual `defineProps` and `defineEmits` setup.

#### Defining Slots

Use `defineSlots` to provide type safety for slots in your component. This is particularly useful for components that expose named slots with props.

Define a slot interface and use it with the generic type.

**Example:**

```typescript
import { Slot } from 'vue';

const slots = defineSlots<{
  default: Slot;
  header?: Slot<{ title: string }>;
  footer?: Slot;
}>();
```

**Usage in Template (Parent):**

```html
<MyComponent>
  <template #header="{ title }">
    <h2>{{ title }}</h2>
  </template>
  <template #default>
    <p>Default content</p>
  </template>
  <template #footer>
    <button>Close</button>
  </template>
</MyComponent>
```

#### Creating Reactive Variables

Below are general rules for creating reactive variables:

* **Always use** `const` to declare the variable.
* **Always specify the generic type for the** `ref` **variable**, even if the type could be auto-inferred by the initial value. This improves type safety and clarity.

    **Example:**

    *   **When the data is expected to be defined immediately** (non-undefined), you can initialize the `ref` with a value and explicitly type it.

        **Example:**

        ```typescript
        const userData = ref<User>({
          firstName: 'John',
          lastName: 'Doe',
        });
        ```
    *   **When the data might be undefined**, you can declare `ref` with a type that includes `undefined`. This is useful when you don't have an initial value or when the data might be fetched asynchronously.

        **Example:**

        ```typescript
        const userData = ref<User>(); // Inferred type: User | undefined
        ```

        Here, `userData` is a `ref` that can either hold a `User` object or be `undefined`. It's a good practice to initialize `ref` with `undefined` if you expect the value to be potentially absent at first.
*   When the data does not need to be reactive, use a plain `const` declaration. Avoid using `ref` for non-reactive values to keep the code efficient.

    Additionally, for non-reactive constants, follow the naming convention of **UPPERCASE\_SNAKE\_CASE** to clearly distinguish them from reactive variables.

    **Example:**

    ```typescript
    const DEFAULT_TIMOUT = 60000;  // Non-reactive, will not be changed
    ```

* **When to use `ref` Variables?**

  *   When you **need to store deeply reactive objects** that any changes to a nested property will trigger an update.

      **Example:**

      ```vue
      <script setup lang="ts">
      const userData = ref<User>({
        name: 'John Doe',
        address: {
          city: 'New York',
          country: 'United States'
        },
      });
      </script>

      <template>
        <Button :label="userData.address.city" @click="userData.address.city = 'Los Angeles'" />
      </template>
      ```


* **When to use `shallowRef` Variables?**

  *   **For primitive values** such as numbers, strings, booleans, or even for single items like `Date` or `RegExp` that don't need deep reactivity.

      **Example:**

      ```typescript
      const isActive = shallowRef<boolean>(false);
      ```

      You might think that `ref` can also handle this case, **but for consistency**, use `shallowRef`!
  *   Use `shallowRef` variables for large data structures **when you don't need reactivity on nested properties**. Only changes in `.value` will trigger an update.

      This is **useful for performance optimization** when dealing with large or complex data structures where you don't want to track every nested change.

      **Example:**

      ```vue
      <script setup lang="ts">
      import { shallowRef } from 'vue';
      import { Button } from 'wangsvue';
      import { User } from './types/user.type';

      const userData = shallowRef<User>({
        name: 'John Doe',
        address: {
          city: 'New York',
          country: 'United States',
        },
      });

      const updateCity = (newCity: string): void => {
        // Update the entire userData.value object to trigger updates
        userData.value = {
          ...userData.value,
          address: {
            ...userData.value.address,
            city: newCity,
          },
        };
      };
      </script>

      <template>
        <Button :label="userData.address.city" @click="updateCity('Los Angeles')" />
      </template>
      ```

#### Creating Non-Reactive Constant Variables

Just like reactive variables, always explicitly declare the types—even when TypeScript could infer them automatically.

1. Primitive Type Constants

    ```typescript
    const API_BASE_URL: string = 'https://api.example.com';  // Base URL for API
    const MAX_RETRIES: number = 3;  // Maximum number of retry attempts
    ```

2. Raw Object Constants

    ```typescript
    const BUTTON_STYLES: Record<string, string> = {
      backgroundColor: '#007BFF',
      color: '#FFFFFF',
      borderRadius: '4px',
    };  // Button styling

    const ERROR_MESSAGES: Record<ErrorKeys, string> = {
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email address.',
    };  // Common validation error messages
    ```

3. Arrays

    ```typescript
    const SUPPORTED_LANGUAGES: string[] = ['en', 'es', 'fr', 'de'];  // Supported languages
    const DEFAULT_TAGS: string[] = ['vue', 'typescript', 'javascript'];  // Default tags for a blog
    ```

4. Boolean Flags

    ```typescript
    const IS_PRODUCTION: boolean = true;  // Flag to check if the app is in production mode
    const ENABLE_DEBUG_MODE: boolean = false;  // Enable/disable debug mode
    ```


#### Writing Computed Variables

* Follow **camelCase** naming conventions.
* **Explicitly specify return types** to enforce type safety and prevent errors.

**Example:**

```vue
<script setup lang="ts">
import { computed } from 'vue';

const computedString = computed<string>(() => {
  // ...
});
</script>
```


#### Creating Component Functions

* Follow **camelCase** naming conventions.
* Provide a **descriptive function name**.

**Example**

```typescript
const logMessage = (message: string): void => console.log(message);
```

#### Template Refs with useTemplateRef

With Vue 3.5 and `@vue/language-tools` 2.1 (powering both the IDE language service and `vue-tsc`), the type of refs created by `useTemplateRef()` in SFCs can be automatically inferred for static refs based on what element or component the matching `ref` attribute is used on.

In cases where auto-inference is not possible (e.g., non-SFC usage or dynamic components), you can still cast the template ref to an explicit type via the generic argument.

**For DOM Elements:**

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue';

const el = useTemplateRef<HTMLInputElement>('el');
</script>

<template>
  <input ref="el" />
</template>
```

To get the right DOM interface, check resources like [MDN](https://developer.mozilla.org/en-US/docs/Web/API).

Note that for strict type safety, use optional chaining or type guards when accessing the ref, as it may be `null` until the component is mounted or if the element is conditionally rendered with `v-if`.

**Usage Before Vue 3.5:**

Template refs should be created with an explicit generic type argument and an initial value of `null`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const el = ref<HTMLInputElement | null>(null);

onMounted(() => {
  el.value?.focus();
});
</script>

<template>
  <input ref="el" />
</template>
```

**Typing Component Template Refs:**

For component refs, use `InstanceType<typeof Component>` to extract the instance type:

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Foo from './Foo.vue';
import Bar from './Bar.vue';

type FooType = InstanceType<typeof Foo>;
type BarType = InstanceType<typeof Bar>;

const compRef = useTemplateRef<FooType | BarType>('comp');
</script>

<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" ref="comp" />
</template>
```

### 2.3 Vue Router Setup

Keep your routing simple and organized with a single `router/index.ts` file.

1. **Use Arrow Functions to Import Components**

    Components should be loaded lazily using arrow functions in the `import()` statement. This ensures efficient code splitting.

    ```typescript
    {
        component: () => import('@/layout/MainLayout.vue'),
    }
    ```

2. **Import Only Views or Layout Components**

    Each route should import a component from the `views` or `layout` directory. Do not import components from `commons` or `modules`.

    ```typescript
    {
        path: '/',
        name: 'ExampleVLayout',
        component: () => import('@/Layout/ExampleLayout.vue'),
        children: [
            {
                path: '/example',
                name: 'ExampleView',
                component: () => import('@/views/ExampleView.vue'),
            },
            ...// Add more child routes as needed
        ],
    }
    ```

3. **Follow Route Naming Convention**

    The `name` property of a route should adhere to the following rules:

    * Use **PascalCase**.
    * Match the name of the corresponding view component.

    **Example:**

    ```typescript
    {
        path: '/contoh',
        name: 'ExampleView',
        component: () => import('@/views/ExampleView.vue'),
    }
    ```

### 2.4 Provide / Inject Pattern

Use injection keys for type-safe dependency injection across your component tree.


#### What is an Injection Key?
A strongly typed symbol used for `provide` and `inject`. It ensures type safety and prevents naming conflicts.


#### Rules for Using Provide / Inject

1. **Use Symbols as Injection Keys**
    Define keys as unique `Symbol`s.

    ```typescript
    const ExampleKey = Symbol();
    ```

2. **Define Types for Provided Values**
    Specify the interface for the injected value.

    ```typescript
    interface ExampleType {
      exampleProperty: string;
    }
    ```

3. **Centralize Injection Keys**
    Store keys in `src/injections/index.ts`.

    ```typescript
    // src/injections/index.ts
    import { InjectionKey } from 'vue';
    import { ExampleType } from '@/types/example.type';

    export const ExampleKey: InjectionKey<ExampleType> = Symbol();
    ```

4. **Use Provide with Strong Typing**
    Ensure the provided value matches the key’s type.

    ```typescript
    import { ExampleKey } from '@/injections';
    import { ExampleType } from '@/types/example.type';

    const exampleValue: ExampleType = {
      exampleProperty: 'Hello, world!',
    };

    provide(ExampleKey, exampleValue);
    ```

5. **Handle Injection Safely**
    Use a fallback value or optional chaining.

    **With a default value:**
    ```typescript
    const defaultExampleValue: ExampleType = { exampleProperty: 'Default' };
    const injectedValue = inject(ExampleKey, defaultExampleValue);
    ```

    **With optional chaining:**
    ```typescript
    const injectedValue = inject<ExampleType>(ExampleKey);
    console.log(injectedValue?.exampleProperty);
    ```

6. **Document Injection Keys**
    Add clear documentation for each key.

    ```typescript
    /**
     * **ExampleKey**
     * Used to inject shared example state.
     * - Provided By: `ExampleProvider`
     * - Injected In: Components needing example data
     */
    export const ExampleKey: InjectionKey<ExampleType> = Symbol();
    ```


#### Example Usage

**Centralized Key File:**
```typescript
// src/injections/example.ts
import { InjectionKey, ShallowRef } from 'vue';
import { ExampleType } from '@/types/example.type'

export const ExampleKey: InjectionKey<ShallowRef<ExampleType>> = Symbol();
```

**Provider Component:**
```vue
<script setup lang="ts">
import { provide, shallowRef } from 'vue';
import { ExampleKey } from '@/injections';
import { ExampleType } from '@/types/example.type';

const exampleValue = shallowRef<ExampleType>({
  exampleProperty: 'This is a provided value.',
});

provide(ExampleKey, exampleValue);
</script>
```

**Consumer Component:**
```vue
<script setup lang="ts">
import { inject } from 'vue';
import { ExampleKey } from '@/injections';

const exampleValue = inject(ExampleKey);
</script>
<template>
  <p>{{ exampleValue?.exampleProperty }}</p>
</template>
```

## 3. Configuration & Environment

### 3.1 Environment Variables

Keep your configuration secure and organized with proper environment variable naming.

#### Naming Rules

**Use the VITE_ prefix:**

* `VITE_` for all environments (development and production)

**Make names descriptive:**

```bash
# ❌ Vague and confusing
VITE_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com

# ✅ Clear and descriptive
VITE_SETTINGS_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com
```

**Stay consistent:** Use the VITE_ prefix for all environment variables across environments.


## Wrapping Up

These guidelines help create code that's easy to read, maintain, and collaborate on. Remember:

* **Consistency is key** - follow the same patterns throughout your project
* **Clarity over cleverness** - write code that others can easily understand
* **When in doubt, be explicit** - clear types and descriptive names prevent bugs
* **Use the tools** - let ESLint and TypeScript help you catch issues early

Happy coding! 🚀
