// Google Sheets API Ayarları
const SHEET_ID = 'YOUR_SHEET_ID'; // Google Sheet ID'nizi buraya yapıştırın
const API_KEY = 'YOUR_API_KEY'; // Google API anahtarınızı buraya yapıştırın
const RANGE = 'Sheet1!A1:N'; // Sheet adınızı ve sütun aralığınızı belirtin

// Google Sheets verilerini çek
async function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    populateTable(data.values);
}

// Tabloyu doldur
function populateTable(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = ''; // Önceki verileri temizle

    data.slice(1).forEach(row => { // İlk satır başlık olduğu için atlıyoruz
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || ''; // Boş hücreler için varsayılan değer
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Tabloyu filtrele
function filterTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        row.style.display = rowText.includes(input) ? '' : 'none';
    });
}

// Sayfa yüklendiğinde verileri çek
document.addEventListener("DOMContentLoaded", fetchSheetData);
