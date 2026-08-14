// Tawk.to live chat config.
//
// To activate: go to tawk.to dashboard > Administration > Channels > Chat
// Widget, open your widget, and copy the embed URL — it looks like
// https://embed.tawk.to/507f1f77bcf86cd799439011/default
// The first segment is your Property ID, the second is your Widget ID.
// Paste them below. Until you do, the Chat button stays visible but the
// live widget will not load (safe no-op — no broken network requests).
export const TAWK_PROPERTY_ID = '6a13d5bc83cf321c3962e34c'
export const TAWK_WIDGET_ID = '1jpenlr2g'

export const isTawkConfigured = TAWK_PROPERTY_ID !== 'YOUR_TAWK_PROPERTY_ID'
