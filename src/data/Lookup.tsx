const HERO_READING = "What do you want to do ??";
const HERO_DESC = "Generate any website in nano seconds...";
const INPUT_PLACEHOLDER = "How can we help you today?";
const SUGGESTION = {
  1: "Build a mobile app with Expo",
  2: "Start a blog with Astro",
  3: "Create a docs site with Vitepress",
  4: "Scaffold UI with shadcn",
  5: "Draft a presentation with Slidev",
  6: "Code a video with Remotion",
};
const SIGNIN_HEADING = "Continue with tinker ai";
const SIGNIN_SUBHEADING = "To use tinker ai you must log into an existing account or create one.";

const VITE_CONFIG = {
  "/src/main.jsx": {
    code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  "/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
  },
};

const DEFAULT_APP = {
  "/src/App.jsx": {
    code: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Hello, Tailwind CSS!</h1>
        <p className="text-gray-700">This is a simple example of a React component styled with Tailwind CSS.</p>
      </div>
    </div>
  );
}

export default App;`,
  },
  "/src/App.css": {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
}`,
  },
};

const DEPENDENCY = {
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "@vitejs/plugin-react": "^4.2.0",
  tailwindcss: "^3.3.0",
  postcss: "^8.4.0",
  autoprefixer: "^10.4.0",
};

const DEFAULT_FILE = {
  ...VITE_CONFIG,
  ...DEFAULT_APP,
  "/src/components/ExampleComponent.jsx": {
    code: `import React from 'react';

function ExampleComponent() {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-lg font-semibold">Example Component</h2>
      <p className="text-gray-600">This is an example component.</p>
    </div>
  );
}

export default ExampleComponent;`,
  },
  "/package.json": {
    code: `{
  "name": "your-project-name",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "start": "vite"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^4.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0"
  }
}`,
  },
};

export default {
  HERO_READING,
  HERO_DESC,
  INPUT_PLACEHOLDER,
  SUGGESTION,
  SIGNIN_HEADING,
  SIGNIN_SUBHEADING,
  DEPENDENCY,
  DEFAULT_FILE,
  VITE_CONFIG,
  DEFAULT_APP,
};