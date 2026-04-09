# QSDA Church - React + Vite

A modern, responsive church website built with React and Vite, featuring a clean design and smooth user experience.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS** - Global styles with CSS variables

## Features

- 🏠 Beautiful hero section with background image
- 📺 Video carousel for sermons
- 📅 Events listing
- 🖼️ Photo gallery
- 🗺️ Interactive Google Maps integration
- 📱 Fully responsive design
- ⚡ Fast page loads with Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd QSDA-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
QSDA-react/
├── public/              # Static assets (images, SVG, etc.)
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Videos.jsx
│   │   └── Contact.jsx
│   ├── styles/         # Global styles
│   │   └── globals.css
│   ├── App.jsx         # Main app with routing
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Customization

### Colors

Edit the CSS variables in `src/styles/globals.css`:

```css
:root {
  --primary: #1e3a5f;   /* deep blue */
  --secondary: #ffffff; /* white */
  --accent: #7fb069;    /* soft green */
  --text-dark: #2c3e50;
  --text-light: #6c757d;
}
```

### Content

- **Home Page**: Edit `src/pages/Home.jsx`
- **Videos Page**: Edit `src/pages/Videos.jsx`
- **Contact Page**: Edit `src/pages/Contact.jsx`
- **Navigation**: Edit `src/components/Navbar.jsx`
- **Footer**: Edit `src/components/Layout.jsx`

## Deployment

Build the project for production:

```bash
npm run build
```

The optimized files will be in the `dist` folder, ready to deploy to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## License

© 2026 QSDA Church. All rights reserved.
