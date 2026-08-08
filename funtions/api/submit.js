// Cloudflare Pages Function
// Lives at: /functions/api/submit.js
// Deploys automatically to: https://<your-site>/api/submit
//
// Purpose: the browser POSTs the lead form's field values here (same-origin,
// so ad blockers / uBlock Origin's "prevent-xhr" rules for docs.google.com
// never see it). This function then forwards the data to Google Forms
// server-to-server, where nothing in the visitor's browser can block it.

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScW1Fqa-DVuwWEW8_szGsKeNJQ0SD68BxIPvucm21-s7XgDyQ/formResponse";

// Field name (matches your HTML <input name="..."> / FormData keys)
// -> Google Form entry ID (from the pre-filled link).
const ENTRIES = {
  fullName: "entry.2005620554",
  phone: "entry.1707281270",
  email: "entry.1673362961",
  interest: "entry.110569613",
  location: "entry.1407542954",
  budget: "entry.1125694873",
  contactMethod: "entry.660872446",
  message: "entry.1190063791",
};

export async function onRequestPost({ request }) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body" }, 400);
  }

  const params = new URLSearchParams();
  for (const [fieldName, entryId] of Object.entries(ENTRIES)) {
    const value = payload[fieldName];
    params.append(entryId, value == null ? "" : String(value));
  }

  try {
    const googleResponse = await fetch(FORM_ACTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // A normal browser UA occasionally helps avoid Google treating
        // the request as bot traffic.
        "User-Agent": "Mozilla/5.0 (compatible; UrbanSaharaLeadForm/1.0)",
      },
      body: params.toString(),
      redirect: "follow",
    });

    // Google's /formResponse returns a 200 HTML confirmation page on
    // success. Non-2xx (e.g. 401 if the form requires sign-in, or a
    // captcha challenge page) means it was rejected.
    if (googleResponse.ok) {
      return json({ ok: true });
    }

    return json(
      { ok: false, error: `Google Forms rejected the submission (status ${googleResponse.status})` },
      502
    );
  } catch (err) {
    return json({ ok: false, error: "Could not reach Google Forms" }, 502);
  }
}

// Reject non-POST methods explicitly rather than falling through.
export async function onRequestGet() {
  return json({ ok: false, error: "Method not allowed" }, 405);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}