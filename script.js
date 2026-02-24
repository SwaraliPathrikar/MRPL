
const MRPL_DEVICE_DATA = {
    totalCameras: 230, // Calculated from actual gate distribution
    onlineCameras: 219, // 95% online
    offlineCameras: 11, // 5% offline
    
    // ANPR System (from BOQ)
    totalANPR: 20,
    onlineANPR: 19,
    
    // Face Recognition System (from BOQ)
    totalFaceRecognition: 25,
    onlineFaceRecognition: 24,
    
    // Storage
    storageCapacityTB: 100,
    storageUsedTB: 67,
    
    gates: {
        'Main Gate': { cameras: '80/80', anpr: 4, bollards: 8, status: 'ONLINE' },
        'LP Gate': { cameras: '28/28', anpr: 2, bollards: 8, status: 'ONLINE' },
        'Jokatte Gate': { cameras: '52/52', anpr: 4, bollards: 8, status: 'ONLINE' },
        'E2 Gate': { cameras: '18/18', anpr: 2, bollards: 0, status: 'ONLINE' },
        'Cargo Gate': { cameras: '32/32', anpr: 4, bollards: 8, status: 'ONLINE' },
        'Railway Siding': { cameras: '10/10', anpr: 2, bollards: 0, status: 'ONLINE' },
        'PCR': { cameras: '6/6', anpr: 0, bollards: 0, status: 'ONLINE' },
        'CISF Checking': { cameras: '4/4', anpr: 2, bollards: 0, status: 'ONLINE' }
    },
    
    // All camera types from BOQ
    cameraTypes: [
        { type: 'Indoor Dome Cameras- 5 MP', total: 114 },
        { type: 'Outdoor Fixed Cameras- 5 MP', total: 107 },
        { type: 'PTZ with IR - 2MP', total: 11 },
        { type: 'Panoramic Cameras- 180 - 20 MP', total: 9 },
        { type: 'Panoramic Cameras- 360° - 20 MP', total: 22 },
        { type: 'ANPR Cameras', total: 20 },
        { type: 'Face recognition Cameras', total: 25 }
    ]
};

// Calculate percentages
function calculatePercentages() {
    const anprPercent = Math.round((MRPL_DEVICE_DATA.onlineANPR / MRPL_DEVICE_DATA.totalANPR) * 100);
    const frPercent = Math.round((MRPL_DEVICE_DATA.onlineFaceRecognition / MRPL_DEVICE_DATA.totalFaceRecognition) * 100);
    const storagePercent = Math.round((MRPL_DEVICE_DATA.storageUsedTB / MRPL_DEVICE_DATA.storageCapacityTB) * 100);
    
    return {
        anpr: anprPercent + '%',
        fr: frPercent + '%',
        storage: storagePercent + '%'
    };
}

document.addEventListener('DOMContentLoaded', () => {
    updateKPIFormats();
});

function initializeMRPLData() {
    console.log('✅ Loading MRPL Device Data');
    
    updateKPIFormats();
    
    populateGateHealthTable();
    
    loadFallbackInventory();
    loadFallbackAnalytics(); 
}

function loadFallbackInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
 
    const boqDevices = [
        { type: 'Gate', total: 8 },
        { type: 'Automatic Tyre Killer', total: 3},
        { type: 'Manual Tyre Killer', total: 3 },
        { type: 'Under Vehicle Surveillance System (UVSS)', total: 6 },
        { type: 'Bollards', total: 24 },
        { type: 'Boom Barrier', total: 30 },
        { type: 'Swing Barriers', total: 24 },
        { type: 'Visitor Kiosks', total: 6 },
        { type: '32" Overhead Display', total: 19 },
        { type: 'Indoor Digital Displays', total: 8 },
        { type: 'Outdoor Digital Displays', total: 9 },
        { type: 'Video Wall (6 x 3)', total: 1 },
        { type: 'Video Wall (2 x 3)', total: 1 },
        { type: 'Door Frame Metal Detector (DFMD)', total: 15 },
        { type: 'Baggage Scanner', total: 8 },
        { type: 'Frisking Booth', total: 5 },
        { type: 'Long Range RFID Reader', total: 30 },
        { type: 'Push Button for Boom Barrier', total: 30 },
        { type: 'Electro Magnetic Locks', total: 7 },
        { type: 'Indoor Dome Cameras- 5 MP', total: 114 },
        { type: 'Outdoor Fixed Cameras- 5 MP', total: 107 },
        { type: 'PTZ with IR - 2MP', total: 6 },
        { type: 'Panoramic Camera- 180° - 20 MP', total: 9 },
        { type: 'Panoramic Camera- 360° - 20 MP', total: 22 },
        { type: 'ANPR Cameras', total: 20 },
        { type: 'Face recognition Cameras', total: 25 },
        { type: 'IP Horn Speaker', total: 86 },
        { type: 'IP Ceiling Speaker', total: 80 },
        { type: 'Master & Local Control Desks', total: 7 },
        { type: 'Face recognition Readers', total: 48 },
        { type: 'Smart Card Reader', total: 7 },
        { type: 'QR Code Readers', total: 48 },
        { type: 'Camera Poles', total: 103 },
        { type: 'Rack (12U)', total: 19 },
        { type: 'Outdoor Junction Box', total: 47 },
        { type: 'Portable face readers (buses)', total: 20 },
        { type: 'Portable face readers (gates)', total: 4 },
        { type: '10 finger enrolment readers', total: 4 },
        { type: 'Indoor signages', total: 30 },
        { type: 'Wireless Access Point', total: 2 },
        { type: 'Video Conferencing Solution', total: 2 },
        { type: 'Smart Rack', total: 1 },
        { type: 'Diesel Generator Set', total: 2 }
    ];
    
    let totalDevices = 0;
    
    boqDevices.forEach(device => {
        totalDevices += device.total;
        
        const row = document.createElement('tr');
        row.className = 'device-row';
        row.innerHTML = `
            <td style="font-weight: 600; color: #00d4ff;">${device.type}</td>
            <td style="font-weight: bold; font-size: 1.2rem; color: #00ff88;">${device.total}</td>
            <td style="font-size: 0.9rem; color: #8b9dc3;">Distributed across all gates</td>
        `;
        tbody.appendChild(row);
    });
    
    const summary = document.getElementById('inventorySummary');
    if (summary) {
        summary.innerHTML = `
            <strong>${boqDevices.length}</strong> device types | 
            <strong>${totalDevices}</strong> total devices | 
            <strong>8</strong> gates
        `;
    }
}

// NEW: Device Analytics Charts
function updateDeviceAnalytics() {
    if (!allDevicesData) return;
    
    // Categorize devices
    const categories = {
        'Cameras': 0,
        'Access Control': 0,
        'Displays': 0,
        'Readers': 0,
        'Security Equipment': 0,
        'Infrastructure': 0,
        'Others': 0
    };
    
    const topDevices = [];
    const gateDeviceCounts = {};
    
    allDevicesData.devices.forEach(device => {
        const deviceType = device.deviceType.toLowerCase();
        const total = Object.values(device.gates).reduce((sum, count) => sum + count, 0);
        
        topDevices.push({ name: device.deviceType, count: total });
        
        // Categorize
        if (deviceType.includes('camera') || deviceType.includes('dome') || 
            deviceType.includes('ptz') || deviceType.includes('panoramic') ||
            deviceType.includes('anpr') || deviceType.includes('face recognition camera')) {
            categories['Cameras'] += total;
        } else if (deviceType.includes('bollard') || deviceType.includes('barrier') || 
                   deviceType.includes('gate') || deviceType.includes('tyre killer') ||
                   deviceType.includes('Under Vehicle Surveillance System (UVSS)') || deviceType.includes('lock')) {
            categories['Access Control'] += total;
        } else if (deviceType.includes('display') || deviceType.includes('video wall') ||
                   deviceType.includes('kiosk') || deviceType.includes('signage')) {
            categories['Displays'] += total;
        } else if (deviceType.includes('reader') || deviceType.includes('rfid') ||
                   deviceType.includes('smart card') || deviceType.includes('qr code')) {
            categories['Readers'] += total;
        } else if (deviceType.includes('scanner') || deviceType.includes('Door Frame Metal Detector (DFMD)') ||
                   deviceType.includes('frisking') || deviceType.includes('baggage')) {
            categories['Security Equipment'] += total;
        } else if (deviceType.includes('pole') || deviceType.includes('rack') ||
                   deviceType.includes('junction') || deviceType.includes('wireless') ||
                   deviceType.includes('speaker') || deviceType.includes('Diesel Generator Set')) {
            categories['Infrastructure'] += total;
        } else {
            categories['Others'] += total;
        }
        
        // Gate distribution
        Object.entries(device.gates).forEach(([gate, count]) => {
            if (!gateDeviceCounts[gate]) gateDeviceCounts[gate] = 0;
            gateDeviceCounts[gate] += count;
        });
    });
    
    // Sort and get top 10 devices
    topDevices.sort((a, b) => b.count - a.count);
    const top10 = topDevices.slice(0, 10);
    
    // Create charts
    createDeviceCategoryChart(categories);
    createTopDevicesChart(top10);
    createGateDistributionChart(gateDeviceCounts);
}

function createDeviceCategoryChart(categories) {
    const ctx = document.getElementById('deviceCategoryChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.deviceCategoryChartInstance) {
        window.deviceCategoryChartInstance.destroy();
    }
    
    // Store category device mappings
    window.categoryDeviceMap = {
        'Surveillance Systems': [
            'Indoor Dome - 5 MP (114)',
            'Outdoor Fixed - 5 MP (107)',
            'PTZ with IR - 2MP (11)',
            'Panoramic - 180 - 20 MP (9)',
            'Panoramic - 360 - 20 MP (22)',
            'ANPR Cameras (20)',
            'Face recognition Cameras (25)'
        ],
        'Access Control': [
            'Automatic Tyre Killer (3)',
            'Manual Tyre Killer (3)',
            'Under Vehicle Surveillance System (UVSS) (6)',
            'Bollards (24)',
            'Boom Barrier (30)',
            'Swing Barriers (24)',
            'EM Locks (7)'
        ],
        'Identification Systems': [
            'Face recognition Readers (48)',
            'Smart Card Reader (7)',
            'QR Code Readers (48)',
            'Long Range RFID Reader (30)',
            '10 finger enrolment readers (4)',
            'Portable face readers (buses) (20)',
            'Portable face readers (gates) (4)'
        ],
        'Security Screening': [
            'Door Frame Metal Detector (DFMD) (15)',
            'Baggage Scanner (8)',
            'Frisking Booth (5)'
        ],
        'Communication': [
            'IP Horn Speaker (86)',
            'IP Ceiling Speaker (80)'
        ],
        'Infrastructure': [
            'Camera Poles (103)',
            'Rack (12U) (19)',
            'Outdoor Junction Box (47)',
            'Visitor Kiosks (6)',
            '32" Overhead Display (19)',
            'Indoor Digital Displays (8)',
            'Outdoor Digital Displays (9)',
            'Video Wall (6 by 3) (1)',
            'Video Wall (2 by 3) (1)',
            'Push Button for Boom Barrier (30)',
            'Master & Local Control Desks (7)',
            'Indoor signages (30)',
            'Wireless Access Point (2)',
            'Video Conferencing Solution (2)',
            'Smart Rack (1)',
            'Diesel Generator Set (2)'
        ]
    };
    
    window.deviceCategoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories).filter(k => categories[k] > 0),
            datasets: [{
                data: Object.values(categories).filter(v => v > 0),
                backgroundColor: ['#00d4ff', '#00ff88', '#ffaa00', '#ff3366', '#8b9dc3', '#dc8570ff'],
                borderWidth: 2,
                borderColor: '#1a1f3a'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#e0e0e0', font: { size: 11 } }
                },
                title: {
                    display: true,
                    text: 'Device Categories',
                    color: '#00d4ff',
                    font: { size: 14, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return label + ': ' + value + ' devices (Click to view list)';
                        }
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const labels = Object.keys(categories).filter(k => categories[k] > 0);
                    const categoryName = labels[index];
                    showCategoryDeviceList(categoryName);
                }
            }
        }
    });
}

// Show device list for clicked category
function showCategoryDeviceList(categoryName) {
    if (!window.categoryDeviceMap) return;
    
    const devices = window.categoryDeviceMap[categoryName] || [];
    const categoryCount = devices.length;
    
    const categoryColors = {
        'Surveillance Systems': '#00d4ff',
        'Access Control': '#00ff88',
        'Identification Systems': '#ffaa00',
        'Security Screening': '#ff3366',
        'Communication': '#8b9dc3',
        'Infrastructure': '#dc8570ff'
    };
    
    const categoryIcons = {
        'Surveillance Systems': '📹',
        'Access Control': '🚧',
        'Identification Systems': '🔍',
        'Security Screening': '🛡️',
        'Communication': '📢',
        'Infrastructure': '🏗️'
    };
    
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'categoryPopupOverlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 10000; display: flex; align-items: center; justify-content: center;';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.style.cssText = 'background: linear-gradient(135deg, #1e2749 0%, #2d3561 100%); border-radius: 12px; padding: 2rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; border: 2px solid #3d4a7a; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);';
    
    let html = '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">';
    html += `<div style="display: flex; align-items: center; gap: 0.7rem;">`;
    html += `<span style="font-size: 2rem;">${categoryIcons[categoryName]}</span>`;
    html += `<div>`;
    html += `<div style="color: ${categoryColors[categoryName]}; font-size: 1.3rem; font-weight: 600;">${categoryName}</div>`;
    html += `<div style="color: #8b9dc3; font-size: 0.85rem; margin-top: 0.2rem;">${categoryCount} device types</div>`;
    html += `</div>`;
    html += `</div>`;
    html += `<button onclick="closeCategoryPopup()" style="background: transparent; border: none; color: #8b9dc3; font-size: 2rem; cursor: pointer; line-height: 1; padding: 0; width: 40px; height: 40px; border-radius: 50%; transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#8b9dc3';">&times;</button>`;
    html += '</div>';
    
    if (devices.length === 0) {
        html += '<div style="text-align: center; padding: 3rem; color: #8b9dc3;">';
        html += '<div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>';
        html += '<div>No devices in this category</div>';
        html += '</div>';
    } else {
        html += '<div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 0.5rem;">';
        devices.forEach((device, index) => {
            const bgColor = index % 2 === 0 ? 'rgba(0, 212, 255, 0.05)' : 'transparent';
            html += `<div style="padding: 0.8rem; border-bottom: ${index < devices.length - 1 ? '1px solid #3d4a7a' : 'none'}; background: ${bgColor}; color: #e0e0e0; font-size: 0.95rem; border-radius: 4px;">${device}</div>`;
        });
        html += '</div>';
    }
    
    popup.innerHTML = html;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeCategoryPopup();
        }
    });
}

// Close category popup
function closeCategoryPopup() {
    const overlay = document.getElementById('categoryPopupOverlay');
    if (overlay) {
        overlay.remove();
    }
}

function createTopDevicesChart(topDevices) {
    const ctx = document.getElementById('topDevicesChart');
    if (!ctx) return;
    
    if (window.topDevicesChartInstance) {
        window.topDevicesChartInstance.destroy();
    }
    
    window.topDevicesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topDevices.map(d => d.name.length > 20 ? d.name.substring(0, 20) + '...' : d.name),
            datasets: [{
                label: 'Count',
                data: topDevices.map(d => d.count),
                backgroundColor: '#00ff88',
                borderColor: '#00ff88',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Top 10 Devices by Count',
                    color: '#00d4ff',
                    font: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#8b9dc3' },
                    grid: { color: '#3d4a7a' }
                },
                y: {
                    ticks: { 
                        color: '#8b9dc3', 
                        font: { size: 10 },
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    },
                    grid: { color: '#3d4a7a' }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10
                }
            }
        }
    });
}

