# QAForge — Selector Reference Directory (`data-testid`)

This document lists all stable and intentionally dynamic `data-testid` locators on **QAForge**. Automation engineers can use this document as a quick reference or "answer key" when writing Playwright, Selenium, or Cypress scripts.

---

## Global Header & Navigation

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `brand-logo` | Link | QAForge brand logo (returns to `/`) |
| `toggle-cheat-sheet` | Button | Toggle overlay badges showing `data-testid` values |
| `nav-forms` | Link | Navigation link to Module 1 (`/forms`) |
| `nav-data-grid` | Link | Navigation link to Module 2 (`/data-grid`) |
| `nav-dialogs` | Link | Navigation link to Module 3 (`/dialogs`) |
| `nav-widgets` | Link | Navigation link to Module 4 (`/widgets`) |
| `nav-interactions` | Link | Navigation link to Module 5 (`/interactions`) |
| `nav-store` | Link | Navigation link to Module 6 (`/store`) |
| `nav-challenges` | Link | Navigation link to Module 7 (`/challenges`) |
| `nav-sitemap` | Link | Navigation link to Sitemap (`/sitemap`) |
| `cart-icon-count` | Badge | Number of items currently in shopping cart |

---

## Module 0: Core Web Elements (`/elements`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `input-textbox-name` | Input | Text Box full name input |
| `input-textbox-email` | Input | Text Box email address input |
| `input-textbox-current-address` | Textarea | Text Box current address input |
| `input-textbox-permanent-address` | Textarea | Text Box permanent address input |
| `btn-submit-textbox` | Button | Submits text box form |
| `output-text-box` | Container | Rendered text box output card |
| `btn-expand-all` | Button | Expands all tree nodes in Check Box directory |
| `btn-collapse-all` | Button | Collapses all tree nodes in Check Box directory |
| `btn-toggle-expand-{node}` | Button | Expand/collapse toggle button for node (`home`, `desktop`, `documents`, `workspace`, `office`, `downloads`) |
| `checkbox-home` | Checkbox | Home root directory checkbox (selects/deselects all) |
| `checkbox-desktop` | Checkbox | Desktop directory tree checkbox |
| `checkbox-documents` | Checkbox | Documents directory tree checkbox |
| `checkbox-workspace` | Checkbox | WorkSpace directory tree checkbox |
| `checkbox-office` | Checkbox | Office directory tree checkbox |
| `checkbox-downloads` | Checkbox | Downloads directory tree checkbox |
| `checkbox-result-output` | Container | Selected checkboxes output text |
| `radio-yes` | Radio | Radio option: Yes |
| `radio-impressive` | Radio | Radio option: Impressive |
| `radio-no` | Radio | Radio option: No (disabled) |
| `btn-double-click` | Button | Triggers on `onDoubleClick` event |
| `btn-right-click` | Button | Triggers on `onContextMenu` event |
| `btn-dynamic-click` | Button | Triggers standard `onClick` event |
| `btn-hover-me` | Button | Hover button triggering tooltip on `page.hover()` |
| `btn-hover-tooltip` | Button | Hover me button triggering "You hovered over the Button" tooltip |
| `hover-button-tooltip` | Container | Button tooltip card displayed on hover |
| `input-hover-tooltip` | Input | Text field triggering "You hovered over the text field" tooltip |
| `hover-input-tooltip` | Container | Text field tooltip displayed on hover |
| `link-hover-tooltip` | Custom | Text link triggering "You hovered over the Contrary link" tooltip |
| `hover-link-tooltip` | Container | Text link tooltip displayed on hover |
| `link-simple` | Link | Simple home navigation link |
| `btn-api-created` | Button | Triggers 201 Created API call simulation |
| `btn-api-bad-request` | Button | Triggers 400 Bad Request API call simulation |
| `img-valid` | Image | Valid image element |
| `img-broken` | Image | Broken 404 image element |
| `btn-download-sample` | Button | Downloads `sampleFile.txt` file |
| `input-upload-file` | Input | Standard file upload input |
| `btn-enable-5s` | Button | Enables after 5-second timer |
| `btn-color-change` | Button | Changes text color after 5-second timer |
| `btn-visible-5s` | Button | Becomes visible after 5-second timer |

