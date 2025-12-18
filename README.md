Markdown

# Soundmind Design System

A modern React component library built with **TypeScript** and **Tailwind CSS**.  
Designed for rapid UI development with consistent styling.

## 📦 Installation

```bash
npm install soundmind-design-system
# or
yarn add soundmind-design-system
# or
pnpm add soundmind-design-system
```

🚀 Quick Start

1. Import CSS (Important!)
   You must import the CSS file at the root of your application (e.g., main.tsx, App.tsx, or \_app.tsx) to apply styles correctly.

```TypeScript

// src/main.tsx or src/App.tsx
import 'soundmind-design-system/dist/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

2. Use Components
   Import and use components in your React project.

```TypeScript

import { Button } from 'soundmind-design-system';

function App() {
  return (
    <div className="p-4">
      <Button
        label="Click Me"
        primary={true}
        onClick={() => alert('Hello Soundmind!')}
      />
    </div>
  );
}

export default App;
```

🛠 Development
If you want to contribute or modify this library locally:

Clone the repository

```Bash

git clone <your-repo-url>
cd soundmind-design-system
Install dependencies
```

```Bash

npm install
Run Storybook (for UI development)
```

```Bash

npm run storybook
Open http://localhost:6006 to view components.

Build the library
```

```Bash

npm run build
```

📝 Features
TypeScript: Written in TypeScript with predictable static types.

Tailwind CSS: Styled using Tailwind CSS for consistency and customization.

Tree Shakeable: Bundled with tsup to ensure only used code is included.

Storybook: Interactive documentation and testing environment.

📄 License
MIT © [Your Name or Company Name]

```

```
