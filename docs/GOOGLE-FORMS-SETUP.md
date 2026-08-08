# Connecting the Urban Sahara enquiry form to Google Forms

The website uses a normal HTML POST to Google Forms, with the submission sent into a hidden iframe so the visitor remains on the Urban Sahara website.

## 1. Create the Google Form

Create a Google Form with these questions:

1. Full name — Short answer — Required
2. Phone / WhatsApp — Short answer — Required
3. Email address — Short answer
4. I'm interested in — Dropdown
5. Preferred location — Short answer
6. Budget — Short answer
7. Preferred contact — Dropdown
8. Tell us a little more — Paragraph

The exact wording does not have to match perfectly, but the order is useful.

## 2. Get the formResponse URL and entry IDs

Open your Google Form and use its published/respondent view.

The submission endpoint will look like:

`https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`

The individual field IDs look like:

`entry.123456789`

A reliable way to find them is:

- Open the live Google Form in Chrome.
- Right-click and inspect the page.
- Search the HTML/Elements panel for `entry.`.
- Match each entry ID to its corresponding question.

Alternatively, use the browser's page source / developer tools to identify the `name="entry...."` values.

## 3. Edit js/config.js

Replace:

```js
FORM_ACTION: "PASTE_YOUR_GOOGLE_FORM_FORMRESPONSE_URL_HERE"
```

with your actual formResponse URL.

Then replace every placeholder entry ID:

```js
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
```

with the IDs from your Google Form.

## 4. Test

Submit the website form with a test enquiry.

Then open the Google Form's Responses tab and confirm that the submission appears.

## Important

Google Forms is acting as the lead database. You can configure Google Forms to send notifications to your email when a new response arrives.

The website does not need your Google password or Google account credentials.

## If you want a more professional lead system later

Once the website is running, you can replace Google Forms with a dedicated backend/email service while keeping the same front-end form. The current front end is structured so that the form handling can be changed without redesigning the site.