function createGateDistributionChart(gateDeviceCounts) {
    const ctx = document.getElementById('gateDeviceDistChart');
    if (!ctx) return;
    
    if (window.gateDistChartInstance) {
        window.gateDistChartInstance.destroy();
    }
    
    window.gateDistChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(gateDeviceCounts),
            datasets: [{
                label: 'Total Devices',
                data: Object.values(gateDeviceCounts),
                backgroundColor: '#00d4ff',
                borderColor: '#00d4ff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Devices per Gate',
                    color: '#00d4ff',
                    font: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#8b9dc3' },
                    grid: { color: '#3d4a7a' }
                },
                x: {
                    ticks: { color: '#8b9dc3', font: { size: 10 } },
                    grid: { color: '#3d4a7a' }
                }
            }
        }
    });
}

// Fallback analytics when Google Sheets not connected
function loadFallbackAnalytics() {
    // Security-focused categories based on actual gate data
    const categories = {
        'Surveillance Systems': 230,      // All cameras (calculated from gates)
        'Access Control': 105,             // Barriers, Bollards, Tyre Killers, UVSS, Locks
        'Identification Systems': 161,     // All readers (Face, RFID, QR, Smart Card)
        'Security Screening': 28,          // DFMD, Scanners, Frisking
        'Communication': 166,              // Speakers (IP Horn + Ceiling)
        'Infrastructure': 396              // Poles, Racks, Junction Boxes, Kiosks, Displays, etc.
    };
    
    const topDevices = [
        { name: 'Indoor Dome Camera - 5 MP', count: 114 },
        { name: 'Outdoor Fixed Camera - 5 MP', count: 107 },
        { name: 'Camera Poles', count: 103 },
        { name: 'IP Horn Speaker', count: 86 },
        { name: 'IP Ceiling Speaker', count: 80 },
        { name: 'Face recognition Readers', count: 48 },
        { name: 'QR Code Readers', count: 48 },
        { name: 'Outdoor Junction Box', count: 47 },
        { name: 'Boom Barrier', count: 30 },
        { name: 'Long Range RFID Reader', count: 30 }
    ];
    
    // Calculate actual gate device totals from gateDeviceDistribution
    const gateDeviceCounts = {};
    Object.entries(gateDeviceDistribution).forEach(([gateName, devices]) => {
        const total = Object.values(devices).reduce((sum, count) => sum + count, 0);
        gateDeviceCounts[gateName] = total;
    });
    
    createDeviceCategoryChart(categories);
    createTopDevicesChart(topDevices);
    createGateDistributionChart(gateDeviceCounts);
}

const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxCW1Illfh-kSFWlMwLGuPUAkaNhpwj0ftMgTvsPpHfi3QWqjQF_jClZdI4I78cki8-RA/exec';
let allDevicesData = null;

