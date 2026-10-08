# User Stories — Homepage Banner Management

## Story: Admin Can Create Banner Themes

**User Story ID**: BR1.1

As an **admin**, I want to **create banner themes** with images and link URLs so that I can display rotating promotional content on the homepage.

**Acceptance Criteria (Given/When/Then)**:

- **Given** I am on the admin dashboard, **when** I navigate to the banner management section, **then** I should see a form to create a new banner theme.
- **Given** the create banner form is displayed, **when** I upload an image, set a link URL, and specify a display order, **then** the banner theme should be saved and available for the slider.
- **Given** a banner theme is created, **when** I view the banner list, **then** I should see the image preview, link URL, and display order.

**Edge Cases**:
- Uploading an invalid image format should show an error and prevent saving.
- Leaving the link URL empty should show a validation error.
- Display order must be a positive integer; non-numeric values should be rejected.

---

## Story: Admin Can Edit Banner Themes

**User Story ID**: BR1.2

As an **admin**, I want to **edit existing banner themes** so that I can update images, links, or display order.

**Acceptance Criteria (Given/When/Then)**:

- **Given** I am on the admin dashboard, **when** I navigate to the banner management section and select an existing banner to edit, **then** I should see a pre-populated form with the current banner details.
- **Given** the edit form is displayed, **when** I update the image, link URL, or display order and submit, **then** the banner theme should be updated and reflected in the homepage slider.
- **Given** an updated banner is saved, **when** I view the banner list, **then** I should see the updated information.

**Edge Cases**:
- Updating to an invalid image format should show an error and prevent saving.
- Changing the link URL to an empty value should show a validation error.

---

## Story: Admin Can Delete Banner Themes

**User Story ID**: BR1.3

As an **admin**, I want to **delete banner themes** so that I can remove outdated or irrelevant promotional content.

**Acceptance Criteria (Given/When/Then)**:

- **Given** I am on the admin dashboard, **when** I navigate to the banner management section and select a banner to delete, **then** I should see a confirmation dialog.
- **Given** I confirm the deletion, **when** the banner is removed, **then** it should no longer appear in the homepage slider.
- **Given** a banner is deleted, **when** I view the banner list, **then** the banner should be removed from the list.

**Edge Cases**:
- Attempting to delete a banner that is currently active should show a warning and prevent deletion.
- Deletion should be irreversible; a restored backup would be required to recover the banner.

---

## Story: Visitor Sees Homepage Banner Slider

**User Story ID**: BR1.4

As a **website visitor**, I want to **see a rotating banner slider** on the homepage so that I can view featured promotions and collections.

**Acceptance Criteria (Given/When/Then)**:

- **Given** the homepage loads, **when** the banner slider component mounts, **then** it should display the first banner theme.
- **Given** the banner slider is displaying, **when** the 10-second transition interval elapses, **then** the slider should automatically advance to the next banner theme.
- **Given** the last banner theme is displayed, **when** the transition occurs, **then** the slider should loop back to the first banner theme.
- **Given** the banner slider is displayed, **when** a user hovers over the slider, **then** the automatic transition should pause.
- **Given** the user moves the mouse away from the slider, **when** the slider resumes, **then** the automatic transition should continue from the current position.

**Edge Cases**:
- If no banner themes are configured, the slider should display a placeholder message: "No banners configured".
- If a banner image fails to load, a fallback placeholder should be displayed with the alt text.
- The slider should display between 3 to 10 banner themes as configured by the admin.

---

## Story: Visitor Can Navigate Banner Slider Manually

**User Story ID**: BR1.5

As a **website visitor**, I want to **manually navigate** the banner slider so that I can view specific banners at my own pace.

**Acceptance Criteria (Given/When/Then)**:

- **Given** the banner slider is displayed, **when** I click the left navigation arrow, **then** the slider should transition to the previous banner theme.
- **Given** the banner slider is displayed, **when** I click the right navigation arrow, **then** the slider should transition to the next banner theme.
- **Given** I am on the first banner and click the left arrow, **then** the slider should loop to the last banner.
- **Given** I am on the last banner and click the right arrow, **then** the slider should loop to the first banner.

**Edge Cases**:
- Manual navigation should reset the automatic transition timer.
- If only one banner theme is configured, navigation arrows should be hidden or disabled.

---

## Story: Banner Slider Responsive Behavior

**User Story ID**: BR1.6

As a **website visitor** on any device, I want the **banner slider to be responsive** so that it adapts to different screen sizes.

**Acceptance Criteria (Given/When/Then)**:

- **Given** the browser window is resized to mobile width (320px), **when** the slider renders, **then** it should display full-width banner images with appropriate typography scaling.
- **Given** the browser window is resized to tablet width (768px), **when** the slider renders, **then** it should display banner images with a maximum width constraint.
- **Given** the browser window is resized to desktop width (1200px+), **when** the slider renders, **then** it should display the full slider with navigation arrows visible.

**Edge Cases**:
- The slider should not break layout when the number of visible banners changes based on screen size.
- Touch swipe gestures should navigate the slider on mobile devices.