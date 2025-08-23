import Image from "next/image";
import ChatBot from "./components/ChatBot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-20 left-12 w-16 h-16 bg-orange-500 rounded"></div>
      <div className="absolute top-80 left-20 w-24 h-16 bg-pink-300 rounded"></div>
      <div className="absolute top-[500px] left-8 w-20 h-20 bg-yellow-400 rounded"></div>
      <div className="absolute top-32 right-20 w-20 h-20 bg-cyan-200 rounded"></div>
      <div className="absolute top-[400px] right-32 w-24 h-16 bg-pink-300 rounded"></div>
      <div className="absolute top-[600px] right-12 w-16 h-16 bg-yellow-400 rounded"></div>
      <div className="absolute bottom-32 right-40 w-20 h-20 bg-cyan-200 rounded"></div>

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">⌘</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Adopt</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Product</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Solution</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Resources</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span className="text-gray-600">Pricing</span>
            <span className="text-gray-600">About Us</span>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">Login</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Request Demo
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Announcement banner */}
        <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg mb-12 text-center font-mono text-sm">
          THE FUTURE OF APPS JUST ACCELERATED: ADOPT AI DELIVERS ZERO-SHOT AGENTS, TODAY. →
        </div>

        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The Agentic Experience for<br />
            your Application
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Empower users to take action, automate workflows, and drive outcomes on your application - all through natural language commands.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
            Watch On-Demand Demo →
          </button>
        </div>

        {/* Blue section with logo and demo */}
        <div className="bg-blue-600 rounded-3xl px-12 py-16 text-center text-white relative overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet</h2>
          <div className="flex items-center justify-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">⌘</span>
            </div>
            <span className="text-4xl md:text-5xl font-bold">Adopt</span>
          </div>

          {/* Demo interface mockup */}
          <div className="relative max-w-6xl mx-auto">
            {/* 3D cubes with labels */}
            <div className="absolute top-12 left-16 perspective-1000">
              <div className="w-16 h-16 bg-blue-400 transform rotate-12 skew-y-12 relative">
                <div className="absolute -top-8 left-0 bg-white/20 rounded px-2 py-1 text-xs font-mono">APIS</div>
              </div>
            </div>
            
            <div className="absolute top-32 left-8 perspective-1000">
              <div className="w-16 h-16 bg-cyan-300 transform -rotate-12 skew-x-12 relative">
                <div className="absolute -bottom-8 left-0 bg-yellow-400 text-black rounded px-2 py-1 text-xs font-mono">WORKFLOW</div>
              </div>
            </div>

            <div className="absolute bottom-16 left-12 perspective-1000">
              <div className="w-16 h-16 bg-yellow-400 transform rotate-6 skew-y-6 relative">
                <div className="absolute -top-8 left-0 bg-yellow-400 text-black rounded px-2 py-1 text-xs font-mono">ENTITIES</div>
              </div>
            </div>

            <div className="absolute top-12 right-16 perspective-1000">
              <div className="w-16 h-16 bg-pink-400 transform -rotate-12 skew-y-12 relative">
                <div className="absolute -top-8 right-0 bg-pink-400 text-white rounded px-2 py-1 text-xs font-mono">UI</div>
              </div>
            </div>

            <div className="absolute bottom-20 right-16 perspective-1000">
              <div className="w-16 h-16 bg-orange-500 transform rotate-12 -skew-x-12 relative">
                <div className="absolute -bottom-8 right-0 bg-orange-500 text-white rounded px-2 py-1 text-xs font-mono">API</div>
              </div>
            </div>

            <div className="absolute top-40 right-8 perspective-1000">
              <div className="w-16 h-16 bg-pink-300 transform -rotate-6 skew-x-6 relative">
                <div className="absolute -top-8 right-0 bg-pink-300 text-black rounded px-2 py-1 text-xs font-mono">PERF</div>
              </div>
            </div>
            
            {/* Central demo area */}
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm relative z-10">
              <button className="bg-pink-400 text-white rounded-lg px-6 py-3 mb-6 flex items-center space-x-2 mx-auto">
                <span>▶</span>
                <span>Watch Video</span>
              </button>
              <div className="text-lg font-medium mb-6">Acme Copilot</div>
              
              {/* Agent interface */}
              <div className="bg-white/90 text-black rounded-lg p-6 max-w-md mx-auto">
                <div className="text-left mb-4">
                  <h3 className="text-xl font-semibold text-blue-600 mb-1">Welcome, Garrett!</h3>
                  <p className="text-sm text-gray-600">to your Agent command center</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <input 
                    type="text" 
                    placeholder="What do you want to do?" 
                    className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                  />
                  <div className="flex justify-end mt-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Central avatar */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
            </div>

            {/* Dotted connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 1}}>
              <defs>
                <pattern id="connectionDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle fill="rgba(255,255,255,0.3)" cx="4" cy="4" r="1"/>
                </pattern>
              </defs>
              {/* Connection lines from cubes to center */}
              <path d="M 100 100 Q 300 200 400 300" stroke="url(#connectionDots)" strokeWidth="2" fill="none" strokeDasharray="2,4"/>
              <path d="M 600 100 Q 500 200 400 300" stroke="url(#connectionDots)" strokeWidth="2" fill="none" strokeDasharray="2,4"/>
              <path d="M 100 400 Q 250 350 400 300" stroke="url(#connectionDots)" strokeWidth="2" fill="none" strokeDasharray="2,4"/>
              <path d="M 600 400 Q 500 350 400 300" stroke="url(#connectionDots)" strokeWidth="2" fill="none" strokeDasharray="2,4"/>
            </svg>
          </div>

          {/* Background pattern */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 0}}>
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle fill="rgba(255,255,255,0.05)" cx="10" cy="10" r="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Trusted by section */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 text-lg mb-8">Trusted by the best</p>
          <div className="flex items-center justify-center space-x-12 opacity-60 grayscale">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded"></div>
              <span className="text-xl font-semibold text-gray-800">truefoundry</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <span className="text-xl font-semibold text-gray-800">Spendflo</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">moengage</div>
            <div className="flex items-center space-x-1">
              <span className="text-xl font-semibold text-gray-800">6sense</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <div className="text-xl font-semibold text-gray-800">&gt;&gt; rocketlane</div>
            <div className="text-xl font-semibold text-gray-800">zluri</div>
          </div>
        </div>
      </main>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
}
