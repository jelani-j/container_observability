
export function displayTable(data, entry, outputElementId) {
  const output = document.getElementById(outputElementId);
  output.innerHTML = ''; // Clear previous table

  if (!Array.isArray(data) || data.length === 0) {
    output.textContent = "No data found.";
    return;
  }

  // Optional: title
  const title = document.createElement('h2');
  title.textContent = entry;
  output.appendChild(title);

  const table = document.createElement('table');

  // Create table header from keys of the first row
  const headerRow = document.createElement('tr');
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Fill table rows
  data.forEach(entry => {
    const row = document.createElement('tr');
    Object.values(entry).forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  output.appendChild(table);
}