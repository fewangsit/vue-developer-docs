---
noIndex: true
icon: brackets-curly
---

# Code Consistency Guidelines

These guidelines help maintain consistent, readable code across all projects. Following these standards makes collaboration easier and keeps our codebase maintainable for everyone on the team.

## 1. Naming Conventions

### File Naming

**Vue Components & Module Folders:** Use `PascalCase`
**TypeScript Files:** Use `camelCase` for `.ts` files (types, DTOs, utils, etc.)

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

### Component Organization

Organize components hierarchically from general to specific. This makes finding and understanding components much easier as your app grows.

**Naming Pattern:**
```plaintext
[Module][Feature][Component][Subcomponent].vue
```

**Structure breakdown:**
- **Module**: Main feature area (e.g., "Borrow")
- **Feature**: Specific section (e.g., "History") 
- **Component**: UI element type (e.g., "Page", "Table")
- **Subcomponent**: Specific functionality (e.g., "Filter", "Buttons")

**Example Structure:**
```plaintext
📁 Borrow/
  📁 BorrowHistory/
    📄 BorrowHistoryPage.vue        # Main page component
    📄 BorrowHistoryFilter.vue      # Search and filter controls
    📄 BorrowHistoryButtons.vue     # Action buttons (add, edit, etc.)
    📄 BorrowHistoryTable.vue       # Data table display
  📁 BorrowTransaction/
    📄 BorrowTransactionPage.vue    # Transaction overview page
    📄 BorrowTransactionForm.vue    # Create/edit transaction form
    📄 BorrowTransactionDetails.vue # Transaction detail view
  📁 Borrowed/
    📄 BorrowedList.vue             # List of borrowed items
    📄 BorrowedItemDetail.vue       # Individual item details
```

#### 1.3 Variable Naming Conventions

To ensure readability, maintainability, and consistency across your codebase, follow these naming conventions:

1. **PascalCase**
   * **Use for:** Types, interfaces, and classes.
   * **Reasoning:** PascalCase is typically used for types and classes to clearly distinguish them from variables and methods, making the code more readable and easier to follow.
   * **Example:**
     * `UserProfile`
     * `ApiResponse`
     * `ProductItem`
2. **camelCase**
   * **Use for:** Variables, methods, and function names.
   * **Reasoning:** camelCase is the standard convention for variables and functions to clearly differentiate them from types and classes.
   * **Example:**
     * `userProfile`
     * `getUserInfo()`
     * `setUserDetails()`
     * `totalAmount`
3. **UPPERCASE\_SNAKE\_CASE** (for constants)
   * **Use for:** Constants or values that should remain unchanged throughout the program.
   * **Reasoning:** This format is traditionally used for constants to easily differentiate them from variables.
   * **Example:**
     * `MAX_USER_COUNT`
     * `API_URL`
4. **Descriptive Naming:**
   * **Use meaningful names** that clearly describe the variable’s purpose.
   * Avoid vague names like `data`, `temp`, `obj`, and `stuff`. Instead, use names like `userProfile`, `productList`, or `orderDetails`.
   * **Example:**
     * **Bad:** `temp`, `obj`, `val`
     * **Good:** `userDetails`, `cartItem`, `productQuantity`
5. **Boolean Variables:**
   * **Use** `is`, `has`, or `can` as prefixes for boolean variables to indicate true/false values.
   * **Example:**
     * `isLoggedIn`
     * `hasPermission`
     * `canSubmitForm`

***

**Summary**

* **PascalCase:** Types, interfaces, classes
* **camelCase:** Variables, functions, methods
* **UPPERCASE\_SNAKE\_CASE:** Constants
* **Descriptive Names:** Always aim for clarity and avoid vague names
* **Boolean Prefixes:** Use `is`, `has`, or `can` for booleans

By following these naming conventions, you will make your code more intuitive, easier to understand, and maintain.

***

## 2. Vue Template Guidelines

