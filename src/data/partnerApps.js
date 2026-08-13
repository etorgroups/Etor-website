// The site's "login" entry points split by audience, not just by app name:
// plot buyers (customers) only ever need one destination, so that's a
// single direct link in the header, not a menu to choose from. FarmYieldIQ
// and CalviQ are internal/company-side tools that trained staff already
// know how to reach — they live in the footer instead, out of the way of
// the customer-facing CTA.
export const CUSTOMER_LOGIN = {
  label: 'My Investment',
  href: 'https://impacgo-solutions.github.io/FarmYieldIQ-partner/',
}

export const COMPANY_APPS = [
  {
    name: 'FarmYieldIQ',
    description: 'Plantation & crop yield portal',
    href: 'https://farmyieldiq.impacgo.com/',
  },
  {
    name: 'CalviQ',
    description: 'Dairy & livestock portal',
    href: 'https://calviq.impacgo.com/#/login',
  },
  {
    name: 'RetailPos',
    description: 'Retail point-of-sale',
    href: 'https://impacgosolutions.github.io/impacgo-retail-frontend/',
  },
]
