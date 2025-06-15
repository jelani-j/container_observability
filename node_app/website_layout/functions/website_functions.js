
export function displayTable(data, table_title, outputElementId) {
  const output = document.getElementById(outputElementId);
  output.innerHTML = ''; // clear the table 
  if (!Array.isArray(data) || data.length === 0) {
    output.textContent = "No data found.";
    return;
  }
  // Title of the table
  const title = document.createElement('h2');
  title.textContent = table_title;
  output.appendChild(title);

  //create table and rows
  const table = document.createElement('table');

  const headerRow = document.createElement('tr');
  ['Title', 'Description'].forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  output.appendChild(headerRow);

  data.forEach(entry => {
    const row = document.createElement('tr');
    const { title, description } = entry;
    [title, description].forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    })
    table.appendChild(row);
  });
  output.appendChild(table);
}