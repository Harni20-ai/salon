# GLOBAL REUSABLE NAVBAR COMPONENT (Apply to Every Page)

**CRITICAL REQUIREMENT**

Create **ONE reusable global navigation bar component** and use it on **every page of the website**.

The navigation bar is a shared component and **must never be redesigned, regenerated, or modified** from page to page.

All pages must import or reuse the exact same navigation component.

Only the **active navigation item** should change depending on the current page.

---

# Component Name

GlobalNavbar

---

# Applies To

* Home 1
* Home 2
* Services
* Gallery
* About
* Contact
* Appointment
* Privacy Policy
* Terms & Conditions
* 404 Page
* Any future pages

---

# DO NOT CHANGE

The following must remain **pixel-perfect identical** across every page:

## Overall Layout

* Navbar height
* Width
* Position
* Padding
* Margins
* Alignment
* Border radius
* Background
* Blur effect
* Shadow
* Border
* Transparency
* Sticky behaviour

---

## Logo

Never change

* Size
* Position
* Padding
* Margin
* Image
* Colour
* Hover animation

Clicking the logo always returns to Home.

---

## Navigation Menu

Never change

* Order
* Font
* Font size
* Font weight
* Letter spacing
* Gap between items
* Hover animation
* Underline animation
* Active indicator style
* Colours
* Transition timing

Menu Order

```
Home ▼
Services
Gallery
About
Contact
```

---

## Home Dropdown

Contains exactly

```
Home 1
Home 2
```

Never change

* Width
* Border radius
* Background
* Blur
* Padding
* Shadow
* Animation
* Item spacing

Animation

* Fade
* TranslateY(12px)
* 300ms ease

---

## CTA Button

Always display

**BOOK APPOINTMENT**

Never change

* Width
* Height
* Border radius
* Colour
* Typography
* Padding
* Hover animation
* Shadow
* Position

---

## RTL Toggle

Always beside the CTA.

Never change

* Shape
* Size
* Position
* Colours
* Hover animation

Only display the opposite mode.

Example

LTR website

Show

RTL

RTL website

Show

LTR

---

## Theme Toggle

Always last.

Never change

* Icon
* Circle size
* Background
* Hover effect
* Animation

---

# Sticky Navigation

The navbar must remain fixed while scrolling.

At the top of the page

* Transparent or semi-transparent
* Hero visible underneath

After scrolling 40px

* Frosted glass background
* 20px backdrop blur
* Soft shadow
* Thin border
* Smooth 300ms transition

Do **not**

* Shrink
* Grow
* Change spacing
* Move logo
* Move menu

---

# Active Navigation

The **only thing that changes** between pages is the active menu item.

Examples

Home page

```
✓ Home
Services
Gallery
About
Contact
```

Services page

```
Home
✓ Services
Gallery
About
Contact
```

Gallery page

```
Home
Services
✓ Gallery
About
Contact
```

About page

```
Home
Services
Gallery
✓ About
Contact
```

Contact page

```
Home
Services
Gallery
About
✓ Contact
```

The active indicator style must remain identical.

---

# Responsive Behaviour

Desktop

* Full navigation

Tablet

* Same layout
* Reduced spacing only

Mobile

* Same logo
* Same CTA
* Hamburger menu
* Full-screen navigation drawer
* Preserve colours
* Preserve typography
* Preserve animations

---

# Accessibility

* Keyboard accessible
* ARIA labels
* Visible focus states
* Minimum touch target 44×44px
* WCAG AA contrast

---

# Technical Requirement

Treat the navigation as a **single reusable component**.

Examples:

* React → `<Navbar />`
* Next.js → Shared Layout Component
* Vue → Global Component
* HTML → Include the same navbar partial/template on every page
* Tailwind → Reuse the exact same component classes
* Bootstrap → Use one shared navbar template

Do **not** duplicate or recreate the navbar for individual pages.

---

# Final Validation Checklist

Before generating any page, verify:

* ✅ Navbar matches every other page exactly
* ✅ Logo size is identical
* ✅ Navigation spacing is identical
* ✅ CTA button is identical
* ✅ Dropdown is identical
* ✅ RTL/LTR toggle is identical
* ✅ Theme toggle is identical
* ✅ Sticky behaviour is identical
* ✅ Colours are identical
* ✅ Hover effects are identical
* ✅ Animation timings are identical
* ✅ Only the active navigation item changes