// Initialize Google Sheets - fetch ALL devices
async function initializeGoogleSheets() {
    try {
        console.log('🔄 Connecting to Google Sheets...');
        
        const response = await fetch(`${GOOGLE_SHEETS_WEB_APP_URL}?action=getDeviceData`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        allDevicesData = await response.json();
        console.log('✅ Connected! Loaded', allDevicesData.devices.length, 'device types from sheet');
        
        updateDashboardFromSheets();
        
    } catch (error) {
        console.error('❌ Failed to connect:', error);
        console.log('📊 Using fallback data');
        initializeMRPLData();
    }
}

function updateDashboardFromSheets() {
    if (!allDevicesData) return;
    
    let totalCameras = 0, totalANPR = 0, totalBollards = 0;
    
    allDevicesData.devices.forEach(device => {
        const deviceType = device.deviceType.toLowerCase();
        const total = Object.values(device.gates).reduce((sum, count) => sum + count, 0);
        
        if (deviceType.includes('camera') || deviceType.includes('dome') || 
            deviceType.includes('ptz') || deviceType.includes('panoramic')) {
            totalCameras += total;
        }
        if (deviceType.includes('anpr')) totalANPR += total;
        if (deviceType.includes('bollard')) totalBollards += total;
    });
    
    // Update dashboard (skip camera KPIs)
    updateGateTableFromSheets();
    updateDeviceInventoryTable(); // NEW: Show all devices
    updateDeviceAnalytics(); // NEW: Show device analytics
    generateAllDeviceCards(); // Regenerate device cards with Google Sheets data
}

function updateGateTableFromSheets() {
    if (!allDevicesData) return;
    
    const tbody = document.querySelector('.data-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const gates = {};
    allDevicesData.devices.forEach(device => {
        Object.keys(device.gates).forEach(gateName => {
            if (!gates[gateName]) gates[gateName] = { cameras: 0, anpr: 0, bollards: 0 };
            
            const deviceType = device.deviceType.toLowerCase();
            const count = device.gates[gateName];
            
            if (deviceType.includes('camera') || deviceType.includes('dome') || 
                deviceType.includes('ptz') || deviceType.includes('panoramic')) {
                gates[gateName].cameras += count;
            }
            if (deviceType.includes('anpr')) gates[gateName].anpr += count;
            if (deviceType.includes('bollard')) gates[gateName].bollards += count;
        });
    });
    
    Object.entries(gates).slice(0, 10).forEach(([gateName, data]) => {
        const online = Math.floor(data.cameras * 0.95);
        const statusClass = online === data.cameras ? 'good' : 'warning';
        const status = online === data.cameras ? 'ONLINE' : 'WARNING';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${gateName}</td>
            <td>${online}/${data.cameras}</td>
            <td>${data.anpr > 0 ? '✓' : '✗'}</td>
            <td>${data.bollards > 0 ? '✓' : '✗'}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// NEW: Update complete device inventory table with ALL devices
function updateDeviceInventoryTable() {
    if (!allDevicesData) return;
    
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    let totalDevices = 0;
    let totalDeviceTypes = allDevicesData.devices.length;
    
    // Sort devices alphabetically
    const sortedDevices = [...allDevicesData.devices].sort((a, b) => 
        a.deviceType.localeCompare(b.deviceType)
    );
    
    sortedDevices.forEach(device => {
        const deviceTotal = Object.values(device.gates).reduce((sum, count) => sum + count, 0);
        totalDevices += deviceTotal;
        
        // Create gate distribution string
        const gateDistribution = Object.entries(device.gates)
            .filter(([gate, count]) => count > 0)
            .map(([gate, count]) => `${gate}: ${count}`)
            .join(' | ');
        
        const row = document.createElement('tr');
        row.className = 'device-row';
        row.innerHTML = `
            <td style="font-weight: 600; color: #00d4ff;">${device.deviceType}</td>
            <td style="font-weight: bold; font-size: 1.2rem; color: #00ff88;">${deviceTotal}</td>
            <td style="font-size: 0.9rem; color: #8b9dc3;">${gateDistribution || 'Not deployed'}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update summary
    const summary = document.getElementById('inventorySummary');
    if (summary) {
        summary.innerHTML = `
            <strong>${totalDeviceTypes}</strong> device types | 
            <strong>${totalDevices}</strong> total devices | 
            <strong>${Object.keys(allDevicesData.devices[0]?.gates || {}).length}</strong> gates
        `;
    }
}

// Search/filter devices
function filterDevices() {
    const searchInput = document.getElementById('deviceSearch');
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.device-row');
    
    let visibleCount = 0;
    rows.forEach(row => {
        const deviceName = row.cells[0].textContent.toLowerCase();
        if (deviceName.includes(filter)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Show count of filtered results
    if (filter) {
        const summary = document.getElementById('inventorySummary');
        if (summary) {
            summary.innerHTML = `Showing <strong>${visibleCount}</strong> devices matching "${filter}"`;
        }
    }
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('currentTime').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

// Dashboard navigation
function showDashboard(dashboardId) {
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(dashboardId).classList.add('active');
    event.target.classList.add('active');
}

// Update dashboard with MRPL data
function updateDashboardWithMRPLData() {
    // Skip KPI cards update as they're removed
    
    // Calculate percentages
    const anprWorking = Math.round((40 / 42) * 100);
    const frWorking = Math.round((71 / 75) * 100);
    updateElement('anprStatus', anprWorking + '%');
    updateElement('frStatus', frWorking + '%');
    
    // Update gate table
    updateGateTable();
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = typeof value === 'number' ? value.toLocaleString() : value;
    }
}

function updateGateTable() {
    const tbody = document.querySelector('.data-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    Object.entries(MRPL_DEVICE_DATA.gates).forEach(([gateName, data]) => {
        const row = document.createElement('tr');
        const statusClass = data.status === 'ONLINE' ? 'good' : 'warning';
        row.innerHTML = `
            <td>${gateName}</td>
            <td>${data.cameras}</td>
            <td>${data.anpr > 0 ? '✓' : '✗'}</td>
            <td>${data.bollards > 0 ? '✓' : '✗'}</td>
            <td><span class="status-badge ${statusClass}">${data.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function showConnectionStatus(connected) {
    let indicator = document.getElementById('mrpl-status');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'mrpl-status';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            z-index: 1000;
            background: rgba(0, 255, 136, 0.2);
            border: 2px solid #00ff88;
            color: #00ff88;
        `;
        document.body.appendChild(indicator);
    }
    
    indicator.textContent = '🟢 MRPL BOQ Data Loaded';
}

// Initialize charts when page loads
window.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    simulateLiveData();
    initializeGoogleSheets(); // Try Google Sheets first, fallback to mock data
    
    // Ensure gate health table is populated
    setTimeout(() => {
        if (document.getElementById('gateHealthTableBody').children.length === 0) {
            console.log('⚠️ Table empty, populating now...');
            populateGateHealthTable();
        }
    }, 500);
});

function initializeCharts() {
    // Device Status by Category Chart - Start with Cameras
    showCategoryStatus('Cameras');

    // Uptime Trend Chart
    const uptimeTrendCtx = document.getElementById('uptimeTrendChart');
    if (uptimeTrendCtx) {
        new Chart(uptimeTrendCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Uptime %',
                    data: [98.5, 99.2, 98.8, 99.5, 99.1, 98.9, 99.2],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#00d4ff',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 95,
                        max: 100,
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    },
                    x: {
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#e0e0e0' }
                    }
                }
            }
        });
    }

    // Gender Analytics Chart
    const genderCtx = document.getElementById('genderChart');
    if (genderCtx) {
        new Chart(genderCtx, {
            type: 'bar',
            data: {
                labels: ['Employees', 'Contractors', 'Visitors'],
                datasets: [
                    {
                        label: 'Male',
                        data: [520, 245, 120],
                        backgroundColor: '#00d4ff'
                    },
                    {
                        label: 'Female',
                        data: [130, 35, 45],
                        backgroundColor: '#ff3366'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    },
                    x: {
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#e0e0e0' }
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
    }

    // Hourly Entry Pattern Chart
    const hourlyEntryCtx = document.getElementById('hourlyEntryChart');
    if (hourlyEntryCtx) {
        new Chart(hourlyEntryCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                datasets: [{
                    label: 'Entries',
                    data: [12, 8, 5, 45, 320, 280, 180, 220, 240, 150, 80, 35],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#00d4ff',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    },
                    x: {
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
    }

    // Vehicle Type Chart
    const vehicleTypeCtx = document.getElementById('vehicleTypeChart');
    if (vehicleTypeCtx) {
        new Chart(vehicleTypeCtx, {
            type: 'doughnut',
            data: {
                labels: ['2-Wheeler', '4-Wheeler', 'Trucks', 'Tankers', 'Company Vehicles'],
                datasets: [{
                    data: [145, 85, 35, 12, 8],
                    backgroundColor: ['#00d4ff', '#00ff88', '#ffaa00', '#ff3366', '#8b9dc3'],
                    borderWidth: 2,
                    borderColor: '#1a1f3a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#e0e0e0', font: { size: 11 } }
                    }
                }
            }
        });
    }

    // Gate Movement Chart
    const gateMovementCtx = document.getElementById('gateMovementChart');
    if (gateMovementCtx) {
        new Chart(gateMovementCtx, {
            type: 'bar',
            data: {
                labels: ['Main Gate', 'Cargo Gate', 'LP Gate', 'Jokatte Gate', 'Railway Siding'],
                datasets: [
                    {
                        label: 'Entries',
                        data: [450, 300, 280, 150, 70],
                        backgroundColor: '#00ff88'
                    },
                    {
                        label: 'Exits',
                        data: [430, 280, 270, 140, 60],
                        backgroundColor: '#00d4ff'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    },
                    x: {
                        ticks: { color: '#8b9dc3' },
                        grid: { color: '#3d4a7a' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#e0e0e0' }
                    }
                }
            }
        });
    }
}

// Simulate live data updates
function simulateLiveData() {
    setInterval(() => {
        // Update live counters with random variations
        const entries = document.getElementById('totalEntries');
        const exits = document.getElementById('totalExits');
        const inside = document.getElementById('currentlyInside');
        
        if (entries && exits && inside) {
            const currentEntries = parseInt(entries.textContent.replace(',', ''));
            const currentExits = parseInt(exits.textContent.replace(',', ''));
            
            // Randomly increment entries/exits
            if (Math.random() > 0.5) {
                entries.textContent = (currentEntries + 1).toLocaleString();
            }
            if (Math.random() > 0.6) {
                exits.textContent = (currentExits + 1).toLocaleString();
            }
            
            // Update inside count
            const newInside = parseInt(entries.textContent.replace(',', '')) - parseInt(exits.textContent.replace(',', ''));
            inside.textContent = newInside.toLocaleString();
        }
    }, 5000);
}

// Report generation function
function generateReport(reportType) {
    alert(`Generating ${reportType} report...\n\nThis would typically:\n- Fetch data from backend\n- Generate PDF/Excel\n- Download or email report\n\nReport Type: ${reportType.toUpperCase()}`);
}

// Add click handlers for interactive elements
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-action')) {
        const row = e.target.closest('tr');
        const incidentId = row.querySelector('td').textContent;
        alert(`Opening incident details for ${incidentId}\n\nThis would show:\n- Full incident details\n- Camera snapshots\n- Officer notes\n- Resolution actions`);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                document.querySelector('[onclick*="availability"]').click();
                break;
            case '2':
                document.querySelector('[onclick*="functional"]').click();
                break;
            case '3':
                document.querySelector('[onclick*="incident"]').click();
                break;
            case '4':
                document.querySelector('[onclick*="reports"]').click();
                break;
        }
    }
});

console.log('MRPL ISCC Dashboard Loaded');
console.log('Keyboard Shortcuts: Alt+1/2/3/4 to switch dashboards');


// Category Status Data
const categoryStatusData = {
    'Cameras': { online: 462, warning: 18, maintenance: 5, offline: 2 },
    'Access Control': { online: 98, warning: 4, maintenance: 1, offline: 1 },
    'Displays': { online: 60, warning: 3, maintenance: 1, offline: 0 },
    'Readers': { online: 152, warning: 6, maintenance: 2, offline: 0 },
    'Security Equipment': { online: 28, warning: 1, maintenance: 1, offline: 0 },
    'Infrastructure': { online: 210, warning: 8, maintenance: 2, offline: 0 }
};

let deviceStatusChartInstance = null;

function showCategoryStatus(category) {
    const ctx = document.getElementById('deviceStatusChart');
    if (!ctx) return;
    
    // Update selected category label
    const label = document.getElementById('selectedCategory');
    if (label) label.textContent = category;
    
    // Destroy existing chart
    if (deviceStatusChartInstance) {
        deviceStatusChartInstance.destroy();
    }
    
    const data = categoryStatusData[category];
    
    // Create pie chart
    deviceStatusChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Online', 'Warning', 'Maintenance', 'Offline'],
            datasets: [{
                data: [data.online, data.warning, data.maintenance, data.offline],
                backgroundColor: ['#00ff88', '#ffaa00', '#8b9dc3', '#ff3366'],
                borderWidth: 2,
                borderColor: '#1a1f3a'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { 
                        color: '#e0e0e0', 
                        font: { size: 12 },
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}


let currentDeviceType = '';
let currentDeviceData = [];

// Show device details modal
function showDeviceDetails(type) {
    currentDeviceType = type;
    const modal = document.getElementById('deviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const tbody = document.getElementById('deviceDetailsBody');
    
    // Prepare data based on type - USING EXACT BOQ NUMBERS
    currentDeviceData = [];
    let title = '';
    let deviceCounter = 1;
    
    if (type === 'total') {
        title = 'Total Cameras - Complete List (As per BOQ)';
        
        // Create individual device entries for each camera
        MRPL_DEVICE_DATA.cameraTypes.forEach(camera => {
            const gates = Object.keys(MRPL_DEVICE_DATA.gates);
            const baseCount = Math.floor(camera.total / gates.length);
            const remainder = camera.total % gates.length;
            
            gates.forEach((gate, gateIndex) => {
                const gateTotal = baseCount + (gateIndex < remainder ? 1 : 0);
                const gateOnline = Math.floor(gateTotal * 0.95);
                const gateOffline = gateTotal - gateOnline;
                
                // Add individual online cameras
                for (let i = 0; i < gateOnline; i++) {
                    currentDeviceData.push({
                        type: camera.type,
                        gate: gate,
                        count: 1,
                        online: 1,
                        offline: 0,
                        status: 'Online',
                        deviceNumber: deviceCounter++
                    });
                }
                
                // Add individual offline cameras
                for (let i = 0; i < gateOffline; i++) {
                    currentDeviceData.push({
                        type: camera.type,
                        gate: gate,
                        count: 1,
                        online: 0,
                        offline: 1,
                        status: 'Offline',
                        deviceNumber: deviceCounter++
                    });
                }
            });
        });
        
    } else if (type === 'online') {
        title = 'Online Cameras - Operational Devices';
        
        // Create individual online camera entries
        MRPL_DEVICE_DATA.cameraTypes.forEach(camera => {
            const onlineCount = camera.type === 'ANPR Cameras' ? 40 : 
                               camera.type === 'Face recognition Cameras' ? 71 :
                               Math.floor(camera.total * 0.95);
            
            const gates = Object.keys(MRPL_DEVICE_DATA.gates);
            const baseCount = Math.floor(onlineCount / gates.length);
            const remainder = onlineCount % gates.length;
            
            gates.forEach((gate, gateIndex) => {
                const gateCount = baseCount + (gateIndex < remainder ? 1 : 0);
                
                for (let i = 0; i < gateCount; i++) {
                    currentDeviceData.push({
                        type: camera.type,
                        gate: gate,
                        count: 1,
                        online: 1,
                        offline: 0,
                        status: 'Online',
                        deviceNumber: deviceCounter++
                    });
                }
            });
        });
        
    } else if (type === 'offline') {
        title = 'Offline Cameras - Devices Requiring Attention';
        
        // Create individual offline camera entries
        MRPL_DEVICE_DATA.cameraTypes.forEach(camera => {
            const offlineCount = camera.type === 'ANPR Cameras' ? 2 : 
                                camera.type === 'Face recognition Cameras' ? 4 :
                                Math.ceil(camera.total * 0.05);
            
            if (offlineCount > 0) {
                const gates = ['Cargo Gate', 'Main Gate', 'LP Gate', 'E2 Gate'];
                
                for (let i = 0; i < offlineCount; i++) {
                    const assignedGate = gates[i % gates.length];
                    currentDeviceData.push({
                        type: camera.type,
                        gate: assignedGate,
                        count: 1,
                        online: 0,
                        offline: 1,
                        status: 'Offline',
                        deviceNumber: deviceCounter++
                    });
                }
            }
        });
    }
    
    // Update modal title
    modalTitle.textContent = title;
    
    // Populate table
    tbody.innerHTML = '';
    currentDeviceData.forEach((device, index) => {
        const row = document.createElement('tr');
        const statusBadge = device.offline > 0 ? 
            `<span class="status-badge offline">Offline</span>` :
            `<span class="status-badge online">Online</span>`;
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${device.type} #${device.deviceNumber}</td>
            <td>${device.gate}</td>
            <td>${device.count}</td>
            <td>${statusBadge}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Backup data and initialize view
    allDeviceDataBackup = [...currentDeviceData];
    currentReportView = 'all';
    switchReportView('all');
    
    // Show modal
    modal.style.display = 'block';
}

// Close modal
function closeDeviceModal() {
    document.getElementById('deviceModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('deviceModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Download device list
// Download device report with filter (all/online/offline)
function downloadDeviceReport(filterType, format) {
    if (currentDeviceData.length === 0) {
        alert('No data to download');
        return;
    }
    
    // Filter data based on type
    let filteredData = [];
    let reportTitle = '';
    
    if (filterType === 'all') {
        filteredData = currentDeviceData;
        reportTitle = 'All Devices';
    } else if (filterType === 'online') {
        filteredData = currentDeviceData.filter(device => {
            if (device.offline !== undefined) {
                return device.offline === 0;
            }
            return device.status && device.status.toLowerCase().includes('online');
        });
        reportTitle = 'Online Devices';
    } else if (filterType === 'offline') {
        filteredData = currentDeviceData.filter(device => {
            if (device.offline !== undefined) {
                return device.offline > 0;
            }
            return device.status && device.status.toLowerCase().includes('offline');
        });
        reportTitle = 'Offline Devices';
    }
    
    if (filteredData.length === 0) {
        alert(`No ${filterType} devices found!`);
        return;
    }
    
    const modalTitle = document.getElementById('modalTitle').textContent;
    const dateStr = new Date().toISOString().split('T')[0];
    const deviceName = currentDeviceType.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `MRPL_${deviceName}_${filterType}_${dateStr}`;
    
    if (format === 'pdf') {
        // PDF format
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(18);
        doc.setTextColor(0, 212, 255);
        doc.text('MRPL ISCC Dashboard', 14, 20);
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`${modalTitle} - ${reportTitle}`, 14, 30);
        
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 38);
        doc.text(`Total Records: ${filteredData.length}`, 14, 44);
        
        // Prepare table data
        const tableData = filteredData.map((device, index) => {
            const status = device.status || (device.offline > 0 ? `${device.offline} Offline` : 'Online');
            return [
                index + 1,
                device.type,
                device.gate,
                device.count,
                status
            ];
        });
        
        // Add table
        doc.autoTable({
            startY: 50,
            head: [['Sr. No.', 'Device Type', 'Gate', 'Count', 'Status']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: filterType === 'online' ? [0, 255, 136] : 
                          filterType === 'offline' ? [255, 51, 102] : [0, 212, 255],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            styles: {
                fontSize: 9,
                cellPadding: 3
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            }
        });
        
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
                `Page ${i} of ${pageCount} | MRPL - Integrated Security Command & Control System`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
        }
        
        doc.save(`${fileName}.pdf`);
        alert(`✅ Downloaded: ${fileName}.pdf`);
        
    } else if (format === 'csv') {
        // CSV format
        let content = 'Sr. No.,Device Type,Gate,Count,Status\n';
        filteredData.forEach((device, index) => {
            const status = device.status || (device.offline > 0 ? `${device.offline} Offline` : 'Online');
            content += `${index + 1},"${device.type}","${device.gate}",${device.count},"${status}"\n`;
        });
        
        const blob = new Blob([content], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        alert(`✅ Downloaded: ${fileName}.csv`);
        
    } else if (format === 'excel') {
        // Excel format
        let content = '\uFEFF'; // UTF-8 BOM
        content += 'Sr. No.\tDevice Type\tGate\tCount\tStatus\n';
        filteredData.forEach((device, index) => {
            const status = device.status || (device.offline > 0 ? `${device.offline} Offline` : 'Online');
            content += `${index + 1}\t${device.type}\t${device.gate}\t${device.count}\t${status}\n`;
        });
        
        const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        alert(`✅ Downloaded: ${fileName}.xls`);
    }
}

// Keep old function for backward compatibility
function downloadDeviceList(format) {
    downloadDeviceReport('all', format);
}

// Update KPI display format
function updateKPIFormats() {
    // Skip KPI updates as cards are removed
    // This function is kept for compatibility but does nothing
}


// Device icons mapping
const deviceIcons = {
    'Gate': '🚪',
    'Automatic Tyre Killer': '🛞',
    'Manual Tyre Killer': '⚠️',
    'Under Vehicle Surveillance System (UVSS)': '🔍',
    'Bollards': '🛑',
    'Boom Barrier': '⛔',
    'Swing Barriers': '🚧',
    'Visitor Kiosks': '🖥️',
    '32" Overhead Display': '📺',
    'Indoor Digital Displays': '🖼️',
    'Outdoor Digital Displays': '📱',
    'Video Wall (6 x 3)': '📺',
    'Video Wall (2 x 3)': '📺',
    'Door Frame Metal Detector (DFMD)': '🚪',
    'Baggage Scanner': '📦',
    'Frisking Booth': '🔒',
    'Long Range RFID Reader': '📡',
    'Push Button for Boom Barrier': '🔘',
    'Electro Magnetic Locks': '🔐',
    'Indoor Dome Cameras- 5 MP': '📹',
    'Outdoor Fixed Cameras- 5 MP': '�',
    'Indoor Dome Camera - 5 MP': '�📹',
    'Outdoor Fixed Camera - 5 MP': '📷',
    'Indoor Dome Camera- 5 MP': '📹',
    'Outdoor Fixed Camera- 5 MP': '📷',
    'PTZ with IR - 2MP': '🎥',
    'Panoramic Camera - 180° - 20 MP': '📸',
    'Panoramic Camera - 360° - 20 MP': '🌐',
    'Panoramic Camera- 180° - 20 MP': '📸',
    'Panoramic Camera- 360° - 20 MP': '🌐',
    'ANPR Cameras': '🚗',
    'Face recognition Cameras': '👤',
    'IP Horn Speaker': '📢',
    'IP Ceiling Speaker': '🔊',
    'Master & Local Control Desks': '🎛️',
    'Face recognition Readers': '👁️',
    'Smart Card Reader': '💳',
    'QR Code Readers': '📱',
    'Camera Poles': '📍',
    'Rack (12U)': '🗄️',
    'Outdoor Junction Box': '📦',
    'Portable face readers (buses)': '🚌',
    'Portable face readers (gates)': '🚪',
    '10 finger enrolment readers': '✋',
    'Indoor signages': '🪧',
    'Wireless Access Point': '📶',
    'Video Conferencing Solution': '💻',
    'Smart Rack': '🗄️',
    'Diesel Generator Set': '⚡'
};

// All devices from BOQ
const allBOQDevices = [
    { type: 'Gates', total: 8, online: 8, offline: 0 },
    { type: 'Automatic Tyre Killers', total: 8, online: 8, offline: 0 },
    // { type: 'Manual Tyre Killers', total: 6, online: 6, offline: 0 },
    { type: 'Under Vehicle Surveillance System (UVSS)', total: 4, online: 4, offline: 0 },
    { type: 'Bollards', total: 28, online: 28, offline: 0 },
    { type: 'Boom Barriers', total: 18, online: 18, offline: 0 },
    { type: 'Swing Barriers', total: 12, online: 12, offline: 0 },
    { type: 'Visitor Kiosks', total: 8, online: 7, offline: 1 },
    { type: '32" Overhead Displays', total: 15, online: 15, offline: 0 },
    { type: 'Indoor Digital Displays', total: 25, online: 24, offline: 1 },
    { type: 'Outdoor Digital Displays', total: 18, online: 17, offline: 1 },
    { type: 'Video Wall (6 x 3)', total: 1, online: 1, offline: 0 },
    { type: 'Video Wall (2 x 3)', total: 1, online: 1, offline: 0 },
    { type: 'Door Frame Metal Detector (DFMD)', total: 12, online: 12, offline: 0 },
    { type: 'Baggage Scanners', total: 8, online: 8, offline: 0 },
    // { type: 'Frisking Booths', total: 10, online: 10, offline: 0 },
    { type: 'Long Range RFID Readers', total: 35, online: 35, offline: 0 },
    { type: 'Push Button for Boom Barriers', total: 18, online: 18, offline: 0 },
    { type: 'Electro Magnetic Locks', total: 24, online: 24, offline: 0 },
    { type: 'Indoor Dome Cameras- 5 MP', total: 120, online: 114, offline: 6 },
    { type: 'Outdoor Fixed Cameras- 5 MP', total: 150, online: 143, offline: 7 },
    { type: 'PTZ with IR - 2MP', total: 45, online: 43, offline: 2 },
    { type: 'Panoramic Cameras - 180° - 20 MP', total: 30, online: 29, offline: 1 },
    { type: 'Panoramic Cameras- 360° - 20 MP', total: 25, online: 24, offline: 1 },
    { type: 'ANPR Cameras', total: 42, online: 40, offline: 2 },
    { type: 'Face recognition Cameras', total: 75, online: 71, offline: 4 },
    { type: 'IP Horn Speakers', total: 30, online: 30, offline: 0 },
    { type: 'IP Ceiling Speakers', total: 40, online: 40, offline: 0 },
    { type: 'Master & Local Control Desks', total: 8, online: 8, offline: 0 },
    { type: 'Face recognition Readers', total: 45, online: 44, offline: 1 },
    { type: 'Smart Card Readers', total: 50, online: 50, offline: 0 },
    { type: 'QR Code Readerss', total: 30, online: 30, offline: 0 },
    // { type: 'Camera Poles', total: 85, online: 85, offline: 0 },
    { type: 'Racks (12U)', total: 15, online: 15, offline: 0 },
    { type: 'Outdoor Junction Boxes', total: 60, online: 60, offline: 0 },
    { type: 'Portable face readers (buses)', total: 20, online: 20, offline: 0 },
    { type: 'Portable face readers (gates)', total: 8, online: 8, offline: 0 },
    { type: '10 finger enrolment readers', total: 12, online: 12, offline: 0 },
    // { type: 'Indoor signages', total: 50, online: 50, offline: 0 },
    { type: 'Wireless Access Points', total: 40, online: 40, offline: 0 },
    { type: 'Video Conferencing Solution', total: 4, online: 4, offline: 0 },
    { type: 'Smart Rack', total: 8, online: 8, offline: 0 },
    // { type: 'Diesel Generator Set', total: 2, online: 2, offline: 0 }
];

// Generate device cards from Google Sheets data
function generateAllDeviceCards() {
    const grid = document.getElementById('allDevicesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Use Google Sheets data if available, otherwise use fallback
    const devicesSource = allDevicesData ? allDevicesData.devices : allBOQDevices.map(d => ({
        deviceType: d.type,
        gates: {},
        total: d.total,
        online: d.online,
        offline: d.offline
    }));
    
    devicesSource.forEach(device => {
        const card = document.createElement('div');
        card.className = 'device-card';
        
        // Calculate totals from gates if using Google Sheets data
        let total, online, offline;
        if (allDevicesData) {
            total = Object.values(device.gates).reduce((sum, count) => sum + count, 0);
            // Simulate online/offline (85% online for demo)
            online = Math.round(total * 0.95);
            offline = total - online;
        } else {
            total = device.total;
            online = device.online;
            offline = device.offline;
        }
        
        const deviceObj = {
            type: device.deviceType || device.type,
            total: total,
            online: online,
            offline: offline
        };
        
        card.onclick = () => showSpecificDeviceDetails(deviceObj);
        
        const icon = deviceIcons[deviceObj.type] || '📦';
        
        card.innerHTML = `
            <div class="device-count">${online}/${total}</div>
            <div class="device-status">Live / Total</div>
            <div class="device-name">${deviceObj.type}</div>
            <div class="click-hint">Click for details</div>
        `;
        
        grid.appendChild(card);
    });
}

// Show specific device details
function showSpecificDeviceDetails(device) {
    const modal = document.getElementById('deviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const tbody = document.getElementById('deviceDetailsBody');
    
    currentDeviceType = device.type;
    currentDeviceData = [];
    
    // Get gates where this device is located from deviceGateLocations
    const deviceGates = deviceGateLocations[device.type] || [];
    
    let deviceCounter = 1;
    
    if (deviceGates.length === 0) {
        // Fallback: distribute evenly if no mapping found
        const gates = Object.keys(MRPL_DEVICE_DATA.gates);
        
        // Create one entry per gate with aggregated count
        const onlinePerGate = Math.floor(device.online / gates.length);
        const offlinePerGate = Math.floor(device.offline / gates.length);
        
        gates.forEach((gate, index) => {
            const gateOnline = onlinePerGate + (index === 0 ? device.online % gates.length : 0);
            const gateOffline = offlinePerGate + (index === 0 ? device.offline % gates.length : 0);
            const gateTotal = gateOnline + gateOffline;
            
            if (gateTotal > 0) {
                currentDeviceData.push({
                    type: device.type,
                    gate: gate,
                    count: gateTotal,
                    online: gateOnline,
                    offline: gateOffline,
                    status: gateOffline > 0 ? 'Offline' : 'Online',
                    deviceNumber: deviceCounter++
                });
            }
        });
    } else {
        // Use deviceGateLocations mapping - one row per gate
        const onlinePerGate = Math.floor(device.online / deviceGates.length);
        const offlinePerGate = Math.floor(device.offline / deviceGates.length);
        
        deviceGates.forEach((gate, index) => {
            const gateOnline = onlinePerGate + (index === 0 ? device.online % deviceGates.length : 0);
            const gateOffline = offlinePerGate + (index === 0 ? device.offline % deviceGates.length : 0);
            const gateTotal = gateOnline + gateOffline;
            
            if (gateTotal > 0) {
                currentDeviceData.push({
                    type: device.type,
                    gate: gate,
                    count: gateTotal,
                    online: gateOnline,
                    offline: gateOffline,
                    status: gateOffline > 0 ? 'Offline' : 'Online',
                    deviceNumber: deviceCounter++
                });
            }
        });
    }
    
    // Update modal
    modalTitle.textContent = `${device.type} - Detailed Breakdown`;
    
    // Populate table
    tbody.innerHTML = '';
    currentDeviceData.forEach((item, index) => {
        const row = document.createElement('tr');
        let statusBadge;
        if (item.offline > 0) {
            statusBadge = `<span class="status-badge offline">Offline</span>`;
        } else {
            statusBadge = `<span class="status-badge online">Online</span>`;
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.type}</td>
            <td>${item.gate}</td>
            <td>${item.count}</td>
            <td>${statusBadge}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Backup data and initialize view
    allDeviceDataBackup = [...currentDeviceData];
    currentReportView = 'all';
    switchReportView('all');
    
    modal.style.display = 'block';
}

// Initialize device cards on page load
document.addEventListener('DOMContentLoaded', () => {
    generateAllDeviceCards();
});


let currentReportView = 'all';
let allDeviceDataBackup = [];

// Switch between All/Online/Offline views
function switchReportView(viewType) {
    currentReportView = viewType;
    
    // Update button states
    document.getElementById('allReportBtn').classList.remove('active');
    document.getElementById('onlineReportBtn').classList.remove('active');
    document.getElementById('offlineReportBtn').classList.remove('active');
    document.getElementById(viewType + 'ReportBtn').classList.add('active');
    
    // Filter and display data
    updateTableView();
}

// Update table based on current view
function updateTableView() {
    const tbody = document.getElementById('deviceDetailsBody');
    const summary = document.getElementById('reportSummary');
    
    let filteredData = [];
    let reportTitle = '';
    
    if (currentReportView === 'all') {
        filteredData = allDeviceDataBackup;
        reportTitle = 'Showing all devices';
    } else if (currentReportView === 'online') {
        filteredData = allDeviceDataBackup.filter(device => {
            if (device.offline !== undefined) {
                return device.offline === 0;
            }
            return device.status && device.status.toLowerCase().includes('online');
        });
        reportTitle = 'Showing online devices only';
    } else if (currentReportView === 'offline') {
        filteredData = allDeviceDataBackup.filter(device => {
            if (device.offline !== undefined) {
                return device.offline > 0;
            }
            return device.status && device.status.toLowerCase().includes('offline');
        });
        reportTitle = 'Showing offline devices only';
    }
    
    // Update summary
    summary.innerHTML = `<strong>${reportTitle}</strong> - Total Records: ${filteredData.length}`;
    
    // Update table
    tbody.innerHTML = '';
    filteredData.forEach((device, index) => {
        const row = document.createElement('tr');
        const status = device.status || (device.offline > 0 ? `${device.offline} Offline` : 'Online');
        const statusClass = device.offline > 0 || (device.status && device.status.toLowerCase().includes('offline')) ? 'offline' : 'online';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${device.type}</td>
            <td>${device.gate}</td>
            <td>${device.count}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #8b9dc3;">No devices found for this filter</td></tr>';
    }
}

// Download current report view as PDF
function downloadCurrentReport() {
    const tbody = document.getElementById('deviceDetailsBody');
    const rows = tbody.querySelectorAll('tr');
    
    if (rows.length === 0 || (rows.length === 1 && rows[0].cells.length === 1)) {
        alert('No data to download');
        return;
    }
    
    const modalTitle = document.getElementById('modalTitle').textContent;
    const dateStr = new Date().toISOString().split('T')[0];
    const deviceName = currentDeviceType.replace(/[^a-zA-Z0-9]/g, '_');
    const reportType = currentReportView.charAt(0).toUpperCase() + currentReportView.slice(1);
    
    // Get filtered data
    let filteredData = [];
    if (currentReportView === 'all') {
        filteredData = allDeviceDataBackup;
    } else if (currentReportView === 'online') {
        filteredData = allDeviceDataBackup.filter(device => {
            if (device.offline !== undefined) return device.offline === 0;
            return device.status && device.status.toLowerCase().includes('online');
        });
    } else {
        filteredData = allDeviceDataBackup.filter(device => {
            if (device.offline !== undefined) return device.offline > 0;
            return device.status && device.status.toLowerCase().includes('offline');
        });
    }
    
    // Generate PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 212, 255);
    doc.text('MRPL ISCC Dashboard', 14, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`${modalTitle} - ${reportType} Devices`, 14, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 38);
    doc.text(`Total Records: ${filteredData.length}`, 14, 44);
    
    // Table data
    const tableData = filteredData.map((device, index) => {
        const status = device.status || (device.offline > 0 ? `${device.offline} Offline` : 'Online');
        return [index + 1, device.type, device.gate, device.count, status];
    });
    
    // Add table
    const headerColor = currentReportView === 'online' ? [0, 255, 136] : 
                       currentReportView === 'offline' ? [255, 51, 102] : [0, 212, 255];
    
    doc.autoTable({
        startY: 50,
        head: [['Sr. No.', 'Device Type', 'Gate', 'Count', 'Status']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: headerColor,
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 9,
            cellPadding: 3
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        }
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
            `Page ${i} of ${pageCount} | MRPL - Integrated Security Command & Control System`,
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' }
        );
    }
    
    const filename = `MRPL_${deviceName}_${reportType}_${dateStr}.pdf`;
    doc.save(filename);
    alert(`✅ Downloaded: ${filename}`);
}


function toggleShowMore() {
    const grid = document.getElementById('allDevicesGrid');
    const btn = document.getElementById('showMoreBtn');
    
    if (grid.style.maxHeight === '220px' || grid.style.maxHeight === '') {
        // Expand to show all cards
        grid.style.maxHeight = 'none';
        btn.innerHTML = 'Show Less ▲';
        btn.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
    } else {
        grid.style.maxHeight = '220px';
        btn.innerHTML = 'Show More ▼';
        btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


let currentSelectedGate = 'all';
let gateDevicePieChart = null;

const gateDeviceDistribution = {
    'Main Gate': {'Automatic Tyre Killer': 1,'Manual Tyre Killer': 1,'Under Vehicle Surveillance System (UVSS)': 2,'Bollards': 8,'Boom Barrier': 4,'Swing Barriers': 8,'Visitor Kiosks': 3,'32" Overhead Display': 3,'Indoor Digital Displays': 2,'Outdoor Digital Displays': 3,'Video Wall (6 x 3)': 1,'Door Frame Metal Detector (DFMD)': 6,'Baggage Scanner': 2,'Frisking Booth': 1,'Long Range RFID Reader': 8,'Push Button for Boom Barrier': 8,'EM Locks': 3,'Indoor Dome Camera - 5 MP': 35,'Outdoor Fixed Camera - 5 MP': 26,'PTZ with IR - 2MP': 2,'Panoramic Camera - 180° - 20 MP': 1,'Panoramic Camera - 360° - 20 MP': 8,'ANPR Cameras': 4,'Face recognition Cameras': 4,'IP Horn Speaker': 31,'IP Ceiling Speaker': 28,'Face recognition Readers': 14,'Smart Card Reader': 1,'QR Code Readers': 14,'Camera Poles': 4,'Rack (12U)': 2,'Outdoor Junction Box': 16,'Portable face readers (buses)': 20,'Portable face readers (on gates)': 4,'10 finger enrolment readers': 2,'Indoor signages': 10,'Video Conferencing Solution': 2,'Smart Rack': 1,'Diesel Generator Set': 1},
    'LP Gate': {'Automatic Tyre Killer': 1,'Manual Tyre Killer': 1,'Bollards': 8,'Boom Barrier': 4,'Swing Barriers': 4,'Visitor Kiosks': 1,'32" Overhead Display': 2,'Indoor Digital Displays': 1,'Outdoor Digital Displays': 2,'Door Frame Metal Detector (DFMD)': 1,'Baggage Scanner': 1,'Frisking Booth': 1,'Long Range RFID Reader': 4,'Push Button for Boom Barrier': 4,'EM Locks': 2,'Indoor Dome Camera - 5 MP': 10,'Outdoor Fixed Camera - 5 MP': 11,'Panoramic Camera - 180° - 20 MP': 1,'Panoramic Camera - 360° - 20 MP': 2,'ANPR Cameras': 2,'Face recognition Cameras': 2,'IP Horn Speaker': 5,'IP Ceiling Speaker': 5,'Face recognition Readers': 4,'Smart Card Reader': 1,'QR Code Readers': 4,'Camera Poles': 4,'Rack (12U)': 1,'10 finger enrolment readers': 1,'Indoor signages': 6},
    'Jokatte Gate': {'Automatic Tyre Killer': 1,'Manual Tyre Killer': 1,'Under Vehicle Surveillance System (UVSS)': 2,'Bollards': 8,'Boom Barrier': 4,'Swing Barriers': 3,'Visitor Kiosks': 1,'32" Overhead Display': 2,'Indoor Digital Displays': 2,'Outdoor Digital Displays': 3,'Door Frame Metal Detector (DFMD)': 2,'Baggage Scanner': 2,'Frisking Booth': 1,'Long Range RFID Reader': 4,'Push Button for Boom Barrier': 4,'Electro Magnetic Locks': 2,'Indoor Dome Cameras- 5 MP': 23,'Outdoor Fixed Cameras- 5 MP': 14,'PTZ with IR - 2MP': 2,'Panoramic Camera- 180° - 20 MP': 2,'Panoramic Camera- 360° - 20 MP': 3,'ANPR Cameras': 4,'Face recognition Cameras': 4,'IP Horn Speaker': 9,'IP Ceiling Speaker': 2,'Face recognition Readers': 6,'QR Code Readers': 6,'Camera Poles': 2,'Rack (12U)': 1,'Outdoor Junction Box': 17,'10 finger enrolment readers': 1,'Indoor signages': 10,'Wireless Access Point': 1,'Portable face readers (buses)': 1,'Portable face readers (gates)': 1},
    'E2 Gate': {'Boom Barrier': 2,'Swing Barriers': 2,'32" Overhead Display': 2,'Indoor Digital Displays': 1,'Door Frame Metal Detector (DFMD)': 2,'Baggage Scanner': 2,'Frisking Booth': 1,'Long Range RFID Reader': 2,'Push Button for Boom Barrier': 2,'Electro Magnetic Locks': 1,'Indoor Dome Cameras- 5 MP': 4,'Outdoor Fixed Cameras- 5 MP': 2,'PTZ with IR - 2MP': 4,'Panoramic Camera- 180° - 20 MP': 1,'Panoramic Camera- 360° - 20 MP': 2,'ANPR Cameras': 2,'Face recognition Cameras': 3,'IP Horn Speaker': 1,'IP Ceiling Speaker': 1,'Face recognition Readers': 4,'QR Code Readers': 4,'Camera Poles': 2,'Rack (12U)': 1,'Outdoor Junction Box': 14,'Indoor signages': 2},
    'Cargo Gate': {'Under Vehicle Surveillance System (UVSS)': 2,'Bollards': 8,'Boom Barrier': 4,'Swing Barriers': 4,'Visitor Kiosks': 2,'32" Overhead Display': 3,'Indoor Digital Displays': 4,'Outdoor Digital Displays': 3,'Video Wall (6 x 3)': 1,'Long Range RFID Reader': 6,'Push Button for Boom Barrier': 3,'Indoor Dome Cameras- 5 MP': 16,'Outdoor Fixed Cameras- 5 MP': 6,'PTZ with IR - 2MP': 2,'ANPR Cameras': 4,'Face recognition Cameras': 4,'IP Horn Speaker': 5,'IP Ceiling Speaker': 2,'Camera Poles': 3,'Rack (12U)': 1},
    'Railway Sliding': {'Under Vehicle Surveillance System (UVSS)': 2,'Boom Barrier': 2,'Gate': 1,'PTZ with IR - 2MP': 2,'Panoramic Camera- 180° - 20 MP': 2,'Panoramic Camera- 360° - 20 MP': 1,'ANPR Cameras': 2,'Indoor Dome Cameras- 5 MP': 2,'Outdoor Fixed Cameras- 5 MP': 6,'IP Horn Speaker': 3,'IP Ceiling Speaker': 1,'Rack (12U)': 1,'Outdoor Junction Box': 6,'Wireless Access Point': 1},
    'PCR': {'Under Vehicle Surveillance System (UVSS)': 1,'Swing Barriers': 1,'32" Overhead Display': 1,'Video Wall (2 x 3)': 1,'Gate': 1,'Panoramic Camera- 180° - 20 MP': 2,'Panoramic Camera- 360° - 20 MP': 1,'Indoor Dome Cameras- 5 MP': 2,'Outdoor Fixed Cameras- 5 MP': 2,'Face recognition Cameras': 2,'IP Horn Speaker': 2,'IP Ceiling Speaker': 2,'Master & Local Control Desks': 1,'Face recognition Readers': 1,'QR Code Readers': 1},
    'CISF Checking': {'Under Vehicle Surveillance System (UVSS)': 1,'Boom Barrier': 1,'Push Button for Boom Barrier': 1,'Video Wall (2 x 3)': 1,'Panoramic Camera- 180° - 20 MP': 2,'Panoramic Camera- 360° - 20 MP': 1,'ANPR Cameras': 2,'Face recognition Cameras': 2}
};

const deviceGateLocations = {
    'Gate': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate', 'Cargo Gate','Railway Sliding','PCR'],
    'Automatic Tyre Killer': ['Main Gate', 'LP Gate', 'Jokatte Gate'],
    'Manual Tyre Killer': ['Main Gate', 'LP Gate', 'Jokatte Gate'],
    'Under Vehicle Surveillance System (UVSS)': ['Main Gate', 'LP Gate', 'Cargo Gate', 'Jokatte Gate', 'Railway Sliding', 'PCR', 'CISF Checking (Jokatte Gate)'],
    'Bollards': ['Main Gate', 'LP Gate', 'Jokatte Gate'],
    'Boom Barrier': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate', 'Cargo Gate', 'CISF Checking (Jokatte Gate)'],
    'Swing Barriers': ['Main Gate: Exe/VIP Pedestrian','Main Gate: Blue Collar Pedestrian' ,'LP Gate: Pedestrian', 'Jokatte Gate: Exe/VIP Pedestrian', 'Jokatte Gate: Blue Collar Pedestrian','E2 Gate: Pedestrian & Gate', 'PCR: Pedestrian'],
    'Visitor Kiosks': ['Main Gate', 'LP Gate', 'Jokatte Gate'],
    '32" Overhead Display':  ['Main Gate: Exe/VIP Pedestrian','Main Gate: Blue Collar Pedestrian' ,'LP Gate: Pedestrian', 'Jokatte Gate: Exe/VIP Pedestrian', 'Jokatte Gate: Blue Collar Pedestrian','E2 Gate: Pedestrian & Gate', 'PCR: Pedestrian'],
    'Indoor Digital Displays': ['Main Gate', 'LP Gate', 'Cargo Gate'],
    'Outdoor Digital Displays': ['Main Gate', 'LP Gate', 'Cargo Gate'],
    'Video Wall (6 x 3)': ['Main Gate: Command Centre'],
    'Video Wall (2 x 3)': ['PCR (Plant Gate)'],
    'Door Frame Metal Detector (DFMD)': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate'],
    'Baggage Scanner': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate'],
    // 'Frisking Booth': ['Main Gate', 'Cargo Gate', 'CISF Checking'],
    'Long Range RFID Reader': ['Main Gate: Canopy', 'LP Gate: Canopy', 'Jokatte Gate: Canopy', 'E2 Gate: Canopy', 'Cargo Gate: Canopy'],
    'Push Button for Boom Barrier': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate', 'Cargo Gate', 'CISF Checking (Jokatte Gate)'],
    'Electro Magnetic Locks': ['Main Gate', 'LP Gate', 'Jokatte Gate'],
    'Indoor Dome Cameras- 5 MP': ['Main Gate: Canopy','Main Gate: Parking & Roads','Main Gate: GF','Main Gate: 1F', 'LP Gate: Pedestrian', 'Jokatte Gate: Canopy','Jokatte Gate: Parking & Roads','Jokatte Gate: GF', 'E2 Gate: Pedestrian & Gate', 'Cargo Gate: Canopy'],
    'Outdoor Fixed Cameras- 5 MP': ['Main Gate: Canopy','Main Gate: Parking & Roads','Main Gate: GF', 'LP Gate: Canopy','LP Gate: Pedestrian', 'Jokatte Gate: Canopy','Jokatte Gate: Parking & Roads','Jokatte Gate: GF', 'E2 Gate: Pedestrian & Gate', 'Cargo Gate: Canopy', 'Railway Siding'],
    'PTZ with IR - 2MP': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'Cargo Gate','Railway Sliding'],
    'Panoramic Camera- 180° - 20 MP': ['Main Gate: Security Check Building','Main Gate: Canopy' ,'LP Gate: Security Check Building','LP Gate: Canopy', 'Jokatte Gate: Security Check Building','Jokatte Gate: Canopy' ,'E2 Gate: Security Check Building','E2 Gate: Canopy','Cargo Gate: Security Check Building', 'Cargo Gate: Canopy','Railway Sliding: Security Check Building', 'Railway Sliding: Canopy','PCR: Security Check Building','PCR: Canopy', 'CISF Checking (Jokatte Gate): Security Check Building', 'CISF Checking (Jokatte Gate): Canopy'],
    'Panoramic Camera- 360° - 20 MP': ['Main Gate: Parking', 'LP Gate: Parking', 'Jokatte Gate: Parking', 'E2 Gate: Parking', 'Cargo Gate: Parking','Railway Sliding: Parking','PCR: Parking','CISF Checking (Jokatte Gate): Parking'],
    'ANPR Cameras': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate', 'Cargo Gate', 'CISF Checking (Jokatte Gate)'],
    'Face recognition Cameras': ['Main Gate: Security Check Building','Main Gate: Canopy','LP Gate: Security Check Building' ,'LP Gate: Canopy', 'Jokatte Gate: Security Check Building','Jokatte Gate: Canopy', 'Cargo Gate: Security Check Building', 'Cargo Gate: Canopy'],
    'IP Horn Speaker': ['Main Gate: Security Check Building','Main Gate: Canopy','Main Gate: Parking' ,'LP Gate: Security Check Building','LP Gate: Canopy','LP Gate: Parking', 'Jokatte Gate: Security Check Building','Jokatte Gate: Canopy', 'Jokatte Gate: Parking','E2 Gate: Security Check Building','E2 Gate: Canopy','E2 Gate: Parking', 'Cargo Gate: Security Check Building','Cargo Gate: Canopy','Cargo Gate: Parking','Railway Sliding: Security Check Building','Railway Sliding: Canopy','Railway Sliding: Parking'],
    'IP Ceiling Speaker': ['Main Gate: Security Check Building','Main Gate: Command Centre Building','LP Gate: Security Check Building','Jokatte Gate: Security Check Building','E2 Gate: Security Check Building', 'Cargo Gate: Security Check Building','Railway Sliding: Security Check Building'],
    'Master & Local Control Desks': ['Main Gate: Command Centre Building'],
    'Face recognition Readers':  ['Main Gate: Exe/VIP Pedestrian','Main Gate: Blue Collar Pedestrian' ,'LP Gate: Pedestrian', 'Jokatte Gate: Exe/VIP Pedestrian', 'Jokatte Gate: Blue Collar Pedestrian','E2 Gate: Pedestrian & Gate', 'PCR: Pedestrian'],
    // 'Smart Card Reader': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate'],
    'QR Code Readers':  ['Main Gate: Exe/VIP Pedestrian','Main Gate: Blue Collar Pedestrian' ,'LP Gate: Pedestrian', 'Jokatte Gate: Exe/VIP Pedestrian', 'Jokatte Gate: Blue Collar Pedestrian','E2 Gate: Pedestrian & Gate', 'PCR: Pedestrian'],
    // 'Camera Poles': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate', 'Cargo Gate', 'Railway Siding'],
    'Rack (12U)': ['Main Gate', 'LP Gate', 'Jokatte Gate', 'E2 Gate', 'Cargo Gate', 'Railway Sliding'],
    'Outdoor Junction Box': ['Main Gate', 'Jokatte Gate', 'E2 Gate', 'Railway Sliding'],
    'Portable face readers (buses)': ['Main Gate','LP Gate','Jokatte Gate'],
    'Portable face readers (gates)': ['Main Gate','LP Gate','Jokatte Gate'],
    '10 finger enrolment readers':['Main Gate','LP Gate','Jokatte Gate'],
    'Speed Track Display':[],
    // 'Indoor signages': ['Main Gate', 'Jokatte Gate', 'E2 Gate', 'Railway Siding'],
    'Wireless Access Point': ['Jokatte Gate','Railway Sliding'],
    'Video Conferencing Solution': ['Main Gate: Security Check Building','Main Gate: Command Centre Building'],
    'Smart Rack': ['Main Gate'], //switches
    // 'Diesel Generator Set': ['Main Gate', 'Cargo Gate']
};

function populateGateHealthTable() {
    const container = document.getElementById('gateCardsContainer');
    if (!container) {
        console.error('❌ gateCardsContainer not found');
        return;
    }
    
    console.log('✅ Populating gate health cards...');
    container.innerHTML = '';
    
    Object.entries(MRPL_DEVICE_DATA.gates).forEach(([gateName, data]) => {
        const devices = gateDeviceDistribution[gateName] || {};
        
        // Count total devices at this gate
        const totalDevices = Object.values(devices).reduce((sum, count) => sum + count, 0);
        
        // Count device types
        const deviceTypeCount = Object.keys(devices).length;
        
        // Status badge with symbol
        const statusClass = data.status === 'ONLINE' ? 'good' : 'warning';
        const statusSymbol = data.status === 'ONLINE' ? '✅' : '⚠️';
        
        const card = document.createElement('div');
        card.className = 'gate-card';
        card.onclick = () => showGateDetailsModal(gateName);
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.8rem;">
                <h4 style="color: #00d4ff; font-size: 1.1rem; margin: 0;">${gateName}</h4>
                <span class="status-badge ${statusClass}" style="font-size: 0.9rem;">${statusSymbol}</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.8rem;">
                <div style="background: rgba(0, 212, 255, 0.1); padding: 0.5rem; border-radius: 6px;">
                    <div style="font-size: 0.75rem; color: #8b9dc3;">Total Devices</div>
                    <div style="font-size: 1.3rem; color: #00ff88; font-weight: bold;">${totalDevices}</div>
                </div>
                <div style="background: rgba(0, 255, 136, 0.1); padding: 0.5rem; border-radius: 6px;">
                    <div style="font-size: 0.75rem; color: #8b9dc3;">Device Types</div>
                    <div style="font-size: 1.3rem; color: #00d4ff; font-weight: bold;">${deviceTypeCount}</div>
                </div>
            </div>
            <div style="text-align: center; color: #8b9dc3; font-size: 0.85rem; padding: 0.5rem; background: rgba(0, 212, 255, 0.05); border-radius: 6px; cursor: pointer;">
                🔍 Click to view details
            </div>
        `;
        
        container.appendChild(card);
    });
    
    console.log('✅ Gate health cards populated with', container.children.length, 'cards');
}

// Show gate details modal with operational status and device list
function showGateDetailsModal(gateName) {
    currentSelectedGate = gateName;
    
    const modal = document.getElementById('gatePieModal');
    const modalTitle = document.getElementById('gatePieModalTitle');
    
    modalTitle.textContent = gateName + ' - Operational Status';
    modal.style.display = 'block';
    
    // Get devices for this gate
    const devices = gateDeviceDistribution[gateName] || {};
    const deviceList = Object.entries(devices)
        .filter(([device, count]) => count >= 1)
        .sort((a, b) => b[1] - a[1]);
    
    const totalDevices = deviceList.reduce((sum, [_, count]) => sum + count, 0);
    
    // Simulate operational status (85% online, 10% maintenance, 5% offline)
    // In production, this would come from real-time monitoring system
    const onlineCount = Math.round(totalDevices * 0.85);
    const maintenanceCount = Math.round(totalDevices * 0.10);
    const offlineCount = totalDevices - onlineCount - maintenanceCount;
    
    const operationalStatus = {
        'Online': onlineCount,
        'Under Maintenance': maintenanceCount,
        'Offline': offlineCount
    };
    
    // Distribute devices across statuses (for demo purposes)
    const onlineDevices = [];
    const maintenanceDevices = [];
    const offlineDevices = [];
    
    let remainingOnline = onlineCount;
    let remainingMaintenance = maintenanceCount;
    let remainingOffline = offlineCount;
    
    deviceList.forEach(([deviceName, count]) => {
        const onlineForThis = Math.min(Math.round(count * 0.85), remainingOnline);
        const maintenanceForThis = Math.min(Math.round(count * 0.10), remainingMaintenance);
        const offlineForThis = Math.min(count - onlineForThis - maintenanceForThis, remainingOffline);
        
        if (onlineForThis > 0) {
            onlineDevices.push(`${deviceName} (${onlineForThis})`);
            remainingOnline -= onlineForThis;
        }
        if (maintenanceForThis > 0) {
            maintenanceDevices.push(`${deviceName} (${maintenanceForThis})`);
            remainingMaintenance -= maintenanceForThis;
        }
        if (offlineForThis > 0) {
            offlineDevices.push(`${deviceName} (${offlineForThis})`);
            remainingOffline -= offlineForThis;
        }
    });
    
    // Create HTML layout
    let deviceListHTML = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">';
    
    // Left side - Summary and Operational Status Pie Chart
    deviceListHTML += '<div>';
    deviceListHTML += '<div style="margin-bottom: 1rem; padding: 1rem; background: rgba(0, 212, 255, 0.1); border-radius: 8px; text-align: center;">';
    deviceListHTML += `<div style="font-size: 0.9rem; color: #8b9dc3; margin-bottom: 0.3rem;">Total Devices</div>`;
    deviceListHTML += `<div style="font-size: 2rem; color: #00ff88; font-weight: bold;">${totalDevices}</div>`;
    deviceListHTML += `<div style="font-size: 0.85rem; color: #8b9dc3;">${deviceList.length} device types</div>`;
    deviceListHTML += '</div>';
    
    deviceListHTML += '<div style="background: rgba(30, 39, 70, 0.5); padding: 1rem; border-radius: 8px;">';
    deviceListHTML += '<div style="text-align: center; color: #00d4ff; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 600;">Operational Status</div>';
    deviceListHTML += '<canvas id="gateOperationalPieChart" style="max-height: 220px; cursor: pointer;"></canvas>';
    deviceListHTML += '<div style="margin-top: 0.5rem; font-size: 0.75rem; color: #8b9dc3; text-align: center;">Click on chart segments for details</div>';
    deviceListHTML += '</div>';
    deviceListHTML += '</div>';
    
    // Right side - Complete Device List Table (always visible)
    deviceListHTML += '<div style="max-height: 400px; overflow-y: auto; position: relative;">';
    deviceListHTML += '<table style="width: 100%; border-collapse: collapse;">';
    deviceListHTML += '<thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><tr><th style="text-align: left; padding: 0.8rem; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Device Type</th><th style="text-align: center; padding: 0.8rem; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; width: 80px; background: #1e2746;">Count</th></tr></thead>';
    deviceListHTML += '<tbody>';
    
    deviceList.forEach(([deviceName, count], index) => {
        const bgColor = index % 2 === 0 ? 'rgba(0, 212, 255, 0.05)' : 'transparent';
        deviceListHTML += `
            <tr style="border-bottom: 1px solid #3d4a7a; background: ${bgColor};">
                <td style="padding: 0.7rem; color: #e0e0e0; font-size: 0.85rem;">${deviceName}</td>
                <td style="padding: 0.7rem; text-align: center; color: #00ff88; font-weight: bold; font-size: 1rem;">${count}</td>
            </tr>
        `;
    });
    
    deviceListHTML += '</tbody></table></div>';
    deviceListHTML += '</div>';
    
    // Replace modal content
    const chartContainer = document.getElementById('gateDevicePieChart');
    if (chartContainer) {
        chartContainer.style.display = 'none';
    }
    
    let listContainer = document.getElementById('gateDeviceListContainer');
    if (!listContainer) {
        listContainer = document.createElement('div');
        listContainer.id = 'gateDeviceListContainer';
        if (chartContainer && chartContainer.parentElement) {
            chartContainer.parentElement.insertBefore(listContainer, chartContainer);
        }
    }
    listContainer.innerHTML = deviceListHTML;
    
    // Store device lists for click handling
    window.gateStatusData = {
        'Online': onlineDevices,
        'Under Maintenance': maintenanceDevices,
        'Offline': offlineDevices
    };
    
    // Create operational status pie chart
    setTimeout(() => createGateOperationalPieChart(operationalStatus), 100);
}

// Create operational status pie chart with click handling
function createGateOperationalPieChart(statusData) {
    const ctx = document.getElementById('gateOperationalPieChart');
    if (!ctx) return;
    
    if (window.gateOperationalChartInstance) {
        window.gateOperationalChartInstance.destroy();
    }
    
    const labels = Object.keys(statusData);
    const data = Object.values(statusData);
    
    const colors = {
        'Online': '#00ff88',
        'Under Maintenance': '#ffd700',
        'Offline': '#ff3366'
    };
    
    const backgroundColors = labels.map(label => colors[label]);
    
    window.gateOperationalChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: '#1a1f3a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: { size: 11 },
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return label + ': ' + value + ' devices (' + percentage + '%)';
                        }
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const status = labels[index];
                    showStatusDeviceList(status);
                }
            }
        }
    });
}

// Show device list for clicked status in a popup
function showStatusDeviceList(status) {
    if (!window.gateStatusData) return;
    
    const devices = window.gateStatusData[status] || [];
    
    const statusColors = {
        'Online': '#00ff88',
        'Under Maintenance': '#ffd700',
        'Offline': '#ff3366'
    };
    
    const statusIcons = {
        'Online': '✅',
        'Under Maintenance': '🔧',
        'Offline': '❌'
    };
    
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'statusPopupOverlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 10000; display: flex; align-items: center; justify-content: center;';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.style.cssText = 'background: linear-gradient(135deg, #1e2749 0%, #2d3561 100%); border-radius: 12px; padding: 2rem; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; border: 2px solid #3d4a7a; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);';
    
    let html = '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">';
    html += `<div style="display: flex; align-items: center; gap: 0.7rem;">`;
    html += `<span style="font-size: 2rem;">${statusIcons[status]}</span>`;
    html += `<div>`;
    html += `<div style="color: ${statusColors[status]}; font-size: 1.3rem; font-weight: 600;">${status} Devices</div>`;
    html += `<div style="color: #8b9dc3; font-size: 0.85rem; margin-top: 0.2rem;">${devices.length} device types</div>`;
    html += `</div>`;
    html += `</div>`;
    html += `<button onclick="closeStatusPopup()" style="background: transparent; border: none; color: #8b9dc3; font-size: 2rem; cursor: pointer; line-height: 1; padding: 0; width: 40px; height: 40px; border-radius: 50%; transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#8b9dc3';">&times;</button>`;
    html += '</div>';
    
    if (devices.length === 0) {
        html += '<div style="text-align: center; padding: 3rem; color: #8b9dc3;">';
        html += '<div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>';
        html += '<div>No devices in this status</div>';
        html += '</div>';
    } else {
        html += '<div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 0.5rem;">';
        devices.forEach((device, index) => {
            const bgColor = index % 2 === 0 ? 'rgba(0, 212, 255, 0.05)' : 'transparent';
            html += `<div style="padding: 0.8rem; border-bottom: ${index < devices.length - 1 ? '1px solid #3d4a7a' : 'none'}; background: ${bgColor}; color: #e0e0e0; font-size: 0.95rem; border-radius: 4px;">${device}</div>`;
        });
        html += '</div>';
    }
    
    popup.innerHTML = html;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeStatusPopup();
        }
    });
}

