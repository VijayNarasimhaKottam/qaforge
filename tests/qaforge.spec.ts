import { test, expect } from '@playwright/test';

test.describe('QAForge E2E Automation Test Suite', () => {

  test('Module 0: Standard Web Elements (Text Box, Radio, Double/Right Clicks)', async ({ page }) => {
    await page.goto('/elements');

    // Fill Text Box
    await page.getByTestId('input-textbox-name').fill('Jane Doe');
    await page.getByTestId('input-textbox-email').fill('jane@qaforge.com');
    await page.getByTestId('btn-submit-textbox').click();
    await expect(page.getByTestId('output-text-box')).toContainText('Jane Doe');

    // Switch to Radio tab
    await page.getByTestId('subtab-radio').click();
    await page.getByTestId('radio-yes').check();
    await expect(page.getByTestId('radio-result-output')).toContainText('Yes');

    // Switch to Buttons tab & test double click and right click
    await page.getByTestId('subtab-buttons').click();
    await page.getByTestId('btn-double-click').dblclick();
    await expect(page.getByTestId('double-click-msg')).toBeVisible();

    await page.getByTestId('btn-right-click').click({ button: 'right' });
    await expect(page.getByTestId('right-click-msg')).toBeVisible();
  });

  test('Module 1: Registration Form submission and client-side validation', async ({ page }) => {
    await page.goto('/forms');

    // Test validation trigger on empty submit
    await page.getByTestId('btn-submit-form').click();
    await expect(page.getByTestId('error-username')).toBeVisible();
    await expect(page.getByTestId('error-email')).toBeVisible();

    // Fill registration form
    await page.getByTestId('input-username').fill('automation_user');
    await page.getByTestId('input-email').fill('tester@qaforge.com');
    await page.getByTestId('input-password').fill('SecurePassword123!');

    // Check strength indicator
    await expect(page.getByTestId('password-strength-indicator')).toContainText('Strong');

    // Fill Phone & Bio
    await page.getByTestId('input-phone-number').fill('555-0199');
    await page.getByTestId('textarea-bio').fill('E2E automation engineer script execution.');
    await expect(page.getByTestId('char-counter')).toContainText('/200');

    // Select custom DOB date
    await page.getByTestId('dob-picker-button').click();
    await expect(page.getByTestId('dob-calendar-popover')).toBeVisible();
    await page.getByRole('button', { name: '15' }).first().click();

    // Submit form
    await page.getByTestId('btn-submit-form').click();

    // Assert submitted JSON container output
    const jsonContainer = page.getByTestId('submitted-json-container');
    await expect(jsonContainer).toBeVisible();
    await expect(jsonContainer).toContainText('automation_user');
    await expect(jsonContainer).toContainText('tester@qaforge.com');
  });

  test('Module 2: Data Grid search, column sort, and pagination', async ({ page }) => {
    await page.goto('/data-grid');

    // Assert table rendered
    await expect(page.getByTestId('employee-table')).toBeVisible();

    // Filter by search
    await page.getByTestId('input-grid-search').fill('Senior');
    await page.waitForTimeout(300);

    // Verify search filter applied
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();

    // Test select row bulk action bar
    const firstCheckbox = page.locator('tbody tr input[type="checkbox"]').first();
    await firstCheckbox.check();
    await expect(page.getByTestId('floating-action-bar')).toBeVisible();
  });

  test('Module 3: Dialogs, custom modals, and toasts', async ({ page }) => {
    await page.goto('/dialogs');

    // Test native confirm dialog acceptance
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await page.getByTestId('btn-trigger-confirm').click();
    await expect(page.getByTestId('native-result-text')).toContainText('OK (true)');

    // Test Custom Delete Confirm Modal
    await page.getByTestId('btn-open-confirm-modal').click();
    await expect(page.getByTestId('modal-confirm-delete')).toBeVisible();
    await page.getByTestId('btn-modal-cancel').click();
    await expect(page.getByTestId('modal-confirm-delete')).not.toBeVisible();

    // Test Toast system
    await page.getByTestId('btn-toast-success').click();
    await expect(page.getByTestId('toast-container')).toBeVisible();
  });

  test('Module 4: Interactive Widgets - Accordions, Stepper Wizard, Hover Tooltip', async ({ page }) => {
    await page.goto('/widgets');

    // Test Accordion
    await page.getByTestId('accordion-header-2').click();
    await expect(page.getByTestId('accordion-content-2')).toBeVisible();

    // Test Stepper Wizard
    await page.getByTestId('wizard-input-name').fill('Acme Corp Test');
    await page.getByTestId('wizard-next-btn').click();
    await expect(page.getByTestId('wizard-step-indicator-2')).toHaveClass(/text-teal/);

    // Test Hover Tooltip vs Click Popover
    await page.getByTestId('tooltip-hover-trigger').hover();
    await expect(page.getByTestId('hover-tooltip-content')).toBeVisible();
  });

  test('Module 5: Drag, Drop & Sortable List', async ({ page }) => {
    await page.goto('/interactions');

    // Test Kanban Card Drag and Drop
    const card = page.getByTestId('kanban-card-task-101');
    const targetCol = page.getByTestId('kanban-column-done');
    await card.dragTo(targetCol);

    // Save Order List
    await page.getByTestId('btn-save-order').click();
    await expect(page.getByTestId('sort-order-output')).toBeVisible();
  });

  test('Module 6: Authentication & JWT Session Token', async ({ page }) => {
    await page.goto('/login');

    // Quick fill user credentials & login
    await page.getByTestId('btn-quick-fill-user').click();
    await page.getByTestId('btn-submit-login').click();

    // Verify session active
    await expect(page.getByTestId('session-jwt-display')).toBeVisible();
    await expect(page.getByTestId('btn-logout')).toBeVisible();
  });

  test('Module 7: Shopping Cart & Checkout Flow', async ({ page }) => {
    await page.goto('/store');

    // Add item to cart
    await page.getByTestId('btn-add-to-cart-prod-001').click();
    await expect(page.getByTestId('cart-icon-count')).toHaveText('1');

    // Open Cart Drawer
    await page.getByTestId('cart-drawer-toggle').click();

    // Process checkout
    await page.getByTestId('btn-checkout').click();
    await expect(page.getByTestId('checkout-status-msg')).toContainText('processed successfully');
  });

  test('Module 7: Advanced Challenges - Delayed Enable & Flaky Retries', async ({ page }) => {
    await page.goto('/challenges');

    // Delayed button wait
    const delayedBtn = page.getByTestId('btn-delayed-enable');
    await delayedBtn.waitFor({ state: 'visible', timeout: 10000 });
    await expect(delayedBtn).toBeEnabled();

    // Shadow DOM element test
    const shadowHost = page.getByTestId('shadow-host-component');
    await expect(shadowHost).toBeVisible();
  });

});
