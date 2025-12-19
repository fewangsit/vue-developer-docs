---
icon: code
---

# Type Definitions

Ensure that type definitions for request and response bodies are separated and placed in appropriate folders for clarity and reusability.

## Folder Structure Rules

1. **Request DTOs**: Place all interfaces for entities that are sent to the API (such as request bodies and query parameters) in the `dto` folder.
2. **Response Types**: Place all interfaces for the data returned by the API in the `types` folder.
3. **File Naming Convention**: Use the same name for related files to maintain consistency.
4. **Interface Naming Convention**: The interface name should be clear and descriptive. Using a noun, not a verb.
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

## Example File Structure

```
src/
├── services/
│   ├── example.service.ts
├── dto/
│   ├── exampleService.dto.ts
├── types/
│   ├── exampleService.type.ts
```

## Example DTO (Request) File

```typescript
export interface CreateItemBody {
  name: string;
  description: string;
}
```

## Example Type (Response) File

```typescript
export interface GetDetailResponseBody {
  data: User;
}
```