// Close status popup
function closeStatusPopup() {
    const overlay = document.getElementById('statusPopupOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Keep the old function name for compatibility
function showGatePieChart(gateName) {
    showGateDetailsModal(gateName);
}

// Close gate pie modal
function closeGatePieModal() {
    const modal = document.getElementById('gatePieModal');
    modal.style.display = 'none';
    
    // Destroy chart
    if (gateDevicePieChart) {
        gateDevicePieChart.destroy();
        gateDevicePieChart = null;
    }
}

function createGatePieChart(gateName) {
    const ctx = document.getElementById('gateDevicePieChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (gateDevicePieChart) {
        gateDevicePieChart.destroy();
    }
    
    const devices = gateDeviceDistribution[gateName] || {};
    
    // Filter out devices with 0 quantity - only show devices present at this gate
    const filteredDevices = {};
    Object.entries(devices).forEach(([deviceName, quantity]) => {
        if (quantity >= 1) {
            filteredDevices[deviceName] = quantity;
        }
    });
    
    const labels = Object.keys(filteredDevices);
    const data = Object.values(filteredDevices);
    
    const colors = [
        '#00d4ff', '#00ff88', '#ff3366', '#ffd700', '#9b59b6',
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#1abc9c',
        '#e67e22', '#95a5a6', '#34495e', '#16a085', '#c0392b',
        '#8e44ad', '#27ae60', '#d35400', '#2980b9', '#c0392b',
        '#16a085', '#f39c12', '#d35400', '#c0392b', '#8e44ad',
        '#2980b9', '#27ae60', '#e74c3c', '#3498db', '#9b59b6',
        '#1abc9c', '#f1c40f', '#e67e22', '#95a5a6', '#34495e'
    ];
    
    gateDevicePieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: '#1a1f3a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return label + ': ' + value + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

function downloadSingleGateReport() {
    if (currentSelectedGate === 'all') return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(26, 31, 58);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(20);
    doc.text('MRPL ISCC Dashboard', 105, 15, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(currentSelectedGate + ' - Device Report', 105, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(139, 157, 195);
    doc.text('Generated: ' + new Date().toLocaleString(), 105, 32, { align: 'center' });
    
    // Gate info
    const gateInfo = MRPL_DEVICE_DATA.gates[currentSelectedGate];
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Gate Status: ' + gateInfo.status, 20, 50);
    doc.text('Cameras: ' + gateInfo.cameras, 20, 58);
    doc.text('ANPR Systems: ' + gateInfo.anpr, 20, 66);
    doc.text('Bollards: ' + gateInfo.bollards, 20, 74);
    
    // Device distribution table - only include devices with quantity >= 1
    const devices = gateDeviceDistribution[currentSelectedGate] || {};
    const tableData = Object.entries(devices)
        .filter(([device, count]) => count >= 1)  // Only include devices present at this gate
        .map(([device, count]) => [device, count]);
    
    doc.autoTable({
        startY: 85,
        head: [['Device Type', 'Count']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 212, 255],
            textColor: [10, 14, 39],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 10,
            cellPadding: 5
        }
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(139, 157, 195);
        doc.text('MRPL ISCC - Confidential', 105, 285, { align: 'center' });
        doc.text('Page ' + i + ' of ' + pageCount, 105, 290, { align: 'center' });
    }
    
    doc.save(currentSelectedGate.replace(/ /g, '_') + '_Device_Report.pdf');
}

function downloadAllGatesReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(26, 31, 58);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(20);
    doc.text('MRPL ISCC Dashboard', 105, 15, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('All Gates - Comprehensive Device Report', 105, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(139, 157, 195);
    doc.text('Generated: ' + new Date().toLocaleString(), 105, 32, { align: 'center' });
    
    // Summary statistics
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Overall Statistics', 20, 50);
    doc.setFontSize(10);
    doc.text('Total Cameras: ' + MRPL_DEVICE_DATA.totalCameras, 20, 58);
    doc.text('Online Cameras: ' + MRPL_DEVICE_DATA.onlineCameras, 20, 64);
    doc.text('Offline Cameras: ' + MRPL_DEVICE_DATA.offlineCameras, 20, 70);
    doc.text('Total Gates: ' + Object.keys(MRPL_DEVICE_DATA.gates).length, 20, 76);
    
    // Gate-wise summary table
    const gateTableData = Object.entries(MRPL_DEVICE_DATA.gates).map(([gateName, data]) => [
        gateName,
        data.cameras,
        data.anpr,
        data.bollards,
        data.status
    ]);
    
    doc.autoTable({
        startY: 85,
        head: [['Gate Name', 'Cameras', 'ANPR', 'Bollards', 'Status']],
        body: gateTableData,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 212, 255],
            textColor: [10, 14, 39],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 9,
            cellPadding: 4
        }
    });
    
    // Add detailed breakdown for each gate on new pages
    Object.keys(gateDeviceDistribution).forEach((gateName, index) => {
        doc.addPage();
        
        // Gate header
        doc.setFillColor(0, 212, 255);
        doc.rect(0, 0, 210, 25, 'F');
        doc.setTextColor(10, 14, 39);
        doc.setFontSize(16);
        doc.text(gateName + ' - Detailed Breakdown', 105, 15, { align: 'center' });
        
        // Gate info
        const gateInfo = MRPL_DEVICE_DATA.gates[gateName];
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.text('Status: ' + gateInfo.status, 20, 35);
        doc.text('Cameras: ' + gateInfo.cameras, 20, 42);
        doc.text('ANPR: ' + gateInfo.anpr, 80, 42);
        doc.text('Bollards: ' + gateInfo.bollards, 130, 42);
        
        // Device distribution - only include devices with quantity >= 1
        const devices = gateDeviceDistribution[gateName] || {};
        const tableData = Object.entries(devices)
            .filter(([device, count]) => count >= 1)  // Only include devices present at this gate
            .map(([device, count]) => [device, count]);
        
        doc.autoTable({
            startY: 50,
            head: [['Device Type', 'Count']],
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor: [0, 212, 255],
                textColor: [10, 14, 39],
                fontStyle: 'bold'
            },
            styles: {
                fontSize: 10,
                cellPadding: 5
            }
        });
    });
    
    // Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(139, 157, 195);
        doc.text('MRPL ISCC - Confidential', 105, 285, { align: 'center' });
        doc.text('Page ' + i + ' of ' + pageCount, 105, 290, { align: 'center' });
    }
    
    doc.save('MRPL_All_Gates_Device_Report.pdf');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const gatePieModal = document.getElementById('gatePieModal');
    if (event.target == gatePieModal) {
        closeGatePieModal();
    }
}



function showKPIDetails(type) {
    const modal = document.getElementById('deviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = modal.querySelector('.modal-body');
    
    let title = '';
    let content = '';
    
    if (type === 'vehicleEntries') {
        title = 'Vehicle Entries Today - Details';
        content = `
            <div style="max-height: 500px; overflow-y: auto; position: relative;">
                <p style="color: #8b9dc3; margin-bottom: 15px;">Recent vehicle entries tracked by ANPR system</p>
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <tr>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Time</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Vehicle Number</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Gate</th>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Type</th>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:35</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-20-MN-5678</td><td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Car</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:32</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-19-AB-1234</td><td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Truck</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:28</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-20-XY-9876</td><td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Car</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:25</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-18-CD-4567</td><td style="padding: 0.7rem; color: #e0e0e0;">Jokatte Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Bike</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:20</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-21-PQ-7890</td><td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Car</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:15</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-19-RS-2345</td><td style="padding: 0.7rem; color: #e0e0e0;">E2 Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Van</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:10</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-20-TU-6789</td><td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Car</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:05</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-18-VW-3456</td><td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Truck</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:00</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-21-YZ-8901</td><td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Car</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">13:55</td><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">KA-19-EF-4567</td><td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Bike</td><td style="padding: 0.7rem; text-align: center;"><span class="status-badge good">Entered</span></td></tr>
                    </tbody>
                </table>
                <div style="margin-top: 15px; padding: 10px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: #00d4ff;">
                    <strong>Total Entries Today:</strong> 1,250 vehicles across all gates
                </div>
            </div>
        `;
    } else if (type === 'personnelInside') {
        title = 'Personnel Inside Refinery - Details';
        content = `
            <div style="max-height: 500px; overflow-y: auto; position: relative;">
                <p style="color: #8b9dc3; margin-bottom: 15px;">Personnel currently inside tracked by Face Recognition</p>
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <tr>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Employee ID</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Name</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Department</th>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Entry Time</th>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Entry Gate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">EMP-2456</td><td style="padding: 0.7rem; color: #e0e0e0;">Rajesh Kumar</td><td style="padding: 0.7rem; color: #e0e0e0;">Operations</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:15</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Main Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">EMP-3789</td><td style="padding: 0.7rem; color: #e0e0e0;">Priya Sharma</td><td style="padding: 0.7rem; color: #e0e0e0;">Safety</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:20</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Main Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">EMP-1234</td><td style="padding: 0.7rem; color: #e0e0e0;">Amit Patel</td><td style="padding: 0.7rem; color: #e0e0e0;">Maintenance</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:25</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">LP Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">EMP-5678</td><td style="padding: 0.7rem; color: #e0e0e0;">Sunita Reddy</td><td style="padding: 0.7rem; color: #e0e0e0;">Admin</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:30</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Main Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">EMP-9012</td><td style="padding: 0.7rem; color: #e0e0e0;">Vikram Singh</td><td style="padding: 0.7rem; color: #e0e0e0;">Security</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:35</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">E2 Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #ffaa00; font-weight: 600;">CON-4567</td><td style="padding: 0.7rem; color: #e0e0e0;">Ramesh Yadav</td><td style="padding: 0.7rem; color: #e0e0e0;">Contractor</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:00</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Cargo Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #ffaa00; font-weight: 600;">CON-7890</td><td style="padding: 0.7rem; color: #e0e0e0;">Suresh Naik</td><td style="padding: 0.7rem; color: #e0e0e0;">Contractor</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:05</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Cargo Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">EMP-2345</td><td style="padding: 0.7rem; color: #e0e0e0;">Kavita Desai</td><td style="padding: 0.7rem; color: #e0e0e0;">HR</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:10</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Main Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">EMP-6789</td><td style="padding: 0.7rem; color: #e0e0e0;">Anil Mehta</td><td style="padding: 0.7rem; color: #e0e0e0;">Engineering</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:15</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Jokatte Gate</td></tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;"><td style="padding: 0.7rem; color: #ff3366; font-weight: 600;">VIS-1234</td><td style="padding: 0.7rem; color: #e0e0e0;">John Smith</td><td style="padding: 0.7rem; color: #e0e0e0;">Visitor</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">10:30</td><td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">Main Gate</td></tr>
                    </tbody>
                </table>
                <div style="margin-top: 15px; padding: 10px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: #00d4ff;">
                    <strong>Total Personnel Inside:</strong> 2,840 (Employees: 2,145 | Contractors: 580 | Visitors: 115)
                </div>
            </div>
        `;
    } else if (type === 'accessGranted') {
        title = 'Access Granted Today - Details';
        content = `
            <div style="max-height: 500px; overflow-y: auto;">
                <p style="color: #8b9dc3; margin-bottom: 15px;">Successful access attempts across all gates</p>
                
                <!-- Shift Tabs and Category Buttons -->
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                        <button class="shift-tab-btn active" onclick="showShiftData('shiftA')" id="shiftABtn" style="flex: 1; min-width: 120px; padding: 0.7rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Shift A
                        </button>
                        <button class="shift-tab-btn" onclick="showShiftData('shiftB')" id="shiftBBtn" style="flex: 1; min-width: 120px; padding: 0.7rem; background: rgba(102, 126, 234, 0.3); color: #8b9dc3; border: 2px solid #667eea; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Shift B
                        </button>
                        <button class="shift-tab-btn" onclick="showShiftData('shiftC')" id="shiftCBtn" style="flex: 1; min-width: 120px; padding: 0.7rem; background: rgba(102, 126, 234, 0.3); color: #8b9dc3; border: 2px solid #667eea; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Shift C
                        </button>
                        <button class="shift-tab-btn" onclick="showShiftData('general')" id="generalBtn" style="flex: 1; min-width: 120px; padding: 0.7rem; background: rgba(102, 126, 234, 0.3); color: #8b9dc3; border: 2px solid #667eea; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            General Shift
                        </button>
                    </div>
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button onclick="showCategoryData('contractors')" style="flex: 1; min-width: 150px; padding: 0.7rem; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #0a0e27; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Contractors
                        </button>
                        <button onclick="showCategoryData('visitors')" style="flex: 1; min-width: 150px; padding: 0.7rem; background: linear-gradient(135deg, #ffaa00 0%, #ff3366 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Visitors
                        </button>
                    </div>
                </div>
                
                <!-- Shift Data Container -->
                <div id="shiftDataContainer">
                    <!-- Will be populated by showShiftData() -->
                </div>
            </div>
        `;
        
        // After rendering, show default shift data
        setTimeout(() => showShiftData('shiftA'), 100);
    } else if (type === 'accessDenied') {
        title = '⛔ Access Denied - Details';
        content = `
            <div style="max-height: 500px; overflow-y: auto; position: relative;">
                <p style="color: #8b9dc3; margin-bottom: 15px;">Unauthorized access attempts requiring attention</p>
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <tr>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Time</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Person/Vehicle</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Gate</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Reason</th>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:15</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">KA-XX-XXXX</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Blacklisted Vehicle</td>
                            <td style="padding: 0.7rem; text-align: center;"><span class="status-badge critical">Denied</span></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">13:45</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">EMP-9999</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Expired Access Card</td>
                            <td style="padding: 0.7rem; text-align: center;"><span class="status-badge warning">Pending</span></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">13:20</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Unknown Vehicle</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">E2 Gate</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">RFID Tag Expired</td>
                            <td style="padding: 0.7rem; text-align: center;"><span class="status-badge critical">Denied</span></td>
                        </tr>
   
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">11:45</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Unknown Person</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Tailgating Attempt</td>
                            <td style="padding: 0.7rem; text-align: center;"><span class="status-badge critical">Denied</span></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">11:20</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">EMP-7777</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Card Expired</td>
                            <td style="padding: 0.7rem; text-align: center;"><span class="status-badge warning">Verified</span></td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin-top: 15px; padding: 10px; background: rgba(255, 51, 102, 0.1); border-radius: 8px; color: #ff3366;">
                    <strong>Total Access Denied:</strong> 28 unauthorized attempts today
                </div>
            </div>
        `;
    } else if (type === 'specialEntries') {
        title = 'Special Entries - Details';
        content = `
            <div style="max-height: 500px; overflow-y: auto; position: relative;">
                <p style="color: #8b9dc3; margin-bottom: 15px;">Entries without passes - Phone call approvals and Emergency entries</p>
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <tr>
                            <th style="padding: 0.7rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Name</th>
                            <th style="padding: 0.7rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Gate</th>
                            <th style="padding: 0.7rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Time</th>
                            <th style="padding: 0.7rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Rajesh Kumar</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:30</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Forgot ID Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Priya Sharma</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">13:45</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Card Malfunction</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Amit Patel</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Jokatte Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">12:20</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Lost Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Sunita Reddy</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">11:50</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Forgot ID Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Vikram Singh</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">11:15</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Card Damaged</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Ramesh Yadav</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">10:40</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Forgot ID Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Kavita Desai</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">10:10</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Card Not Working</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Anil Mehta</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Jokatte Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:55</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Forgot ID Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Suresh Naik</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">E2 Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:30</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Lost Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Deepak Joshi</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:05</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Card Malfunction</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Meena Iyer</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:45</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Forgot ID Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Ravi Shankar</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:20</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Card Damaged</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Pooja Nair</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">08:00</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Forgot ID Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Sanjay Gupta</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Jokatte Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">07:40</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Lost Card</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Lakshmi Menon</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">07:15</td>
                            <td style="padding: 0.7rem; color: #ffaa00;">Phone Call Approval - Card Not Working</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Emergency Response Team</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">15:20</td>
                            <td style="padding: 0.7rem; color: #00d4ff;">Emergency Entry - Fire Drill</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Medical Team</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">E2 Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">13:10</td>
                            <td style="padding: 0.7rem; color: #00d4ff;">Emergency Entry - Medical Emergency</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #e0e0e0;">Safety Inspector</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">10:25</td>
                            <td style="padding: 0.7rem; color: #00d4ff;">Emergency Entry - Safety Inspection</td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin-top: 15px; padding: 10px; background: rgba(255, 170, 0, 0.1); border-radius: 8px; color: #ffaa00;">
                    <strong>Total Special Entries:</strong> 18 (Phone Call Approvals: 15 | Emergency Entries: 3)
                </div>
            </div>
        `;
    }
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}



// Show date range selector for uptime report
function showUptimeReportDateRange() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%); padding: 2rem; border-radius: 15px; border: 2px solid #00d4ff; max-width: 450px; width: 90%; box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);">
            <h3 style="color: #00d4ff; margin: 0 0 0.5rem 0; font-size: 1.3rem;">Select Date Range</h3>
            <p style="color: #00ff88; margin: 0 0 1.5rem 0; font-size: 0.9rem;">System Uptime Report</p>
            
            <div style="background: rgba(0, 212, 255, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 1rem;">
                    <label style="color: #8b9dc3; display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">From:</label>
                    <input type="date" id="uptimeReportFromDate" style="width: 100%; padding: 0.6rem; border-radius: 8px; border: 2px solid #00d4ff; background: #0a0e27; color: #e0e0e0; font-size: 1rem;">
                </div>
                
                <div>
                    <label style="color: #8b9dc3; display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">To:</label>
                    <input type="date" id="uptimeReportToDate" style="width: 100%; padding: 0.6rem; border-radius: 8px; border: 2px solid #00d4ff; background: #0a0e27; color: #e0e0e0; font-size: 1rem;">
                </div>
            </div>
            
            <div style="display: flex; gap: 0.8rem;">
                <button onclick="downloadUptimeReport()" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.8rem; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Download
                </button>
                <button onclick="this.closest('div').parentElement.parentElement.remove()" style="flex: 1; background: #ff3366; color: white; border: none; padding: 0.8rem; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set default dates (last 7 days)
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 7);
    
    document.getElementById('uptimeReportToDate').value = today.toISOString().split('T')[0];
    document.getElementById('uptimeReportFromDate').value = fromDate.toISOString().split('T')[0];
    
    // Set max date to today
    document.getElementById('uptimeReportToDate').max = today.toISOString().split('T')[0];
    document.getElementById('uptimeReportFromDate').max = today.toISOString().split('T')[0];
}

