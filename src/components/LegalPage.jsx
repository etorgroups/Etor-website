import Reveal from './Reveal'
import Eyebrow from './Eyebrow'
import SEO, { buildBreadcrumbs } from './SEO'

// Shared prose layout for Privacy Policy / Terms of Service — deliberately
// restrained (no imagery, no heavy motion) since this is reference content
// people scan for a specific clause, not a page they browse.
export default function LegalPage({ title, updated, description, path, children }) {
  return (
    <div className="flex flex-col w-full">
      {description && path && (
        <SEO title={title} description={description} path={path} schema={buildBreadcrumbs([{ name: title, path }])} />
      )}
      <section className="bg-primary py-xl">
        <Reveal tag="div" className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Eyebrow tone="dark">Legal</Eyebrow>
          <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-on-primary mt-md mb-sm">
            {title}
          </h1>
          <p className="font-body text-body-sm text-on-primary/60">Last updated {updated}</p>
        </Reveal>
      </section>

      <section className="py-xl bg-background">
        <div className="max-w-[42rem] mx-auto px-margin-mobile lg:px-0 legal-prose">{children}</div>
      </section>
    </div>
  )
}
