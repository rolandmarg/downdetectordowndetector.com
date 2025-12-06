# Is DownDetector Down?

A simple website that monitors and displays the status of [downdetector.com](https://downdetector.com).

## About

This is a meta-monitoring tool that checks if DownDetector itself is up or down. The website automatically checks the status every 30 seconds and displays the current availability status.

## Features

- Real-time status checking
- Automatic updates every 30 seconds
- Modern, responsive design
- Visual status indicators
- Response time monitoring

## Local Development

### Option 1: Open Directly
Simply open `index.html` in your web browser:
```bash
open index.html  # macOS
# or double-click the file in your file explorer
```

### Option 2: Use a Local Server (Recommended)

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

**Using Node.js (with npx):**
```bash
npx serve
# or
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

After starting the server, open `http://localhost:8000` in your browser.

## How It Works

The website uses the Fetch API to check if downdetector.com is accessible. Due to browser CORS policies, the check uses `no-cors` mode for direct checks, which means we can't read the response status but can detect if the request succeeds.

## Browser Compatibility

Works in all modern browsers that support:
- Fetch API
- ES6+ JavaScript
- CSS Grid and Flexbox

## License

This project is open source and available for use.

