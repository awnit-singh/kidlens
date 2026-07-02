/* Minimal RFC 4180 CSV: quoted fields, escaped quotes, newlines in
   quotes, CRLF or LF row endings. */

export function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i += 1;
        }
      } else {
        field += c;
        i += 1;
      }
    } else if (c === '"') {
      inQuotes = true;
      i += 1;
    } else if (c === ",") {
      endField();
      i += 1;
    } else if (c === "\r") {
      if (text[i + 1] === "\n") i += 1;
      endRow();
      i += 1;
    } else if (c === "\n") {
      endRow();
      i += 1;
    } else {
      field += c;
      i += 1;
    }
  }
  if (field !== "" || row.length) endRow();

  /* drop fully blank trailing rows */
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

export function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCSV(rows) {
  return rows.map((r) => r.map(csvEscape).join(",")).join("\r\n") + "\r\n";
}
