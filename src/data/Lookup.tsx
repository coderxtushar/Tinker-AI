const HERO_READING = "What do you want to do ??"
const HERO_DESC = "Generate any website in nano seconds..."
const INPUT_PLACEHOLDER = "How can we help you today?"
const SUGGESTION = {
    1: "Build a mobile app with Expo",
    2: "Start a blog with Astro",
    3: "Create a docs site with Vitepress",
    4: "Scaffold UI with shadcn",
    5: "Draft a presentation with Slidev",
    6: "Code a video with Remotion"
}
const SIGNIN_HEADING = "Continue with tinker ai"
const SIGNIN_SUBHEADING = "To use tinker ai you must log into an existing account or create one."
const SIGNIN_AGREEMENT_TEXT = "By using tinker ai, you agree to the collection of usage data for analytics."

const DEPENDENCY = {
    react: "^17.0.2",
    "react-dom": "^17.0.2",
    next: "^12.0.7",
    axios: "^0.24.0",
    "next-themes": "^0.0.15",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
}

const DEFAULT_FILE = {
  '/App.js': {
    code: `import React from 'react';

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

export default App;
`
  },
  '/index.html': {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`
  },
  '/App.css': {
    code: `
    @tailwind base;
    @tailwind utilities;
    @tailwind components;
    `
  },
  '/tailwind.config.js': {
    code: `
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    `
  },
  '/postcss.config.js': {
    code: `
    /** @type {import('postcss-load-config').Config} */
    const config = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
    export default config;
    `
  }
}

const Lookup = {
    HERO_READING,
    HERO_DESC,
    INPUT_PLACEHOLDER,
    SUGGESTION,
    SIGNIN_HEADING,
    SIGNIN_SUBHEADING, 
    SIGNIN_AGREEMENT_TEXT,
    DEPENDENCY,
    DEFAULT_FILE
}

export default Lookup