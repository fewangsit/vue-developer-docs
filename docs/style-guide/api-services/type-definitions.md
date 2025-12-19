---
icon: code
---

# Type Definitions

Ensure that type definitions for request and response bodies are separated and placed in appropriate folders for clarity and reusability.

## Folder Structure Rules

1. **Request DTOs**: Place all interfaces for entities that are sent to the API (such as request bodies and query parameters) in the `dto` folder.
2. **Response Types**: Place all interfaces for the data returned by the API in the `types` folder.
3. **File Naming Convention**: Use the same name for related files to maintain consistency.

## Example File Structure

```
src/
├── services/
│   ├── example.service.ts        // Service file containing API methods
├── dto/
│   ├── exampleService.dto.ts    // Request DTOs (e.g., for request bodies and params)
├── types/
│   ├── exampleService.type.ts   // Response types (e.g., for API responses)
```

## Example DTO (Request) File

**File:** `src/dto/exampleService.dto.ts`

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

## Example Type (Response) File

**File:** `src/types/exampleService.type.ts`

```typescript
export interface GetListResponseBody extends FetchResponse<User> {}

export interface GetDetailResponseBody {
  data: User;
}
```

## Benefits

* **Separation of Concerns**: Clear distinction between request and response data structures
* **Reusability**: Types can be easily imported and reused across different parts of the application
* **Maintainability**: Changes to API contracts are localized to specific files
* **Type Safety**: Strong typing ensures compile-time validation of API interactions
