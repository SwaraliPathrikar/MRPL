// ============================================
// MRPL DEVICE DATA (Based on BOQ)
// ============================================
const MRPL_DEVICE_DATA = {
    totalCameras: 487,
    onlineCameras: 462,
    offlineCameras: 25,
    
    // ANPR System
    totalANPR: 42,
    onlineANPR: 40,
    
    // Face Recognition System
    totalFaceRecognition: 75,
    onlineFaceRecognition: 71,
    
    // Storage
    storageCapacityTB: 100,
    storageUsedTB: 67,
    
    gates: {
        'Main Gate': { cameras: '65/65', anpr: 4, bollards: 4, status: 'ONLINE' },
        'LP Gate': { cameras: '48/48', anpr: 3, bollards: 3, status: 'ONLINE' },
        'Jokatte Gate': { cameras: '42/42', anpr: 3, bollards: 2, status: 'ONLINE' },
        'E2 Gate': { cameras: '38/38', anpr: 2, bollards: 2, status: 'ONLINE' },
        'Cargo Gate': { cameras: '68/72', anpr: 5, bollards: 4, status: 'WARNING' },
        'Railway Siding': { cameras: '35/35', anpr: 2, bollards: 2, status: 'ONLINE' },
        'PCR': { cameras: '28/28', anpr: 2, bollards: 2, status: 'ONLINE' },
        'CISF Checking': { cameras: '55/55', anpr: 3, bollards: 3, status: 'ONLINE' }
    }
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

// Set initial values immediately to prevent flickering
document.addEventListener('DOMContentLoaded', () => {
    const percentages = calculatePercentages();
    
    // Set initial values right away
    document.getElementById('totalCameras').textContent = MRPL_DEVICE_DATA.totalCameras;
    document.getElementById('onlineCameras').textContent = MRPL_DEVICE_DATA.onlineCameras;
    document.getElementById('offlineCameras').textContent = MRPL_DEVICE_DATA.offlineCameras;
    document.getElementById('anprStatus').textContent = percentages.anpr;
    document.getElementById('frStatus').textContent = percentages.fr;
    document.getElementById('storageUsage').textContent = percentages.storage;
});

function initializeMRPLData() {
    console.log('✅ Loading MRPL Device Data');
    const percentages = calculatePercentages();
    
    document.getElementById('totalCameras').textContent = MRPL_DEVICE_DATA.totalCameras;
    document.getElementById('onlineCameras').textContent = MRPL_DEVICE_DATA.onlineCameras;
    document.getElementById('offlineCameras').textContent = MRPL_DEVICE_DATA.offlineCameras;
    document.getElementById('anprStatus').textContent = percentages.anpr;
    document.getElementById('frStatus').textContent = percentages.fr;
    document.getElementById('storageUsage').textContent = percentages.storage;
    
    const tbody = document.querySelector('.data-table tbody');
    if (tbody) {
        tbody.innerHTML = '';
        Object.entries(MRPL_DEVICE_DATA.gates).forEach(([gateName, data]) => {
            const statusClass = data.status === 'ONLINE' ? 'good' : 'warning';
            const row = document.createElement('tr');
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
    
    // Load fallback device inventory
    loadFallbackInventory();
    loadFallbackAnalytics(); // NEW: Load analytics
}

// Fallback: Show all BOQ devices when Google Sheets not connected
function loadFallbackInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Complete BOQ device list
    const boqDevices = [
        { type: 'Gate', total: 8 },
        { type: 'Automatic Tyre Killer', total: 8 },
        { type: 'Manual Tyre Killer', total: 6 },
        { type: 'UVSS', total: 4 },
        { type: 'Bollards', total: 28 },
        { type: 'Boom Barrier', total: 18 },
        { type: 'Swing Barriers', total: 12 },
        { type: 'Visitor Kiosks', total: 8 },
        { type: '32" Overhead Display', total: 15 },
        { type: 'Indoor Digital Displays', total: 25 },
        { type: 'Outdoor Digital Displays', total: 18 },
        { type: 'Video Wall (6 by 3)', total: 2 },
        { type: 'Video Wall (2 by 3)', total: 4 },
        { type: 'DFMD', total: 12 },
        { type: 'Baggage Scanner', total: 8 },
        { type: 'Frisking Booth', total: 10 },
        { type: 'Long Range RFID Reader', total: 35 },
        { type: 'Push Button for Boom Barrier', total: 18 },
        { type: 'EM Locks', total: 24 },
        { type: 'Indoor Dome - 5 MP', total: 120 },
        { type: 'Outdoor Fixed - 5 MP', total: 150 },
        { type: 'PTZ with IR - 2MP', total: 45 },
        { type: 'Panoramic - 180 - 20 MP', total: 30 },
        { type: 'Panoramic - 360 - 20 MP', total: 25 },
        { type: 'ANPR Cameras', total: 42 },
        { type: 'Face recognition Cameras', total: 75 },
        { type: 'IP Horn Speaker', total: 30 },
        { type: 'IP Ceiling Speaker', total: 40 },
        { type: 'Master & Local Control Desks', total: 8 },
        { type: 'Face recognition Readers', total: 45 },
        { type: 'Smart Card Reader', total: 50 },
        { type: 'QR Code Readers', total: 30 },
        { type: 'Camera Poles', total: 85 },
        { type: 'Rack (12U)', total: 15 },
        { type: 'Outdoor Junction Box', total: 60 },
        { type: 'Portable face readers (buses)', total: 10 },
        { type: 'Portable face readers (gates)', total: 8 },
        { type: '10 finger enrolment readers', total: 12 },
        { type: 'Indoor signages', total: 50 },
        { type: 'Wireless Access Point', total: 40 },
        { type: 'Video Conferencing Solution', total: 4 },
        { type: 'Smart Rack', total: 8 },
        { type: 'DG Set', total: 2 }
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
                   deviceType.includes('uvss') || deviceType.includes('lock')) {
            categories['Access Control'] += total;
        } else if (deviceType.includes('display') || deviceType.includes('video wall') ||
                   deviceType.includes('kiosk') || deviceType.includes('signage')) {
            categories['Displays'] += total;
        } else if (deviceType.includes('reader') || deviceType.includes('rfid') ||
                   deviceType.includes('smart card') || deviceType.includes('qr code')) {
            categories['Readers'] += total;
        } else if (deviceType.includes('scanner') || deviceType.includes('dfmd') ||
                   deviceType.includes('frisking') || deviceType.includes('baggage')) {
            categories['Security Equipment'] += total;
        } else if (deviceType.includes('pole') || deviceType.includes('rack') ||
                   deviceType.includes('junction') || deviceType.includes('wireless') ||
                   deviceType.includes('speaker') || deviceType.includes('dg set')) {
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
    
    window.deviceCategoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories).filter(k => categories[k] > 0),
            datasets: [{
                data: Object.values(categories).filter(v => v > 0),
                backgroundColor: ['#00d4ff', '#00ff88', '#ffaa00', '#ff3366', '#8b9dc3', '#00ffff', '#ff00ff'],
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
                }
            }
        }
    });
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
                    ticks: { color: '#8b9dc3', font: { size: 10 } },
                    grid: { color: '#3d4a7a' }
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
    const categories = {
        'Cameras': 487,
        'Access Control': 104,
        'Displays': 64,
        'Readers': 160,
        'Security Equipment': 30,
        'Infrastructure': 220
    };
    
    const topDevices = [
        { name: 'Outdoor Fixed - 5 MP', count: 150 },
        { name: 'Indoor Dome - 5 MP', count: 120 },
        { name: 'Camera Poles', count: 85 },
        { name: 'Face recognition Cameras', count: 75 },
        { name: 'Outdoor Junction Box', count: 60 },
        { name: 'Smart Card Reader', count: 50 },
        { name: 'Indoor signages', count: 50 },
        { name: 'Face recognition Readers', count: 45 },
        { name: 'PTZ with IR - 2MP', count: 45 },
        { name: 'ANPR Cameras', count: 42 }
    ];
    
    const gateDeviceCounts = {
        'Main Gate': 145,
        'Cargo Gate': 138,
        'LP Gate': 112,
        'Jokatte Gate': 98,
        'CISF Checking': 95,
        'E2 Gate': 85,
        'Railway Siding': 72,
        'PCR': 65
    };
    
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
    
    document.getElementById('totalCameras').textContent = totalCameras;
    document.getElementById('onlineCameras').textContent = Math.floor(totalCameras * 0.95);
    document.getElementById('offlineCameras').textContent = Math.ceil(totalCameras * 0.05);
    document.getElementById('anprStatus').textContent = totalANPR > 0 ? '95%' : '0%';
    
    updateGateTableFromSheets();
    updateDeviceInventoryTable(); // NEW: Show all devices
    updateDeviceAnalytics(); // NEW: Show device analytics
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
    // Update KPI cards
    updateElement('totalCameras', MRPL_DEVICE_DATA.totalCameras);
    updateElement('onlineCameras', MRPL_DEVICE_DATA.onlineCameras);
    updateElement('offlineCameras', MRPL_DEVICE_DATA.offlineCameras);
    
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

    // Person Category Chart
    const personCategoryCtx = document.getElementById('personCategoryChart');
    if (personCategoryCtx) {
        new Chart(personCategoryCtx, {
            type: 'pie',
            data: {
                labels: ['Employees', 'Contractors', 'Visitors', 'Executives', 'Truck Drivers'],
                datasets: [{
                    data: [650, 280, 165, 45, 110],
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

    // Gender Chart
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
