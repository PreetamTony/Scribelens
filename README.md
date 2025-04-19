# ScribeLens

ScribeLens is an AI-powered web application that enhances handwritten or photographed notes by extracting text, generating structured summaries, and providing interactive Q&A features. Built with React, TypeScript, and Vite, it delivers a modern, responsive, and user-friendly experience.

## Features
- **Image Upload & OCR**: Upload images of notes or whiteboards and extract text using OCR.
- **AI-Powered Summarization**: Get concise and structured summaries of your notes using advanced language models.
- **Glossary Tooltips**: Instantly view definitions for key terms within your notes.
- **Highlightable Text**: Interactively highlight important parts of your notes.
- **AI Q&A**: Ask questions about your notes and receive intelligent answers.
- **Mind Map Generation**: Visualize your notes as mind maps (if enabled).
- **Modern UI/UX**: Responsive design with Tailwind CSS and beautiful animations.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   cd YOUR-REPO
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (API keys, endpoints, etc).

### Running Locally
```sh
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production
```sh
npm run build
# or
yarn build
```

## Project Structure
```
project/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application pages (ResultsPage, MindMapPage, etc)
│   ├── services/          # API and AI service logic
│   ├── utils/             # Utility functions and types
│   ├── index.css          # Global styles (Tailwind CSS)
│   └── main.tsx           # App entry point
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Acknowledgements
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/) (for AI features)

---

> **Note:** Do not commit your `.env` file or any sensitive credentials. The `.gitignore` is set up to protect your secrets.
