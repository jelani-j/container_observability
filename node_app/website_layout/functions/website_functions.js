export function displayTable(data, arrayName, sectionIndex, tablename) {
    const entry = data[arrayName]?.[sectionIndex];
  
    const output = document.getElementById(tablename); // table-output
    output.innerHTML = ''; // clear previous content
    if (!entry) {
      output.textContent = `No data found for ${arrayName}[${sectionIndex}]`;
      return;
    }
  
    const title = document.createElement('h2');
    title.textContent = 'Table Name: ' + entry.name;
    output.appendChild(title);
    //tech_output.appendChild(title);
  
    const table = document.createElement('table');
  
    Object.entries(entry.data || {}).forEach(([key, value]) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td><strong>${key}</strong></td><td>${value}</td>`;
      table.appendChild(row);
    });
    output.appendChild(table);
}
