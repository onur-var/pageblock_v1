function populateTable(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = ''; // Önceki verileri temizle

    const columnFilters = [new Set(), new Set()]; // Filtreler için set (0 ve 1. sütun)

    data.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach((cell, colIndex) => {
            const td = document.createElement('td');
            td.textContent = cell || ''; // Boş hücreler için varsayılan değer
            tr.appendChild(td);

            if (colIndex === 0) columnFilters[0].add(cell || '');
            if (colIndex === 1) columnFilters[1].add(cell || '');
        });
        tbody.appendChild(tr);
    });

    updateFilters(columnFilters);
}

function updateFilters(filters) {
    // A/C TYPE filtresi
    const acTypeFilter = document.getElementById("filterA/CType");
    acTypeFilter.innerHTML = `<option value="">Tümü</option>`; // Varsayılan seçenek
    filters[0].forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        acTypeFilter.appendChild(option);
    });

    // REFERANCE filtresi
    const referenceFilter = document.getElementById("filterReference");
    referenceFilter.innerHTML = `<option value="">Tümü</option>`; // Varsayılan seçenek
    filters[1].forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        referenceFilter.appendChild(option);
    });
}

function filterColumn(colIndex) {
    const filterValue = colIndex === 0
        ? document.getElementById("filterA/CType").value
        : document.getElementById("filterReference").value;

    const rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach(row => {
        const cell = row.querySelectorAll("td")[colIndex];
        if (filterValue === "" || (cell && cell.textContent === filterValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
