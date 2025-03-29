import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Search, ChevronDown, ChevronUp, Home, BarChart2, MessageSquare, Calendar, Users, Target, CreditCard, Mail, Settings, ChevronRight, ChevronLeft, X, LogOut, Plus } from 'lucide-react';
import logo from '../assets/logo.png';
import Dashboard from "./Dashboard";


// Constants

const mainNavItems = [
  { icon: <Home size={20} />, label: 'Launchpad' },
  { icon: <BarChart2 size={20} />, label: 'Dashboard' },
  { icon: <MessageSquare size={20} />, label: 'Conversations' },
  { icon: <Calendar size={20} />, label: 'Calendars' },
  { icon: <Users size={20} />, label: 'Contacts' },
  { icon: <Target size={20} />, label: 'Opportunities' },
  { icon: <CreditCard size={20} />, label: 'Payments' },
];


const secondaryNavItems = [
  { icon: <Mail size={20} />, label: 'Marketing' },
  { icon: <Settings size={20} />, label: 'Settings' },
];

const subAccounts = [
  { name: 'SAAS', location: 'AGADIR, MOROCCO', initial: 'S', active: true },
  { name: 'TECH', location: 'RABAT, MOROCCO', initial: 'T' },
  { name: 'DIGITAL', location: 'CASABLANCA, MOROCCO', initial: 'D' }
];

// Components
const Logo = ({ isOpen }) => (
  <div className="p-4 flex items-center">
    <img src={logo} alt="Logo" className="ml-2 h-8 w-8 object-contain" />
    {isOpen && (
      <div className="ml-2 overflow-hidden">
        <div className="font-bold text-white truncate">AHDIGITAL</div>
        <div className="text-xs text-gray-400 truncate">AUTOMATION</div>
      </div>
    )}
  </div>
);

const NavItem = React.memo(({ icon, label, isActive, onClick, isOpen }) => (
  <div 
    className={`group px-3 py-2 my-1 mx-2 flex items-center rounded-md cursor-pointer transition-all duration-200 ${
      isActive 
        ? 'bg-indigo-600 text-white' 
        : 'hover:bg-gray-800 text-gray-300'
    }`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={label}
  >
    <div className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}>
      {icon}
    </div>
    {isOpen && (
      <span className={`ml-3 text-sm ${isActive ? 'font-medium' : ''}`}>{label}</span>
    )}
  </div>
));

