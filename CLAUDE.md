# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a real-time Markdown editor web application with PDF export functionality. It features a split-screen interface with a live editor on the left and preview on the right.

## Technology Stack

- **Frontend**: Pure HTML, CSS, and JavaScript (no framework dependencies)
- **Markdown Processing**: Marked.js for parsing and rendering Markdown
- **Syntax Highlighting**: Prism.js for code syntax highlighting
- **PDF Export**: html2pdf.js for generating PDF documents
- **Icons**: Font Awesome for UI icons
- **Styling**: Modern CSS with CSS variables and animations

## File Structure

```
/
├── index.html      # Main HTML structure and layout
├── styles.css      # Complete styling with responsive design
├── script.js       # All JavaScript functionality
└── CLAUDE.md       # This file
```

## Development Commands

Since this is a static web application, no build process is required:

```bash
# Start development (open in browser)
open index.html

# Or serve with a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## Key Features

- **Real-time Preview**: Instant Markdown rendering as you type
- **PDF Export**: Export formatted content to PDF
- **File Import**: Import .md files
- **Rich Toolbar**: Formatting buttons for common Markdown elements
- **Auto-save**: Automatic saving to localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Syntax Highlighting**: Code blocks with proper highlighting
- **Fullscreen Mode**: Preview in fullscreen
- **Keyboard Shortcuts**: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link), Ctrl+S (save), Ctrl+P (PDF export)

## Architecture

The application is built around a single `MarkdownEditor` class that handles:

- DOM element management
- Event handling
- Markdown parsing and rendering
- File operations (import/export)
- UI state management
- Auto-save functionality

## CSS Architecture

- Uses CSS custom properties (variables) for consistent theming
- Mobile-first responsive design with breakpoints at 768px and 480px
- Component-based styling with clear separation of concerns
- Smooth animations and transitions throughout

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support (arrow functions, classes, template literals)
- Uses modern web APIs (FileReader, Clipboard API, localStorage)

## Development Guidelines

- Keep code modular and maintainable
- Use semantic HTML5 elements
- Follow consistent naming conventions
- Test responsive design at different screen sizes
- Ensure accessibility with proper ARIA labels where needed