# WatermarkHunter

A web application that detects, visualizes, and cleans invisible Unicode watermarks from AI-generated text.

## Features

- Detect hidden Unicode characters commonly used as watermarks
- Visual highlighting of watermark locations
- One-click text cleaning
- Download cleaned text
- Modern, responsive UI
- Docker-based deployment

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/watermarkhunter.git
cd watermarkhunter
```

2. Start the application:
```bash
docker-compose up --build
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8321

## Usage

1. Paste your text into the input area or upload a text file
2. Click "Analyze" to detect watermarks
3. View the analysis results showing watermark locations
4. Click "Clean Text" to remove watermarks
5. Download the cleaned version using the "Download" button

## Development

The project uses:
- Frontend: React + Vite with Material UI
- Backend: FastAPI (Python)
- Docker for containerization

### Project Structure

```
/watermarkhunter/
├── backend/
│   ├── app.py              # FastAPI app
│   ├── detector.py         # Watermark detection logic
│   ├── requirements.txt    # Backend dependencies
│   └── Dockerfile         
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── TextAnalyzer.jsx
│   │   └── api.js         # API client
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 