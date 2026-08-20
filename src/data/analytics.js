// Analytics config — Google Analytics 4 + Microsoft Clarity.
//
// GA4: create a property at analytics.google.com, then Admin > Data Streams
// > your web stream > copy the Measurement ID (starts with "G-").
// Clarity: create a project at clarity.microsoft.com (free, no traffic cap),
// then Settings > Setup > copy the Project ID from the tracking snippet.
// Paste them below. Until you do, no analytics script loads at all — safe
// no-op, no network requests, nothing extra to disclose in Privacy Policy.
export const GA_MEASUREMENT_ID = 'G-SVGG64PJME'
export const CLARITY_PROJECT_ID = 'y58gj8l5bp'

export const isGaConfigured = GA_MEASUREMENT_ID !== 'YOUR_GA4_MEASUREMENT_ID'
export const isClarityConfigured = CLARITY_PROJECT_ID !== 'YOUR_CLARITY_PROJECT_ID'
