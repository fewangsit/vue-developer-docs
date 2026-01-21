---
icon: folder-tree
---

# Project Structure

Here’s an overview of the project structure:

```plaintext
> src
  > assets
  > components
    > commons
    > modules
      > ExampleModule
        > helpers
        > options
        ExampleModuleComponent.vue
  > layout
    ExampleLayout.vue
  > router
    index.ts
  > store
  > utils
  > views
    ExampleView.vue
  App.vue
  main.ts
.env
index.html
package.json
tsconfig.json
microtsm.config.ts
package.json
tailwind.config.js
README.md
```

Now let's break down what folder and what the usages.

### 1. `src > assets`

We store our assets like images and styles files here.

### 2. `components > commons`

Components stored in the commons directory are designed for widespread usage throughout the project. These are reusable components utilized in multiple locations.

### 3. `components > modules > ExampleModule`

This folder is designated for organizing components based on specific pages, menus, or functions. Components within this directory are grouped according to their association with particular pages, menus, or functionalities. This structuring approach makes it easier to locate and manage components within the context of their usage.

Here `ExampleModule` is the name of the module and it can have another sub module with the same structure.

### 4. `components > modules > ExampleModule > helpers`

This folder contains function used by the components inside the module.

If you have reusable functions inside a component, you need to create separate helper function file.

Below is the guidelines:

1. Place under `helpers` folder on you module folder, each module should only have one helpers folder.
2. One file should only contains one exported helper function (can contains other function, but not to be exported).
3. File name format: `camelCase.helper.ts`.
4. File name should be the same with the function name.
5. Using `export default` for helper file.
6. Create `index.ts` under the helpers folder.
7. Import and export all helper function within the `index.ts`:\
   Example: `export camelCase from 'camelCase.helper';`
8. Import form helper on your component: `import { helperFunction } from './helpers'`

### 5. `components > modules > ExampleModule > options`

Within the `modules` directory, the `options` folder stores TypeScript files essential for the components. These files contain configurations and options necessary for the proper functioning of the associated components. We mainly store the filter options.

### 6. `layout`

The `layout` folder contains Vue components that define the **overall page structure and navigation framework**. Layout components are responsible for:

- Providing the main page structure (header, sidebar, footer, etc.)
- Containing navigation elements (tab menus, breadcrumbs, main navigation)
- Rendering `<router-view />` where view components are displayed
- Managing layout-specific state and responsive behavior

**Naming Convention:** Use `PascalCase` with the suffix `Layout` (e.g., `MainLayout.vue`, `SettingsLayout.vue`).

**Architecture Pattern:** Routes use layout components that contain navigation structure and render view components through `<router-view />`.

**Example Structure:**

```vue
<!-- SettingsLayout.vue -->
<template>
  <div>
    <Breadcrumb />
    <TabMenu />
    <router-view />
    <!-- View components render here -->
  </div>
</template>
```

### 7. `views`

The `views` folder contains Vue components that serve as **route targets**. These are the components that Vue Router directly loads when navigating to specific URLs. View components should be lightweight and primarily responsible for:

- Importing and composing module components from `components/modules/`
- Handling route-specific logic (query parameters, route guards, etc.)
- Managing page-level state and data fetching
- Containing the specific content that renders within the layout structure

**Naming Convention:** Use `PascalCase` with the suffix `View` (e.g., `BrandView.vue`, `UserProfileView.vue`).

**Key Rule:** Routes should **only** import components from the `views` folder, never directly from `modules` or `commons`.

### 8. `router/index.ts`

The `router` folder stores the client-side routes (URLs) used by the application. It also details the components used by each route. The guidelines for this folder can you read in [Vue Router Setup](code-consistency-guidelines/vue-specific-guidelines.md#vue-router-setup).

### 9. `utils`

The `utils` folder is a central place for storing utility functions used widely across different component modules. The convention for creating util files is to use `camelCase` followed by the extension `.util.ts`.

### 9. `.env`

The `.env` file is a configuration file used to manage environment variables in our Vue.js project. It lets us define key-value pairs, such as the base URL of the APIs.

### 10. `microtsm.config.ts`

The `microtsm.config.ts` file is a configuration file for the MicroTSM (Micro TypeScript Module) tool. It specifies the settings for bundling and minifying our TypeScript modules.