Keep templates clean and readable by following these simple rules.

### HTML vs Component Tags

**Native HTML elements:** Use lowercase
```html
<div class="container">
  <button type="button">Click Me</button>
</div>
```

**Custom components:** Use PascalCase
**Vue built-ins:** Use kebab-case
```html
<!-- Custom components -->
<MyComponent />
<UserProfile />

<!-- Vue built-in components -->
<router-link to="/home">Home</router-link>
<keep-alive>
  <router-view />
</keep-alive>
```

### Keep Templates Simple

Move complex logic to computed properties or methods instead of cluttering your template.

```html
<!-- ❌ Hard to read and debug -->
<div>
  {{
    fullName
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }}
</div>

<!-- ✅ Clean and maintainable -->
<div>{{ formatFullName(fullName) }}</div>
```

```typescript
// Move the logic to your script section
<script setup lang="ts">
const formatFullName = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
</script>
```

***

## 3. Script Setup & TypeScript

### Defining Props

Always use type-based declarations for better TypeScript support and code clarity. Use `withDefaults` when you need default values.

**Basic props:**
```typescript
const props = defineProps<{
  userName: string;
  isActive: boolean;
}>();
```

**Props with defaults:**
```typescript
const props = withDefaults(
  defineProps<{
    userName?: string;
    maxItems?: number;
  }>(),
  {
    userName: 'Guest',
    maxItems: 10,
  }
);
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

**Tip:** Skip `const props =` if you don't reference props in your script.

By following these guidelines, you ensure consistency, clarity, and efficiency in defining and using props in Vue components.

***

### Defining Emits

Use type-based declarations for emits to get better TypeScript support.

```typescript
const emit = defineEmits<{
  userSelected: [user: User];
  statusChanged: [status: string, timestamp: number];
}>();
```

**Usage in parent:**
```html
<UserList 
  @user-selected="handleUserSelection"
  @status-changed="handleStatusChange" 
/>
```

```typescript
const handleUserSelection = (user: User) => {
  console.log('Selected user:', user);
};