---

## Module 1: Form Fields & Validation (`/forms`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `input-username` | Input | Username text input field |
| `input-email` | Input | Email address text input field |
| `input-password` | Input | Password input field |
| `password-strength-indicator` | Badge | Password strength level (Weak/Medium/Strong) |
| `select-country-code` | Select | Phone country code selector (`+1`, `+44`, `+91`, etc.) |
| `input-phone-number` | Input | Phone number input field |
| `dob-picker-button` | Button | Custom date picker popover trigger |
| `dob-calendar-popover` | Container | Custom calendar grid container |
| `multi-select-input` | Input | Searchable skills tag input |
| `tag-chip-{skill}` | Badge | Selected skill tag chip |
| `file-dropzone` | Container | Drag-and-drop file upload target area |
| `file-input-hidden` | Input (Hidden) | Hidden `<input type="file">` element |
| `uploaded-file-name` | Container | Displays name of uploaded file |
| `textarea-bio` | Textarea | Multi-line biography text area |
| `char-counter` | Container | Live character counter badge (e.g., `42/200`) |
| `signature-canvas` | Canvas | HTML5 signature drawing pad |
| `btn-clear-signature` | Button | Clears signature canvas |
| `btn-submit-form` | Button | Submits registration form |
| `error-username` | Error | Inline validation error for username |
| `error-email` | Error | Inline validation error for email |
| `error-password` | Error | Inline validation error for password |
| `submitted-json-container` | Container | Formatted JSON output container of submitted form data |

---

## Module 2: Tables & Data Grid (`/data-grid`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `input-grid-search` | Input | Search filter for employee name, email, or role |
| `select-dept-filter` | Select | Department filter dropdown |
| `btn-columns-menu` | Button | Show/hide columns menu trigger |
| `btn-export-csv` | Button | Exports filtered table data as CSV file download |
| `employee-table` | Table | Main employee directory table element |
| `select-all-checkbox` | Checkbox | Header select all rows checkbox |
| `floating-action-bar` | Container | Floating bar visible when ≥1 row is selected |
| `btn-bulk-delete` | Button | Bulk deletes all checked rows |
| `btn-row-edit-{id}` | Button | Enables inline row editing for employee `id` |
| `btn-row-save-{id}` | Button | Saves inline edit changes for employee `id` |
| `btn-row-cancel-{id}` | Button | Cancels inline row editing |
| `pagination-prev` | Button | Previous table page |
| `pagination-next` | Button | Next table page |
| `tab-slow-network` | Button | Switches to 2.5s simulated network delay table |
| `skeleton-loader` | Skeleton | Animated loading row skeleton during fetch |

---

## Module 3: Dialogs, Alerts, Windows & Frames (`/dialogs`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `btn-trigger-alert` | Button | Triggers native `window.alert()` |
| `btn-trigger-confirm` | Button | Triggers native `window.confirm()` |
| `btn-trigger-prompt` | Button | Triggers native `window.prompt()` |
| `native-result-text` | Container | Output text showing native dialog result |
| `btn-open-confirm-modal` | Button | Opens custom Confirm Delete modal |
| `modal-confirm-delete` | Modal | Confirm delete backdrop & dialog card |
| `btn-open-parent-modal` | Button | Opens parent modal for nested modal practice |
| `btn-open-child-modal` | Button | Button inside parent modal that launches child modal |
| `modal-child` | Modal | Inner nested child modal dialog |
| `btn-open-scroll-modal` | Button | Opens scrollable region modal |
| `link-open-tab` | Link | Opens sitemap in new tab (`target="_blank"`) |
| `btn-open-popup-window` | Button | Triggers `window.open()` popup window |
| `iframe-same-origin` | iFrame | Same-origin iframe containing counter button |
| `iframe-nested-outer` | iFrame | Outer iframe containing nested inner iframe |
| `btn-toast-success` | Button | Triggers success toast notification |
| `btn-toast-error` | Button | Triggers error toast notification |
| `btn-toast-warning` | Button | Triggers warning toast notification |
| `toast-container` | Container | Floating container holding active toast notifications |

