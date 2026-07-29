// Real per-package pricing — from Welcome-To-ETOR-GROUP.pdf and the ETOR
// City site photography (see Projects.jsx). Used by the investment
// calculator so its numbers stay a single source of truth with the package
// cards themselves.
export const PACKAGES = [
  { id: 'city-1', name: 'ETOR City 1', pricePerSqYd: 3999, statedYield: '3 Crores' },
  { id: 'city-2', name: 'ETOR City 2', pricePerSqYd: 3999, statedYield: '3 Crores' },
  { id: 'city-3-4', name: 'ETOR City 3 & 4', pricePerSqYd: 4999, statedYield: '3 Crores' },
]

// The only two numbers the calculator computes are directly derived from
// this — ETOR Group's own stated cashback term — never an invented rate.
export const CASHBACK_MONTHS = 100
