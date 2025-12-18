---
noIndex: true
icon: server
---

# Creating API Services

We use Axios for all API communication. Organize your API calls into service files to keep them modular and maintainable.

## Basic Setup

Import what you need:
```typescript
import { AxiosResponse } from 'axios';
import createAxiosInstance from './createInstance';
```

Create your API instance:
```typescript
const API = createAxiosInstance({ env: 'APP_EXAMPLE_API', prefix: '/api' });
```

This handles base URLs, environment settings, and interceptors automatically.

## Creating the Service Object

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

## Service Method Naming and Conventions

* **Use PascalCase** for the service object name.
* **Separate each object method with a single line spacing** for readability.
* Use **arrow functions** and include the `return` statement.
* Always define the type of **params**, **body**, and **return value** as `Promise<AxiosResponse<YourResponseBody>>`.
* Use **camelCase** for the service method name.
* Start each method name with an appropriate **HTTP method** such as `get`, `post`, `put`, `delete`, etc.
* Add a descriptive name after the HTTP method to indicate what the API method does (e.g., `getUserDetail` for getting user details).
* Don't concatenate the params object to the URL; instead, pass the params to the axios request config.

**Do:**
```typescript
return API.get('/projects-list', { params });
```

**Don't:**
```typescript
const paramsString = `status=${status}&sort=${sort}`;
const url = `/projects-list?${paramsString}`;
return API.get(url);
```

## Exporting the Service

Finally, export the service object as the default export of the module.

```typescript
export default ExampleService;
```

You'll also need to export the service in the main.ts file of the repository.

```typescript
// main.ts
export { default as ExampleService } from './src/services/example.service';
```