// Default coordinates used for every plot page's "Directions" button until
// real per-layout/per-city coordinates are provided. Once a specific
// layout/city's real location comes in, set a `directionsUrl` on that
// layout entry (src/data/layouts.js) or city entry (CITY_META in
// src/data/plotMap.js) to override this default — no component changes
// needed.
//
// Uses Google Maps' documented directions URL scheme (destination only, no
// origin) so it always routes from the visitor's current location to the
// destination coordinates below: https://developers.google.com/maps/documentation/urls/get-started#directions-action
const DEFAULT_LAT = 19.102713
const DEFAULT_LNG = 84.711864
export const DEFAULT_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${DEFAULT_LAT},${DEFAULT_LNG}`