const SearchBar = ({ searchQuery, setSearchQuery, searchFocused, setSearchFocused, clearSearch, isOpen }) => (
  <div className="px-4 py-3">
    <div className="relative">
      <input
        id={isOpen ? 'sidebar-search' : 'popup-search'}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        className={`w-full py-2 pl-8 pr-14 bg-gray-800 rounded-md text-gray-300 text-sm transition-all duration-200 ${
          searchFocused ? 'ring-2 ring-indigo-500 outline-none' : 'focus:outline-none focus:ring-2 focus:ring-indigo-500'
        }`}
        aria-label="Search"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={16} className="text-gray-400" />
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {searchQuery ? (
          <button 
            onClick={clearSearch}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        ) : (
          <span className="bg-gray-700 rounded-md px-1.5 py-0.5 text-gray-300 text-xs font-mono">
            ⌘K
          </span>
        )}
      </div>
    </div>
    
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Launchpad');
  const [isSubAccountsOpen, setIsSubAccountsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  
  const searchPopupRef = useRef(null);
  const userDropdownRef = useRef(null);
  const subAccountsRef = useRef(null);

  // Save sidebar state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarState', JSON.stringify(isOpen));
  }, [isOpen]);

  const handleClickOutside = useCallback((event) => {
    if (searchPopupRef.current && !searchPopupRef.current.contains(event.target)) {
      setIsSearchPopupOpen(false);
    }
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
      setIsUserDropdownOpen(false);
    }
    if (subAccountsRef.current && !subAccountsRef.current.contains(event.target) && 
        !event.target.closest('[data-toggle-subaccounts]')) {
      setIsSubAccountsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleSidebar = useCallback(() => {
    setIsOpen(!isOpen);
    setIsSubAccountsOpen(false);
    setIsUserDropdownOpen(false);
    setIsSearchPopupOpen(false);
  }, [isOpen]);

  const toggleSubAccounts = useCallback((e) => {
    e.stopPropagation();
    setIsSubAccountsOpen(!isSubAccountsOpen);
    setIsUserDropdownOpen(false);
  }, [isSubAccountsOpen]);

  const toggleSearchPopup = useCallback(() => {
    setIsSearchPopupOpen(!isSearchPopupOpen);
    setIsUserDropdownOpen(false);
    setIsSubAccountsOpen(false);
  }, [isSearchPopupOpen]);

  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        const sidebarSearch = document.getElementById('sidebar-search');
        if (sidebarSearch) sidebarSearch.focus();
      } else {
        setIsSearchPopupOpen(true);
        setTimeout(() => {
          const popupSearch = document.getElementById('popup-search');
          if (popupSearch) popupSearch.focus();
        }, 100);
      }
    }
    
    if (e.key === 'Escape') {
      if (isSearchPopupOpen) setIsSearchPopupOpen(false);
      if (isUserDropdownOpen) setIsUserDropdownOpen(false);
      if (isSubAccountsOpen) setIsSubAccountsOpen(false);
    }
  }, [isOpen, isSearchPopupOpen, isUserDropdownOpen, isSubAccountsOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    if (isOpen) {
      const sidebarSearch = document.getElementById('sidebar-search');
      if (sidebarSearch) sidebarSearch.focus();
    } else {
      const popupSearch = document.getElementById('popup-search');
      if (popupSearch) popupSearch.focus();
    }
  }, [isOpen]);

  const toggleUserDropdown = useCallback((e) => {
    e.stopPropagation();
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsSearchPopupOpen(false);
    setIsSubAccountsOpen(false);
  }, [isUserDropdownOpen]);

  const filteredMainNavItems = mainNavItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSecondaryNavItems = secondaryNavItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAccount = useCallback((account) => {
    setIsSubAccountsOpen(false);
  }, []);

  return (
    
    <div className="flex h-screen relative">
      <button 
        onClick={toggleSidebar} 
        className={`absolute top-4 z-20 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 ${isOpen ? 'left-60' : 'left-4'}`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div 
        className={`bg-gray-900 text-gray-300 transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-16'} overflow-hidden shadow-xl z-10`}
        aria-hidden={!isOpen}
      >
        <Logo isOpen={isOpen} />

        <div 
          className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-800 transition-colors duration-200 relative" 
          onClick={toggleSubAccounts}
          data-toggle-subaccounts="true"
        >
          <div className="bg-indigo-600 rounded-full p-2 flex-shrink-0">
            <MapPin size={16} className="text-white" />
          </div>
          {isOpen && (
            <>
              <div className="ml-2 flex-1 min-w-0">
                <div className="font-semibold truncate text-gray-300">SAAS</div>
                <div className="text-xs text-gray-400 truncate">AGADIR, MOROCCO</div>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label={isSubAccountsOpen ? "Hide sub-accounts" : "Show sub-accounts"}
              >
                {isSubAccountsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </>
          )}
        </div>

        {isOpen && (
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchFocused={searchFocused}
            setSearchFocused={setSearchFocused}
            clearSearch={clearSearch}
            isOpen={isOpen}
          />
        )}

        {!isOpen && (
          <div className="px-4 py-3">
            <button 
              onClick={toggleSearchPopup}
              className="w-full flex items-center justify-center p-2 bg-gray-800 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors duration-200"
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
          </div>
        )}

        <div className="mt-2 flex-1 overflow-y-auto">
          {isOpen && searchQuery === '' && (
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Main
            </div>
          )}
          
          {isOpen && searchQuery !== '' && (filteredMainNavItems.length > 0 || filteredSecondaryNavItems.length > 0) && (
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Search Results
            </div>
          )}
          
          {isOpen && searchQuery !== '' && filteredMainNavItems.length === 0 && filteredSecondaryNavItems.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-400 italic">
              No results found
            </div>
          )}
          
          {filteredMainNavItems.map((item) => (
            <NavItem 
              key={item.label}
              icon={item.icon} 
              label={item.label} 
              isActive={activeSection === item.label}
              onClick={() => setActiveSection(item.label)}
              isOpen={isOpen}
            />
          ))}
          
          {isOpen && searchQuery === '' && filteredMainNavItems.length > 0 && filteredSecondaryNavItems.length > 0 && (
            <>
              <div className="border-t border-gray-800 my-4 mx-3"></div>
              <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Marketing
              </div>
            </>
          )}
          
          {filteredSecondaryNavItems.map((item) => (
            <NavItem 
              key={item.label}
              icon={item.icon} 
              label={item.label} 
              isActive={activeSection === item.label}
              onClick={() => setActiveSection(item.label)}
              isOpen={isOpen}
            />
          ))}
        </div>
        
        <div 
          className="border-t border-gray-700 p-4 flex items-center relative cursor-pointer hover:bg-gray-800 transition-colors duration-200"
          onClick={toggleUserDropdown}
          ref={userDropdownRef}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-gray-100 font-medium">
            <span>U</span>
          </div>
          {isOpen && (
            <>
              <div className="ml-2 flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-300 truncate">User Name</div>
                <div className="text-xs text-gray-500 truncate">user@example.com</div>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-200 p-1 rounded-full hover:bg-gray-700"
                aria-label="Toggle dropdown"
              >
                <ChevronDown size={16} />
              </button>
            </>
          )}
          
          {isUserDropdownOpen && (
            <div className={`absolute ${isOpen ? 'right-4 bottom-16' : 'left-16 bottom-0'} bg-gray-800 border border-gray-700 rounded-md shadow-lg z-30 w-48`}>
              <div className="border-b border-gray-700 px-4 py-3">
                <div className="font-medium text-gray-300">User Name</div>
                <div className="text-xs text-gray-400 truncate">user@example.com</div>
              </div>
              <div className="py-1">
                <button 
                  className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle profile
                  }}
                >
                  <Users size={16} className="mr-2 text-gray-400" />
                  Profile
                </button>
                <button 
                  className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle settings
                  }}
                >
                  <Settings size={16} className="mr-2 text-gray-400" />
                  Settings
                </button>
              </div>
              <div className="border-t border-gray-700 py-1">
                <button 
                  className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 text-left flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle logout
                  }}
                >
                  <LogOut size={16} className="mr-2 text-red-400" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isOpen && isSearchPopupOpen && (
        <div 
          ref={searchPopupRef}
          className="absolute top-16 left-16 bg-gray-800 p-4 rounded-md shadow-lg z-20 w-64 border border-gray-700"
        >
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchFocused={searchFocused}
            setSearchFocused={setSearchFocused}
            clearSearch={clearSearch}
            isOpen={isOpen}
          />
          
          <div className="mt-3 max-h-64 overflow-y-auto">
            {filteredMainNavItems.length > 0 && (
              <div className="mb-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Main
                </div>
                {filteredMainNavItems.map((item) => (
                  <div 
                    key={item.label}
                    className="px-2 py-1.5 text-sm flex items-center text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => {
                      setActiveSection(item.label);
                      setIsSearchPopupOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="text-gray-400 mr-2">{item.icon}</div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
            
            {filteredSecondaryNavItems.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Marketing
                </div>
                {filteredSecondaryNavItems.map((item) => (
                  <div 
                    key={item.label}
                    className="px-2 py-1.5 text-sm flex items-center text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => {
                      setActiveSection(item.label);
                      setIsSearchPopupOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="text-gray-400 mr-2">{item.icon}</div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
            
            {searchQuery !== '' && filteredMainNavItems.length === 0 && filteredSecondaryNavItems.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-gray-400 italic">
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && isSubAccountsOpen && (
        <div 
          ref={subAccountsRef}
          className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col absolute left-64 top-0 h-full z-20 shadow-lg"
        >
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <h2 className="font-semibold text-gray-300">Switch Account</h2>
            <button 
              onClick={toggleSubAccounts}
              className="text-gray-400 hover:text-gray-200 p-1 rounded focus:outline-none"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-hidden flex flex-col">
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search accounts"
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md w-full outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 text-sm"
              />
              
            </div>
            
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">All Accounts</div>
            
            <div className="space-y-2 overflow-y-auto flex-1">
              {subAccounts.map((account, index) => (
                <div 
                  key={index}
                  className={`border rounded-md p-3 cursor-pointer transition-colors duration-200 ${
                    account.active 
                      ? 'bg-gray-700 border-indigo-500' 
                      : 'bg-gray-700 border-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => handleSelectAccount(account)}
                >
                  <div className="flex items-center">
                    <div className={`rounded-md p-2 w-8 h-8 flex items-center justify-center mr-2 ${
                      account.active ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      <span className="font-semibold text-sm">{account.initial}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-300 truncate">{account.name}</div>
                      <div className="text-xs text-gray-400 truncate">{account.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center space-x-2 transition-colors duration-200 font-medium">
              <Plus size={16} />
              <span>Add New Account</span>
            </button>
          </div>
        </div>
      )}

      {!isOpen && isSubAccountsOpen && (
        <div 
          ref={subAccountsRef}
          className="absolute top-16 left-16 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20"
        >
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="font-semibold text-gray-300 text-sm">Switch Account</h2>
            <button 
              onClick={toggleSubAccounts}
              className="text-gray-400 hover:text-gray-200 p-1 rounded focus:outline-none"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="p-3">
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search accounts"
                className="pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md w-full outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 text-xs"
              />
            </div>
            
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">All Accounts</div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {subAccounts.map((account, index) => (
                <div 
                  key={index}
                  className={`border rounded-md p-2 cursor-pointer transition-colors duration-200 ${
                    account.active 
                      ? 'bg-gray-700 border-indigo-500' 
                      : 'bg-gray-700 border-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => handleSelectAccount(account)}
                >
                  <div className="flex items-center">
                    <div className={`rounded-md p-1 w-7 h-7 flex items-center justify-center mr-2 ${
                      account.active ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      <span className="font-semibold text-xs">{account.initial}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-300 text-xs truncate">{account.name}</div>
                      <div className="text-xs text-gray-400 truncate">{account.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-2 mt-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center space-x-1 transition-colors duration-200 text-sm font-medium">
              <Plus size={14} />
              <span>Add New Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;