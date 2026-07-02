# Task 03 – CRM Integration Design

## End-to-End Integration Architecture

For this implementation, I would use a **custom landing page with a Node.js (Express) backend**, integrated directly with the **HubSpot CRM API**, **Karix WhatsApp Business API**, and **Google Ads Conversion Tracking**.

### Architecture Flow

```text
Patient
   │
   ▼
Landing Page (HTML/CSS/JavaScript)
   │
Client-side Form Validation
   │
   ▼
Node.js Backend (Express API)
   │
Validate & Sanitize Input
   │
Search HubSpot Contact by Phone Number
   │
 ┌───────────────┴───────────────┐
 │                               │
Phone Exists                Phone Not Found
 │                               │
 ▼                               ▼
Update Contact             Create Contact
 │
 ▼
Set:
• Name
• Phone
• Clinic Preference
• Source = Google Ads - Consultation Landing Page
• Lead Status = New Enquiry
 │
 ├──────────────► Fire Google Ads Conversion
 │
 ├──────────────► Send WhatsApp via Karix API
 │
 ▼
Return Success Response to Landing Page
```

### Technology Choice

I chose a **direct API integration** instead of HubSpot's native form embed, Zapier, or Make because the landing page is fully custom and requires complete control over validation, tracking, and CRM logic.

A backend API keeps all credentials secure, allows custom business logic, and makes the system easier to scale. It also provides better control over error handling and monitoring compared to no-code automation platforms.

---

## Biggest Failure Point

The biggest risk is **duplicate contact creation in HubSpot**.

HubSpot performs duplicate detection primarily using **email address**, but this landing page only collects a **phone number**. If the integration simply creates a new contact every time, duplicate patient records may be created.

To avoid this, the backend should first search HubSpot using the submitted phone number.

- If a matching phone number exists → Update the existing contact.
- If no record exists → Create a new contact.

This ensures clean CRM data and prevents duplicate patient records.

If HubSpot is temporarily unavailable, the lead should be stored in a retry queue or temporary database and automatically retried until the contact is successfully created.

---

## WhatsApp SLA (Within 2 Minutes)

The WhatsApp confirmation is sent immediately after the HubSpot operation completes using the **Karix WhatsApp Business API**.

Possible causes of delay include:

- HubSpot API timeout
- Karix API failure
- Backend server downtime
- Network issues
- High traffic causing queued requests

To maintain the 2-minute SLA, I would implement:

- API request logging
- Automatic retry mechanism for failed requests
- Queue monitoring
- Response time dashboard
- Alerts if message delivery exceeds 2 minutes

This approach ensures that patient enquiries are captured reliably, CRM data remains accurate, WhatsApp confirmations are delivered on time, and Google Ads receives successful conversion events for campaign optimisation.