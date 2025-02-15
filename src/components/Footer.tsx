import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AutoFilter Pro</h3>
            <p className="text-gray-400">
              专业的汽车过滤系统解决方案提供商
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  产品系列
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <ul className="space-y-2 text-gray-400">
              <li>电话：400-888-8888</li>
              <li>邮箱：info@autofilter.com</li>
              <li>地址：上海市浦东新区XX路XX号</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">关注我们</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                微信
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                微博
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AutoFilter Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 