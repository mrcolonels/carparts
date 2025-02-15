"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import FadeIn from './FadeIn'

interface Product {
  _id: string
  name: string
  description: string
  price: string
  imageUrl: string
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const slides = [
    {
      image: '/hero-filter.jpg',
      title: '专业的汽车过滤系统解决方案',
      description: '提供高品质机油滤清器、空气滤清器、燃油滤清器等全系列产品，为您的爱车提供最佳保护。'
    },
    {
      image: '/oil-filter.jpg',
      title: '优质机油滤清器',
      description: '采用先进过滤技术，有效过滤发动机油污，延长发动机使用寿命。'
    },
    {
      image: '/air-filter.jpg',
      title: '高效空气滤清器',
      description: '确保发动机呼吸清洁空气，提升发动机性能，降低油耗。'
    }
  ]

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[85vh] overflow-hidden">
      {/* 图片容器放在最底层 */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt="汽车滤清器"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* 渐变遮罩作为单独的层 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

      {/* 内容层 - 包含文字和导航点 */}
      <div className="relative h-full z-30">
        {/* 文字内容 - 增加最大宽度 */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-full">
            <div className="max-w-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    currentSlide === index
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  } ${index !== currentSlide ? 'absolute' : 'relative'}`}
                >
                  <FadeIn delay={200}>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                  </FadeIn>
                  <FadeIn delay={400}>
                    <p className="text-lg text-gray-200 mb-8">
                      {slide.description}
                    </p>
                  </FadeIn>
                  <FadeIn delay={600}>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200">
                      了解更多
                    </button>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 导航点 */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`切换到第 ${index + 1} 张幻灯片`}
            />
          ))}
        </div>
      </div>

      {/* 产品展示部分 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">最新产品</h2>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <Image
                    src={product.imageUrl.startsWith('http') 
                      ? product.imageUrl 
                      : `/${product.imageUrl}`}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-2 text-lg font-medium text-blue-600">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero 