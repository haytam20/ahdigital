import React, { useState } from 'react';
import { MoreVertical, ChevronDown, ArrowRight, ChevronUp, Globe, Search, Phone, Settings2,ChevronLeft, Check ,ChevronRight , Calendar,PanelsLeftBottom } from 'lucide-react';
import windowImg from '../assets/window.png';


const Dashboard = () => {
  const [dateRange, setDateRange] = useState({
    start: '2025-03-15',
    end: '2025-03-21'
  });
  const [isOpenN, setIsOpenN] = useState(false);
  const [selected, setSelected] = useState("Created on"); // Add state for selected option

  const options = [
    { id: "status-change", label: "Status change" },
    { id: "created-on", label: "Created on" },
    { id: "updated-on", label: "Updated on" },
  ];

  const [isOpenNN, setIsOpenNN] = useState(false);
  const [selectedN, setSelectedN] = useState("Created on"); // Add state for selected option

  const [isOpenNNN, setIsOpenNNN] = useState(false);
  const [selectedNN, setSelectedNN] = useState("Created on"); 



  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownA = () => {
    setIsOpen(!isOpen);
  };
  
  // State for current view
  const [currentMonths, setCurrentMonths] = useState([
    { month: 2, year: 2025 }, // March 2025
    { month: 3, year: 2025 }  // April 2025
  ]);
  
  // Whether the calendar popup is visible
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Days of the week
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Generate days for a month
  const generateDays = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = month - 1 < 0 ? 11 : month - 1;
      const prevYear = prevMonth === 11 ? year - 1 : year;
      days.push({ 
        day, 
        month: prevMonth, 
        year: prevYear, 
        isCurrentMonth: false 
      });
    }
    
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ 
        day: i, 
        month, 
        year, 
        isCurrentMonth: true 
      });
    }
    
    // Next month
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonth = month + 1 > 11 ? 0 : month + 1;
      const nextYear = nextMonth === 0 ? year + 1 : year;
      days.push({ 
        day: i, 
        month: nextMonth, 
        year: nextYear, 
        isCurrentMonth: false 
      });
    }
    
    return days;
  };
  
  // Check if a date is selected
  const isDateSelected = (day, month, year) => {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return date >= dateRange.start && date <= dateRange.end;
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = () => {
    // Add signout logic here
    console.log('Signing out');
  };
  // Check if a date is today
  const isToday = (day, month, year) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonths(prevMonths => {
      const prevMonth = prevMonths[0].month - 1;
      const prevYear = prevMonths[0].year;
      if (prevMonth < 0) {
        return [
          { month: 11, year: prevYear - 1 },
          { month: 0, year: prevYear }
        ];
      }
      return [
        { month: prevMonth, year: prevYear },
        { month: prevMonths[0].month, year: prevMonths[0].year }
      ];
    });
  };
  
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonths(prevMonths => {
      const nextMonth = prevMonths[1].month + 1;
      const nextYear = prevMonths[1].year;
      if (nextMonth > 11) {
        return [
          { month: prevMonths[1].month, year: prevMonths[1].year },
          { month: 0, year: nextYear + 1 }
        ];
      }
      return [
        { month: prevMonths[1].month, year: prevMonths[1].year },
        { month: nextMonth, year: nextYear }
      ];
    });
  };
  
  // Get formatted date string
  const formatDate = (day, month, year) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  // Handle day click
  const handleDayClick = (day, month, year) => {
    const clickedDate = formatDate(day, month, year);
    
    // If no date selected or both dates selected, start new selection
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({
        start: clickedDate,
        end: ''
      });
    } else {
      // If only start date is selected
      if (clickedDate < dateRange.start) {
        setDateRange({
          start: clickedDate,
          end: dateRange.start
        });
      } else {
        setDateRange({
          start: dateRange.start,
          end: clickedDate
        });
      }
    }
  };
  
  // Toggle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  
  // Predefined range buttons
  const predefinedRanges = [
    { label: 'This Week', action: () => {} },
    { label: 'Last Week', action: () => {} },
    { label: 'Last 7 Days', action: () => {} },
    { label: 'This Month', action: () => {} },
    { label: 'This Year', action: () => {} }
  ];
  
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  const [showPhonePermission, setShowPhonePermission] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState('System');
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [tasksFilter, setTasksFilter] = useState('All');
  const [dateAddedFilter, setDateAddedFilter] = useState('Date Added (...)');
  const [userFilter, setUserFilter] = useState('ZAHRA ZAHRA');
  const [manualActionsFilter, setManualActionsFilter] = useState('All');
  const [userManualFilter, setUserManualFilter] = useState('All Users');

  
  const toggleTimezoneDropdown = () => {
    setShowTimezoneDropdown(!showTimezoneDropdown);
  };
  
  const handlePhoneClick = () => {
    setShowPhonePermission(true);
  };
  
  const closePhonePermission = () => {
    setShowPhonePermission(false);
  };
  
  const closeNotifications = () => {
    setShowNotifications(false);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  const toggleNotificationOptions = () => {
    setShowNotificationOptions(!showNotificationOptions);
  };
  
  const handleMarkAllAsRead = () => {
    setShowSuccessMessage(true);
    
    // Auto-hide the success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navigation bar */}
      <div className="w-full bg-white py-4 px-4 border-b flex justify-end space-x-2">
        <div className="flex items-center">
          <button 
            className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white"
            onClick={handlePhoneClick}
          >
            <Phone size={20} />
          </button>
        </div>
        <div className="flex items-center">
          <button 
            className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white"
            onClick={toggleNotifications}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
        <div className="relative">
      <div className="flex items-center">
        <button 
          className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white login"
          onClick={toggleDropdown}
        >
          <span className="font-semibold">ZZ</span>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white mr-3">
              <span className="font-semibold">ZZ</span>
            </div>
            <div>
              <p className="font-semibold">ZAHRA ZAHRA</p>
              <p className="text-sm text-gray-500">zahrabari25@gmail.com</p>
            </div>
          </div>
          <div className="py-1">
            <button 
              onClick={handleSignout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Signout
            </button>
          </div>
        </div>
      )}
    </div>
      </div>
      
      {/* Phone Permission Modal */}
      {showPhonePermission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={closePhonePermission}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="text-xl font-semibold mb-4">Update Browser Permissions</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Please allow Phone system access to your microphone</h3>
              
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li>Click the page info icon in your browser address bar</li>
                <li>Turn on microphone</li>
              </ol>
              
              <div className="flex items-center justify-center mb-6">
                <div className="">
                <img src={windowImg} alt="Browser permissions illustration" className="mx-auto  w-50 h-30" />                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                  Learn More
                </button>
                <button className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={closeNotifications}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b">
              <button 
                className={`py-3 px-6 text-center ${activeNotificationTab === 'System' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveNotificationTab('System')}
              >
                System
              </button>
              <button 
                className={`py-3 px-6 text-center ${activeNotificationTab === 'Alert' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveNotificationTab('Alert')}
              >
                Alert
              </button>
            </div>
            
            {activeNotificationTab === 'Alert' && (
         <div className="flex flex-col items-center justify-center p-6 text-center">
         <h3 className="text-4xl">🥳</h3>
         <p className="text-lg text-black-300 font-medium pt-4">
           Woohoo! No new alerts. Keep up the good work!
         </p>
       </div>
        )}
          {activeNotificationTab === 'System' && (
          <>
            <div className="flex justify-between items-center p-4 border-b">
              <button 
                className="font-medium text-gray-800"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>   
              {showSuccessMessage && (
                <div className="fixed bottom-5  mb-4">
                <span className="bg-green-500  text-white p-5 rounded">
                  Notification mark all as read success
                </span>
                </div>
              )}
              
              <button className="text-gray-400" onClick={toggleNotificationOptions}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
            <div className="flex-grow p-6 flex items-center justify-center text-gray-500">
               No notifications found
             </div>
            </>
            

          )}
          
            {showNotificationOptions && (
              <div className="absolute right-4 top-45 bg-white rounded shadow-lg z-10 w-64 py-2">
                <div className="p-3 flex items-center space-x-3 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span className="text-gray-700">Notification Settings</span>
                </div>
                <div className="p-3 flex items-center space-x-3 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span className="text-gray-700">Clear All Notifications</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 ml-1">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  
                </div>
               
              </div>
              
            )}
            
            {/* Notification Content */}
           
          </div>
         
        </div>
      )}
    
      {/* Dashboard header */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
          <button 
        onClick={toggleDropdownA}
        className="bg-blue-600 text-white p-2 rounded mr-2"
      >
        <div className="flex items-center space-x-1">
          <PanelsLeftBottom size={20} />
          <ChevronDown size={20} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute  left-8  w-64 mt-60 bg-white border rounded shadow-lg">
          <div className="p-2">
          <div className="relative w-full mb-2">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  <input
    type="text"
    placeholder="Search for a dashboard"
    className="w-full pl-10 p-2 border rounded"
  />
</div>

            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              + Add Dashboard
            </button>
            <div className="mt-2">
              <h3 className="text-sm text-gray-500 px-2 mb-1">Shared With Me</h3>
              <div className="border rounded">
                <div className="flex justify-between items-center p-2 hover:bg-gray-100">
                  <span>(Default) Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" x2="21" y1="14" y2="3"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
            <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="w-full max-w-md font-sans ">
      {/* Date range display */}
      
      <div 
      
        className="bg-white rounded border px-3 py-2 flex items-center cursor-pointer w-65 "
        onClick={toggleCalendar}
        
      >
       
         
        <span className="text-gray-800">{dateRange.start}</span>
        <ArrowRight size={16} className="mx-2 text-gray-500" />
        <span className="text-gray-800">{dateRange.end || dateRange.start}</span>
       
        <Calendar className="w-5 h-5 text-gray-600 ml-4" />
      </div>
      
      {/* Calendar popup */}
      {isCalendarOpen && (
        <div className=" absolute mt-2 bg-white shadow-lg rounded border overflow-hidden ">
          <div className="flex">
            {/* Left calendar */}
            <div className="w-1/2 border-r">
              <div className="flex items-center justify-between p-2 border-b">
                <button className="p-1 text-gray-600" onClick={() => goToPreviousMonth()}>
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1 text-gray-600" onClick={() => {}}>
                  <ChevronLeft size={16} />
                </button>
                <div className="font-medium">{monthNames[currentMonths[0].month]} {currentMonths[0].year}</div>
                <button className="p-1 text-gray-600" onClick={() => {}}>
                  <ChevronRight size={16} />
                </button>
                <button className="p-1 text-gray-600" onClick={() => goToNextMonth()}>
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 text-center">
                {daysOfWeek.map(day => (
                  <div key={day} className="py-1 text-sm font-medium text-gray-700">
                    {day}
                  </div>
                ))}
                
                {generateDays(currentMonths[0].month, currentMonths[0].year).slice(0, 35).map((date, index) => {
                  const isSelected = isDateSelected(date.day, date.month, date.year);
                  
                  return (
                    <div 
                      key={index}
                      className={`py-1 text-sm cursor-pointer ${
                        isSelected ? 'bg-blue-500 text-white' : 
                        date.isCurrentMonth ? 'text-blue-500' : 'text-gray-400'
                      } ${date.isCurrentMonth ? 'hover:bg-gray-100' : ''}`}
                      onClick={() => date.isCurrentMonth && handleDayClick(date.day, date.month, date.year)}
                    >
                      {date.day}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Right calendar */}
            <div className="w-1/2">
              <div className="flex items-center justify-between p-2 border-b">
                <button className="p-1 text-gray-600" onClick={() => goToPreviousMonth()}>
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1 text-gray-600" onClick={() => {}}>
                  <ChevronLeft size={16} />
                </button>
                <div className="font-medium">{monthNames[currentMonths[1].month]} {currentMonths[1].year}</div>
                <button className="p-1 text-gray-600" onClick={() => {}}>
                  <ChevronRight size={16} />
                </button>
                <button className="p-1 text-gray-600" onClick={() => goToNextMonth()}>
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 text-center">
                {daysOfWeek.map(day => (
                  <div key={day} className="py-1 text-sm font-medium text-gray-700">
                    {day}
                  </div>
                ))}
                
                {generateDays(currentMonths[1].month, currentMonths[1].year).slice(0, 35).map((date, index) => {
                  const isSelected = isDateSelected(date.day, date.month, date.year);
                  
                  return (
                    <div 
                      key={index}
                      className={`py-1 text-sm cursor-pointer ${
                        isSelected ? 'bg-blue-500 text-white' : 
                        date.isCurrentMonth ? 'text-blue-500' : 'text-gray-400'
                      } ${date.isCurrentMonth ? 'hover:bg-gray-100' : ''}`}
                      onClick={() => date.isCurrentMonth && handleDayClick(date.day, date.month, date.year)}
                    >
                      {date.day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Predefined range buttons and confirm */}
          <div className="p-2 border-t flex flex-wrap gap-2">
            {predefinedRanges.map(range => (
              <button 
                key={range.label}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                onClick={range.action}
              >
                {range.label}
              </button>
            ))}
            <button 
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
              onClick={() => setIsCalendarOpen(false)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
          
          <div className="flex items-center space-x-2 relative">        
            <button className="p-2 rounded hover:bg-gray-200" onClick={toggleTimezoneDropdown}>
              <MoreVertical size={20} className="text-gray-600" />
            </button>
            
            {showTimezoneDropdown && (
              <div className="absolute right-0 top-12 bg-white rounded shadow-lg z-10 w-64">
                <div className="p-3 flex items-center space-x-2 hover:bg-gray-100">
                  <Globe size={18} />
                  <span>Manage Dashboard Timezone</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Opportunity Status Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Opportunity Status</h2>
              <div className="relative">
              <button
        className="text-gray-600 hover:bg-gray-100 rounded-md p-1"
        onClick={() => setIsOpenN(!isOpenN)}
      >
        <Settings2 size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpenN && (
        <div className="absolute w-64 p-2 bg-white  rounded-lg shadow-lg mt-4 right-3">
          <p className="text-sm text-gray-500 mb-2">
            Date property on which the opportunities should be calculated
          </p>

          <p className="text-sm text-gray-800 mb-1">Status change</p>

          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelected(option.label);
                setIsOpenN(false); // Close dropdown after selection
              }}
              className={`flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selected === option.label ? "bg-gray-100" : ""
              }`}
            >
              <span>{option.label}</span>
              {selected === option.label && (
                <Check size={16} className="text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
            </div>
            <div className="p-6 flex flex-col items-center justify-center h-64">
              <div className="bg-blue-100 p-4 rounded-full">
                <Search size={32} className="text-blue-500" />
              </div>
              <p className="mt-4 text-gray-800 font-medium">No Data Found</p>
            </div>
          </div>
          
          {/* Opportunity Value Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Opportunity Value</h2>
              <div className="relative">
              <button
        className="text-gray-600 hover:bg-gray-100 rounded-md p-1"
        onClick={() => setIsOpenNN(!isOpenNN)}
      >
        <Settings2 size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpenNN && (
        <div className="absolute w-64 p-2 bg-white  rounded-lg shadow-lg mt-4 right-3">
          <p className="text-sm text-gray-500 mb-2">
            Date property on which the opportunities should be calculated
          </p>

          <p className="text-sm text-gray-800 mb-1">Status change</p>

          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelectedN(option.label);
                setIsOpenNN(false); // Close dropdown after selection
              }}
              className={`flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selectedN === option.label ? "bg-gray-100" : ""
              }`}
            >
              <span>{option.label}</span>
              {selectedN === option.label && (
                <Check size={16} className="text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
            </div>
            <div className="p-6 flex flex-col items-center justify-center h-64">
              <div className="bg-blue-100 p-4 rounded-full">
                <Search size={32} className="text-blue-500" />
              </div>
              <p className="mt-4 text-gray-800 font-medium">No Data Found</p>
            </div>
          </div>
          
          {/* Conversion Rate Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Conversion Rate</h2>
              <div className="relative">
              <button
        className="text-gray-600 hover:bg-gray-100 rounded-md p-1"
        onClick={() => setIsOpenNNN(!isOpenNNN)}
      >
        <Settings2 size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpenNNN && (
        <div className="absolute w-64 p-2 bg-white  rounded-lg shadow-lg mt-4 right-1">
          <p className="text-sm text-gray-500 mb-2">
            Date property on which the opportunities should be calculated
          </p>

          <p className="text-sm text-gray-800 mb-1">Status change</p>

          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelectedNN(option.label);
                setIsOpenNNN(false); // Close dropdown after selection
              }}
              className={`flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selectedNN === option.label ? "bg-gray-100" : ""
              }`}
            >
              <span>{option.label}</span>
              {selectedNN === option.label && (
                <Check size={16} className="text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
            </div>
            <div className="p-4">
              <div className="mt-2">
                <h3 className="text-5xl font-bold text-gray-700 text-center">MAD0</h3>
                <div className="flex items-center justify-center mt-2">
                  <div className="px-3 py-1 bg-green-100 rounded-full flex items-center">
                    <ChevronUp size={16} className="text-green-600 mr-1" />
                    <span className="text-green-600">0%</span>
                  </div>
                  <span className="ml-2 text-gray-600">vs Last 31 Days</span>
                </div>
              </div>
              
              <div className="mt-8 relative flex justify-center">
                <div className="w-36 h-36 rounded-full bg-transparent border-8 border-gray-200">
                  <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-2xl font-semibold">0%</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500">Won revenue</p>
                <p className="text-xl font-medium text-gray-700">MAD0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
      {/* Left Panel - Funnel */}
      <div className="w-1/2 p-6 bg-white rounded-lg shadow-sm mr-4 ml-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-medium text-gray-700">Funnel</h2>
          
          <div className="flex items-center">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 py-2 px-4 pr-8 rounded-md text-gray-700">
                <option>TEST</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button
        className="text-gray-600 hover:bg-gray-100 rounded-md p-1"
        onClick={() => setfunnel(!isOpenN)}
      >
        <Settings2 size={20} />
      </button>
      
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">MADO</h1>
          <div className="flex items-center mb-6">
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-sm font-medium">0%</span>
            </div>
            <span className="text-gray-500 text-sm ml-2">vs Last 31 Days</span>
          </div>

          <div className="flex justify-between mb-2">
            <div className="text-gray-600">0</div>
            <div className="text-gray-600">1</div>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-1">
            <div className="col-span-1">
              <div className="font-medium mb-1"></div>
            </div>
            <div className="col-span-1 text-center">
              <div className="font-medium mb-1">Cumulative</div>
            </div>
            <div className="col-span-1 text-center">
              <div className="font-medium mb-1">Next Step Conversion</div>
            </div>
          </div>

          {/* First funnel item */}
          <div className="grid grid-cols-3 gap-1 mb-4">
            <div className="col-span-1 bg-gray-100 p-4 h-32 flex flex-col justify-center">
              <div className="font-medium">Talbi</div>
              <div className="font-medium">MADO</div>
            </div>
            <div className="col-span-1 bg-gray-100 p-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)' }}>
                <div className="h-full w-full flex items-center justify-center">There are currently no records to display in this report.
                  <span className="font-medium">0.00%</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-gray-100 p-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)' }}>
                <div className="h-full w-full flex items-center justify-center">
                  <span className="font-medium">100.00%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Second funnel item */}
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-1 bg-gray-100 p-4 h-32 flex flex-col justify-center">
              <div className="font-medium">Won</div>
              <div className="font-medium">MADO</div>
            </div>
            <div className="col-span-1 bg-gray-100 p-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)' }}>
                <div className="h-full w-full flex items-center justify-center">
                  <span className="font-medium">0.00%</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-gray-100 p-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)' }}>
                <div className="h-full w-full flex items-center justify-center">
                  <span className="font-medium">0.00%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Stage Distribution */}
      <div className="w-1/2 p-6 bg-white rounded-lg shadow-sm mr-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-medium text-gray-700 ">Stage Distribution</h2>
          <div className="flex items-center">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 py-2 px-4 pr-8 rounded-md text-gray-700">
                <option>TEST</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button
        className="text-gray-600 hover:bg-gray-100 rounded-md p-1"
        onClick={() => setfunnel(!isOpenN)}
      >
        <Settings2 size={20} />
      </button>
          </div>
        </div>

        <div className="flex items-center justify-center h-64 flex-col">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-800">No Data Found</p>
          <div className="mt-4 mb-2 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  {/*------------------------------------------------------------------------------------------------------*/}
  <div className="flex p-6 bg-#f3f4f6 from-gray-50 to-gray-100 min-h-screen space-x-6">
  {/* Section Tâches */}
  <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
    <h2 className="text-lg font-medium text-gray-700">Tasks</h2>

      <div className="flex space-x-3">
        <select 
          value={tasksFilter}
          onChange={(e) => setTasksFilter(e.target.value)}
          className="border-2 border-blue-100 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <select 
          value={dateAddedFilter}
          onChange={(e) => setDateAddedFilter(e.target.value)}
          className="border-2 border-blue-100 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        >
          <option>Date Added (...)</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>

        <select 
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="border-2 border-blue-100 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        >
          <option>ZAHRA ZAHRA</option>
          <option>Other User</option>
        </select>
      </div>
    </div>

    {/* Section Aucune Donnée */}
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-gray-50/50 animate-pulse">
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 shadow-md">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-blue-600"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <p className="text-gray-600 font-semibold text-lg">No Data Found</p>
    </div>
  </div>

  {/* Section Actions Manuelles */}
  <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
    <h2 className="text-lg font-medium text-gray-700">Manual Actions</h2>

      <div className="flex space-x-3">
        <select 
          value={manualActionsFilter}
          onChange={(e) => setManualActionsFilter(e.target.value)}
          className="border-2 border-blue-100 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        >
          <option>All</option>
        </select>

        <select 
          value={userManualFilter}
          onChange={(e) => setUserManualFilter(e.target.value)}
          className="border-2 border-blue-100 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        >
          <option>All Users</option>
        </select>
      </div>
    </div>

    {/* Statistiques */}
    <div className="grid grid-cols-3 gap-6 p-6 text-center bg-gray-50/50">
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Phone</p>
        <p className="text-3xl font-bold text-blue-600">0</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">SMS</p>
        <p className="text-3xl font-bold text-blue-600">0</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Total Pending</p>
        <p className="text-3xl font-bold text-blue-600">0</p>
      </div>
    </div>

    {/* Bouton Actions Manuelles */}
    <div className="text-center p-5 border-t border-gray-100">
      <button className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors duration-300 font-semibold flex items-center justify-center mx-auto space-x-2 group">
        <span>Go to Manual Actions</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
</div>
  {/*-----------------------------------------------------------------------*/}
  <div className="min-h-screen  flex flex-col mr-3 ml-6">
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-900">Lead Source Report</h1>
            <button
        className="text-gray-600 hover:bg-gray-100 rounded-md p-1"
        onClick={() => setfunnel(!isOpenN)}
      >
        <Settings2 size={20} />
      </button>
          </div>

          {/* No Data Content */}
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
              <div className="relative z-10 w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-blue-500"
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Data Found</h2>
            <p className="text-sm text-gray-500 text-center">
              There are currently no records to display in this report.
            </p>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center p-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <button 
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                <button 
                  className="w-8 h-8 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  1
                </button>
              </div>
              
              <button 
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Next
              </button>
            </div>
          </div>
          
        </div>
        
      </div>
      <div className="min-h-screen flex flex-col mr-3 ml-6 relative mp-3">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-gray-900">Google Analytics Report</h1>
            <p className="text-xs text-gray-500">(Last 12 months)</p>
          </div>
        </div>

        {/* No Data Content */}
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
            <div className="relative z-10 w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-1">No Data Found</h2>
          <p className="text-xs text-gray-500 text-center">
            There are currently no analytics data available for the last 12 months.
          </p>
        </div>
      </div>
    </div>
    </div>
      
   
    </div>
    
   
  );
};

export default Dashboard;