const handleStatusChange = (status: string, timestamp: number) => {
  console.log(`Status: ${status} at ${timestamp}`);
};
```

**Tip:** Skip `const emit =` if you don't call emit functions in your script.


***

### Creating Reactive Variables

When working with reactivity in Vue with TypeScript, it’s important to follow best practices to ensure clarity, maintainability, and performance.

Below are general rules for creating reactive variables:

* **Always use** `const` to declare the variable.
*   **Always specify the generic type for the** `ref` **variable**, even if the type could be auto-inferred by the initial value. This improves type safety and clarity.

    **Example:**

    *   **When the data is expected to be defined immediately** (non-undefined), you can initialize the `ref` with a value and explicitly type it.

        **Example:**

        ```typescript
        const userData = ref<User>({
          firstName: 'John',
          lastName: 'Doe',
        });
        ```

        In this case, `userData` is a reactive reference to a `User` object, and TypeScript knows that it will always have a `User` type.
    *   **When the data might be undefined**, you can declare `ref` with a type that includes `undefined`. This is useful when you don't have an initial value or when the data might be fetched asynchronously.

        **Example:**

        ```typescript
        const userData = ref<User>(); // Inferred type: User | undefined
        ```

        Here, `userData` is a `ref` that can either hold a `User` object or be `undefined`. It’s a good practice to initialize `ref` with `undefined` if you expect the value to be potentially absent at first.
*   **Don’t use generics for** `reactive` **or** `shallowReactive` **variables.**

    ```typescript
    interface Book {
      title: string
      year?: number
    }

    // Do
    const book: Book = reactive({ title: 'Coding Style Guide' });

    // Don't
    const book = reactive<Book>({ title: 'Coding Style Guide' })
    ```

    Reference: [Typing Reactive](https://vuejs.org/guide/typescript/composition-api#typing-reactive)
*   When the data does not need to be reactive, use a plain `const` declaration. Avoid using `ref` for non-reactive values to keep the code efficient.

    Additionally, for non-reactive constants, follow the naming convention of **UPPERCASE\_SNAKE\_CASE** to clearly distinguish them from reactive variables.

    **Example:**

    ```typescript
    const DEFAULT_TIMOUT = 60000;  // Non-reactive, will not be changed
    ```

    More example on section 6.3.4 Creating Non-Reactive Constant Variables.

***

**When to use `ref` Variables?**

*   Prefer `ref` over `reactive` when **the initial value might not be present.**\
    **Example:**

    ```typescript
    const userData = ref<User>(); // Will be assigned during an asynchronous process
    const companyData = shallowRef<Company>(); // Use shallowRef, when the data does not needs deep reactivity
    ```
*   When you **need to store deeply reactive objects** that any changes to a nested property will trigger an update.

    ```typescript
    <script setup lang="ts">
    import { ref } from 'vue';
    import { Button } from 'wangsvue';
    import { User } from './types/user.type';

    const userData = ref<User>({
      name: 'John Doe',
      address: {
        city: 'New York',
        country: 'United States'
      },
      email: 'johndoe@email.com',
    });
    </script>

    <template>
      <p>Name: {{ userData.name }}</p>
      <p>Address:</p>
      <ul>
        <!-- After the button is clicked, the list element below will change its text to Los Angeles -->
        <li>City: {{ userData.address.city }}</li>
        <li>Country: {{ userData.address.country }}</li>
      </ul>
      <Button :label="userData.address.city" @click="userData.address.city = 'Los Angeles'" />
    </template>
    ```

***

**When to use `shallowRef` Variables?**

*   **For primitive values** such as numbers, strings, booleans, or even for single items like `Date` or `RegExp` that don’t need deep reactivity.

    **Example:**

    ```typescript
    const isActive = shallowRef<boolean>(false);
    ```

    You might think that `ref` can also handle this case, **but for consistency**, use `shallowRef`!
*   Use `shallowRef` variables for large data structures **when you don't need reactivity on nested properties**. Only changes in `.value` will trigger an update.

    This is **useful for performance optimization** when dealing with large or complex data structures where you don't want to track every nested change.

    **Example:**

    ```xml
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
      email: 'johndoe@email.com',
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

      // Direct assignment to nested properties won't trigger updates
      // Example (uncomment to test):
      // userData.value.address.city = newCity;
    };
    </script>

    <template>
      <p>Name: {{ userData.name }}</p>
      <p>Address:</p>
      <ul>
        <!-- After the button is clicked, the list element below will change its text to Los Angeles -->
        <li>City: {{ userData.address.city }}</li>
        <li>Country: {{ userData.address.country }}</li>
      </ul>
      <Button :label="userData.address.city" @click="updateCity('Los Angeles')" />
    </template>
    ```

***

By following these updated rules, you ensure that your reactivity setup is both efficient and maintainable, keeping your application performant and your codebase clean.

***

#### 3.4 Creating Non-Reactive Constant Variables

Here are examples for using **plain** `const` declarations for non-reactive primitive types, raw objects, and other common constants in Vue applications. As with the reactive variables, you should always define the types even if it can be auto-inferred.

***

**a. Primitive Type Constants**

```typescript
const API_BASE_URL: string = 'https://api.example.com';  // Base URL for API
const MAX_RETRIES: number = 3;  // Maximum number of retry attempts
const DEFAULT_TIMEOUT: number = 5000;  // Default timeout in milliseconds
```

**b. Raw Object Constants**

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

**c. Arrays**

```typescript
const SUPPORTED_LANGUAGES: string[] = ['en', 'es', 'fr', 'de'];  // Supported languages
const DEFAULT_TAGS: string[] = ['vue', 'typescript', 'javascript'];  // Default tags for a blog
```

**d. Boolean Flags**

```typescript
const IS_PRODUCTION: boolean = true;  // Flag to check if the app is in production mode
const ENABLE_DEBUG_MODE: boolean = false;  // Enable/disable debug mode
```

**e. Enum-Like Constants**

```typescript
const USER_ROLES: Record<UserRole, string> = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};  // Enum-like structure for user roles