---

## Module 4: Interactive Widgets (`/widgets`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `accordion-header-1` | Button | Accordion item 1 toggle header |
| `tab-button-profile` | Button | Profile tab switcher |
| `tab-button-settings` | Button | Settings tab switcher |
| `tree-node-src` | Button | Collapsible tree view folder node |
| `input-autocomplete` | Input | Debounced search input field (300ms delay) |
| `autocomplete-dropdown` | Container | Search results dropdown container |
| `range-slider` | Input (Range) | Custom range slider control |
| `star-rating-{1..5}` | Button | Star rating selection buttons |
| `input-color-picker` | Input (Color) | Color picker input element |
| `wizard-next-btn` | Button | Next/Finish step button in 3-step wizard |
| `tooltip-hover-trigger` | Button | Hover-triggered tooltip button (`page.hover()`) |
| `popover-click-trigger` | Button | Click-triggered popover button (`page.click()`) |
| `btn-load-more` | Button | Loads additional items into list |

---

## Module 5: Drag, Drop & Canvas (`/interactions`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `kanban-column-todo` | Column | Kanban column for To Do tasks |
| `kanban-column-in-progress` | Column | Kanban column for In Progress tasks |
| `kanban-column-done` | Column | Kanban column for Done tasks |
| `kanban-card-{id}` | Card | Draggable task card |
| `splitter-bar` | Handle | Resizable panel vertical splitter handle |
| `btn-open-draggable-modal` | Button | Opens draggable modal |
| `modal-draggable` | Modal | Floating draggable modal dialog card |
| `sortable-item-{id}` | List Item | Reorderable sortable list item |
| `btn-save-order` | Button | Outputs ordered array to `sort-order-output` |
| `drawing-canvas` | Canvas | HTML5 drawing pad canvas |
| `btn-clear-canvas` | Button | Clears drawing canvas |

---

## Module 6: Auth & Accounts (`/login`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `input-login-email` | Input | Account login email address input |
| `input-login-password` | Input | Account login password input |
| `btn-submit-login` | Button | Authenticates login & issues JWT token |
| `btn-quick-fill-user` | Button | Pre-fills normal user credentials (`user@qaforge.com`) |
| `btn-quick-fill-admin` | Button | Pre-fills admin credentials (`admin@qaforge.com`) |
| `btn-logout` | Button | Terminates active session token |
| `profile-bio-textarea` | Textarea | Editable active user profile bio |
| `session-jwt-display` | Container | Active session JWT token inspector box |

---

## Module 7: Mini Store App (`/store`)

| Locator (`data-testid`) | Element Type | Description |
| :--- | :--- | :--- |
| `btn-add-to-cart-{id}` | Button | Adds product item to cart |
| `cart-icon-count` | Badge | Number of items currently in shopping cart |
| `cart-drawer-toggle` | Button | Opens shopping cart drawer |
| `cart-item-qty-inc-{id}` | Button | Increases item quantity in cart |
| `cart-item-qty-dec-{id}` | Button | Decreases item quantity in cart |
| `toggle-payment-outcome` | Checkbox | Toggles Payment Success vs. Failure (Error 402) simulation |
| `btn-checkout` | Button | Submits order payment |
| `tab-manage-inventory` | Button | Admin-only inventory management tab |

---

## Module 7: Locator & Timing Challenges (`/challenges`)

| Locator (`data-testid`) | Element Type | Stability | Challenge Description |
| :--- | :--- | :--- | :--- |
| `dynamic-id-element` | Button | **Dynamic** | Button HTML `id="..."` changes randomly on every load/click. Locate by role/text. |
| `btn-delayed-enable` | Button | Stable | Button becomes clickable after random 1–4s delay (`locator.waitFor()`). |
| `shadow-host-component` | Custom | Stable | Encapsulated Web Component Shadow DOM root containing internal inputs & buttons. |
| `btn-flaky-click` | Button | Stable | Ignores clicks ~30% of the time (requires Playwright retry logic). |
| `btn-obscured-target` | Button | Stable | Target button covered by a temporary banner for 3 seconds before auto-dismissing. |
