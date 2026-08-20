// Tawk.to live chat config.
//
// To activate: go to tawk.to dashboard > Administration > Channels > Chat
// Widget, open your widget, and copy the embed URL — it looks like
// https://embed.tawk.to/507f1f77bcf86cd799439011/default
// The first segment is your Property ID, the second is your Widget ID.
// Paste them below. Until you do, the Chat button stays visible but the
// live widget will not load (safe no-op — no broken network requests).
export const TAWK_PROPERTY_ID = '68f9db9d4827441952d38d7e'
export const TAWK_WIDGET_ID = '1j8803on0'

export const isTawkConfigured = TAWK_PROPERTY_ID !== 'YOUR_TAWK_PROPERTY_ID'
