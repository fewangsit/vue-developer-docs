---
icon: brackets-curly
---

# Code Consistency Guidelines

Follow these rules to keep our code looking the same across all projects and for everyone writing code. Make sure to stick to these guidelines for a consistent and easy-to-understand coding style.

### 6.1 Naming Convention

#### 6.1.1 File Naming

* `PascalCase` for SFC file and Module Folder.
* `camelCase` for all TypeScript `.ts` files, including type, dto, util, etc.
*   Do not use abbreviations in names; use the full word.

    ```plaintext
    <!-- Do -->
    MultiNameContainer.vue

    <!-- Don't -->
    MultiNC.vue
    ```
*   Exceptions are made when an abbreviation is commonly known, such as RFID, KPI, PBI, etc. In those cases, when using PascalCase and camelCase, you should treat abbreviations the same as words.

    ```plaintext
    <!-- Do -->
    PbiDialogForm.vue

    <!-- Don't -->
    PBIDialogForm.vue

    <!-- Do -->
    tagRfid.dto.ts

    <!-- Don't -->
    tagRFID.dto.ts
    ```

#### 6.1.2 Folder Structure & Component File Naming Convention

When creating folder structures for components within a module, follow a hierarchical approach where the most common scope appears first, followed by more specific sub-scopes. This ensures clarity, consistency, and scalability in larger applications.

**General Naming Pattern:**

```plaintext
CommonSpecificMoreSpecificTheMostSpecific.vue
```

* **Common**: The general module or feature group (e.g., "Borrow").
* **Specific**: A more refined section or feature within the module (e.g., "History").
* **More Specific**: Any further subdivisions or sections, such as individual actions or components (e.g., "Page", "Table").
* **The Most Specific**: Highly specific components or subcomponents (e.g., "Filter", "Buttons").

**Folder Structure Example:**

Given the example of the "Borrow" module with its submodules, the folder structure would be:

```plaintext
> Borrow
  > BorrowHistory
    BorrowHistoryPage.vue        // The main page or view component for the Borrow History section
    BorrowHistoryFilter.vue      // Filter component for searching or narrowing down history
    BorrowHistoryButtons.vue     // Buttons related to Borrow History actions (e.g., add, edit)
    BorrowHistoryTable.vue       // Table component displaying borrowed history data
  > BorrowTransaction
    BorrowTransactionPage.vue    // Main page for Borrow Transaction details
    BorrowTransactionForm.vue    // Form for initiating or editing a borrow transaction
    BorrowTransactionDetails.vue // Detailed view of a specific borrow transaction
  > Borrowed
    BorrowedList.vue             // List view for borrowed items
    BorrowedItemDetail.vue       // Detailed view of a borrowed item
```

#### **6.1.3 Variable Naming Conventions**

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

### **6.2 Component Template Guidelines**

To maintain clarity and readability in Vue templates, adhere to these conventions:

#### **6.2.1 HTML Tags and Attributes**

Use **lowercase** for all native HTML tags and attributes to differentiate them from custom components.

**Example:**

```html
<div class="container">
  <button type="button">Click Me</button>
</div>
```

***

#### **6.2.2 Component Tags**

Use **PascalCase** for custom component tags.

Use **kebab-case** for Vue built-in components and Vue Router components.

**Do:**

```html
<MyComponent />
<UserProfile />
<router-link to="/home">Home</router-link>
<keep-alive>
  <router-view />
</keep-alive>
```

***

#### **6.2.3 Avoid Complex Expressions in Templates**

Avoid writing complex expressions directly in the template as it makes the code harder to read and debug.

Move such computations to **computed properties** or **functions** in the `<script>` block.

**Don't:**

