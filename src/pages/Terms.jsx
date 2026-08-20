import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import { COMPANY } from '../data/company'

// Standard-form terms of service, including an investment risk disclosure —
// standard practice whenever a site discusses returns, cashback, or yield.
// This is reference content, not legal advice — have it reviewed by counsel
// (and, if applicable, checked against RERA and other real estate
// regulations) before treating it as final.
export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="29 July 2026"
      description="The terms governing use of the ETOR Group website and investment programme, including the Investment & Risk Disclosure covering cashback and return claims."
      path="/terms"
    >
      <p>
        These Terms of Service govern your use of {COMPANY.website} (the "Site"), operated by ETOR Group. By
        using the Site, you agree to these terms. If you don't agree, please don't use the Site.
      </p>

      <h2>Investment &amp; Risk Disclosure</h2>
      <div className="callout">
        <p>
          Content on this Site — including descriptions of packages, cashback terms, yield potential, and returns —
          is provided for general informational purposes only and does not constitute financial, investment, legal,
          or tax advice.
        </p>
        <p>
          All investments carry risk. Figures such as projected yield, cashback timelines, and returns describe the
          terms of the offer as we intend to deliver them, not a guarantee of performance, and past or projected
          performance is not a reliable indicator of future results. Before investing, please read the full terms
          of your specific package agreement and seek independent financial advice if you are unsure whether an
          investment is right for you.
        </p>
      </div>

      <h2>Use of the Site</h2>
      <ul>
        <li>You may browse the Site and use the contact and enquiry tools for legitimate business purposes.</li>
        <li>
          You agree not to misuse the Site — including attempting to disrupt it, scrape it at scale, or submit
          false information through our forms.
        </li>
        <li>
          Nothing on this Site constitutes an offer capable of acceptance; a binding agreement for any package
          exists only once you've signed a separate, formal investment agreement with us.
        </li>
      </ul>

      <h2>Accuracy of Information</h2>
      <p>
        We work to keep pricing, acreage, and package details accurate and up to date, but availability, pricing,
        and terms are subject to change without notice, and any discrepancy is governed by your formal package
        agreement, not by this website's marketing copy.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The text, photography, logos, and design of this Site belong to ETOR Group unless otherwise credited, and
        may not be reproduced without our written permission.
      </p>

      <h2>Third-Party Links &amp; Services</h2>
      <p>
        This Site links to or uses third-party services (including EmailJS and Tawk.to) for contact forms and live
        chat. We aren't responsible for the content or practices of third-party services outside of what's
        described in our <Link to="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, ETOR Group is not liable for any indirect, incidental, or
        consequential loss arising from your use of this Site or reliance on information published on it. This
        does not limit any liability that cannot be excluded under applicable law.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of India, and any dispute arising from them is subject to the
        jurisdiction of the courts in Visakhapatnam, Andhra Pradesh.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these terms from time to time. Material changes will update the "Last updated" date at the
        top of this page.
      </p>

      <h2>Contact Us</h2>
      <div className="callout">
        <p>
          <strong>{COMPANY.addressLines.join(', ')}</strong>
        </p>
        <p>
          {COMPANY.phone} · <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </p>
      </div>
    </LegalPage>
  )
}
