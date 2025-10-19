class MarkdownEditor {
    constructor() {
        this.elements = {
            markdownInput: document.getElementById('markdownInput'),
            markdownPreview: document.getElementById('markdownPreview'),
            importBtn: document.getElementById('importBtn'),
            exportPdfBtn: document.getElementById('exportPdfBtn'),
            clearBtn: document.getElementById('clearBtn'),
            copyBtn: document.getElementById('copyBtn'),
            fullscreenBtn: document.getElementById('fullscreenBtn'),
            fileInput: document.getElementById('fileInput'),
            wordCount: document.getElementById('wordCount'),
            lineCount: document.getElementById('lineCount'),
            charCount: document.querySelector('.char-count'),
            saveStatus: document.getElementById('saveStatus')
        };

        this.isFullscreen = false;
        this.debounceTimer = null;

        this.init();
    }

    init() {
        this.setupMarked();
        this.bindEvents();
        this.updatePreview();
        this.updateStats();
    }

    setupMarked() {
        // Configure marked options
        marked.setOptions({
            highlight: function(code, lang) {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            },
            breaks: true,
            gfm: true,
            tables: true,
            sanitize: false,
            smartLists: true,
            smartypants: true
        });

        // Custom renderer for better styling
        const renderer = new marked.Renderer();

        // Custom table rendering
        renderer.table = function(header, body) {
            return '<div class="table-wrapper"><table class="markdown-table">\n'
                + header
                + body
                + '</table></div>\n';
        };

        // Custom code block rendering
        renderer.code = function(code, language) {
            const validLang = language && Prism.languages[language] ? language : 'plaintext';
            const highlighted = Prism.highlight(code, Prism.languages[validLang] || Prism.languages.plaintext, validLang);
            return `<pre class="language-${validLang}"><code class="language-${validLang}">${highlighted}</code></pre>`;
        };

        marked.setOptions({ renderer: renderer });
    }

    bindEvents() {
        // Markdown input events
        this.elements.markdownInput.addEventListener('input', () => {
            this.debounceUpdate();
        });

        this.elements.markdownInput.addEventListener('scroll', () => {
            this.syncScroll();
        });

        // Toolbar buttons
        document.querySelectorAll('.toolbar-btn[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleToolbarAction(btn.dataset.action);
            });
        });

        // Control buttons
        this.elements.importBtn.addEventListener('click', () => {
            this.elements.fileInput.click();
        });

        this.elements.exportPdfBtn.addEventListener('click', () => {
            this.exportToPDF();
        });

        this.elements.clearBtn.addEventListener('click', () => {
            this.clearContent();
        });

        this.elements.copyBtn.addEventListener('click', () => {
            this.copyMarkdown();
        });

        this.elements.fullscreenBtn.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // File input
        this.elements.fileInput.addEventListener('change', (e) => {
            this.importFile(e);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Auto-save functionality
        this.elements.markdownInput.addEventListener('input', () => {
            this.autoSave();
        });
    }

    debounceUpdate() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.updatePreview();
            this.updateStats();
        }, 100);
    }

    updatePreview() {
        const markdownText = this.elements.markdownInput.value;
        const htmlContent = marked.parse(markdownText);
        this.elements.markdownPreview.innerHTML = htmlContent;

        // Re-highlight code blocks
        Prism.highlightAllUnder(this.elements.markdownPreview);
    }

    updateStats() {
        const text = this.elements.markdownInput.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text ? text.split('\n').length : 1;
        const chars = text.length;

        this.elements.wordCount.textContent = `${words} 字`;
        this.elements.lineCount.textContent = `${lines} 行`;
        this.elements.charCount.textContent = `${chars} 字符`;
    }

    handleToolbarAction(action) {
        const textarea = this.elements.markdownInput;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let replacement = '';
        let cursorOffset = 0;

        switch (action) {
            case 'bold':
                replacement = `**${selectedText || '粗体文本'}**`;
                cursorOffset = selectedText ? 0 : -4;
                break;
            case 'italic':
                replacement = `*${selectedText || '斜体文本'}*`;
                cursorOffset = selectedText ? 0 : -3;
                break;
            case 'heading':
                replacement = `## ${selectedText || '标题'}`;
                cursorOffset = selectedText ? 0 : -2;
                break;
            case 'quote':
                replacement = `> ${selectedText || '引用文本'}`;
                cursorOffset = selectedText ? 0 : -2;
                break;
            case 'code':
                if (selectedText.includes('\n')) {
                    replacement = `\`\`\`\n${selectedText || '代码'}\n\`\`\``;
                    cursorOffset = selectedText ? -4 : -6;
                } else {
                    replacement = `\`${selectedText || '代码'}\``;
                    cursorOffset = selectedText ? 0 : -2;
                }
                break;
            case 'link':
                replacement = `[${selectedText || '链接文本'}](URL)`;
                cursorOffset = selectedText ? -5 : -9;
                break;
            case 'image':
                replacement = `![${selectedText || '图片描述'}](图片URL)`;
                cursorOffset = selectedText ? -7 : -11;
                break;
            case 'list':
                replacement = `- ${selectedText || '列表项'}`;
                cursorOffset = selectedText ? 0 : -2;
                break;
            case 'table':
                replacement = `| 列1 | 列2 | 列3 |\n|-----|-----|-----|\n| 内容1 | 内容2 | 内容3 |`;
                cursorOffset = -43;
                break;
        }

        textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + replacement.length + cursorOffset, start + replacement.length + cursorOffset);

        this.updatePreview();
        this.updateStats();
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    this.handleToolbarAction('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    this.handleToolbarAction('italic');
                    break;
                case 'k':
                    e.preventDefault();
                    this.handleToolbarAction('link');
                    break;
                case 's':
                    e.preventDefault();
                    this.autoSave();
                    break;
                case 'p':
                    e.preventDefault();
                    this.exportToPDF();
                    break;
            }
        }
    }

    importFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            this.elements.markdownInput.value = content;
            this.updatePreview();
            this.updateStats();
            this.showStatus('文件导入成功', 'success');
        };

        reader.onerror = () => {
            this.showStatus('文件读取失败', 'error');
        };

        reader.readAsText(file);
        e.target.value = ''; // Reset file input
    }

    exportToPDF() {
        const showLoading = () => {
            this.elements.exportPdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 导出中...';
            this.elements.exportPdfBtn.disabled = true;
        };

        const hideLoading = () => {
            this.elements.exportPdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> 导出PDF';
            this.elements.exportPdfBtn.disabled = false;
        };

        showLoading();

        const opt = {
            margin: [10, 10, 10, 10],
            filename: `markdown-document-${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Create a temporary div for PDF generation
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.elements.markdownPreview.innerHTML;
        tempDiv.style.cssText = `
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        `;

        // Style tables for PDF
        const tables = tempDiv.querySelectorAll('table');
        tables.forEach(table => {
            table.style.cssText = `
                width: 100%;
                border-collapse: collapse;
                margin: 1rem 0;
                font-size: 12px;
            `;
        });

        const ths = tempDiv.querySelectorAll('th, td');
        ths.forEach(th => {
            th.style.cssText = `
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            `;
        });

        html2pdf().set(opt).from(tempDiv).save().then(() => {
            hideLoading();
            this.showStatus('PDF导出成功', 'success');
        }).catch((error) => {
            console.error('PDF export error:', error);
            hideLoading();
            this.showStatus('PDF导出失败', 'error');
        });
    }

    clearContent() {
        if (this.elements.markdownInput.value.trim() &&
            confirm('确定要清空所有内容吗？此操作不可恢复。')) {
            this.elements.markdownInput.value = '';
            this.updatePreview();
            this.updateStats();
            this.showStatus('内容已清空', 'info');
        }
    }

    copyMarkdown() {
        const markdownText = this.elements.markdownInput.value;
        if (!markdownText) {
            this.showStatus('没有内容可复制', 'warning');
            return;
        }

        navigator.clipboard.writeText(markdownText).then(() => {
            this.showStatus('Markdown已复制到剪贴板', 'success');
        }).catch(() => {
            // Fallback for older browsers
            this.elements.markdownInput.select();
            document.execCommand('copy');
            this.showStatus('Markdown已复制到剪贴板', 'success');
        });
    }

    toggleFullscreen() {
        const previewPanel = this.elements.markdownPreview.parentElement;

        if (!this.isFullscreen) {
            previewPanel.classList.add('fullscreen-preview');
            this.elements.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            this.isFullscreen = true;
        } else {
            previewPanel.classList.remove('fullscreen-preview');
            this.elements.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            this.isFullscreen = false;
        }
    }

    syncScroll() {
        if (this.isFullscreen) return;

        const editor = this.elements.markdownInput;
        const preview = this.elements.markdownPreview;

        const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
        preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
    }

    autoSave() {
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(() => {
            const content = this.elements.markdownInput.value;
            localStorage.setItem('markdown-content', content);
            this.showStatus('自动保存成功', 'success', 1000);
        }, 1000);
    }

    loadSavedContent() {
        const savedContent = localStorage.getItem('markdown-content');
        if (savedContent) {
            this.elements.markdownInput.value = savedContent;
            this.updatePreview();
            this.updateStats();
            this.showStatus('已恢复上次编辑内容', 'info');
        }
    }

    showStatus(message, type = 'info', duration = 3000) {
        const statusElement = this.elements.saveStatus;
        statusElement.textContent = message;
        statusElement.className = `status-${type}`;

        setTimeout(() => {
            statusElement.textContent = '已就绪';
            statusElement.className = '';
        }, duration);
    }
}

// Initialize the editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const editor = new MarkdownEditor();

    // Load saved content if exists
    editor.loadSavedContent();

    // Add some initial animation
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(20px)';

    setTimeout(() => {
        document.querySelector('.container').style.transition = 'all 0.5s ease-out';
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.transform = 'translateY(0)';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const previewPanel = document.querySelector('.preview-panel');
        previewPanel.classList.remove('fullscreen-preview');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
});

// Prevent accidental page leave
window.addEventListener('beforeunload', (e) => {
    const markdownInput = document.getElementById('markdownInput');
    if (markdownInput.value.trim()) {
        e.preventDefault();
        e.returnValue = '您有未保存的更改，确定要离开吗？';
    }
});