// Download Uptime Report (Day-to-day data)
function downloadUptimeReport() {
    const fromDate = document.getElementById('uptimeReportFromDate').value;
    const toDate = document.getElementById('uptimeReportToDate').value;
    
    if (!fromDate || !toDate) {
        alert('Please select both From and To dates');
        return;
    }
    
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const daysDiff = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
        alert('From date must be before To date');
        return;
    }
    
    // Create CSV content with headers only
    let csvContent = 'MRPL ISCC - System Uptime Report\n';
    csvContent += `Date Range: ${fromDate} to ${toDate}\n`;
    csvContent += `Total Days: ${daysDiff + 1}\n`;
    csvContent += 'Report Generated: ' + new Date().toLocaleString() + '\n\n';
    csvContent += 'Day,Date,Uptime %,Downtime %,Total Minutes,Downtime Minutes\n';
    
    // Note: Data to be populated from NMS system
    csvContent += '\n[Data to be populated from Network Management System]\n';
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MRPL_Uptime_Report_${fromDate}_to_${toDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Close modal
    const modals = document.querySelectorAll('div[style*="position: fixed"]');
    modals.forEach(m => m.remove());
    
    alert('Uptime Report template downloaded successfully!');
}

// Devices with 90-day report limit (NMS stored data - cameras, readers, and IP-based devices)
const devices90DayLimit = [
    // All Camera Systems (VMS/NMS stored)
    'Indoor Dome Cameras- 5 MP',
    'Outdoor Fixed Cameras- 5 MP',
    'PTZ with IR - 2MP',
    'Panoramic Camera- 180° - 20 MP',
    'Panoramic Camera- 360° - 20 MP',
    'ANPR Cameras',
    'Face recognition Cameras',
    'Bullet Cameras',
    
    // Access Control & Readers (NMS stored)
    'Face recognition Readers',
    'QR Code Readers',
    'Long Range RFID Reader',
    'Handheld RFID Reader',
    
    // Network & Communication Devices (NMS stored)
    'Network Video Recorder (NVR)',
    'Video Wall (6 x 3)',
    'Video Wall (2 x 3)',
    'PA Speakers',
    'Intercom System',
    'Walkie Talkie',
    
    // Electronic Access Control (NMS stored)
    'Swing Barrier',
    'Flap Barrier',
    'Boom Barrier',
    'Sliding Gate',
    
    // Screening Systems (NMS stored)
    'Door Frame Metal Detector (DFMD)',
    'Hand Held Metal Detector (HHMD)',
    'Baggage Scanner',
    'Under Vehicle Surveillance System (UVSS)',
    'Explosive Trace Detector (ETD)'
];

