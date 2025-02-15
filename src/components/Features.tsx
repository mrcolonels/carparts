export default function Features() {
  const features = [
    {
      title: '高品质材料',
      description: '采用优质过滤材料，确保最佳过滤效果',
      icon: '🔍'
    },
    {
      title: '专业技术',
      description: '运用先进过滤技术，提供卓越性能',
      icon: '⚡'
    },
    {
      title: '完善服务',
      description: '提供专业的技术支持和售后服务',
      icon: '🛠️'
    }
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          我们的优势
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 