---
icon: gear-code
---

# General Principles

## 1 Naming Conventions

### 1.1 File Naming

**Vue Components & Module Folders:** Use `PascalCase` **TypeScript Files:** Use `camelCase` for `.ts` files (types, DTOs, utils, etc.)

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

### 1.2 Component Organization

Organize components hierarchically from general to specific. This makes finding and understanding components much easier as your app grows.

**Naming Pattern:**

```plaintext
[Module][Feature][Component][Subcomponent].vue
```

**Structure breakdown:**

* **Module**: Main feature area (e.g., "Borrow")
* **Feature**: Specific section (e.g., "History")
* **Component**: UI element type (e.g., "Page", "Table")
* **Subcomponent**: Specific functionality (e.g., "Filter", "Buttons")

**Example Structure:**

```plaintext
📁 Borrow/
  📁 BorrowHistory/
    📄 BorrowHistoryPage.vue        # Main page component
    📄 BorrowHistoryFilter.vue      # Search and filter controls
    📄 BorrowHistoryTable.vue       # Data table display
  📁 BorrowTransaction/
    📄 BorrowTransactionPage.vue    # Transaction overview page
    📄 BorrowTransactionForm.vue    # Create/edit transaction form
    📄 BorrowTransactionDetails.vue # Transaction detail view
  📁 Borrowed/
    📄 BorrowedList.vue             # List of borrowed items
    📄 BorrowedItemDetail.vue       # Individual item details
```

### 1.3 Variable Naming Conventions

To ensure readability, maintainability, and consistency across your codebase, follow these naming conventions:

1. **PascalCase**
   * **Use for:** Types, interfaces, and classes.
   * **Example:**
     * `UserProfile`
     * `ApiResponse`
     * `ProductItem`
2. **camelCase**
   * **Use for:** Variables, methods, and function names.
   * **Example:**
     * `userProfile`
     * `getUserInfo()`
     * `setUserDetails()`
     * `totalAmount`
3. **UPPERCASE\_SNAKE\_CASE** (for constants)
   * **Use for:** Constants or values that should remain unchanged throughout the program.
   * **Example:**
     * `MAX_USER_COUNT`
     * `API_URL`
4. **Descriptive Naming:**
   * **Use meaningful names** that clearly describe the variable's purpose.
   * Avoid vague names like `data`, `temp`, `obj`, and `stuff`. Instead, use names like `userProfile`, `productList`, or `orderDetails`.
5. **Boolean Variables:**
   * **Use** `is`, `has`, or `can` as prefixes for boolean variables to indicate true/false values.
   * **Example:**
     * `isLoggedIn`
     * `hasPermission`
     * `canSubmitForm`

## 2 Import and Export Conventions

### 2.1 Prefer Named Imports Over Default

Use named imports for clarity and tree-shaking benefits.

```typescript
// Good
import { computed, ref } from 'vue';

// Avoid (unless necessary for default exports)
import Vue from 'vue';
```

### 2.2 Use Absolute Paths with Aliases

Leverage Vite's path aliases (e.g., `@/components`) for imports longer than 2 levels.

```typescript
// Good
import UserCard from '@/components/UserCard.vue';

// Avoid (for deep paths)
import UserCard from '../../../components/UserCard.vue';
```

## 3 General Best Practices

### 3.1 Use `let` Only in Block Scope

Use `let` only inside block or function scopes. Avoid using it in global scope to ensure proper scoping and prevent unexpected behavior.

**Example:**

```typescript
export const getStatusSeverity = (status?: string): Severity => {
  let severity: Severity;

  switch (status) {
    case 'Available':
      severity = 'success';
      break;
    case 'Damaged':
      severity = 'danger';
      break;
    default:
      severity = 'primary';
  }

  return severity;
};
```

**Avoid:**

```vue
<script setup lang="ts">
let count = 0;  // Avoid using `let` in the global scope of the script
</script>
```

### 3.2 Don't Ignore ESLint Warnings

Always address warnings and errors from **ESLint**. This tools help maintain code quality by enforcing consistent style and catching potential issues.

By addressing the warnings and fixing them, you ensure cleaner, more maintainable code.

Some warning or errors can be autofixed by ESLint. Run `pnpm lint` to fix them.

### 3.3 Avoid Installing New Libraries Unless You Really Need Them

Try to write your code using plain TypeScript or libraries you already have.

For example, when formatting dates, you could install a library to help, but it's better to format them using TypeScript instead.

### 3.4 Don't Hardcode URLs or Sensitive Data

Sensitive information, like API keys or API URLs, should never be hardcoded in your source code. Instead:

* Use a `.env` file to store them securely.
* Access the values in your code using environment variables (e.g., `import.meta.env.VITE_API_URL`). [Environment Variables](../configuration-environment.md#environment-variables)

### 3.5 Use Template Literals with Backticks

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