```xml
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

*   Define logic in a **function** or **computed property** in the `<script>` block:

    ```xml
    <script setup lang="ts">
    const formatFullName = (name: string): string => {
      return name
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
    };
    </script>
    ```
*   Use the function in the template for simplicity:

    ```xml
    <div>{{ formatFullName(fullName) }}</div>
    ```

***

**Summary**

1. Use **lowercase** for HTML tags and attributes.
2. Use **PascalCase** for custom components and **kebab-case** for Vue built-in and router components.
3. Use **self-closing tags** when no children are present.
4. Avoid complex expressions in templates — use computed properties or functions.

***

### **6.3 The Script Setup & TypeScript Code**

#### **6.3.1 Defining Props**

In the Composition API, props can be defined using either type-based declaration or runtime declaration.

**It is mandatory to use type-based declarations** for better TypeScript support and maintainability.

When default values are needed, use the `withDefaults` method.

***

**Examples:**

**Type-Based Declaration (Mandatory):**

```typescript
const props = defineProps<{
  propsName: string;
}>();
```

**Type-Based Declaration with Default Values:**

```typescript
const props = withDefaults(
  defineProps<{
    propsName?: string; // Optional with a default value
  }>(),
  {
    propsName: 'Default Name',
  },
);
```

***

**Naming Conventions for Props**

Props names should use **camelCase in the script setup** but must be written in kebab-case when used in the parent component's template.

**Example:**

**Child Component Props Definition:**

```typescript
defineProps<{
  propsName: string;
}>();
```

**Parent Component Usage:**

```xml
<ChildComponent props-name="Anonim" />
```

***

**Additional Notes**

* If the props are not referenced in the `<script setup>` block, avoid unnecessary assignments by omitting `const props`.

**Example:**

```typescript
// Correct: Avoid unnecessary assignment if props aren't used
defineProps<{
  propsName: string;
}>();
```

By following these guidelines, you ensure consistency, clarity, and efficiency in defining and using props in Vue components.

***

#### **6.3.2 Defining Emits**

Similar to `defineProps`, you can define emits in the `<script setup>` block using either type-based or runtime declaration. However, **type-based declarations are preferred** for defining emits due to their conciseness.

**Naming Conventions for Emits**

Emit names should follow the same naming conventions as props:

* Use camelCase for emit names in the script setup.
* Use kebab-case for emit names in the template.

***

**Examples:**

**Type-Based Declaration:**

```typescript
// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  emitName: [payload: string, secondPayload: number]; // Defines the emit with two parameters
}>();
```

Reference: [Typing Component Emits](https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits)

**Template Usage:**

```xml
<ChildComponent @emit-name="doSomething" />
```

```typescript
// Handling the emit with function parameters
const doSomething = (payload: string, secondPayload: number) => {
  console.log(payload, secondPayload); // You can now use the parameters here
};
```

***

**Additional Notes**

* If you don't reference the `emit` function within the `<script setup>` block, avoid unnecessary variable assignments by omitting `const emit`.

**Example:**

```typescript
// Correct: Avoid unnecessary assignment if emit isn't used
defineEmits<{
  emitName: [payload: string];
}>();
```

By following these guidelines, you ensure clear and concise emit definitions and usage, improving the maintainability of your Vue components.

***

#### **6.3.3 Creating** Reactive Variables

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

#### 6.3.4 Creating Non-Reactive Constant Variables

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

#### 6.3.5 Writing Computed Variables

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

#### 6.3.6 Creating Component Functions

* Use **arrow functions**.
* Follow **camelCase** naming conventions.
* Provide a **descriptive function name**.
* Properly annotate **argument types** and **return types**.

**Example**

```typescript
const logMessage = (message: string): void => console.log(message);
```

***

#### 6.3.7 Don't use `var`

No comment, just avoid using `var`.

***

#### 6.3.8 Use `let` Only in Block Scope

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

#### 6.3.9 Don't Ignore ESLint and SonarLint Warnings

Always address warnings and errors from **ESLint** and **SonarLint**. These tools help maintain code quality by enforcing consistent style and catching potential issues.

By addressing the warnings and fixing them, you ensure cleaner, more maintainable code.

***

#### 6.3.10 Avoid Installing New Libraries Unless You Really Need Them

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

#### 6.3.11: Don't Hardcode URLs or Sensitive Data

Sensitive information, like API keys or API URLs, should never be hardcoded in your source code. Instead:

* Use a `.env` file to store them securely.
* Access the values in your code using environment variables (e.g., `process.env.VUE_APP_API_URL`).

This ensures security, makes configuration flexible, and avoids exposing credentials in version control.

***

#### 6.3.12: Use Template Literals with Backticks

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

### **6.4 Creating API Services**

Our front-end application communicates with backend services through REST APIs. We use Axios to simplify and make all API requests more efficient.

For each project, we have an API Services repository that centralizes the creation of service files. This approach makes it modular and easy to manage for future updates.

Follow our guidelines for creating service files:

***

#### **6.4.1 Importing Necessary Modules**

Import only the necessary modules to keep the service files clean.

```typescript
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import createAxiosInstance from './createInstance';
```

***

#### **6.4.2 Creating the Axios Instance**

Create the Axios instance using the `createAxiosInstance` function, which is designed to configure and initialize the Axios client for your application.

It centralizes the API configuration, including base URLs, environment-specific settings, and request/response interceptors.

**Explanation:** `createAxiosInstance` is a utility function that initializes an Axios instance with predefined configurations such as:

* **Base URL and Prefix**: Ensures all requests are routed correctly.
* **Environment Variables**: Dynamically sets the API endpoint based on the environment (`development`, `production`, etc.).
* **Interceptors**: Handles global behaviors for requests or responses, such as logging, authentication, or error handling.

```typescript
const API = createAxiosInstance({ env: 'APP_EXAMPLE_API', prefix: '/api' });
```

***

#### **6.4.3 Creating the Service Object**

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
import { Data } from 'wangsvue/components/datatable/DataTable.vue.d';

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

#### **6.4.4 Service Method Naming and Conventions**

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

#### **6.4.5 Exporting the Service**

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

#### **6.4.6 Type Definitions: DTO and Types Folders**

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

### **6.5 Using the API Method from Services**

After creating the API service, as covered in the previous section, you can now implement the API methods in your `script setup`. Follow the rules below to ensure consistency and maintain best practices:

***

#### **6.5.1 Rules for Using API Methods**

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

#### **6.5.2 Complete Example: Using an API Method**

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

### **6.6 Creating Vue Router Configuration File**

The `router` folder should contain only one `index.ts` configuration file. Here are the rules you need to follow when writing the router configuration.

#### **6.6.1 Rules for Writing Router Configuration**

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

#### **6.6.2 Example Router Configuration**

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

### **6.7 Working with Provide / Inject**

To ensure consistency and maintainability when using Vue's `provide` and `inject` features, it is essential to establish clear standards. These standards will help developers avoid common pitfalls such as naming collisions or untyped injections.

Below is a standardized approach to using `provide` and `inject`, with a focus on using **Injection Keys**.

***

#### **6.7.1 What is an Injection Key?**

An Injection Key is a strongly typed symbol or unique identifier used for `provide` and `inject`. It ensures that the injected values are type-safe and prevents accidental naming conflicts.

***

#### **6.7.2 Rules for Using Provide / Inject with Injection Keys**

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

#### **6.7.3 Example Usage**

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

#### **6.7.4 Benefits of Using Injection Keys**

1. **Type Safety**: Strong typing reduces bugs and improves developer productivity.
2. **Uniqueness**: Symbols prevent key name collisions.
3. **Clarity**: Centralized keys make dependencies easier to manage.
4. **Extensibility**: Injection keys allow for consistent and scalable code as the application grows.

By following these standards, your use of `provide` and `inject` will be robust, maintainable, and aligned with Vue's best practices.

### 6.9 Environment Variables (.env)

#### 6.9.1 Prefix

* All environment variables should begin with either `VUE_APP_` for Production Build or `VITE_APP_` for development.

#### 6.9.2 Naming

* Variable names should be closely match their values.
* **Example:**
  * **Avoid:** `VUE_APP_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com`
  * **Prefer:** `VUE_APP_SETTINGS_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com`

#### 6.9.3 Consistency

If a variable exists with one prefix, its counterpart with the other prefix should also be defined.
