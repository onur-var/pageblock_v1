// Google Sheets API Ayarları
const SHEET_ID = '1cOFgxgLkHDKMbNSUWnOJ4mrmmq6G2Xz80RKURtBkTKE';
const API_KEY = 'AIzaSyDltb5FbPvL9bLgj_GK4_DEDaPK0A7oM_g';
const RANGE = 'Sayfa1!A1:M';

async function fetchSheetData() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        if (data.values) {
            populateFilters(data.values);
            populateTable(data.values);
        } else {
            throw new Error("Gelen veri boş.");
        }
    } catch (error) {
        console.error("API'den veri alınırken hata oluştu:", error.message);
    }
}

function populateTable(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = '';

    data.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function populateFilters(data) {
    const column1Values = new Set(data.slice(1).map(row => row[0])); // A/C TYPE
    const column2Values = new Set(data.slice(1).map(row => row[1])); // A/C REG

    const filterColumn1 = document.getElementById("filterColumn1");
    const filterColumn2 = document.getElementById("filterColumn2");

    column1Values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        filterColumn1.appendChild(option);
    });

    column2Values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        filterColumn2.appendChild(option);
    });
}

function filterTable() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filterColumn1 = document.getElementById("filterColumn1").value.toLowerCase();
    const filterColumn2 = document.getElementById("filterColumn2").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const matchesSearch = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ').includes(searchInput);
        const matchesFilter1 = filterColumn1 === "" || cells[0].textContent.toLowerCase() === filterColumn1;
        const matchesFilter2 = filterColumn2 === "" || cells[1].textContent.toLowerCase() === filterColumn2;

        row.style.display = matchesSearch && matchesFilter1 && matchesFilter2 ? '' : 'none';
    });
}

document.addEventListener("DOMContentLoaded", fetchSheetData);
