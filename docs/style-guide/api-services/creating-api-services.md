---
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

```typescript
const ExampleService = {
  getList: (params?: GetListQueryParams): Promise<AxiosResponse<FetchListResponse<ListItem>>> => {
    return API.get('/list', { params });
  },

  getDetail: (id: string): Promise<AxiosResponse<FetchDetailResponse<Item>>> => {
    return API.get(`/detail/${id}`);
  },

  postCreateItem: (body: User): Promise<AxiosResponse> => {
    return API.post('/create', body);
  },

  putEdit: (id: string, body: User): Promise<AxiosResponse> => {
    return API.put(`/edit/${id}`, body);
  },

  deleteItem: (id: string, body: User): Promise<AxiosResponse> => {
    return API.delete(`/delete/${id}`, { data: body });
  },
};
```

## Service Method Naming and Conventions

* **Use PascalCase** for the service object name.
* **Separate each object method with a single line spacing** for readability.
* Always define the type of **params**, **body**, and **return value** as `Promise<AxiosResponse<YourResponseBody>>`.
* Use **camelCase** for the service method name.
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
