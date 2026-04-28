// ─── SSPs Reflections — Google Apps Script ────────────────────────────────
//
// SETUP INSTRUCTIONS:
// 1. Go to script.google.com and create a new project
// 2. Paste this entire file into the editor
// 3. Click Deploy → New deployment → Web app
//    - Execute as: Me (your Google account)
//    - Who has access: Anyone (anonymous)
// 4. Click Deploy and copy the web app URL
// 5. Paste that URL into script.js as the value of SCRIPT_URL
//
// SPREADSHEET SETUP:
// - This script must be bound to a Google Sheet
//   (create via Extensions → Apps Script from within a Sheet, not from script.google.com)
// - The active sheet will receive one row per submission
// - Column headers (add manually in row 1):
//   A: Timestamp | B: Selected Future | C: Signals
//   D: AI Growth % | E: AI Collapse % | F: AI Transformation % | G: AI Constraint %
//   H: Question Category | I: Reflection | J: Additional Info
// ─────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data  = JSON.parse(e.parameter.data);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date(),                // A: Timestamp
      data.selectedFuture   || '',  // B: Selected Future
      data.signals          || '',  // C: Signals
      data.aiGrowth         || 0,   // D: AI Growth %
      data.aiCollapse       || 0,   // E: AI Collapse %
      data.aiTransformation || 0,   // F: AI Transformation %
      data.aiConstraint     || 0,   // G: AI Constraint %
      data.questionCategory || '',  // H: Question Category (winner / tie / equal)
      data.reflection       || '',  // I: Reflection
      data.additionalInfo   || ''   // J: Additional Info (optional)
    ]);

    return ContentService
      .createTextResponse(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextResponse(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// doGet lets you test the script is live by visiting the URL in a browser
function doGet(e) {
  return ContentService
    .createTextResponse('SSPs Reflections Apps Script is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