const ORDER_STATUSES: Record<OrderStatus, string> = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};  // Enum-like structure for order statuses
```

***

#### 3.5 Writing Computed Variables

* **Use** `const` to ensure immutability of the reference.
* Follow **camelCase** naming conventions.
* **Explicitly specify return types** to enforce type safety and prevent errors.

**Example:**

```xml
<script setup lang="ts">
import { computed } from 'vue';

const computedString = computed<string>(() => {
  // Type error if this doesn't return string
});
</script>
```

***

#### 3.6 Creating Component Functions

* Use **arrow functions**.
* Follow **camelCase** naming conventions.
* Provide a **descriptive function name**.
* Properly annotate **argument types** and **return types**.

**Example**

```typescript
const logMessage = (message: string): void => console.log(message);
```

***

#### 3.7 Don't use `var`

No comment, just avoid using `var`.

***

#### 3.8 Use `let` Only in Block Scope

Use `let` only inside block or function scopes. Avoid using it in global scope to ensure proper scoping and prevent unexpected behavior.

**Example:**

```typescript
export type Severity = 'success' | 'danger' | 'warning' | 'dark' | 'primary';

export const getStatusSeverity = (status?: string): Severity => {
  let severity: Severity;

  switch (status) {
    case 'Available':
      severity = 'success';
      break;
    case 'Damaged':
      severity = 'danger';
      break;
    case 'Disposed':
      severity = 'dark';
      break;
    case 'On Transfer':
      severity = 'warning';
      break;
    default:
      severity = 'primary';
  }

  return severity;
};
```

**Avoid:**

```xml
<script setup lang="ts">
let count = 0;  // Avoid using `let` in the global scope of the script
</script>
```

***

#### 3.9 Don't Ignore ESLint Warnings

Always address warnings and errors from **ESLint**. This tools help maintain code quality by enforcing consistent style and catching potential issues.

By addressing the warnings and fixing them, you ensure cleaner, more maintainable code.

***

#### 3.10 Avoid Installing New Libraries Unless You Really Need Them

Try to write your code using plain TypeScript or libraries you already have.

For example, when formatting dates, you could install a library to help, but it's better to format them using TypeScript instead.

```typescript
const formatDateWithLocale = (date: Date): string => {
  const datePart = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  });

  return `${datePart} ${timePart}`;
};

