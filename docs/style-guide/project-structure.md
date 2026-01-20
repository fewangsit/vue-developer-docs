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
    > moduleName
      > helpers
      > options
      ModuleNameComponentExample.vue
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

### 3. `components > moduleName`

This folder is designated for organizing components based on specific pages, menus, or functions. Components within this directory are grouped according to their association with particular pages, menus, or functionalities. This structuring approach makes it easier to locate and manage components within the context of their usage.

### 4. `components > moduleName > helpers`

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

### 5. `components > moduleName > options`

Within the `moduleName` directory, the `options` folder stores TypeScript files essential for the components. These files contain configurations and options necessary for the proper functioning of the associated components. We mainly store the filter options.

### 6. `router/index.ts`

The `router` folder stores the client-side routes (URLs) used by the application. It also details the components used by each route. You can read more details in the official [Vue Router guide](https://router.vuejs.org/guide/).

### 7. `utils`

The `utils` folder is a central place for storing utility functions used widely across different component modules. The convention for creating util files is to use `camelCase` followed by the extension `.util.ts`.

### 8. `.env`

The `.env` file is a configuration file used to manage environment variables in our Vue.js project. It lets us define key-value pairs, such as the base URL of the APIs.

### 9. `microtsm.config.ts`

The `microtsm.config.ts` file is a configuration file for the MicroTSM (Micro TypeScript Module) tool. It specifies the settings for bundling and minifying our TypeScript modules.
