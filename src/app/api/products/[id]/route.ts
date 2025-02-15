import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// DELETE /api/products/[id] - 删除产品
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const product = await Product.findByIdAndDelete(params.id)
    if (!product) {
      return NextResponse.json(
        { error: '产品不存在' },
        { status: 404 }
      )
    }
    return NextResponse.json({ message: '删除成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '删除产品失败' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - 更新产品
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const product = await Product.findByIdAndUpdate(
      params.id,
      {
        name: body.name,
        description: body.description,
        price: body.price,
        imageUrl: body.imageUrl
      },
      { new: true }
    )

    if (!product) {
      return NextResponse.json(
        { error: '产品不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: '更新产品失败' },
      { status: 500 }
    )
  }
} 