// Example usage
const now = new Date();
console.log(formatDateWithLocale(now)); // Outputs: 12/13/2024 09:15:30
```

***

#### 3.11 Don't Hardcode URLs or Sensitive Data

Sensitive information, like API keys or API URLs, should never be hardcoded in your source code. Instead:

* Use a `.env` file to store them securely.
* Access the values in your code using environment variables (e.g., `process.env.VUE_APP_API_URL`).

This ensures security, makes configuration flexible, and avoids exposing credentials in version control.

***

#### 3.12 Use Template Literals with Backticks

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

**Benefits:**

* **Readability:** Easier to read and maintain.
* **Flexibility:** Allows embedding expressions directly.
* **Consistency:** Handles multiline strings and dynamic content seamlessly.

***

## 4. API Services

We use Axios for all API communication. Organize your API calls into service files to keep them modular and maintainable.

***

### Basic Setup

Import what you need:
```typescript
import { AxiosResponse } from 'axios';
import createAxiosInstance from './createInstance';
```

***

Create your API instance:
```typescript
const API = createAxiosInstance({ env: 'APP_EXAMPLE_API', prefix: '/api' });
```

This handles base URLs, environment settings, and interceptors automatically.

***

#### 4.3 Creating the Service Object

Create a service object to group related API request methods. Ensure each method is separated by a single line for clarity. Each method should use arrow functions and return a `Promise<AxiosResponse>`.

```typescript
const ExampleService = {
  // GET request to fetch a list of items
  getList: (params?: GetListQueryParams): Promise<AxiosResponse<FetchListResponse<ListItem>>> => {
    return API.get('/list', { params });
  },

  // GET request to fetch the details of an item
  getDetail: (id: string): Promise<AxiosResponse<FetchDetailResponse<Item>>> => {
    return API.get(`/detail/${id}`);
  },

  // POST request to create a new item
  postCreateItem: (body: User): Promise<AxiosResponse<void>> => {
    return API.post('/create', body);
  },

  // PUT request to edit an existing item
  putEdit: (id: string, body: User): Promise<AxiosResponse<void>> => {
    return API.put(`/edit/${id}`, body);
  },

  // DELETE request to delete an item
  deleteItem: (id: string, body: User): Promise<AxiosResponse<void>> => {
    return API.delete(`/delete/${id}`, { data: body });
  },

  // Advanced usage: GET request with custom headers and timeout
  getCustomData: (): Promise<AxiosResponse<CustomData>> => {
    return API.get('/custom-data', {
      headers: { 'X-Custom-Header': 'CustomHeaderValue' },
      timeout: 10000, // 10 seconds timeout
    });
  },

  // Advanced usage: GET request with transformed response data
  getTransformedData: (): Promise<AxiosResponse<CustomData>> => {
    return API.get('/transformed-data', {
      transformResponse: [
        (data) => {
          const parsedData = JSON.parse(data);
          return parsedData.map((item: any) => ({
            ...item,
            isActive: item.status === 'active',
          }));
        },
      ],
    });
  },
};
```

The `FetchListResponse` and `FetchDetailResponse`:

```typescript
// src/types/fetchResponse.type.ts
import { Data } from '@fewangsit/wangsvue/datatable';

export interface FetchListResponse<T = Data> {
  message: string;
  data: {
    data: T[];
    totalRecords: number;
  };
}

export interface FetchDetailResponse<T = Data> {
  message: string;
  data: T;
}
```

***

#### 4.4 Service Method Naming and Conventions

* **Use PascalCase** for the service object name.
* **Separate each object method with a single line spacing** for readability.
* Use **arrow functions** and include the `return` statement.
* Always define the type of **params**, **body**, and **return value** as `Promise<AxiosResponse<YourResponseBody>>`.
* Use **camelCase** for the service method name.
* Start each method name with an appropriate **HTTP method** such as `get`, `post`, `put`, `delete`, etc.
* Add a descriptive name after the HTTP method to indicate what the API method does (e.g., `getUserDetail` for getting user details).
*   Don't concatenate the params object to the URL; instead, pass the params to the axios request config.\
    \
    **Do:**

    ```typescript
    return API.get('/projects-list', { params });
    ```

    **Don’t:**

    ```typescript
    const paramsString = `status=${status}&sort=${sort}`;
    const url = `/projects-list?${paramsString}`;
    return API.get(url);
    ```

***

#### 4.5 Exporting the Service

Finally, export the service object as the default export of the module.

```typescript
export default ExampleService;
```

You’ll also need to export the service in the main.ts file of the repository.

```typescript
// main.ts
export { default as ExampleService } from './src/services/example.service';
```

***

#### 4.6 Type Definitions: DTO and Types Folders

Ensure that type definitions for request and response bodies are separated and placed in appropriate folders for clarity and reusability.

1. **Request DTOs**: Place all interfaces for entities that are sent to the API (such as request bodies and query parameters) in the `dto` folder.
2. **Response Types**: Place all interfaces for the data returned by the API in the `types` folder.
3. **File Naming Convention**: Use the same name for related files to maintain consistency.

**Example File Structure:**

```xml
src/
├── services/
│   ├── example.service.ts        // Service file containing API methods
├── dto/
│   ├── exampleService.dto.ts    // Request DTOs (e.g., for request bodies and params)
├── types/
│   ├── exampleService.type.ts   // Response types (e.g., for API responses)
```

**Example DTO (Request) File:** `src/dto/exampleService.dto.ts`:

```typescript
export interface GetListQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateItemBody {
  name: string;
  description: string;
}

