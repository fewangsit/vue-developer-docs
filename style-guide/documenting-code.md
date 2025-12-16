---
noIndex: true
icon: message-code
---

# Documenting Code

Code comments should serve as **guides for clarity and maintenance**, avoiding redundancy and focusing on areas where the intent may not be immediately clear.

### Key Points:

1.  **Avoid Obvious Comments**:\
    Don't repeat what is already clear from the code.

    ```typescript
    // Don't: This is unnecessary.
    // Adds two numbers.
    const addNumbers = (a: number, b: number): number => a + b;
    ```
2. **Explain Purpose or Non-Trivial Logic**:\
   Add comments when the purpose or reasoning might not be immediately clear to someone reading the code.
3.  **Clear Code Needs No Comments**: Write code that’s self-explanatory, so you don’t need comments to explain it.

    **Bad Example** (Unclear Code):

    ```typescript
    let n: Node; // best child node candidate
    for (let node of parentNode.children) {
        if (n == null || node.utility() > n.utility()) {
            n = node;
        }
    }
    return n;
    ```

    **Better Code** (No Comment Needed):

    ```typescript
    let bestChildNode: Node;
    for (let currentNode of parentNode.children) {
        if (!bestChildNode || currentNode.utility() > bestChildNode.utility()) {
            bestChildNode = currentNode;
        }
    }
    return bestChildNode;
    ```
4. **Use JSDoc for Functions/Classes**:\
   Document parameters, return values, and side effects, especially for reusable or complex code.
5.  **Comment Unidiomatic Code**: If you're using non-standard or unusual code, add a comment to explain why.

    **Example**:

    ```typescript
    const value = (new JSONTokener(jsonString)).nextValue();
    // Note: nextValue() can return an object equal to null, but not strictly null
    if (value == null || value.equals(null)) {
        return null;
    }
    ```
6.  **Reference External Code Sources**: If you copied code or used an online solution, provide a link to the original source.\
    \
    **Example**:

    ```typescript
    /** Converts a Drawable to Bitmap. Source: https://stackoverflow.com/a/46018816/2219998 */
    function convertDrawableToBitmap(drawable: Drawable): Bitmap {
        // Code implementation
    }
    ```
7.  **Add Comments When Fixing Bugs**: When fixing bugs, comment the solution or workaround.

    **Example**:

    ```typescript
    // Fixed issue #1425: Mouse events in Firefox 2 would not fire if dragged outside window
    function onMouseMove(event: MouseEvent) { ... }
    ```
8.  **Add Comments On Unfinished Code**: When you’re committing unfinished code/code used for debugging, tag them with a TODO comment, so that you won’t forget to complete them.

    **Example**:

    ```typescript
    // TODO: Add a type to this shallowRef
    const openType = shallowRef({ label: 'Open', value: true });

    // TODO: Delete this log
    console.log(openType)
    ```

***

### Examples

#### **Bad Commenting (Redundant):**

```typescript
// Returns the sum of two numbers
const add = (a: number, b: number): number => {
  return a + b; // Adds a and b
};
```

The function name and implementation are self-explanatory, making these comments unnecessary.

#### **Better Commenting**:

```typescript
/**
 * Function to update the label text and emit events.
 * @param inputElement - the conteneditable span element
 * @param badgeEl - The HTML element representing the label.
 */
const updateLabel = (inputElement: HTMLElement, badgeEl: HTMLElement): void => {
  const text = inputElement.textContent;

  // If the new text content is different from the current label text.
  if (text !== props.label) {
    // Trim the text to removes extra spaces.
    const trimmed = text?.trim() ?? null;

    inputElement.textContent = trimmed;
    emit('update:label', trimmed);

    if (badgeEl && !text) {
      // Remove the badge element from the DOM if the text is empty.
      badgeEl.remove();

      emit('remove');
    }
  }
};
```

#### **When to Comment Inline**:

Use inline comments sparingly for specific steps in complex logic.

```typescript
const calculateDiscount = (price: number, discount: number): number => {
  const maxDiscount = 50; // Business rule: cap discounts at $50.
  const calculatedDiscount = price * (discount / 100);

  // Ensure the discount does not exceed the maximum allowed.
  return Math.min(calculatedDiscount, maxDiscount);
};
```
