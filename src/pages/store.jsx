import { useState } from 'react';
import { Search, Bell, User, ChevronRight, Settings, LogOut, Star, Download } from 'lucide-react';

const Store = ({ darkMode }) => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const categories = ["All", "Business", "Productivity", "Communication", "Design", "Analytics"];
  
  const apps = [
    {
      id: 1,
      name: "AH-Digital Portal",
      description: "Access your digital workspace with enhanced productivity tools and team collaboration features.",
      rating: 4.8,
      downloads: "50K+",
      image: "/assets/logo.png",
      screenshots: [
        "./assets/screenshot1",
        "/assets/screenshot1",
        "/assets/screenshot1"
      ],
      category: "Business",
      featured: true
    },
    {
      id: 2,
      name: "AH-Analytics",
      description: "Visualize your business data with powerful analytics and custom reporting dashboards.",
      rating: 4.6,
      downloads: "30K+",
      image: "/assets/logo.png",
      screenshots: [
        "/api/placeholder/640/360",
        "/api/placeholder/640/360"
      ],
      category: "Analytics",
      featured: false
    },
    {
      id: 3,
      name: "AH-Connect",
      description: "Seamlessly connect with your team through secure messaging and video conferencing.",
      rating: 4.7,
      downloads: "45K+",
      image: "/assets/logo.png",
      screenshots: [
        "/api/placeholder/640/360",
        "/api/placeholder/640/360",
        "/api/placeholder/640/360"
      ],
      category: "Communication",
      featured: false
    },
    {
      id: 4,
      name: "AH-Project",
      description: "Manage your projects with an intuitive interface for task tracking and team coordination.",
      rating: 4.5,
      downloads: "25K+",
      image: "/assets/logo.png",
      screenshots: [
        "/api/placeholder/640/360",
        "/api/placeholder/640/360"
      ],
      category: "Business",
      featured: false
    }
  ];
  
  const featuredApps = apps.filter(app => app.featured);
  const popularApps = [...apps].sort((a, b) => b.rating - a.rating).slice(0, 4);
  
  const handleAppClick = (app) => {
    setSelectedApp(app);
  };
  
  const handleBackToApps = () => {
    setSelectedApp(null);
  };
  
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  
  const filteredApps = activeCategoryIndex === 0 
    ? apps 
    : apps.filter(app => app.category === categories[activeCategoryIndex]);
  
  const bgColor = darkMode ? "bg-[#2A3142]" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-[#2A3142]";
  const secondaryTextColor = darkMode ? "text-[#808487]" : "text-[#808487]";
  
  const Navbar = () => (
    <nav className={`${bgColor} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="AH Logo" className="w-10 h-10 rounded-md" />
          <span className={`ml-3 text-lg font-semibold ${textColor}`}>AH-Digital Store</span>
        </div>
        
        <div className="flex items-center space-x-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search apps..."
              className={`pl-10 pr-4 py-2 rounded-full text-sm border ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#5F9EE9]`}
            />
          </div>
          
          <div className="relative">
            <Bell size={20} className={`${secondaryTextColor} cursor-pointer hover:text-[#5F9EE9]`} />
            <span className="absolute -top-1 -right-1 bg-[#E9547B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </div>
          
          <div className="relative">
            <div 
              className="w-8 h-8 rounded-full bg-[#5F9EE9] flex items-center justify-center text-white cursor-pointer hover:bg-[#4A8BD6] transition-colors"
              onClick={toggleProfileDropdown}
            >
              <User size={18} />
            </div>
            
            {/* Profile*/}
            {showProfileDropdown && (
              <div className={`absolute right-0 mt-2 w-48 ${bgColor} rounded-md shadow-lg py-1 z-10 border ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'}`}>
                <div className={`px-4 py-2 border-b ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'}`}>
                  <p className={`text-sm font-medium ${textColor}`}> Amina </p>
                  <p className={`text-xs ${secondaryTextColor}`}>amina003@gmail.com</p>
                </div>
                <div className="py-1">
                  <button className={`flex items-center px-4 py-2 text-sm ${textColor} hover:${darkMode ? 'bg-[#5F9EE9]/10' : 'bg-gray-100'} w-full text-left`}>
                    <Settings size={16} className={`mr-2 ${secondaryTextColor}`} />
                    Settings
                  </button>
                  <button className={`flex items-center px-4 py-2 text-sm ${textColor} hover:${darkMode ? 'bg-[#5F9EE9]/10' : 'bg-gray-100'} w-full text-left`}>
                    <LogOut size={16} className={`mr-2 ${secondaryTextColor}`} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
  
  if (selectedApp) {
    return (
      <div className={`${bgColor} min-h-screen`}>
        {/* Navbar */}
        <Navbar />
        
        {/* App Details */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button 
            onClick={handleBackToApps}
            className={`flex items-center text-[#5F9EE9] mb-6 font-medium hover:text-[#4A8BD6] transition-colors`}
          >
            <ChevronRight className="transform rotate-180 mr-1" size={18} />
            Back to apps
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className={`${darkMode ? 'bg-[#2A3142]/70' : 'bg-gray-100'} rounded-xl overflow-hidden shadow-md`}>
                <img 
                  src={selectedApp.screenshots[0]} 
                  alt={`${selectedApp.name} screenshot`}
                  className="w-full object-cover"
                />
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-3">
                {selectedApp.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={"/assets/image.png"} 
                      alt={`${selectedApp.name} screenshot ${index + 1}`} 
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h2 className={`text-2xl font-semibold ${textColor}`}>Description</h2>
                <p className={`mt-3 ${secondaryTextColor}`}>
                  {selectedApp.description}
                </p>
                <p className={`mt-4 ${secondaryTextColor}`}>
                  AH-Digital offers cutting-edge digital solutions to enhance your productivity and streamline your workflows. Our suite of applications is designed with the modern business in mind, providing intuitive interfaces and powerful features that help your team collaborate effectively.
                </p>
              </div>
            </div>
            
            <div>
              <div className={`${bgColor} rounded-xl p-6 shadow-lg border ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <img 
                    src={selectedApp.image} 
                    alt={selectedApp.name} 
                    className="w-20 h-20 rounded-xl"
                  />
                  <div className="ml-4">
                    <h1 className={`text-xl font-semibold ${textColor}`}>{selectedApp.name}</h1>
                    <div className="flex items-center mt-1">
                      <span className="text-[#F7B84B] flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(selectedApp.rating) ? "currentColor" : "none"} 
                            className={i < Math.floor(selectedApp.rating) ? "text-[#F7B84B]" : "text-gray-400"}
                          />
                        ))}
                      </span>
                      <span className={`ml-2 text-sm ${secondaryTextColor}`}>{selectedApp.rating}</span>
                    </div>
                    <div className={`mt-1 text-sm ${secondaryTextColor}`}>
                      <span className="flex items-center">
                        <Download size={14} className="mr-1" />
                        {selectedApp.downloads} downloads
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    className="w-full bg-[#5F9EE9] text-white py-3 rounded-lg font-medium hover:bg-[#4A8BD6] transition-colors"
                  >
                    View Website
                  </button>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-center">
                      <span className={`text-xs ${secondaryTextColor}`}>Category</span>
                      <p className={`font-medium ${textColor}`}>{selectedApp.category}</p>
                    </div>
                    <div className="text-center">
                      <span className={`text-xs ${secondaryTextColor}`}>Released</span>
                      <p className={`font-medium ${textColor}`}>Mar 2025</p>
                    </div>
                    <div className="text-center">
                      <span className={`text-xs ${secondaryTextColor}`}>Size</span>
                      <p className={`font-medium ${textColor}`}>15 MB</p>
                    </div>
                  </div>
                </div>
                
                <div className={`mt-6 border-t ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'} pt-4`}>
                  <h3 className={`font-medium ${textColor}`}>About AH-Digital</h3>
                  <p className={`mt-2 text-sm ${secondaryTextColor}`}>
                    AH-Digital delivers innovative solutions to transform your digital experience and boost productivity across your organization.
                  </p>
                  
                  <div className="mt-4">
                    <a href="#" className="text-[#5F9EE9] text-sm hover:text-[#4A8BD6]">Visit developer website</a>
                  </div>
                </div>
              </div>
              
              <div className={`mt-4 ${bgColor} rounded-xl p-6 shadow-lg border ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'}`}>
                <h3 className={`font-medium ${textColor}`}>System Requirements</h3>
                <ul className={`mt-3 space-y-2 text-sm ${secondaryTextColor}`}>
                  <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                  <li>• Internet connection</li>
                  <li>• 1024x768 minimum resolution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${bgColor} min-h-screen`}>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className={`text-2xl font-semibold ${textColor}`}>App Store</h1>
          <p className={`${secondaryTextColor} mt-1`}>Discover AH-Digital applications for your business</p>
        </div>
        
        {/* Categories */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategoryIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                index === activeCategoryIndex 
                  ? 'bg-[#5F9EE9] text-white hover:bg-[#4A8BD6]' 
                  : `${darkMode ? 'bg-[#2A3142]/70 text-white' : 'bg-gray-100 text-[#2A3142]'} 
                  hover:${darkMode ? 'bg-[#5F9EE9]/30' : 'bg-gray-200'}`
              } transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="mb-8">
          <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Featured App</h2>
          <div className={`${bgColor} rounded-lg shadow-md border ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'} overflow-hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-[#5F9EE9] p-6 flex flex-col justify-center items-center text-white">
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img 
                    src="/assets/logo.png"
                    alt="AH-Digital" 
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-center">AH-Digital</h3>
                <div className="flex items-center mt-2">
                  <Star size={16} fill="currentColor" className="text-[#F7B84B]" />
                  <Star size={16} fill="currentColor" className="text-[#F7B84B]" />
                  <Star size={16} fill="currentColor" className="text-[#F7B84B]" />
                  <Star size={16} fill="currentColor" className="text-[#F7B84B]" />
                  <Star size={16} fill="currentColor" className="text-[#F7B84B]" />
                </div>
              </div>
              
              <div className="md:col-span-2 p-6 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-[#5F9EE9]/20 text-[#5F9EE9] rounded-full">AUTOMATION</span>
                </div>
                <h3 className={`text-lg font-semibold ${textColor} mb-2`}>Complete Digital Workspace</h3>
                <p className={`${secondaryTextColor} mb-6`}>
                  Experience the complete package of AH-Digital tools in one integrated suite. 
                  Streamline your workflow with our comprehensive business solution.
                </p>
                <div>
                  <button 
                    onClick={() => handleAppClick(featuredApps[0])}
                    className="bg-[#5F9EE9] text-white px-6 py-2 rounded font-medium hover:bg-[#4A8BD6] transition-colors inline-flex items-center"
                  >
                    Learn More
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Apps */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Popular Apps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularApps.map((app) => (
              <div 
                key={app.id}
                onClick={() => handleAppClick(app)}
                className={`${bgColor} rounded-xl border ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'} p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer`}
              >
                <div className="flex items-start">
                  <img 
                    src={app.image} 
                    alt={app.name} 
                    className="w-16 h-16 rounded-xl"
                  />
                  <div className="ml-3">
                    <h3 className={`font-medium ${textColor}`}>{app.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-[#F7B84B] flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < Math.floor(app.rating) ? "currentColor" : "none"} 
                            className={i < Math.floor(app.rating) ? "text-[#F7B84B]" : "text-gray-400"}
                          />
                        ))}
                      </span>
                      <span className={`ml-1 text-xs ${secondaryTextColor}`}>{app.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className={`mt-3 text-sm ${secondaryTextColor} line-clamp-2`}>
                  {app.description}
                </p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-[#5F9EE9] font-medium">{app.category}</span>
                  <div className={`flex items-center text-xs ${secondaryTextColor}`}>
                    <Download size={12} className="mr-1" />
                    {app.downloads}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Apps Grid */}
        <div>
          <h2 className={`text-xl font-semibold ${textColor} mb-4`}>All Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <div 
                key={app.id}
                onClick={() => handleAppClick(app)}
                className={`${bgColor} rounded-xl border ${darkMode ? 'border-[#5F9EE9]/30' : 'border-gray-200'} p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer`}
              >
                <div className="flex items-start">
                  <img 
                    src={app.image} 
                    alt={app.name} 
                    className="w-16 h-16 rounded-xl"
                  />
                  <div className="ml-3">
                    <h3 className={`font-medium ${textColor}`}>{app.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-[#F7B84B] flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < Math.floor(app.rating) ? "currentColor" : "none"} 
                            className={i < Math.floor(app.rating) ? "text-[#F7B84B]" : "text-gray-400"}
                          />
                        ))}
                      </span>
                      <span className={`ml-1 text-xs ${secondaryTextColor}`}>{app.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className={`mt-3 text-sm ${secondaryTextColor} line-clamp-2`}>
                  {app.description}
                </p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-[#5F9EE9] font-medium">{app.category}</span>
                  <div className={`flex items-center text-xs ${secondaryTextColor}`}>
                    <Download size={12} className="mr-1" />
                    {app.downloads}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Store;