export interface UpdateItemBody {
  name: string;
  description: string;
}
```

**Example Type (Response) File:** `src/types/exampleService.type.ts`:

```typescript
export interface GetListResponseBody extends FetchResponse<User> {}

export interface GetDetailResponseBody {
  data: User;
}
```

***

### 5. Using the API Method from Services

After creating the API service, as covered in the previous section, you can now implement the API methods in your `script setup`. Follow the rules below to ensure consistency and maintain best practices:

***

#### 5.1 Rules for Using API Methods

1.  **Import the Service Object**\
    Use the same name as the Service Object created in the service file. For example, if you created `ExampleService`, import it as follows:

    ```typescript
    import ExampleService from '@/services/example.service';
    ```

    **Note:** Do not include the `.ts` file extension in the import.
2.  **Use Asynchronous Arrow Functions**\
    Wrap the API call inside an asynchronous arrow function:

    ```typescript
    const getExampleDetail = async (): Promise<void> => {
        // Your code implementation here
    };
    ```
3.  **Use** `try-catch` for Error Handling\
    Always use `try-catch` blocks instead of chaining `then` and `catch` for better readability and error handling:

    ```typescript
    const getExampleDetail = async (): Promise<void> => {
        try {
            const id: string = 'example-id';
            const { data } = await ExampleService.getDetail(id);
            console.log('Example detail:', data);
        } catch (error) {
            console.error('Error while fetching detail:', error);
        }
    };
    ```

    **Note**: Every caught error must be logged to the console using `console.error`.
4.  **Destructure Data from the Axios Response**\
    Extract only the data or properties you need from the Axios Response:

    ```typescript
    const { data } = await ExampleService.getDetail(id);
    ```

    **Other Axios Response Properties**:\
    You can access additional response properties like `status`, `headers`, etc., if needed. Below is the Axios Response interface for reference:

    ```typescript
    export interface AxiosResponse<T = any, D = any> {
        data: T;
        status: number;
        statusText: string;
        headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
        config: InternalAxiosRequestConfig<D>;
        request?: any;
    }
    ```
5. **Always Use the** `await` Keyword\
   Ensure all API calls use `await` to handle the promise.

***

#### 5.2 Complete Example: Using an API Method

Below is an example implementation of the `getExampleDetail` method using the `ExampleService` and `shallowRef` for storing the data response:

```xml
<script setup lang="ts">
import { shallowRef, ref } from 'vue';
import ExampleService from '@/services/example.service';

const exampleDetail = shallowRef<GetDetailResponseBody['data'] | null>(null);

