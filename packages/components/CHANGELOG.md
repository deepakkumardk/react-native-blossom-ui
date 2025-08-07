# @react-native-blossom-ui/components

## 0.12.0

### Minor Changes

- badc2db: Add error field animation to the input/boolean fields
  Add onPress handler to Select & MultiSelect for custom render item
- 6742f23: Add Surface component
  Update View component to be transparent & respect parent bg color
- 002d74a: Add label & labelStyles prop to the ExpandableText component
  Add spacing prop to Divider
  Update text typography to have 3 levels for all
  Add font family support in theme provider options

### Patch Changes

- 002d74a: Fix tooltip edge overflow issue

## 0.11.0

### Minor Changes

- 12d71a1: Add ExpandableText Component

### Patch Changes

- 12d71a1: Made shallow copy as default for useMergedProps

## 0.10.1

### Patch Changes

- ee14696: Fix rendering issue because of deepmerge of jsx objects
  Simplify the installation by using default light/dark theme

## 0.10.0

### Minor Changes

- e493970: - Add onLinkOpenError prop in Link component
  - Add reverseDirection prop in Progress to reverse the animation and bar
  - Add wave mode animation to ShimmerView
  - Add animated placeholder feature to SearchInput
  - Add expand/collapse animation to Accordion
  - Add custom chevron icon support to Accordion

### Patch Changes

- e493970: - Fix Android keyboard open issue in OtpInput

## 0.9.3

### Patch Changes

- 7fd9e09: Fix chroma-js dependency resolution issue

## 0.9.2

### Patch Changes

- c2d4cfc: Fix ts support from CD
- 2d6f126: Fix ts support from CD

## 0.9.1

## 0.9.0

### Minor Changes

- c15291b: Add BottomSheet component
  Add BottomSheet for android in Select options

### Patch Changes

- c15291b: Fix Modal & Popover orientation issue on open
  Update sizes for boolean fields and TextInput
  Fix overflow issue in ModalContent

## 0.8.0

### Patch Changes

- a9c9532: Fix popover re-render issue
- b153b9a: Fix TextInput icon center alignment issue
  Add touchable opacity to link
- b153b9a: Fix Spacer issue in colored background
  Fix Popover flicker issue on open
  Fix Calendar today render issue twice in a month

## 0.7.0

### Minor Changes

- 6d403b2: Add withCursor, secureTextEntry prop to the OtpInput

## 0.6.0

### Minor Changes

- b56ccb4: Add FAB, Link & OtpInput components
  Fix Popover fixed position issue on scroll

## 0.5.0

### Minor Changes

- 2e16ed4: Add Accordion component
- bd19590: - Add ShimmerView component for skeleton
  - Add ProgressBar component
  - Add Spacer component
  - Add label, labelPosition in the Divider

## 0.4.0

### Minor Changes

- 4e9c196: - Add Chip component
  - Add SegmentedButton component
  - Add customIcon support in Checkbox
  - Add checkIcon,withCheckIcon,asBadge props to Chip

## 0.3.0

### Minor Changes

- 836a57f: Add Card Component

### Patch Changes

- b159856: Update value type for Select & MultiSelect & add it's defaultValue support

## 0.2.1

### Patch Changes

- Update value type for Select & MultiSelect & add it's defaultValue support

## 0.2.0

### Minor Changes

- fb4da0b: Add popover component

### Patch Changes

- fb4da0b: - Add Select, MultiSelect, Popover, Tooltip, Modal, ModalContent components

## 0.1.1

### Patch Changes

- Fix files in npm pack issue

## 0.1.0

### Minor Changes

- Add theme prop support in the component manager

### Patch Changes

- 633b320: Initial Release for components package
