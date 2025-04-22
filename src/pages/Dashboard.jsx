import { useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon, CursorArrowRaysIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline'

const stats = [
  { id: 1, name: 'Total Followers', stat: '71,897', icon: UsersIcon, change: '12%', changeType: 'increase' },
  { id: 2, name: 'Engagement Rate', stat: '58.16%', icon: HeartIcon, change: '2.02%', changeType: 'increase' },
  { id: 3, name: 'Click Rate', stat: '24.57%', icon: CursorArrowRaysIcon, change: '4.05%', changeType: 'decrease' },
]

const activeServices = [
  {
    id: 1,
    name: 'Instagram Growth',
    status: 'Active',
    progress: 75,
    startDate: '2023-01-01',
    endDate: '2024-01-01',
  },
  {
    id: 2,
    name: 'Twitter Engagement',
    status: 'Active',
    progress: 45,
    startDate: '2023-06-01',
    endDate: '2024-06-01',
  },
  {
    id: 3,
    name: 'Facebook Likes',
    status: 'Paused',
    progress: 60,
    startDate: '2023-03-15',
    endDate: '2024-03-15',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Active Services */}
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-base font-semibold leading-6 text-gray-900">Active Services</h2>
            <p className="mt-2 text-sm text-gray-700">
              A list of all your active social media management services and their current status.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="btn-primary"
            >
              Add service
            </button>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Service
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Progress
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Start Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {activeServices.map((service) => (
                      <tr key={service.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {service.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={classNames(
                              service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                              'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                            )}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-48 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-primary-600 h-2.5 rounded-full"
                                style={{ width: `${service.progress}%` }}
                              ></div>
                            </div>
                            <span className="ml-2">{service.progress}%</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{service.startDate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{service.endDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}