const getExampleDetail = async (): Promise<void> => {
    try {
        const id: string = 'example-id'; // Replace with actual ID
        const { data } = await ExampleService.getDetail(id);
        exampleDetail.value = data.data;
    } catch (error) {
        console.error('Error while fetching detail:', error);
        toast.add({
            message: 'Failed to fetch example detail. Please try again.',
            error,
        })
    }
};
</script>
```

**Why Use** `shallowRef`**?**

We use `shallowRef` for storing API response data like `exampleDetail` because it ensures reactivity at the top level without making all nested properties reactive. This approach is ideal in the following scenarios:

1. **No Nested Property Updates**:\
   In our example, we will never directly change the nested properties of `exampleDetail.value`. Instead, we always update the entire object (e.g., by fetching new data from the API).
2. **Performance Optimization**:\
   Making all nested properties reactive adds unnecessary overhead, especially for complex objects with deep nesting. By using `shallowRef`, we minimize this overhead and improve performance.
3. **Clarity of Intent**:\
   `shallowRef` makes it clear that we only care about the top-level reactivity of the `exampleDetail` object, aligning with our intended usage.

***

## 6. Vue Router Setup

Keep your routing simple and organized with a single `router/index.ts` file.

#### 6.1 Rules for Writing Router Configuration

**1. Import Necessary Types and Methods**

Always import the required types or methods from `vue-router` at the top of the file.

```typescript
import { RouteRecordRaw } from 'vue-router';
```

**2. Define Routes as a Readonly Variable**

The `routes` variable should be declared as a `Readonly` array of type `RouteRecordRaw[]` to enforce compile-time immutability.

```typescript
const routes: Readonly<RouteRecordRaw[]> = [];
```

**3. Use Arrow Functions to Import Components**

Components should be loaded lazily using arrow functions in the `import()` statement. This ensures efficient code splitting.

```typescript
{
    component: () => import('@/layout/MainLayout.vue'),
}
```

**4. Import Only Views Components**

Each route should import a component from the `views` directory. Do not import components from `commons` or `modules`.

```typescript
{
    path: '/example',
    name: 'ExampleView',
    component: () => import('@/views/ExampleView.vue'),
}
```

**5. Follow Route Naming Convention**

The `name` property of a route should adhere to the following rules:

* Use **PascalCase**.
* Match the name of the corresponding view component.
* Be similar to the `path` in English (if applicable), unless the project requires paths in a different language.

**Example:**

```typescript
{
    path: '/contoh-view',
    name: 'ExampleView',
    component: () => import('@/views/ExampleView.vue'),
}
```

In this example:

* **Path**: `/contoh-view` is in the required project language.
* **Name**: `ExampleView` is in PascalCase, matches the view name, and is similar to the path in English.

***

#### 6.2 Example Router Configuration

Here is an example implementation of the `index.ts` file in the `router` folder:

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/example',
    name: 'ExampleView',
    component: () => import('@/views/ExampleView.vue'),
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('@/views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

***

## 7. Provide / Inject Pattern

Use injection keys for type-safe dependency injection across your component tree.

***

#### 7.1 What is an Injection Key?

An Injection Key is a strongly typed symbol or unique identifier used for `provide` and `inject`. It ensures that the injected values are type-safe and prevents accidental naming conflicts.

***

#### 7.2 Rules for Using Provide / Inject with Injection Keys

**1. Use Symbols as Injection Keys**

Define injection keys as `Symbol` to ensure uniqueness.

```typescript
const ExampleKey = Symbol();
```

***

**2. Define Types for the Provided Value**

Always define the type for the value being provided. This improves type safety and developer experience.

```typescript
interface ExampleType {
  exampleProperty: string;
}
```

***

**3. Centralize Injection Keys**

Store all injection keys on `src/injections/index.ts`.

```typescript
// src/injections/index.ts
import { InjectionKey } from 'vue';
import { ExampleType } from '@/types/example.type';

export const ExampleKey: InjectionKey<ExampleType> = Symbol();
```

***

**4. Use Provide with Strong Typing**

When using `provide`, ensure the provided value matches the type defined in the injection key.

```typescript
import { ExampleKey } from '@/injections';
import { ExampleType } from '@/types/example.type';

const exampleValue: ExampleType = {
  exampleProperty: 'Hello, world!',
};

provide(ExampleKey, exampleValue);
```

***

**5. Ensure Safe Injection Handling**

When using `inject`, it’s essential to handle the possibility of a null or undefined value. This can be achieved either by providing a fallback/default value or by safely accessing properties using optional chaining.

**Using a Default Value**

Provide a fallback value to ensure that the injection always returns a valid object, even if no provider is present.

```typescript
import { inject } from 'vue';
import { ExampleKey, ExampleType } from '@/injections/example';

