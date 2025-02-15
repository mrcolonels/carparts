"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import FadeIn from './FadeIn'

interface Product {
  _id: string
  name: string
  description: string
  price: string
  imageUrl: string
}

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/latest-products')
        if (!response.ok) {
          throw new Error('获取产品失败')
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('获取产品失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">最新产品</h2>
          </div>
        </FadeIn>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <FadeIn key={product._id} delay={index * 200}>
                <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50 h-full flex flex-col cursor-pointer">
                  <div className="relative w-full pt-[75%] rounded-t-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product.imageUrl.startsWith('http') 
                        ? product.imageUrl 
                        : `/${product.imageUrl}`}
                      alt={product.name}
                      fill
                      className="absolute inset-0 object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 flex-1 group-hover:text-gray-600 transition-colors duration-300">
                      {product.description}
                    </p>
                    <p className="mt-4 text-lg font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      {product.price}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 