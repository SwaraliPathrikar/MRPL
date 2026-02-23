// Google Apps Script - Deploy as Web App
// File > Share > Deploy as web app
// Execute as: Me
// Who has access: Anyone (or Anyone within your organization)

// Configuration
const SHEET_NAME = 'Sheet1'; // Change to your sheet name
const CACHE_DURATION = 60; // Cache duration in seconds

// Main function to handle GET requests
function doGet(e) {
  try {
    const action = e.parameter.action || 'getDeviceData';
    
    switch(action) {
      case 'getDeviceData':
        return getDeviceData();
      case 'getGateStatus':
        return getGateStatus();
      case 'getDeviceSummary':
        return getDeviceSummary();
      default:
        return createResponse({ error: 'Invalid action' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

// Get all device data from sheet
function getDeviceData() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('deviceData');
  
  if (cached) {
    return createResponse(JSON.parse(cached));
  }
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Parse headers (row 1)
  const headers = data[0];
  
  // Parse device types (column 1, starting from row 2)
  const deviceTypes = data.slice(1).map(row => row[0]);
  
  // Create structured data
  const devices = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const deviceType = row[0];
    
    if (!deviceType) continue;
    
    const deviceEntry = {
      deviceType: deviceType,
      gates: {}
    };
    
    // Map each gate column to device count
    for (let j = 1; j < headers.length; j++) {
      const gateName = headers[j];
      const count = row[j] || 0;
      
      if (gateName && gateName.trim() !== '') {
        deviceEntry.gates[gateName] = parseInt(count) || 0;
      }
    }
    
    devices.push(deviceEntry);
  }
  
  const result = {
    timestamp: new Date().toISOString(),
    headers: headers.slice(1), // Exclude first column header
    devices: devices
  };
  
  // Cache for 60 seconds
  cache.put('deviceData', JSON.stringify(result), CACHE_DURATION);
  
  return createResponse(result);
}

// Get gate-wise status summary
function getGateStatus() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('gateStatus');
  
  if (cached) {
    return createResponse(JSON.parse(cached));
  }
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  const headers = data[0];
  const gates = {};
  
  // Calculate totals for each gate
  for (let j = 1; j < headers.length; j++) {
    const gateName = headers[j];
    if (!gateName || gateName.trim() === '') continue;
    
    let total = 0;
    for (let i = 1; i < data.length; i++) {
      total += parseInt(data[i][j]) || 0;
    }
    
    gates[gateName] = {
      name: gateName,
      totalDevices: total,
      status: total > 0 ? 'ONLINE' : 'OFFLINE',
      lastUpdated: new Date().toISOString()
    };
  }
  
  const result = {
    timestamp: new Date().toISOString(),
    gates: gates
  };
  
  cache.put('gateStatus', JSON.stringify(result), CACHE_DURATION);
  
  return createResponse(result);
}

// Get device summary statistics
function getDeviceSummary() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('deviceSummary');
  
  if (cached) {
    return createResponse(JSON.parse(cached));
  }
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  const summary = {
    totalCameras: 0,
    totalANPR: 0,
    totalFaceRecognition: 0,
    totalBollards: 0,
    totalBoomBarriers: 0,
    totalDisplays: 0,
    totalScanners: 0,
    totalReaders: 0
  };
  
  // Device type mapping - now uses flexible matching
  for (let i = 1; i < data.length; i++) {
    const deviceType = String(data[i][0]).toLowerCase().trim();
    
    if (!deviceType) continue; // Skip empty rows
    
    let rowTotal = 0;
    for (let j = 1; j < data[i].length; j++) {
      rowTotal += parseInt(data[i][j]) || 0;
    }
    
    // Flexible matching - checks if device type contains keywords
    if (deviceType.includes('dome') || deviceType.includes('fixed') || 
        deviceType.includes('ptz') || deviceType.includes('panoramic') ||
        (deviceType.includes('camera') && !deviceType.includes('anpr') && !deviceType.includes('face'))) {
      summary.totalCameras += rowTotal;
    }
    
    if (deviceType.includes('anpr')) {
      summary.totalANPR += rowTotal;
    }
    
    if (deviceType.includes('face') && deviceType.includes('camera')) {
      summary.totalFaceRecognition += rowTotal;
    }
    
    if (deviceType.includes('bollard')) {
      summary.totalBollards += rowTotal;
    }
    
    if (deviceType.includes('boom') || deviceType.includes('barrier')) {
      summary.totalBoomBarriers += rowTotal;
    }
    
    if (deviceType.includes('display') || deviceType.includes('video wall')) {
      summary.totalDisplays += rowTotal;
    }
    
    if (deviceType.includes('scanner') || deviceType.includes('baggage')) {
      summary.totalScanners += rowTotal;
    }
    
    if (deviceType.includes('reader') || deviceType.includes('rfid') || 
        deviceType.includes('smart card') || deviceType.includes('qr code')) {
      summary.totalReaders += rowTotal;
    }
  }
  
  const result = {
    timestamp: new Date().toISOString(),
    summary: summary
  };
  
  cache.put('deviceSummary', JSON.stringify(result), CACHE_DURATION);
  
  return createResponse(result);
}

// Helper function to create JSON response
function createResponse(data, status = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to manually clear cache (for testing)
function clearCache() {
  const cache = CacheService.getScriptCache();
  cache.removeAll(['deviceData', 'gateStatus', 'deviceSummary']);
  Logger.log('Cache cleared');
}
