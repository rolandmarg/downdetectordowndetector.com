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

## Setup

1. Clone or download this repository
2. Open `index.html` in a web browser
3. The website will automatically start checking the status

## How It Works

The website uses the Fetch API to check if downdetector.com is accessible. Due to browser CORS policies, the check uses `no-cors` mode for direct checks, which means we can't read the response status but can detect if the request succeeds.

## Browser Compatibility

Works in all modern browsers that support:
- Fetch API
- ES6+ JavaScript
- CSS Grid and Flexbox

## License

This project is open source and available for use.

