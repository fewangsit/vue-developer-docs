---
noIndex: true
icon: folder-tree
---

# Project Structure

We’ve created a project template specifically designed for microapp projects. You can check it out on GitHub: [Wangsit Micro-Frontend Boilerplate App](https://github.com/fewangsit/wangsit-mfe-boilerplate-app).

Here’s an overview of the project structure:

```plaintext
> node_modules
> public
> src
  > assets
  > components
    > commons
    > modules
      > helpers
      > options
      ModuleComponentExample.vue
  > dto
    dataTransferObject.dto.ts
  > layout
    ExampleLayout.vue
  > router
    index.ts
  > store
  > types
    exampleType.type.ts
  > utils
  > views
  App.vue
  main.ts
.env
package.json
tsconfig.json
vue.config.js
package.json
README.md
```

Now let's break down what folder and what the usages.

***

### 1. `src > assets`

We store our assets like images and styles files here.

***

### 2. `components > commons`

Components stored in the commons directory are designed for widespread usage throughout the project. These are reusable components utilized in multiple locations, promoting code efficiency and maintainability.

***

### 3. `components > module`

This folder is designated for organizing components based on specific pages, menus, or functions. Components within this directory are grouped according to their association with particular pages, menus, or functionalities. This structuring approach enhances the organization and maintainability of our codebase, making it easier to locate and manage components within the context of their usage.

***

### 4. `components > module > helpers`

This folder contains function used by the components inside the module.

If you have reusable functions inside a component, you need to create separate helper function file.

Bellow is the guidelines:

1. Place under `helpers` folder on you module folder, each module should only have one helpers folder.
2. One file should only contains one exported helper function (can contains other function, but not to be exported).
3. File name format: `camelCase.helper.ts`.
4. File name should be the same with the function name.
5. Using `export default` for helper file.
6. Create `index.ts` under the helpers folder.
7. Import and export all helper function within the `index.ts`:\
   Example: `export camelCase from 'camelCase.helper';`
8. Import form helper on your component: `import { helperFunction } from './helpers'`

***

### 5. `components > module > options`

Within the `module` directory, the `options` folder stores TypeScript (TS) files essential for the components. These files contain configurations and options necessary for the proper functioning of the associated components. We mainly store the filter options.

***

### 6. `dto`

The word `dto` stands for `data transfer object`, is the folder containing TypeScript interfaces that will be used to determine the type of query parameters or body while fetching or sending data to the API services.

Example:

```typescript
export interface PostCreateUserBody {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface GetUserListQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 1 | -1;
}
```

Creating DTO files, you need to follow these rules:

* Use `camelCase` naming system for the file name followed by `.dto.ts` file extension.
* Use `interface` to declare the type of the DTO.
* Use `PascalCase` for the name of DTO interfaces.
*   The interface name should be clear and descriptive. Using a noun, not a verb.

    ```typescript
    // Do
    export interface UserProfile {
        ...
    }

    // Don't
    export interface GetUserProfile {
        ...
    }

    // Do
    export interface GetUserProfileResponse {
        ...
    }
    ```

***

### 7. `types`

Similar to the `dto` folder, the `types` folder contains type declarations. However, it is specifically focused on entities beyond request bodies and parameters.

Key differences include:

* Primarily used for defining the structure of data returned from API responses. For example, the response of a `GET User` operation and the corresponding `user` entity types.
* File naming follows the camelCase convention with a `.type.ts` extension.

Here’s an example to illustrate how the `types` folder might look:

**Folder Structure**

```typescript
types/
├── user.type.ts
├── product.type.ts
└── order.type.ts
```

**Example**: `user.type.ts`

```typescript
// user.type.ts
export interface User {
  _id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address
  isActive: boolean; // Indicates if the user account is active
  createdAt: string; // ISO date string for when the user was created
}
```

**Example:** `product.type.ts`

```typescript
// product.type.ts
export interface Product {
  _id: string; // Unique identifier for the product
  name: string; // Name of the product
  price: number; // Price of the product
  stock: number; // Number of items in stock
}
```

**Guidelines for Writing Types**

1. **Focus on API Response Entities:** Types in this folder should represent the structure of data returned from API responses, such as users, products, or orders.
2. **Naming Convention:** Use meaningful, descriptive names in camelCase with `.type.ts` extensions.

This structure ensures your type definitions are reusable, organized, and easy to maintain.

***

### 8. `router/index.ts`

The `router` folder stores the client-side routes (URLs) used by the application. It also details the components used by each route. You can read more details in the official [Vue Router guide](https://router.vuejs.org/guide/).

***

### 9. `utils`

The `utils` folder is a central place for storing utility functions used widely across different component modules. The convention for creating util files is to use `camelCase` followed by the extension `.util.ts`.

***

### 10. `.env`

The `.env` file is a configuration file used to manage environment variables in our Vue.js project. It lets us define key-value pairs, such as the base URL of the APIs.

Here is an example of a .env file:

```yaml
VUE_APP_USERS_API=https://dummy-api-users.example.com
VITE_APP_USERS_API=https://dummy-api-users.example.com
```

For development using Vite, variables start with `VITE_APP`. For production using Webpack, they start with `VUE_APP`.

For the remaining folders and files, such as **App.vue**, **views**, **layouts**, and **store**, you can refer to our [Wangsit Micro-Frontend Boilerplate App](https://github.com/fewangsit/wangsit-mfe-boilerplate-app).