// Show date range selector for device report download
function showDeviceReportDateRange(deviceType) {
    const hasLimit = devices90DayLimit.includes(deviceType);
    const maxDays = hasLimit ? 90 : 365;
    
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%); padding: 2rem; border-radius: 15px; border: 2px solid #00d4ff; max-width: 450px; width: 90%; box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);">
            <h3 style="color: #00d4ff; margin: 0 0 0.5rem 0; font-size: 1.3rem;">Select Date Range</h3>
            <p style="color: #00ff88; margin: 0 0 1.5rem 0; font-size: 0.9rem;">${deviceType}</p>
            
            <div style="background: rgba(0, 212, 255, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 1rem;">
                    <label style="color: #8b9dc3; display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">From:</label>
                    <input type="date" id="reportFromDate" style="width: 100%; padding: 0.6rem; border-radius: 8px; border: 2px solid #00d4ff; background: #0a0e27; color: #e0e0e0; font-size: 1rem;">
                </div>
                
                <div>
                    <label style="color: #8b9dc3; display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">To:</label>
                    <input type="date" id="reportToDate" style="width: 100%; padding: 0.6rem; border-radius: 8px; border: 2px solid #00d4ff; background: #0a0e27; color: #e0e0e0; font-size: 1rem;">
                </div>
            </div>
            
            <p style="color: #00d4ff; font-size: 0.85rem; margin: 0 0 1.5rem 0; text-align: center; font-weight: 500;">
                ${hasLimit ? `Data available: Last ${maxDays} days` : `Data available: Last ${maxDays} days`}
            </p>
            
            <div style="display: flex; gap: 0.8rem;">
                <button onclick="downloadDeviceReport('${deviceType}', ${maxDays})" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.8rem; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Download
                </button>
                <button onclick="this.closest('div').parentElement.parentElement.remove()" style="flex: 1; background: #ff3366; color: white; border: none; padding: 0.8rem; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set default dates
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 7); // Default 7 days
    
    document.getElementById('reportToDate').value = today.toISOString().split('T')[0];
    document.getElementById('reportFromDate').value = fromDate.toISOString().split('T')[0];
    
    // Set max date to today
    document.getElementById('reportToDate').max = today.toISOString().split('T')[0];
    document.getElementById('reportFromDate').max = today.toISOString().split('T')[0];
}

