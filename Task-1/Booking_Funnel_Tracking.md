# Task 1 - Booking Funnel Tracking

## Objective

The OrthoNow consultation booking form consists of three sequential steps. To understand where potential patients abandon the booking journey, each completed step should generate a custom event that Google Tag Manager (GTM) can capture and forward to Google Analytics 4 (GA4).

Since GTM cannot automatically detect progress within custom multi-step forms, the front-end application must explicitly push events into the `window.dataLayer` whenever a user successfully completes a step.

---

# Booking Funnel

```

Booking Started

↓

Step 1
Select Clinic & Specialty

↓

Step 2
Enter Patient Details

↓

Step 3
Confirm Booking

↓

Booking Submitted

```

---

# Step 1 Tracking

## Trigger

The event fires after the user successfully selects both:

- Clinic Location
- Orthopaedic Specialty

and clicks **Continue**.

### dataLayer Push

```javascript
window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: "booking_step_complete",
  step_number: 1,
  step_name: "location_specialty_selected",
  clinic_location: "Indiranagar",
  specialty: "Knee Pain",
  page_location: window.location.pathname,
  timestamp: new Date().toISOString()
});
```

---

# Step 2 Tracking

## Trigger

The event fires after the patient enters:

- Name
- Phone Number
- Preferred Consultation Date

and clicks **Continue**.

> **Important:** Although the form collects Name and Phone Number, these values should **not** be sent to GA4 because they are Personally Identifiable Information (PII).

### dataLayer Push

```javascript
window.dataLayer.push({
  event: "booking_step_complete",
  step_number: 2,
  step_name: "patient_details_entered",
  clinic_location: "Indiranagar",
  specialty: "Knee Pain",
  preferred_date: "2026-07-03",
  page_location: window.location.pathname,
  timestamp: new Date().toISOString()
});
```

---

# Step 3 Tracking

## Trigger

The event fires after the patient reviews all entered details and confirms the appointment.

### dataLayer Push

```javascript
window.dataLayer.push({
  event: "booking_step_complete",
  step_number: 3,
  step_name: "booking_confirmed",
  clinic_location: "Indiranagar",
  specialty: "Knee Pain",
  booking_status: "confirmed",
  page_location: window.location.pathname,
  timestamp: new Date().toISOString()
});
```

---

# Final Conversion Event

After the booking is successfully submitted, a separate event is fired.

This event represents the actual business conversion.

```javascript
window.dataLayer.push({
  event: "consultation_form_submitted",
  clinic_location: "Indiranagar",
  specialty: "Knee Pain",
  booking_status: "success",
  appointment_type: "consultation",
  page_location: window.location.pathname,
  timestamp: new Date().toISOString()
});
```

---

# Google Tag Manager Configuration

## Trigger 1

**Type**

Custom Event

**Event Name**

```
booking_step_complete
```

This trigger activates a GA4 Event Tag that sends:

- step_number
- step_name
- clinic_location
- specialty
- booking_status

to Google Analytics 4.

---

## Trigger 2

**Type**

Custom Event

**Event Name**

```
consultation_form_submitted
```

This event is marked as a **Conversion** in Google Analytics 4 and imported into Google Ads for campaign optimization.

---

# GA4 Funnel Exploration

A Funnel Exploration report can be created in GA4 using the following sequence.

| Funnel Step | Event |
|-------------|-------|
| Step 1 | booking_step_complete (step_number = 1) |
| Step 2 | booking_step_complete (step_number = 2) |
| Step 3 | booking_step_complete (step_number = 3) |
| Conversion | consultation_form_submitted |

This allows the marketing team to identify where users abandon the booking journey and optimize the highest drop-off step.

---

# Why Custom dataLayer Events?

Google Tag Manager cannot automatically determine when a user progresses through a custom multi-step booking form.

Instead, the front-end developer should push custom events to the `window.dataLayer` after each successful step. GTM listens for these custom events and forwards them to GA4.

This approach provides accurate funnel tracking, cleaner analytics, and greater flexibility for future enhancements.

---

# Recommended Google Ads Conversion

The conversion imported into Google Ads should be:

```
consultation_form_submitted
```

### Justification

This event represents a completed consultation request and is therefore the highest-value business outcome.

Using button clicks or WhatsApp opens as optimization goals may encourage Google Ads to maximize low-quality interactions instead of genuine patient enquiries.

Optimizing for completed consultation requests improves lead quality and aligns advertising performance with business objectives.

---

# Developer Notes

If I were implementing this in a production environment, I would:

- Ask the front-end team to trigger each `dataLayer.push()` immediately after successful validation of each booking step.
- Ensure that no Personally Identifiable Information (PII) such as patient names or phone numbers is sent to Google Analytics.
- Validate all events using GTM Preview Mode and GA4 DebugView before deployment.
- Document every event and parameter to maintain consistency across future website updates.