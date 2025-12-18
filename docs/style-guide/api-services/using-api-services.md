---
noIndex: true
icon: play
---

# Using API Services

After creating the API service, you can now implement the API methods in your `script setup`. Follow the rules below to ensure consistency and maintain best practices.

## Rules for Using API Methods

### 1. Import the Service Object

Use the same name as the Service Object created in the service file. For example, if you created `ExampleService`, import it as follows:

```typescript
import ExampleService from '@/services/example.service';
```

**Note:** Do not include the `.ts` file extension in the import.

### 2. Use Asynchronous Arrow Functions

Wrap the API call inside an asynchronous arrow function:

```typescript
const getExampleDetail = async (): Promise<void> => {
    // Your code implementation here
};
```

### 3. Use `try-catch` for Error Handling

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

### 4. Destructure Data from the Axios Response

Extract only the data or properties you need from the Axios Response:

```typescript
const { data } = await ExampleService.getDetail(id);
```

**Other Axios Response Properties:**
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

### 5. Always Use the `await` Keyword

Ensure all API calls use `await` to handle the promise.

## Complete Example: Using an API Method

Below is an example implementation of the `getExampleDetail` method using the `ExampleService` and `shallowRef` for storing the data response:

```vue
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

## Why Use `shallowRef`?

We use `shallowRef` for storing API response data like `exampleDetail` because it ensures reactivity at the top level without making all nested properties reactive. This approach is ideal in the following scenarios:

1. **No Nested Property Updates**: In our example, we will never directly change the nested properties of `exampleDetail.value`. Instead, we always update the entire object (e.g., by fetching new data from the API).

2. **Performance Optimization**: Making all nested properties reactive adds unnecessary overhead, especially for complex objects with deep nesting. By using `shallowRef`, we minimize this overhead and improve performance.

3. **Clarity of Intent**: `shallowRef` makes it clear that we only care about the top-level reactivity of the `exampleDetail` object, aligning with our intended usage.