const defaultExampleValue: ExampleType = {
  exampleProperty: 'Default value',
};

// Use a default value if no provider is found
const injectedValue = inject(ExampleKey, defaultExampleValue);

console.log(injectedValue.exampleProperty); // Output: "Default value" (if no provider exists)
```

**Using Optional Chaining**

If you don’t want to define a fallback value, use optional chaining to safely access properties and handle the absence of a provider.

```typescript
import { inject } from 'vue';
import { ExampleKey, ExampleType } from '@/injections/example';

// Inject without a default value
const injectedValue = inject<ExampleType>(ExampleKey);

console.log(injectedValue?.exampleProperty); // Output: undefined (if no provider exists)
```

***

**6. Document the Injection Keys**

Clearly document each injection key in your codebase. This helps other developers understand the purpose of each key and how to use it. Be clear and avoid redundancy.

```typescript
// src/injections/index.ts
import { InjectionKey } from 'vue';

/**
 * **Injection Key: ExampleKey**
 *
 * Used to provide and inject shared state or functionality related to examples.
 * 
 * - **Provided By**: `ExampleProvider`
 * - **Injected In**: Components that consume example data or method
 */
export const ExampleKey: InjectionKey<ExampleType> = Symbol();
```

***

#### 7.3 Example Usage

**Centralized Injection Key File**

```typescript
// src/injections/example.ts
import { InjectionKey, ShallowRef } from 'vue';
import { ExampleType } from '@/types/example.type'

export const ExampleKey: InjectionKey<ShallowRef<ExampleType>> = Symbol();
```

**Providing the Value**

```xml
// src/components/ProviderComponent.vue
<script setup lang="ts">
import { provide, shallowRef } from 'vue';
import { ExampleKey } from '@/injections';
import { ExampleType } from '@/types/example.type';

const exampleValue = shallowRef<ExampleType>({
  exampleProperty: 'This is a provided value.',
});

provide(ExampleKey, exampleValue);
</script>
<template>
  <div>
    <slot />
  </div>
</template>
```

**Injecting the Value**

```xml
// src/components/ConsumerComponent.vue
<script setup lang="ts">
import { inject } from 'vue';
import { ExampleKey } from '@/injections';
import { ExampleType } from '@/types/example.type';

const exampleValue = inject(ExampleKey);

console.log(exampleValue?.value.exampleProperty); // We need to access .value because the injected value is a shallowRef
</script>
<template>
  <div>
    <p>{{ exampleValue?.exampleProperty }}</p>
  </div>
</template>
```

***

#### 7.4 Benefits of Using Injection Keys

1. **Type Safety**: Strong typing reduces bugs and improves developer productivity.
2. **Uniqueness**: Symbols prevent key name collisions.
3. **Clarity**: Centralized keys make dependencies easier to manage.
4. **Extensibility**: Injection keys allow for consistent and scalable code as the application grows.

By following these standards, your use of `provide` and `inject` will be robust, maintainable, and aligned with Vue's best practices.

## 8. Environment Variables

Keep your configuration secure and organized with proper environment variable naming.

### Naming Rules

**Use proper prefixes:**
- `VUE_APP_` for production builds
- `VITE_APP_` for development

**Make names descriptive:**
```bash
# ❌ Vague and confusing
VUE_APP_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com

# ✅ Clear and descriptive
VUE_APP_SETTINGS_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com
```

**Stay consistent:** If you define a variable with one prefix, define it with both prefixes for consistency across environments.

---

## Wrapping Up

These guidelines help create code that's easy to read, maintain, and collaborate on. Remember:

- **Consistency is key** - follow the same patterns throughout your project
- **Clarity over cleverness** - write code that others can easily understand  
- **When in doubt, be explicit** - clear types and descriptive names prevent bugs
- **Use the tools** - let ESLint and TypeScript help you catch issues early

Happy coding! 🚀