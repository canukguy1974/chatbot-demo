# AI Chatbot Widget

A fully custom AI chatbot widget built with React and TypeScript. This lightweight, cleanly structured, and mobile-responsive widget allows you to create a personalized chatbot for your business.

## Features

- Customize with your business name, industry, and description
- Select from multiple personality types (friendly, professional, humorous, etc.)
- Input knowledge base via text, URL, or JSON
- Preview the chatbot in a simulated chat interface
- Generate embeddable widget code for your website

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm start
```

This will open the application in your default browser at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized files in the `dist` directory that you can deploy to any static hosting service.

## Deployment

The built project can be easily deployed to platforms like Vercel, Netlify, or any static hosting service:

### Deploying to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Deploying to Netlify

1. Create a new site on Netlify
2. Connect to your repository or upload the `dist` folder
3. Set the build command to `npm run build` and publish directory to `dist`

## Customization

### Styling

The widget uses CSS variables for easy customization. You can modify the colors, fonts, and other styles in the `src/styles/global.css` file.

### API Integration

The project is structured to make it easy to integrate with real AI APIs:

1. Check the `src/services/ApiService.ts` file for examples of how to connect to OpenAI or custom APIs
2. Implement the abstract methods with your specific API calls
3. Update the chat interface to use your API service

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and TypeScript
- Uses webpack for bundling
- Designed for easy embedding in Carrd sites and other platforms
