---
noIndex: true
icon: play
---

# Using API Services

## Rules for Using API Methods

1. Import the Service Object
Use the same name as the Service Object created in the service file. For example, if you created `ExampleService`, import it as follows:

2. Use Asynchronous Arrow Functions
Wrap the API call inside an asynchronous arrow function

3. Use `try-catch` for Error Handling
Always use `try-catch` blocks instead of chaining `then` and `catch` for better readability and error handling:

4. Destructure Data from the Axios Response
Extract only the data or properties you need from the Axios Response

## Example

```typescript
import ExampleService from '@/services/example.service';

const exampleDetail = shallowRef<DetailResponse>();

const getExampleDetail = async (): Promise<void> => {
    try {
        const { data } = await ExampleService.getDetail(id);
        exampleDetail.value = data.data;
    } catch (error) {
        console.error(error);
        toast.add({
            message: 'Failed to fetch example detail. Please try again.',
            error,
        })
    }
};
```