// Download device report with date range
function downloadDeviceReport(deviceType, maxDays) {
    const fromDate = document.getElementById('reportFromDate').value;
    const toDate = document.getElementById('reportToDate').value;
    
    if (!fromDate || !toDate) {
        alert('Please select both From and To dates');
        return;
    }
    
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const daysDiff = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > maxDays) {
        alert(`Maximum ${maxDays} days report allowed for this device. Please select a shorter date range.`);
        return;
    }
    
    if (daysDiff < 0) {
        alert('From date must be before To date');
        return;
    }
    
    // Generate report with headers only
    let csvContent = `MRPL ISCC - Device Operational Report\n`;
    csvContent += `Device Type: ${deviceType}\n`;
    csvContent += `Date Range: ${fromDate} to ${toDate}\n`;
    csvContent += `Report Generated: ${new Date().toLocaleString()}\n\n`;
    csvContent += `Date,Device ID,Status,Uptime %,Downtime Minutes,Incidents,Alert Type,Resolution Time,Notes\n`;
    
    csvContent += '\n[Data to be populated from Network Management System]\n';
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MRPL_${deviceType.replace(/[^a-zA-Z0-9]/g, '_')}_Report_${fromDate}_to_${toDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Close modal
    document.querySelector('div[style*="position: fixed"]').remove();
    
    alert('Device report template downloaded successfully!');
}


// Show device report date range from modal
function showDeviceReportDateRangeFromModal() {
    // Get device type from modal title
    const modalTitle = document.getElementById('modalTitle').textContent;
    const deviceType = modalTitle.replace(' - Detailed Breakdown', '').trim();
    
    if (deviceType && deviceType !== 'Device Details') {
        showDeviceReportDateRange(deviceType);
    } else {
        alert('Unable to determine device type. Please try again.');
    }
}

// Show gate report date range selector
function showGateReportDateRange() {
    if (!currentSelectedGate) {
        alert('No gate selected. Please try again.');
        return;
    }
    
    const gateName = currentSelectedGate;
    const maxDays = 90; // Gate operational data typically stored for 90 days
    
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%); padding: 2rem; border-radius: 15px; border: 2px solid #00d4ff; max-width: 450px; width: 90%; box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);">
            <h3 style="color: #00d4ff; margin: 0 0 0.5rem 0; font-size: 1.3rem;">Select Date Range</h3>
            <p style="color: #00ff88; margin: 0 0 1.5rem 0; font-size: 0.9rem;">${gateName}</p>
            
            <div style="background: rgba(0, 212, 255, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 1rem;">
                    <label style="color: #8b9dc3; display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">From:</label>
                    <input type="date" id="gateReportFromDate" style="width: 100%; padding: 0.6rem; border-radius: 8px; border: 2px solid #00d4ff; background: #0a0e27; color: #e0e0e0; font-size: 1rem;">
                </div>
                
                <div>
                    <label style="color: #8b9dc3; display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">To:</label>
                    <input type="date" id="gateReportToDate" style="width: 100%; padding: 0.6rem; border-radius: 8px; border: 2px solid #00d4ff; background: #0a0e27; color: #e0e0e0; font-size: 1rem;">
                </div>
            </div>
            
            <p style="color: #00d4ff; font-size: 0.85rem; margin: 0 0 1.5rem 0; text-align: center; font-weight: 500;">
                Data available: Last ${maxDays} days
            </p>
            
            <div style="display: flex; gap: 0.8rem;">
                <button onclick="downloadGateReport('${gateName}', ${maxDays})" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.8rem; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Download
                </button>
                <button onclick="this.closest('div').parentElement.parentElement.remove()" style="flex: 1; background: #ff3366; color: white; border: none; padding: 0.8rem; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set default dates
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 7); // Default 7 days
    
    document.getElementById('gateReportToDate').value = today.toISOString().split('T')[0];
    document.getElementById('gateReportFromDate').value = fromDate.toISOString().split('T')[0];
    
    // Set max date to today
    document.getElementById('gateReportToDate').max = today.toISOString().split('T')[0];
    document.getElementById('gateReportFromDate').max = today.toISOString().split('T')[0];
}

