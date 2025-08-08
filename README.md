# Mfalme Palace Stay - Boutique BnB Frontend

A modern, responsive web application for Mfalme Palace Boutique BnB in Eldoret, Kenya. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Property Showcase**: Display 1- and 2-bedroom suites with rates and amenities
- **Booking System**: Multi-step booking flow with date selection and payment
- **Admin Dashboard**: Simple admin interface for managing bookings
- **Responsive Design**: Mobile-first design with modern UI components
- **SEO Optimized**: Meta tags, structured data, and accessibility features

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)
- **Date Handling**: React Day Picker + date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mfalme-palace-stay

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/            # shadcn/ui components
├── pages/             # Page components
│   └── admin/         # Admin pages
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── mocks/             # Mock API data
└── assets/            # Static assets (images)
```

## Features Overview

### Public Pages
- **Home** (`/`): Hero section, amenities, featured properties
- **Properties** (`/properties`): Grid view of all available suites
- **Property Detail** (`/properties/:id`): Individual property with booking calendar
- **Booking** (`/booking`): Multi-step booking process
- **About** (`/about`): Information about the property
- **Attractions** (`/attractions`): Local attractions and activities
- **Contact** (`/contact`): Contact form and location

### Admin Features
- **Login** (`/admin`): Admin authentication
- **Dashboard** (`/admin/dashboard`): Booking management interface

## Customization

### Styling
- Colors and fonts are configured in `tailwind.config.ts`
- Custom CSS variables for theming in `src/index.css`
- Component styling uses Tailwind utility classes

### Data
- Mock data is located in `src/mocks/api.ts`
- Replace with real API endpoints as needed
- Property information, rates, and availability can be updated here

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configuration:

```env
VITE_API_URL=your-api-endpoint
VITE_GOOGLE_MAPS_KEY=your-maps-api-key
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions about this project, please contact the development team.
