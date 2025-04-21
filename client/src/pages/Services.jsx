import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '/register',
    price: { monthly: '$29' },
    description: 'Perfect for beginners looking to grow their social media presence.',
    features: [
      '1000 followers per month',
      '500 likes per post',
      'Basic analytics dashboard',
      'Email support',
      '24/7 customer service'
    ],
    featured: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '/register',
    price: { monthly: '$59' },
    description: 'Ideal for influencers and growing brands.',
    features: [
      '5000 followers per month',
      '2000 likes per post',
      'Advanced analytics dashboard',
      'Priority email & chat support',
      'Content scheduling',
      'Engagement tracking',
      'Multi-platform management'
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/register',
    price: { monthly: '$99' },
    description: 'For businesses requiring maximum social media impact.',
    features: [
      '15000 followers per month',
      '5000 likes per post',
      'Premium analytics suite',
      'Dedicated account manager',
      'Custom engagement strategy',
      'Content creation assistance',
      'Competitor analysis',
      'ROI reporting'
    ],
    featured: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Services() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the perfect plan for your needs
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Select from our range of comprehensive SMM packages designed to boost your social media presence and engagement.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                tierIdx === 0 ? 'lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-primary-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <p className="rounded-full bg-primary-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-600">
                      Most popular
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500'
                    : 'text-primary-600 ring-1 ring-inset ring-primary-200 hover:ring-primary-300',
                  'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                )}
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
