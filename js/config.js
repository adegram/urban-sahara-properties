/*
  URBAN SAHARA GOOGLE FORMS CONFIGURATION
  --------------------------------------
  This landing page sends enquiries to a Google Form.

  1. Create a Google Form with fields matching the form on the website.
  2. Use "Get pre-filled link" / the form's HTML source to identify each field's
     entry.<number> ID.
  3. Paste the Google Form's /formResponse URL below.
  4. Paste the matching entry IDs into the entries object.

  Example:
  FORM_ACTION: "https://docs.google.com/forms/d/e/FORM_ID/formResponse",
  entries: {
    fullName: "entry.123456789",
    phone: "entry.234567890",
    email: "entry.345678901",
    interest: "entry.456789012",
    location: "entry.567890123",
    budget: "entry.678901234",
    contactMethod: "entry.789012345",
    message: "entry.890123456"
  }

  IMPORTANT:
  The entry IDs below are placeholders. Replace them before going live.
*/

window.URBAN_SAHARA_FORM = {
  FORM_ACTION: "PASTE_YOUR_GOOGLE_FORM_FORMRESPONSE_URL_HERE",
  entries: {
    fullName: "entry.REPLACE_FULL_NAME",
    phone: "entry.REPLACE_PHONE",
    email: "entry.REPLACE_EMAIL",
    interest: "entry.REPLACE_INTEREST",
    location: "entry.REPLACE_LOCATION",
    budget: "entry.REPLACE_BUDGET",
    contactMethod: "entry.REPLACE_CONTACT_METHOD",
    message: "entry.REPLACE_MESSAGE"
  }
};
