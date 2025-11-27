# DocConvert Pro

A modern, universal document conversion web application that supports batch processing and multiple file formats.

## Features

- **Batch Conversion**: Upload and convert multiple files at once
- **Drag & Drop**: Intuitive file upload interface
- **Smart Downloads**: Single file → direct download, Multiple files → ZIP archive
- **Format Support**: PDF, DOCX, PPTX, XLSX, JPG, PNG, TXT
- **Real-time Status**: Track conversion progress for each file
- **Responsive Design**: Works on desktop, tablet, and mobile

## Prerequisites

Before running this application, you need to install the following conversion tools:

### LibreOffice (Required for Office formats)
- **Windows**: Download from https://www.libreoffice.org/download/
- **macOS**: `brew install libreoffice`
- **Linux**: `sudo apt-get install libreoffice`

### ImageMagick (Required for image conversions)
- **Windows**: Download from https://imagemagick.org/script/download.php
- **macOS**: `brew install imagemagick`
- **Linux**: `sudo apt-get install imagemagick`

### Ghostscript (Required for PDF to image)
- **Windows**: Download from https://www.ghostscript.com/download/gsdnload.html
- **macOS**: `brew install ghostscript`
- **Linux**: `sudo apt-get install ghostscript`

### Redis (Optional - for job queue)
- **Windows**: Download from https://github.com/microsoftarchive/redis/releases
- **macOS**: `brew install redis`
- **Linux**: `sudo apt-get install redis-server`

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
cd client && npm install && cd ..
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Start Redis (if using job queue):

```bash
redis-server
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend dev server on http://localhost:3000

### Production Mode

```bash
npm run build
npm start
```

## Usage

1. Open http://localhost:3000 in your browser
2. Drag and drop files or click to select them
3. Choose your target format from the dropdown
4. Click "Convert All"
5. Your converted files will download automatically:
   - Single file: Direct download
   - Multiple files: ZIP archive

## Supported Conversions

- Office formats (DOC, DOCX, PPT, PPTX, XLS, XLSX) ↔ PDF
- Images (JPG, PNG) ↔ Images
- PDF → Images (JPG, PNG)
- Text files → PDF

## Security Features

- File type validation
- File size limits (50MB per file)
- Automatic file cleanup after 1 hour
- Input sanitization

## Project Structure

```
docconvert-pro/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── index.js          # Server entry point
├── uploads/              # Temporary upload storage
├── converted/            # Temporary converted files
└── package.json
```

## API Endpoints

- `POST /api/upload` - Upload files
- `POST /api/convert` - Convert files
- `GET /api/download/single/:filename` - Download single file
- `POST /api/download/batch` - Download ZIP archive

## Troubleshooting

### Conversion fails
- Ensure LibreOffice, ImageMagick, and Ghostscript are installed and in your PATH
- Check server logs for detailed error messages

### Files not downloading
- Check browser console for errors
- Verify the converted files exist in the `converted/` directory

### Upload fails
- Check file size (max 50MB per file)
- Verify file type is supported
- Check server logs for errors

## License

MIT
