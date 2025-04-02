
# Music School Management System

A comprehensive management system for music schools, built with modern web technologies.

## Features

- **Student Management**: Add, edit, view, and delete student records
- **Class Management**: Schedule and manage music classes
- **Attendance Tracking**: Monitor student attendance
- **Employee Management**: Manage teaching staff and employees
- **Financial Management**: Track payments and financial records
- **Reports**: Generate various reports for insights and analysis

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components built on Radix UI
- **Charts & Visualizations**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Customization

The application uses a custom theme based on the Open Color LCH color system, providing excellent accessibility and visual harmony. You can customize the theme by modifying the CSS variables in `src/index.css`.

## Project Structure

```
src/
├── components/     # Reusable components
│   ├── ui/         # UI components (shadcn)
│   ├── students/   # Student-specific components
│   ├── classes/    # Class-specific components
│   └── ...
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and validation schemas
├── pages/          # Page components
├── types/          # TypeScript type definitions
└── App.tsx         # Main app component
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
