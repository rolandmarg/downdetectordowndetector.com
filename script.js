const TARGET_URL = 'https://downdetector.com';
const CHECK_INTERVAL = 30000; // 30 seconds

let lastCheckTime = null;

// Update the check interval display
document.getElementById('checkInterval').textContent = CHECK_INTERVAL / 1000;

async function checkStatus() {
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const statusDetails = document.getElementById('statusDetails');
    const lastCheck = document.getElementById('lastCheck');
    
    try {
        // Show loading state
        statusIcon.innerHTML = '<div class="spinner"></div>';
        statusIcon.className = 'status-icon';
        statusText.textContent = 'Checking status...';
        statusDetails.textContent = '';
        
        // Try using an image load test first (works across domains)
        const startTime = Date.now();
        const isUp = await checkUsingImageLoad();
        const responseTime = Date.now() - startTime;
        
        if (isUp) {
            updateStatus('up', `Site is up! (Response time: ${responseTime}ms)`);
        } else {
            // Fallback to fetch method
            await checkUsingFetch();
        }
        
        lastCheckTime = new Date();
        
    } catch (error) {
        updateStatus('down', 'Unable to determine status');
        lastCheckTime = new Date();
    }
    
    // Update last check time
    if (lastCheckTime) {
        lastCheck.textContent = lastCheckTime.toLocaleTimeString();
    }
}

function checkUsingImageLoad() {
    return new Promise((resolve) => {
        const img = new Image();
        const timeout = setTimeout(() => {
            img.onload = null;
            img.onerror = null;
            resolve(false);
        }, 8000);
        
        img.onload = () => {
            clearTimeout(timeout);
            resolve(true);
        };
        
        img.onerror = () => {
            clearTimeout(timeout);
            resolve(false);
        };
        
        // Try to load the favicon - if the site is up, this will work
        img.src = `${TARGET_URL}/favicon.ico?t=${Date.now()}`;
    });
}

async function checkUsingFetch() {
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const statusDetails = document.getElementById('statusDetails');
    
    try {
        const startTime = Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        // Use no-cors mode to avoid CORS issues
        await fetch(TARGET_URL, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal,
            cache: 'no-store'
        });
        
        clearTimeout(timeoutId);
        const responseTime = Date.now() - startTime;
        
        // If we get here without error, site is likely up
        updateStatus('up', `Site is up! (Response time: ${responseTime}ms)`);
    } catch (error) {
        if (error.name === 'AbortError') {
            updateStatus('down', 'Request timed out after 10 seconds');
        } else {
            updateStatus('down', 'Site appears to be down or unreachable');
        }
    }
}

function updateStatus(status, details) {
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const statusDetails = document.getElementById('statusDetails');
    
    statusIcon.innerHTML = '';
    statusIcon.className = `status-icon ${status}`;
    
    // Add text content for icons
    if (status === 'up') {
        statusIcon.innerHTML = '✓';
        statusIcon.style.fontSize = '50px';
        statusIcon.style.color = 'white';
        statusText.textContent = 'Up';
        statusText.style.color = '#10b981';
    } else if (status === 'down') {
        statusIcon.innerHTML = '✗';
        statusIcon.style.fontSize = '50px';
        statusIcon.style.color = 'white';
        statusText.textContent = 'Down';
        statusText.style.color = '#ef4444';
    } else {
        statusIcon.innerHTML = '!';
        statusIcon.style.fontSize = '50px';
        statusIcon.style.color = 'white';
        statusText.textContent = 'Error';
        statusText.style.color = '#f59e0b';
    }
    
    statusDetails.textContent = details;
}

// Initial check
checkStatus();

// Set up interval checking
setInterval(checkStatus, CHECK_INTERVAL);

