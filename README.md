# Skip Hire Card Component Project

A modern, responsive React component library for displaying skip hire data with a dark theme design. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This project provides a complete UI solution for skip hire services, featuring responsive card components, booking steppers, and utility functions for handling skip data and images. The design emphasizes accessibility, responsive layouts, and a cohesive dark theme throughout.

## 🏗️ Architecture & Approach

### Component-Based Architecture

The project follows a modular component-based architecture with clear separation of concerns:

```
components/
├── skip-card.tsx             # Main skip data display card
├── selected-skip-bar.tsx     # Fixed bottom selection bar
├── stepper.tsx               # Horizontal progress stepper
├── skip-size-selector.tsx   # Skip size selection grid
└── ui/                       # Reusable UI components (shadcn/ui)
```

## 🔌 API Integration

### Service Layer Pattern

API calls are abstracted through service functions:

```typescript
// lib/api/skips.ts
export const getSkips = async () => {
  try {
    const response = await api.get(
      "/skips/by-location?postcode=NR32&area=Lowestoft"
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch skips",
    };
  }
};
```

### Error Handling Strategy

Comprehensive error handling with user-friendly fallbacks:

1. **Loading States**: Spinner animations with descriptive text
2. **Error States**: Clear error messages with retry functionality
3. **Empty States**: Helpful messaging when no data is available

## 📦 Dependencies

### Core Dependencies

- **React 19**: Modern UI library for building interfaces
- **Vite 6**: Fast build tool and dev server for modern web apps
- **TypeScript 5**: Static typing for JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework

### UI Dependencies

- **shadcn/ui**: Pre-built accessible components
- **Lucide React**: Icon library
- **Radix UI**: Headless UI primitives

### HTTP Client

- **Axios**: HTTP client for API calls

## 🚀 Getting Started

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

### Building

```bash
npm run build
```
