# Nearby

A modern web application built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Code Quality**: ESLint + Prettier

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── upload/            # Upload page
│   ├── generating/        # Generating page
│   └── result/           # Result page
├── components/           # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
└── tokens/               # Design system tokens
    ├── colors.ts         # Color palette
    ├── fonts.ts          # Typography tokens
    ├── spacing.ts        # Spacing scale
    ├── radius.ts         # Border radius tokens
    └── index.ts          # Token exports
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Design Tokens

The project uses a comprehensive design system with tokens for:

- **Colors**: Primary, background, and text color palettes
- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded corner values

## Contributing

1. Follow the existing code style
2. Use the design tokens for consistency
3. Run tests before committing
4. Ensure TypeScript types are correct