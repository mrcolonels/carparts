import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// GET /api/products - 获取所有产品
export async function GET() {
  try {
    await connectDB()
    const products = await Product.find({}).sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    console.error('获取产品列表失败:', error)
    return NextResponse.json(
      { error: '获取产品列表失败' },
      { status: 500 }
    )
  }
}

// POST /api/products - 创建新产品
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 验证必填字段
    if (!body.name || !body.description || !body.price || !body.imageUrl) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      )
    }

    await connectDB()
    
    // 创建新产品
    const product = await Product.create({
      name: body.name,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('创建产品失败:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '创建产品失败' },
      { status: 500 }
    )
  }
} 