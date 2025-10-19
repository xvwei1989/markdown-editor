# Markdown Editor with PDF Export

A real-time Markdown editor web application with PDF export functionality. Features a split-screen interface with live preview and comprehensive editing tools.

![Markdown Editor](https://img.shields.io/badge/Markdown-Editor-blue?style=for-the-badge&logo=markdown&logoColor=white)
![PDF Export](https://img.shields.io/badge/PDF-Export-red?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- **Real-time Preview**: Instant Markdown rendering as you type
- **PDF Export**: Export formatted content to PDF documents
- **File Import**: Import existing .md files
- **Rich Toolbar**: Formatting buttons for common Markdown elements
- **Auto-save**: Automatic saving to localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Syntax Highlighting**: Code blocks with proper highlighting
- **Fullscreen Mode**: Preview in fullscreen
- **Keyboard Shortcuts**: Common formatting shortcuts

## 🛠️ Technology Stack

- **Frontend**: Pure HTML, CSS, and JavaScript (no framework dependencies)
- **Markdown Processing**: [Marked.js](https://marked.js.org/) for parsing and rendering Markdown
- **Syntax Highlighting**: [Prism.js](https://prismjs.com/) for code syntax highlighting
- **PDF Export**: [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for generating PDF documents
- **Icons**: [Font Awesome](https://fontawesome.com/) for UI icons
- **Styling**: Modern CSS with CSS variables and animations

## 📦 Installation

Since this is a static web application, no installation is required. Simply:

1. Clone the repository:
   ```bash
   git clone https://github.com/xvwei1989/markdown-editor.git
   ```

2. Open the application:
   ```bash
   # Option 1: Open directly in browser
   open index.html

   # Option 2: Use a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## 🎮 Usage

### Basic Editing
- Type Markdown syntax in the left panel
- See real-time preview in the right panel
- Use toolbar buttons for quick formatting
- Keyboard shortcuts available for common operations

### Key Features
- **Bold**: `Ctrl+B` or `Cmd+B`
- **Italic**: `Ctrl+I` or `Cmd+I`
- **Link**: `Ctrl+K` or `Cmd+K`
- **Save**: `Ctrl+S` or `Cmd+S`
- **Export PDF**: `Ctrl+P` or `Cmd+P`

### File Operations
- **Import MD**: Click "Import File" button to open .md files
- **Export PDF**: Click "Export PDF" to generate downloadable PDF
- **Fullscreen**: Toggle fullscreen preview mode
- **Auto-save**: Content is automatically saved to browser storage

## 📁 Project Structure

```
/
├── index.html      # Main HTML structure and layout
├── styles.css      # Complete styling with responsive design
├── script.js       # All JavaScript functionality
├── README.md       # Project documentation
└── CLAUDE.md       # Developer guidelines
```

## 🎨 Browser Compatibility

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Requirements**:
  - ES6+ support (arrow functions, classes, template literals)
  - WebGL support (for PDF generation)
  - localStorage API (for auto-save)

## 🚀 Development

### Running Development Server
```bash
# Start development server on port 8000
python -m http.server 8000
```

### Key Components
- `MarkdownEditor` class: Core application logic
- Event handling for keyboard shortcuts and UI interactions
- Real-time Markdown parsing and rendering
- File operations and state management

## 📱 Responsive Design

The application features mobile-first responsive design with breakpoints:
- **Desktop**: Full split-screen layout
- **Tablet**: Adaptive layout (768px breakpoint)
- **Mobile**: Stacked layout with collapsible panels (480px breakpoint)

## 🔧 Configuration

### CSS Custom Properties
The theme can be customized through CSS variables defined in `styles.css`:
- `--primary-color`
- `--secondary-color`
- `--background-color`
- `--text-color`

### Auto-save Settings
Auto-save interval: 5 seconds
Data persists across browser sessions using localStorage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Marked.js](https://marked.js.org/) - Markdown parser
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) - PDF generation
- [Font Awesome](https://fontawesome.com/) - Icon library

## 🔗 Links

- **Repository**: https://github.com/xvwei1989/markdown-editor
- **Live Demo**: [Open index.html in your browser](index.html)
- **Issues**: [Report bugs or request features](https://github.com/xvwei1989/markdown-editor/issues)

---

Made with ❤️ by [xvwei1989](https://github.com/xvwei1989)