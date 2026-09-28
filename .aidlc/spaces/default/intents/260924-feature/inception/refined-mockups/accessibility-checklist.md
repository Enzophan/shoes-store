# Accessibility Checklist (WCAG 2.1 AA)

## Color Contrast
- [ ] Text contrast ratio: minimum 4.5:1 against background
- [ ] Large text (18pt+ or 14pt bold+): minimum 3:1 against background
- [ ] UI components and graphics: minimum 3:1 against background
- [ ] Brand logos and decorative elements exempt
- [ ] Focus indicator contrast: minimum 3:1 against UI component

## Keyboard Navigation
- [ ] All functionality operable via keyboard alone (Tab/Shift+Tab, Enter, Space, Arrow keys)
- [ ] Logical tab order following visual flow
- [ ] Focus visible: clear focus ring on all interactive elements
- [ ] Focus not trapped: users can navigate out of all regions
- [ ] Skip links available to bypass repetitive navigation

## Form Elements
- [ ] All form inputs have associated `<label>` element or `aria-label`/`aria-labelledby`
- [ ] Labels programmatically associated with inputs via `for/id` pairing or `aria-label`
- [ ] Error identification: text describing the error is programmatically associated with the field
- [ ] Error suggestion: if error is auto-suggested correction, it's programmatically exposed
- [ ] Input validation: both client-side and server-side; validation errors clearly communicated
- [ ] Placeholder text not used as label (contrast and screen reader issues)

## Images and Non-text Content
- [ ] All `<img>` have meaningful `alt` attribute (concise, descriptive)
- [ ] Decorative images have empty `alt=""` or `role="presentation"`
- [ ] Product images have `alt` describing the shoe style, color, key features
- [ ] Charts/graphs have text alternative or `aria-label`
- [ ] Loading states have accessible text alternative

## Interactive Elements
- [ ] All buttons have descriptive text (not just "click here")
- [ ] Non-button interactive elements (divs, spans with handlers) have `role="button"` and `tabindex="0"`
- [ ] Hover and focus states distinguishable (not color alone)
- [ ] Touch target minimum 44x44px for mobile
- [ ] Disable state is programmatically exposed via `aria-disabled="true"`

## Tables (if applicable)
- [ ] Table headers `<th>` scope defined (scope="row" or scope="col")
- [ ] Summary or caption element for table context
- [ ] Data cells associated with header cells

## Responsive Design
- [ ] Content reflows without horizontal scrolling up to 320px width
- [ ] Text size can be increased up to 200% without loss of content or functionality
- [ ] No content or functionality lost in responsive breakpoints

## Error Handling
- [ ] Error messages are specific and descriptive
- [ ] Error messages located near the corresponding form field
- [ ] Error state is announced by screen readers (live region or aria-describedby)
- [ ] Success messages are announced after form submission

## ARIA Roles and States
- [ ] `role="alert"` or `aria-live="polite"` for dynamic content updates
- [ ] `aria-expanded` for accordion/collapse elements
- [ ] `aria-controls` indicating element controlled
- [ ] `aria-describedby` linking form error to field
- [ ] `aria-hidden="true"` for content ignored by screen readers

## Testing Checklist
- [ ] Manual keyboard navigation through entire flow
- [ ] Screen reader testing (NVDA, VoiceOver) on critical paths
- [ ] Color contrast verification with dev tools
- [ ] Focus order inspection
- [ ] Zoom to 200% and verify layout
- [ ] Touch target measurement on mobile viewport