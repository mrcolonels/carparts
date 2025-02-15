"use client"

import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false)

  const productCategories = [
    {
      title: '机油滤清器',
      items: [
        { name: '乘用车系列', href: '/products/oil-filter/passenger' },
        { name: '商用车系列', href: '/products/oil-filter/commercial' },
        { name: '重型车系列', href: '/products/oil-filter/heavy-duty' },
      ]
    },
    {
      title: '空气滤清器',
      items: [
        { name: '标准型', href: '/products/air-filter/standard' },
        { name: '高性能型', href: '/products/air-filter/performance' },
        { name: '工业用途', href: '/products/air-filter/industrial' },
      ]
    },
    {
      title: '燃油滤清器',
      items: [
        { name: '汽油车型', href: '/products/fuel-filter/gasoline' },
        { name: '柴油车型', href: '/products/fuel-filter/diesel' },
        { name: '通用系列', href: '/products/fuel-filter/universal' },
      ]
    }
  ]

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              AutoFilter Pro
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            <div className="relative group">
              <button
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 py-2"
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => setIsProductMenuOpen(false)}
              >
                <span>产品系列</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProductMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* 二级菜单 */}
              <div
                className={`absolute -left-1/2 mt-0 w-[600px] bg-white rounded-lg shadow-lg transition-all duration-300 transform origin-top z-50 ${
                  isProductMenuOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => setIsProductMenuOpen(false)}
              >
                <div className="grid grid-cols-3 gap-8 p-6">
                  {productCategories.map((category) => (
                    <div key={category.title} className="relative">
                      <h3 className="text-gray-900 font-semibold mb-2">
                        {category.title}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="text-gray-600 hover:text-blue-600 block transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              关于我们
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 