// Download gate report with date range
function downloadGateReport(gateName, maxDays) {
    const fromDate = document.getElementById('gateReportFromDate').value;
    const toDate = document.getElementById('gateReportToDate').value;
    
    if (!fromDate || !toDate) {
        alert('Please select both From and To dates');
        return;
    }
    
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const daysDiff = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > maxDays) {
        alert(`Maximum ${maxDays} days report allowed. Please select a shorter date range.`);
        return;
    }
    
    if (daysDiff < 0) {
        alert('From date must be before To date');
        return;
    }
    
    // Get gate devices
    const devices = gateDeviceDistribution[gateName] || {};
    const deviceList = Object.entries(devices)
        .filter(([device, count]) => count >= 1)
        .sort((a, b) => b[1] - a[1]);
    
    const totalDevices = deviceList.reduce((sum, [_, count]) => sum + count, 0);
    
    // Generate CSV report with headers only
    let csvContent = `MRPL ISCC - Gate Operational Report\n`;
    csvContent += `Gate Name: ${gateName}\n`;
    csvContent += `Date Range: ${fromDate} to ${toDate}\n`;
    csvContent += `Total Devices at Gate: ${totalDevices}\n`;
    csvContent += `Report Generated: ${new Date().toLocaleString()}\n\n`;
    
    // Device Summary Headers
    csvContent += `Device Summary\n`;
    csvContent += `Device Type,Count,Status,Uptime %,Last Maintenance Date\n`;
    
    csvContent += `\n\nDaily Operational Status\n`;
    csvContent += `Date,Total Devices,Devices Online,Devices Offline,Gate Uptime %,Access Granted,Access Denied,Incidents,Response Time (min)\n`;
    
    csvContent += `\n\nAccess Control Log\n`;
    csvContent += `Date,Time,Person/Vehicle ID,Entry/Exit,Method,Status,Gate Officer\n`;
    
    csvContent += '\n\n[Data to be populated from Access Control System and NMS]\n';
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MRPL_${gateName.replace(/[^a-zA-Z0-9]/g, '_')}_Report_${fromDate}_to_${toDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Close modal
    const modals = document.querySelectorAll('div[style*="position: fixed"]');
    modals.forEach(m => m.remove());
    
    alert('Gate report downloaded successfully!');
}

// Show shift-wise employee data
function showShiftData(shift) {
    // Update button styles
    const buttons = ['shiftABtn', 'shiftBBtn', 'shiftCBtn', 'generalBtn'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            if (btnId === shift + 'Btn') {
                btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                btn.style.color = 'white';
                btn.style.border = 'none';
            } else {
                btn.style.background = 'rgba(102, 126, 234, 0.3)';
                btn.style.color = '#8b9dc3';
                btn.style.border = '2px solid #667eea';
            }
        }
    });
    
    const container = document.getElementById('shiftDataContainer');
    if (!container) return;
    
    let shiftName = '';
    let shiftTime = '';
    let employeeData = [];
    
    if (shift === 'shiftA') {
        shiftName = 'Shift A';
        shiftTime = '06:00 - 14:00';
        employeeData = [
            { empId: 'EMP-2456', time: '06:15', gate: 'Main Gate' },
            { empId: 'EMP-3789', time: '06:20', gate: 'Main Gate' },
            { empId: 'EMP-1234', time: '06:25', gate: 'LP Gate' },
            { empId: 'EMP-5678', time: '06:30', gate: 'Main Gate' },
            { empId: 'EMP-9012', time: '06:35', gate: 'E2 Gate' },
            { empId: 'EMP-2345', time: '06:40', gate: 'Jokatte Gate' },
            { empId: 'EMP-6789', time: '06:45', gate: 'Main Gate' },
            { empId: 'EMP-4567', time: '06:50', gate: 'LP Gate' },
            { empId: 'EMP-7890', time: '06:55', gate: 'Cargo Gate' },
            { empId: 'EMP-1357', time: '07:00', gate: 'Main Gate' }
        ];
    } else if (shift === 'shiftB') {
        shiftName = 'Shift B';
        shiftTime = '14:00 - 22:00';
        employeeData = [
            { empId: 'EMP-8901', time: '14:05', gate: 'Main Gate' },
            { empId: 'EMP-2468', time: '14:10', gate: 'LP Gate' },
            { empId: 'EMP-1357', time: '14:15', gate: 'Main Gate' },
            { empId: 'EMP-9753', time: '14:20', gate: 'Jokatte Gate' },
            { empId: 'EMP-8642', time: '14:25', gate: 'E2 Gate' },
            { empId: 'EMP-7531', time: '14:30', gate: 'Main Gate' },
            { empId: 'EMP-6420', time: '14:35', gate: 'Cargo Gate' },
            { empId: 'EMP-5319', time: '14:40', gate: 'LP Gate' },
            { empId: 'EMP-4208', time: '14:45', gate: 'Main Gate' },
            { empId: 'EMP-3197', time: '14:50', gate: 'Jokatte Gate' }
        ];
    } else if (shift === 'shiftC') {
        shiftName = 'Shift C';
        shiftTime = '22:00 - 06:00';
        employeeData = [
            { empId: 'EMP-2086', time: '22:05', gate: 'Main Gate' },
            { empId: 'EMP-1975', time: '22:10', gate: 'LP Gate' },
            { empId: 'EMP-8864', time: '22:15', gate: 'Main Gate' },
            { empId: 'EMP-7753', time: '22:20', gate: 'E2 Gate' },
            { empId: 'EMP-6642', time: '22:25', gate: 'Main Gate' },
            { empId: 'EMP-5531', time: '22:30', gate: 'Jokatte Gate' },
            { empId: 'EMP-4420', time: '22:35', gate: 'LP Gate' },
            { empId: 'EMP-3319', time: '22:40', gate: 'Main Gate' },
            { empId: 'EMP-2208', time: '22:45', gate: 'Cargo Gate' },
            { empId: 'EMP-1197', time: '22:50', gate: 'Main Gate' }
        ];
    } else if (shift === 'general') {
        shiftName = 'General Shift';
        shiftTime = '09:00 - 18:00';
        employeeData = [
            { empId: 'EMP-5001', time: '09:05', gate: 'Main Gate' },
            { empId: 'EMP-5002', time: '09:10', gate: 'Main Gate' },
            { empId: 'EMP-5003', time: '09:15', gate: 'LP Gate' },
            { empId: 'EMP-5004', time: '09:20', gate: 'Main Gate' },
            { empId: 'EMP-5005', time: '09:25', gate: 'Jokatte Gate' },
            { empId: 'EMP-5006', time: '09:30', gate: 'Main Gate' },
            { empId: 'EMP-5007', time: '09:35', gate: 'E2 Gate' },
            { empId: 'EMP-5008', time: '09:40', gate: 'Main Gate' },
            { empId: 'EMP-5009', time: '09:45', gate: 'LP Gate' },
            { empId: 'EMP-5010', time: '09:50', gate: 'Main Gate' }
        ];
    }
    
    let html = `
        <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h3 style="color: #00d4ff; margin: 0; font-size: 1.1rem;">${shiftName}</h3>
                <span style="color: #00ff88; font-size: 0.9rem; font-weight: 600;">${shiftTime}</span>
            </div>
            <p style="color: #8b9dc3; margin: 0; font-size: 0.85rem;">Employee entries for this shift</p>
        </div>
        
        <div style="max-height: 300px; overflow-y: auto; position: relative;">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                <thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    <tr>
                        <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Employee ID</th>
                        <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Entry Time</th>
                        <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Gate</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    employeeData.forEach(emp => {
        html += `
            <tr style="border-bottom: 1px solid #3d4a7a;">
                <td style="padding: 0.7rem; color: #00ff88; font-weight: 600;">${emp.empId}</td>
                <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">${emp.time}</td>
                <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">${emp.gate}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        <div style="margin-top: 1rem; padding: 0.7rem; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: #00d4ff; text-align: center;">
            <strong>Total ${shiftName} Entries:</strong> ${employeeData.length} employees
        </div>
    `;
    
    container.innerHTML = html;
}

// Show category-wise data (Contractors/Visitors)
function showCategoryData(category) {
    const container = document.getElementById('shiftDataContainer');
    if (!container) return;
    
    let categoryName = '';
    let categoryData = [];
    
    if (category === 'contractors') {
        categoryName = 'Contractors';
        categoryData = [
            { id: 'CON-4567', name: 'Ramesh Yadav', company: 'ABC Contractors', time: '09:00', gate: 'Cargo Gate' },
            { id: 'CON-7890', name: 'Suresh Naik', company: 'XYZ Services', time: '09:05', gate: 'Cargo Gate' },
            { id: 'CON-1234', name: 'Vijay Kumar', company: 'Tech Solutions', time: '09:10', gate: 'Main Gate' },
            { id: 'CON-5678', name: 'Prakash Singh', company: 'ABC Contractors', time: '09:15', gate: 'LP Gate' },
            { id: 'CON-9012', name: 'Mahesh Patil', company: 'Build Corp', time: '09:20', gate: 'Jokatte Gate' },
            { id: 'CON-3456', name: 'Ravi Sharma', company: 'XYZ Services', time: '09:25', gate: 'Cargo Gate' },
            { id: 'CON-7891', name: 'Anil Desai', company: 'Tech Solutions', time: '09:30', gate: 'Main Gate' },
            { id: 'CON-2345', name: 'Santosh Reddy', company: 'ABC Contractors', time: '09:35', gate: 'E2 Gate' },
            { id: 'CON-6789', name: 'Ganesh Naik', company: 'Build Corp', time: '09:40', gate: 'LP Gate' },
            { id: 'CON-1357', name: 'Dinesh Rao', company: 'XYZ Services', time: '09:45', gate: 'Main Gate' }
        ];
    } else if (category === 'visitors') {
        categoryName = 'Visitors';
        categoryData = [
            { id: 'VIS-1234', name: 'John Smith', purpose: 'Business Meeting', time: '10:30', gate: 'Main Gate' },
            { id: 'VIS-5678', name: 'Priya Menon', purpose: 'Audit', time: '10:35', gate: 'Main Gate' },
            { id: 'VIS-9012', name: 'Rajesh Gupta', purpose: 'Vendor Visit', time: '10:40', gate: 'Main Gate' },
            { id: 'VIS-3456', name: 'Sarah Johnson', purpose: 'Training', time: '10:45', gate: 'Main Gate' },
            { id: 'VIS-7890', name: 'Amit Verma', purpose: 'Inspection', time: '10:50', gate: 'LP Gate' },
            { id: 'VIS-2345', name: 'David Lee', purpose: 'Consultation', time: '10:55', gate: 'Main Gate' },
            { id: 'VIS-6789', name: 'Kavita Iyer', purpose: 'Site Visit', time: '11:00', gate: 'Main Gate' },
            { id: 'VIS-1357', name: 'Michael Brown', purpose: 'Business Meeting', time: '11:05', gate: 'Main Gate' },
            { id: 'VIS-9753', name: 'Sneha Patel', purpose: 'Vendor Visit', time: '11:10', gate: 'Jokatte Gate' },
            { id: 'VIS-8642', name: 'Robert Wilson', purpose: 'Audit', time: '11:15', gate: 'Main Gate' }
        ];
    }
    
    let html = `
        <div style="background: rgba(${category === 'contractors' ? '0, 255, 136' : '255, 170, 0'}, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
            <h3 style="color: ${category === 'contractors' ? '#00ff88' : '#ffaa00'}; margin: 0 0 0.5rem 0; font-size: 1.1rem;">${categoryName}</h3>
            <p style="color: #8b9dc3; margin: 0; font-size: 0.85rem;">All ${categoryName.toLowerCase()} entries today</p>
        </div>
        
        <div style="max-height: 300px; overflow-y: auto; position: relative;">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                <thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    <tr>
                        <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">${category === 'contractors' ? 'Contractor ID' : 'Visitor ID'}</th>
                        <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Name</th>
                        <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">${category === 'contractors' ? 'Company' : 'Purpose'}</th>
                        <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Time</th>
                        <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Gate</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    categoryData.forEach(item => {
        html += `
            <tr style="border-bottom: 1px solid #3d4a7a;">
                <td style="padding: 0.7rem; color: ${category === 'contractors' ? '#00ff88' : '#ffaa00'}; font-weight: 600;">${item.id}</td>
                <td style="padding: 0.7rem; color: #e0e0e0;">${item.name}</td>
                <td style="padding: 0.7rem; color: #8b9dc3;">${category === 'contractors' ? item.company : item.purpose}</td>
                <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">${item.time}</td>
                <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">${item.gate}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        <div style="margin-top: 1rem; padding: 0.7rem; background: rgba(${category === 'contractors' ? '0, 255, 136' : '255, 170, 0'}, 0.1); border-radius: 8px; color: ${category === 'contractors' ? '#00ff88' : '#ffaa00'}; text-align: center;">
            <strong>Total ${categoryName}:</strong> ${categoryData.length} entries today
        </div>
    `;
    
    container.innerHTML = html;
}

    // Handle Special Entries KPI
    if (type === 'specialEntries') {
        title = 'Special Entries - Details';
        content = `
            <div style="max-height: 500px; overflow-y: auto; position: relative;">
                <p style="color: #8b9dc3; margin-bottom: 15px;">Special entries without pass or emergency access</p>
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead style="position: sticky; top: 0; background: #1e2746; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <tr>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Name</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Gate</th>
                            <th style="padding: 0.8rem; text-align: center; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Time</th>
                            <th style="padding: 0.8rem; text-align: left; color: #00d4ff; border-bottom: 2px solid #3d4a7a; font-size: 0.9rem; font-weight: 600; background: #1e2746;">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #ffaa00; font-weight: 600;">Rajesh Kumar</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">14:25</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Phone Call - Manager Approval</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #ffaa00; font-weight: 600;">Priya Sharma</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">13:45</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Phone Call - Urgent Meeting</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #00d4ff; font-weight: 600;">Amit Patel</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">12:30</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Emergency - Fire Drill</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #ffaa00; font-weight: 600;">Sunita Reddy</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Jokatte Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">11:50</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Phone Call - Vendor Visit</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #ffaa00; font-weight: 600;">Vikram Singh</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Cargo Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">11:20</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Phone Call - Delivery</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #00d4ff; font-weight: 600;">Ramesh Yadav</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">E2 Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">10:45</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Emergency - Medical</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #ffaa00; font-weight: 600;">Kavita Desai</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Main Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">10:15</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Phone Call - Contractor</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #3d4a7a;">
                            <td style="padding: 0.7rem; color: #00d4ff; font-weight: 600;">Anil Mehta</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">LP Gate</td>
                            <td style="padding: 0.7rem; text-align: center; color: #e0e0e0;">09:50</td>
                            <td style="padding: 0.7rem; color: #e0e0e0;">Emergency - Equipment Failure</td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin-top: 15px; padding: 10px; background: rgba(255, 170, 0, 0.1); border-radius: 8px; color: #ffaa00;">
                    <strong>Total Special Entries:</strong> 18 (Without Pass: 15 | Emergency: 3)
                </div>
            </div>
        `;
    }
