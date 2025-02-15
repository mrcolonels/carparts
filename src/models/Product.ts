import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '请输入产品名称'],
  },
  description: {
    type: String,
    required: [true, '请输入产品简介'],
  },
  price: {
    type: String,
    required: [true, '请输入产品价格'],
  },
  imageUrl: {
    type: String,
    required: [true, '请输入图片URL'],
  },
}, {
  timestamps: true,
})

export default mongoose.models.Product || mongoose.model('Product', productSchema) 