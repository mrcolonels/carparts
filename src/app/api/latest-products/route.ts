import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// GET /api/latest-products - 获取最新产品
export async function GET() {
  try {
    await connectDB()
    // 修改为获取最新的3个产品
    const products = await Product.find({})
      .sort({ createdAt: -1 }) // 按创建时间倒序
      .limit(3)               // 限制为3个
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: '获取产品列表失败' },
      { status: 500 }
    )
  }
} 