// Google Apps Script — paste this into Extensions → Apps Script from within your Google Sheet
// See SETUP.md for deployment instructions

function doGet(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    var selectedFuture   = e.parameter.selectedFuture   || '';
    var signals          = e.parameter.signals          || '';
    var aiGrowth         = e.parameter.aiGrowth         || '0';
    var aiCollapse       = e.parameter.aiCollapse       || '0';
    var aiTransformation = e.parameter.aiTransformation || '0';
    var aiConstraint     = e.parameter.aiConstraint     || '0';
    var questionCategory = e.parameter.questionCategory || '';
    var reflection       = e.parameter.reflection       || '';
    var additionalInfo   = e.parameter.additionalInfo   || '';

    // Skip empty submissions
    if (!selectedFuture && !reflection) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'skipped' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      new Date(),
      selectedFuture,
      signals,
      aiGrowth,
      aiCollapse,
      aiTransformation,
      aiConstraint,
      questionCategory,
      reflection,
      additionalInfo
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
