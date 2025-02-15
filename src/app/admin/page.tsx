"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AdminProductDialog from '@/components/AdminProductDialog'
import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import EditProductDialog from '@/components/EditProductDialog'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  description: string
  price: string
  imageUrl: string
  createdAt?: string
  updatedAt?: string
}

const AdminPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isAuthenticated) {
      fetchProducts()
    }
  }, [mounted, isAuthenticated])

  const fetchProducts = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('获取产品列表失败')
      }
      const data = await response.json()
      // 确保 data 是数组
      if (!Array.isArray(data)) {
        throw new Error('返回数据格式错误')
      }
      setProducts(data)
    } catch (error) {
      console.error('获取产品列表失败:', error)
      setError(error instanceof Error ? error.message : '获取产品列表失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 添加产品
  const handleAddProduct = async (data: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '添加产品失败')
      }

      const newProduct = await response.json()
      setProducts([newProduct, ...products])
      setIsDialogOpen(false)
    } catch (error) {
      console.error('添加产品失败:', error)
      alert(error instanceof Error ? error.message : '添加产品失败，请重试')
    }
  }

  // 删除产品
  const handleDeleteProduct = async (id: string) => {
    if (confirm('确定要删除这个产品吗？')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          setProducts(products.filter(product => product._id !== id))
        } else {
          throw new Error('删除产品失败')
        }
      } catch (error) {
        console.error('删除产品失败:', error)
        alert('删除产品失败，请重试')
      }
    }
  }

  // 添加编辑处理函数
  const handleEditProduct = async (data: Omit<Product, '_id'>) => {
    if (!editingProduct) return

    try {
      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '更新产品失败')
      }

      const updatedProduct = await response.json()
      setProducts(products.map(p => 
        p._id === updatedProduct._id ? updatedProduct : p
      ))
      setIsEditDialogOpen(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('更新产品失败:', error)
      alert(error instanceof Error ? error.message : '更新产品失败，请重试')
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (!mounted) {
    return null // 或者返回一个加载指示器
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 添加顶部导航栏 */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>返回首页</span>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 flex items-center space-x-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>退出登录</span>
          </button>
        </div>

        {/* 标题和添加按钮 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>新增产品</span>
          </button>
        </div>

        {/* 产品列表 */}
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-[auto,1fr,1fr,auto,auto] gap-4 p-4 border-b bg-gray-50 font-medium text-gray-900">
            <div className="w-20">图片</div>
            <div>产品名称</div>
            <div>产品简介</div>
            <div>价格</div>
            <div>操作</div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">加载中...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">暂无产品</div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-[auto,1fr,1fr,auto,auto] gap-4 p-4 border-b items-center text-gray-900"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={product.imageUrl.startsWith('http') 
                      ? product.imageUrl 
                      : `/${product.imageUrl}`}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="font-medium">{product.name}</div>
                <div>{product.description}</div>
                <div className="font-medium text-blue-600">{product.price}</div>
                <div>
                  <button
                    onClick={() => {
                      setEditingProduct(product)
                      setIsEditDialogOpen(true)
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium mr-4"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AdminProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddProduct}
      />

      {editingProduct && (
        <EditProductDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setEditingProduct(null)
          }}
          onSubmit={handleEditProduct}
          product={editingProduct}
        />
      )}
    </div>
  )
}

export default AdminPage 