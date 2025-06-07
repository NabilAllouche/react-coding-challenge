# Skip Hire Card Component Project

A modern, responsive React component library for displaying skip hire data with a dark theme design. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This project provides a complete UI solution for skip hire services, featuring responsive card components, booking steppers, and utility functions for handling skip data and images. The design emphasizes accessibility, responsive layouts, and a cohesive dark theme throughout.

## 🏗️ Architecture & Approach

### Component-Based Architecture

The project follows a modular component-based architecture with clear separation of concerns:

\`\`\`
components/
├── skip-card.tsx # Main skip data display card
├── selected-skip-bar.tsx # Fixed bottom selection bar
├── stepper.tsx # Horizontal progress stepper
├── skip-size-selector.tsx # Skip size selection grid
└── ui/ # Reusable UI components (shadcn/ui)
\`\`\`

### Responsive Design Strategy

The project implements a mobile-first responsive approach:

1. **Mobile (< 640px)**: Compact layouts, simplified steppers
2. **Tablet (640px - 1024px)**: Balanced layouts, partial feature visibility
3. **Desktop (> 1024px)**: Full feature layouts, expanded information

## 📱 Responsive Components

### SkipCard Component

The main card component adapts across screen sizes:

- **Mobile**: Single column layout, essential information only
- **Tablet**: Two-column grid, expanded details
- **Desktop**: Three-column grid, full feature set

### Stepper Component

Two different stepper implementations for optimal UX:

- **Horizontal Stepper** (Tablet/Desktop): Full step visibility with icons and labels
- **Mobile Stepper** (Mobile): Collapsible dropdown showing current step

### Selected Skip Bar

Fixed bottom bar that appears when a skip is selected:

- **Mobile**: Compact layout with backdrop overlay
- **Desktop**: Expanded layout with all action buttons

## 🖼️ Image Management System

### Skip Image Utility Functions

\`\`\`typescript
// Core function - returns appropriate image URL
getSkipImage(size: number): string

// Enhanced function - returns image + metadata
getSkipImageWithInfo(size: number): {
url: string
category: string
actualSize: number
}

// Helper function - returns all available options
getAllSkipSizeOptions(): Array<{
size: number
url: string
category: string
}>
\`\`\`

### Image Mapping Logic

- **Size 4**: 4-yarder-skip.jpg (Mini Skip)
- **Sizes 5-15**: 5-yarder-skip.jpg (Midi/Builder's Skip)
- **Size 16**: 16-yarder-skip.jpg (Large Skip)
- **Size 20**: 20-yarder-skip.jpg (Maxi Skip)
- **Size 40**: 40-yarder-skip.jpg (Roll-On Roll-Off)

## 🔌 API Integration

### Service Layer Pattern

API calls are abstracted through service functions:

\`\`\`typescript
// lib/api/skips.ts
export const getSkips = async () => {
try {
const response = await api.get("/skips/by-location?postcode=NR32&area=Lowestoft")
return { success: true, data: response.data }
} catch (error: any) {
return {
success: false,
error: error.response?.data?.message || "Failed to fetch skips"
}
}
}
\`\`\`

### Error Handling Strategy

Comprehensive error handling with user-friendly fallbacks:

1. **Loading States**: Spinner animations with descriptive text
2. **Error States**: Clear error messages with retry functionality
3. **Empty States**: Helpful messaging when no data is available

## ♿ Accessibility Features

### Semantic HTML

- Proper heading hierarchy (\`h1\`, \`h2\`, \`h3\`)
- Semantic elements (\`main\`, \`nav\`, \`article\`)
- Form labels and descriptions

### ARIA Implementation

- \`aria-labelledby\` and \`aria-describedby\` for complex components
- \`aria-current\` for stepper navigation
- \`aria-pressed\` for toggle buttons
- \`role\` attributes for custom components

### Keyboard Navigation

- Tab order management
- Enter/Space key handling for custom interactive elements
- Focus indicators with proper contrast

### Screen Reader Support

- Descriptive alt text for images
- Screen reader only content with \`sr-only\` class
- Live regions for dynamic content updates

## 🎯 State Management

### Local State Pattern

Components use React's built-in state management:

\`\`\`typescript
const [skips, setSkips] = useState<Skip[]>([])
const [selectedCard, setSelectedCard] = useState<number | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
\`\`\`

### Props Interface Design

Consistent TypeScript interfaces for type safety:

\`\`\`typescript
interface ContainerData {
id: number
size: number
hire_period_days: number
price_before_vat: number
vat: number
// ... other properties
}
\`\`\`

## 🚀 Performance Optimizations

### Image Optimization

- Next.js Image component with proper sizing
- Responsive image loading with \`sizes\` attribute
- Lazy loading for off-screen images

### Component Optimization

- Conditional rendering to avoid unnecessary DOM nodes
- Event handler memoization where appropriate
- Efficient re-rendering patterns

## 🛠️ Development Workflow

### Component Development

1. **Design First**: Start with responsive design considerations
2. **Accessibility**: Implement semantic HTML and ARIA from the beginning
3. **TypeScript**: Define interfaces before implementation
4. **Testing**: Manual testing across different screen sizes

### File Organization

\`\`\`
src/
├── app/ # Next.js app router pages
├── components/ # Reusable components
├── lib/ # Utilities and services
├── public/ # Static assets
└── styles/ # Global styles
\`\`\`

## 📦 Dependencies

### Core Dependencies

- **Next.js 15**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling

### UI Dependencies

- **shadcn/ui**: Pre-built accessible components
- **Lucide React**: Icon library
- **Radix UI**: Headless UI primitives

### HTTP Client

- **Axios**: HTTP client for API calls

## 🔧 Configuration

### Tailwind Configuration

Custom breakpoints and color system:

\`\`\`typescript
// tailwind.config.ts
extend: {
screens: {
xs: "480px", // Extra small breakpoint
},
// Custom color palette for dark theme
}
\`\`\`

### Next.js Configuration

Optimized for performance and accessibility:

- Image optimization enabled
- TypeScript strict mode
- ESLint configuration

## 🚀 Getting Started

### Installation

\`\`\`bash
npm install

# or

yarn install
\`\`\`

### Development

\`\`\`bash
npm run dev

# or

yarn dev
\`\`\`

### Building

\`\`\`bash
npm run build

# or

yarn build
\`\`\`

## 📱 Usage Examples

### Basic Card Display

\`\`\`typescript
import DataCard from '@/components/data-card'

<DataCard
data={skipData}
onSelect={handleSelect}
isSelected={selectedId === skipData.id}
/>
\`\`\`

### Stepper Implementation

\`\`\`typescript
import BookingStepper from '@/components/booking-stepper'

<BookingStepper currentStep={3} />
\`\`\`

### Image Utility Usage

\`\`\`typescript
import { getSkipImageWithInfo } from '@/lib/utils/get-skip-image'

const { url, category } = getSkipImageWithInfo(skipSize)
\`\`\`
