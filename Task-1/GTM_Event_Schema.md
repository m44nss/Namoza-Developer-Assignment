# Task 1 - Google Tag Manager (GTM) Event Schema

## Objective

OrthoNow currently has minimal analytics tracking, making it difficult to measure user behavior, campaign effectiveness, and appointment conversions. The objective of this GTM implementation is to establish a structured event tracking framework that enables accurate reporting in Google Analytics 4 (GA4), supports conversion optimization in Google Ads, and provides actionable insights into the patient journey.

---

# Tracking Strategy

The proposed tracking strategy focuses on capturing meaningful user interactions throughout the website. Events have been designed around business objectives rather than simply tracking clicks.

The implementation follows these principles:

- Track every important patient interaction.
- Capture enough contextual information to support reporting.
- Maintain consistent event naming across the website.
- Avoid sending Personally Identifiable Information (PII) such as patient names or phone numbers to GA4.
- Support future scalability for remarketing and advanced analytics.

---

# GTM Event Schema

| Event Name | Trigger Type | Key Parameters | GA4 Report / Audience | Business Purpose |
|------------|-------------|---------------|----------------------|------------------|
| consultation_form_started | Custom Event | page_location, clinic_location, source, device_type, session_id | Funnel Exploration | Measure users entering consultation funnel |
| booking_step_complete | Custom Event | step_number, step_name, clinic_location, specialty, session_id | Funnel Exploration | Measure drop-off between booking steps |
| consultation_form_submitted | Custom Event | clinic_location, specialty, booking_status, source, session_id | Conversions | Primary business conversion |
| call_button_clicked | Click Trigger | phone_number, page_location, clinic_location, click_text, device_type | Engagement Report | Track phone enquiries |
| whatsapp_chat_opened | Click Trigger | whatsapp_number, page_location, clinic_location, source, device_type | Engagement Report | Measure WhatsApp enquiries |
| patient_guide_form_started | Form Interaction | page_location, guide_name, source, session_id, device_type | Funnel Exploration | Measure interest in downloadable guide |
| patient_guide_downloaded | Custom Event | guide_name, clinic_location, source, session_id, device_type | Conversion Report | Measure successful lead generation |
| clinic_page_viewed | Page View | clinic_location, city, page_title, source, device_type | Pages & Screens | Compare interest across clinic locations |
| blog_scroll_depth | Scroll Trigger | article_title, scroll_percentage, category, author, session_id | Engagement Report | Measure content engagement |
| blog_article_completed | Scroll Trigger | article_title, reading_time, category, source, session_id | Engaged Users Audience | Identify highly engaged readers |

---

# Event Naming Convention

To ensure consistency and maintainability, all events follow Google's recommended naming convention:

- Use lowercase letters
- Separate words using underscores
- Use action-based names
- Keep names descriptive but concise

Examples:

- consultation_form_started
- booking_step_complete
- consultation_form_submitted
- whatsapp_chat_opened
- patient_guide_downloaded

---

# Common Event Parameters

The following parameters are reused across multiple events to maintain consistency in reporting.

| Parameter | Description |
|------------|-------------|
| page_location | Current page URL |
| page_title | Current page title |
| clinic_location | Selected clinic |
| specialty | Selected orthopaedic specialty |
| source | Traffic source |
| medium | Traffic medium |
| device_type | Desktop / Mobile / Tablet |
| session_id | GA4 Session Identifier |
| timestamp | Event timestamp |

---

# Business Value

This tracking framework enables the marketing and analytics teams to:

- Measure the complete consultation booking funnel.
- Identify booking drop-off points.
- Compare enquiry volume across clinics.
- Understand which marketing channels generate qualified leads.
- Build remarketing audiences based on user behaviour.
- Optimize Google Ads campaigns using high-quality conversion events.

---

# Recommended Google Ads Conversion

The recommended conversion event for import into Google Ads is:

**consultation_form_submitted**

### Why?

This event represents a completed patient enquiry rather than an intent signal. Optimizing campaigns for completed consultation requests ensures Google's bidding algorithm focuses on generating qualified leads instead of lower-value interactions such as button clicks or page views.

---

# Future Enhancements

If this implementation were expanded beyond the initial project scope, the following enhancements are recommended:

- Server-side Google Tag Manager
- Enhanced Conversions for Google Ads
- Form error tracking
- UTM parameter persistence
- Cross-domain tracking (if online payments are introduced)
- Consent Mode V2 implementation
- Custom dashboards using Looker Studio
