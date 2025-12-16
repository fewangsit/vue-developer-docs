---
noIndex: true
icon: globe-pointer
---

# End To End Testing

Create test files under the `cypress/e2e` directory. Use the custom commands to interact with elements and perform actions.

#### Guidelines for Test File Structure <a href="#guidelines-for-test-file-structure" id="guidelines-for-test-file-structure"></a>

1. **File Naming**: Use PascalCase for file names with the extension `.cy.spec.ts`, placed under the `cypress/e2e` directory. The file name should match the scope or page being tested.
   * Example: When testing the Home page, the file name should be `HomePage.cy.spec.ts`.
2. **Top-Level Describe**: Each spec file should only contain one top-level `describe`, which represents the page or component being tested. Additional `describe` blocks can be used to group similar actions on the same page.
3. **Component Accessibility**: Write code that is easy to test by adding custom data attributes:
   * Use `data-wv-name` for the root element of a component.
   * Use `data-wv-section` for each section within a component.

#### Example Test: `Example.cy.spec.ts` <a href="#example-test-examplecyspects" id="example-test-examplecyspects"></a>

```typescript
Copydescribe('Example Test', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Should load the main section', () => {
    cy.getSection('main').should('exist');
  });

  it('Should find an element by name', () => {
    cy.getByName('submit-button').click();
    cy.get('body').should('contain', 'Submission successful');
  });

  it('Should find an element by custom data attribute', () => {
    cy.getByData('role', 'admin').should('exist');
  });
});
```

<br>
