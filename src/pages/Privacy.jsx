import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import { COMPANY } from '../data/company'

// Standard-form privacy policy for a small investment/real-estate company
// collecting only contact-form and newsletter data client-side (no backend
// database — see src/data/emailjs.js). This is reference content, not legal
// advice — have it reviewed by counsel before treating it as final.
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="29 July 2026"
      description="How ETOR Group collects, uses and protects the information you share through our website — contact form, newsletter signup, and site analytics."
      path="/privacy"
    >
      <p>
        This Privacy Policy explains how ETOR Group ("we", "us", "our") collects, uses, and protects information
        when you visit {COMPANY.website} or contact us through it. By using this website, you agree to the
        practices described below.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information only when you choose to give it to us. Specifically:</p>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, email address, phone number (optional), subject, and message
          when you submit an enquiry.
        </li>
        <li>
          <strong>Newsletter signup:</strong> your email address, if you choose to subscribe.
        </li>
        <li>
          <strong>Live chat:</strong> if you use our chat widget, your messages and any details you share in that
          conversation.
        </li>
        <li>
          <strong>Cookies and usage data:</strong> if you accept cookies, basic technical data such as browser
          type, device type, and pages visited, used only to understand how the site is used.
        </li>
      </ul>
      <p>We do not ask for or store payment details, government ID numbers, or bank account information on this website.</p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to enquiries submitted through the contact form or chat.</li>
        <li>To send newsletter updates, only to addresses that opted in, and only until you unsubscribe.</li>
        <li>To understand, in aggregate, how visitors use the site so we can improve it.</li>
      </ul>
      <p>We do not sell, rent, or trade your personal information to third parties.</p>

      <h2>Third-Party Services</h2>
      <p>
        This site has no backend database of its own. Form submissions and chat messages are instead processed
        directly by these third-party services, each governed by their own privacy policy:
      </p>
      <ul>
        <li>
          <strong>EmailJS</strong> — delivers contact form and newsletter submissions directly to our inbox.
        </li>
        <li>
          <strong>Tawk.to</strong> — powers our live chat widget, where enabled.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use a minimal set of cookies, and ask for your consent before setting anything beyond what's strictly
        necessary for the site to function. You can change your choice at any time by clearing your browser's
        site data for {COMPANY.website}.
      </p>

      <h2>Data Retention</h2>
      <p>
        We keep enquiry and newsletter data only as long as reasonably necessary to respond to you or maintain the
        subscription, and delete it on request (see below).
      </p>

      <h2>Your Rights</h2>
      <p>You can, at any time:</p>
      <ul>
        <li>Ask what information we hold about you.</li>
        <li>Ask us to correct or delete it.</li>
        <li>Unsubscribe from the newsletter using the link in any email we send.</li>
      </ul>
      <p>
        To exercise any of these, email us at{' '}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>

      <h2>Children's Privacy</h2>
      <p>This website is intended for adults evaluating investment opportunities and is not directed at children.</p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Material changes will update the "Last updated" date at the
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

      <p>
        See also our <Link to="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  )
}
