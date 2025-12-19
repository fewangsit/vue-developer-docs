---
icon: code-commit
---

# Git Conventional Commits

### 1. Commit Types

When making commits, follow these guidelines for clear communication about the nature of the changes.

* **fix**: Resolve an error or bug.
* **feat**: Add a new feature.
* **docs**: Documentation-related changes.
* **chore**: Changes related to project configurations.
* **refactor**: Restructure the code.
* **ci**: Changes related to continuous integration scripts/files.
* **test**: Changes related to testing.
* **style**: Changes related to design, such as background color.

### 2. Commit Format

```bash
<type>(Commit Scope): <short description>

[Optional Commit Body]

[Optional Footer or Breaking Change Note]
```

### 3. Example

```bash
fix(A5xw3u3K): bulk action not properly works

- Bulk action should applying the selected action on Apply button clicked.
- The label should be back into 'Bulk Action' on Apply button clicked.
```
