import { Github, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logoImage from '../assets/logo.png'

interface WelcomePageProps {
    githubUrl?: string
}

export default function WelcomePage({ githubUrl = 'https://github.com' }: WelcomePageProps) {
    const navigate = useNavigate()

    return (
        <div className="fixed inset-0 bg-[#e0e5ec] overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex flex-col items-center justify-center p-6 sm:p-12 lg:p-8 py-8 lg:py-4">

                {/* Hero Section - Logo + Title */}
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mb-6 lg:mb-8">
                    {/* Logo */}
                    <div
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[#e0e5ec] rounded-3xl flex items-center justify-center relative overflow-hidden flex-shrink-0"
                        style={{
                            boxShadow: '12px 12px 24px #a3b1c6, -12px -12px 24px #ffffff'
                        }}
                    >
                        <img
                            src={logoImage}
                            alt="夯到拉 Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Title Section */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#5b8fb9] mb-2 lg:mb-3">
                            anyrange
                        </h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl text-[#7a9bb8] mb-2 font-semibold">
                            夯到拉 Tier List Maker
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-[#8fa8c0]">
                            从"夯"(最好) 到 "拉"(最差) · 拖拽式排行榜制作工具
                        </p>
                    </div>
                </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8 max-w-4xl w-full px-4 sm:px-0">
          <div 
            className="bg-[#e0e5ec] rounded-2xl p-5 lg:p-6 flex flex-col items-center text-center"
            style={{
              boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff'
            }}
          >
            <div className="text-3xl lg:text-4xl mb-2">🎯</div>
            <div className="text-base lg:text-lg text-[#5b8fb9] font-semibold">5级排行</div>
            <div className="text-sm text-[#8fa8c0] mt-1">精准分类体系</div>
          </div>
          
          <div 
            className="bg-[#e0e5ec] rounded-2xl p-5 lg:p-6 flex flex-col items-center text-center"
            style={{
              boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff'
            }}
          >
            <div className="text-3xl lg:text-4xl mb-2">✨</div>
            <div className="text-base lg:text-lg text-[#5b8fb9] font-semibold">拖拽操作</div>
            <div className="text-sm text-[#8fa8c0] mt-1">流畅触控体验</div>
          </div>
          
          <div 
            className="bg-[#e0e5ec] rounded-2xl p-5 lg:p-6 flex flex-col items-center text-center"
            style={{
              boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff'
            }}
          >
            <div className="text-3xl lg:text-4xl mb-2">📥</div>
            <div className="text-base lg:text-lg text-[#5b8fb9] font-semibold">一键导出</div>
            <div className="text-sm text-[#8fa8c0] mt-1">PNG · PDF格式</div>
          </div>
        </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-5 mb-5 lg:mb-6 max-w-lg px-4 sm:px-0">
                    <button
                        onClick={() => navigate('/app')}
                        className="bg-[#e0e5ec] text-[#5b8fb9] px-8 py-3 lg:py-4 rounded-2xl font-bold text-lg lg:text-xl flex items-center justify-center gap-3 transition-all hover:text-[#4a7a9e] group"
                        style={{
                            boxShadow: '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff'
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff'
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff'
                        }}
                    >
                        <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                        开始使用
                    </button>

                    <button
                        onClick={() => window.open(githubUrl, '_blank')}
                        className="bg-[#e0e5ec] text-[#5b8fb9] px-8 py-3 lg:py-4 rounded-2xl font-bold text-lg lg:text-xl flex items-center justify-center gap-3 transition-all hover:text-[#4a7a9e] group"
                        style={{
                            boxShadow: '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff'
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff'
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff'
                        }}
                    >
                        <Github size={24} className="group-hover:rotate-12 transition-transform" />
                        了解更多
                    </button>
                </div>

                {/* Footer */}
                <div className="space-y-1 text-center">
                    <p className="text-xs sm:text-sm lg:text-base text-[#a0b5ca]">
                        支持桌面端 · 移动端 · 原生应用
                    </p>
                </div>
            </div>
        </div>
    )
}
