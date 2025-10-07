# ATS Resume Builder

A modern, interactive resume builder optimized for Applicant Tracking Systems (ATS). Built with React, TypeScript, and Tailwind CSS.

## Features

🎯 **ATS Optimization**

- Real-time ATS score calculation
- Keyword highlighting and suggestions
- Job description analysis
- Missing keyword detection

✨ **Interactive Editing**

- Live preview while editing
- Modular sections (Basic Info, Experience, Education, Skills, etc.)
- Add/remove sections dynamically
- Professional templates

📱 **Modern UI/UX**

- Responsive design
- Beautiful animations
- Clean, professional layout
- Dark/light theme support

📄 **Export Options**

- PDF export with high quality
- HTML export for web sharing
- JSON export for data backup
- Print-friendly layouts

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ats-resume-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Usage

### Basic Workflow

1. **Edit Mode**: Start by entering your basic information, experience, education, and skills
2. **Preview Mode**: See how your resume looks in real-time
3. **ATS Analysis**: Check your ATS score and get optimization suggestions
4. **Export**: Download your resume as PDF, HTML, or JSON

### ATS Optimization Tips

- Include relevant keywords from job descriptions
- Use standard section headings
- Avoid complex formatting or graphics
- Include quantifiable achievements
- Use action verbs in experience descriptions

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Build tool and development server
- **Lucide React** - Icon library
- **html2canvas** - Screenshot generation
- **jsPDF** - PDF generation

## Project Structure

```
src/
├── components/          # React components
│   ├── ResumeEditor.tsx    # Main editing interface
│   ├── ResumePreview.tsx   # Live preview component
│   ├── ATSAnalyzer.tsx     # ATS analysis tools
│   └── ExportTools.tsx     # Export functionality
├── types/               # TypeScript type definitions
├── data/               # Initial data and constants
└── App.tsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by modern resume builders and ATS optimization best practices
- Icons provided by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
