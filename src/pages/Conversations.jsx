import React, { useState } from 'react';
import { Search, Filter, Edit, ChevronDown, CheckCircle, Plus, Folder, FilePlus, Filter as FilterIcon, Trash, Copy } from 'lucide-react';

const Conversations = () => {
  const [activeMainTab, setActiveMainTab] = useState('Trigger Links');
  const [activeSubTab, setActiveSubTab] = useState('Unread');
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [activeSnippetsTab, setActiveSnippetsTab] = useState('All Snippets');
  const [searchSnippets, setSearchSnippets] = useState('');
  const [activeTriggerLinksTab, setActiveTriggerLinksTab] = useState('Links');
  const [searchTriggerLink, setSearchTriggerLink] = useState('');
  
  const mainTabs = ['Conversations', 'Manual Actions', 'Snippets', 'Trigger Links'];
  const subTabs = ['Unread', 'Recents', 'Starred', 'All'];
  const snippetsTabs = ['All Snippets', 'Folders'];
  const triggerLinksTabs = ['Links', 'Analyze'];
  
  return (
    <div className="flex flex-col h-full bg-white text-gray-800 font-sans overflow-hidden">

      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
        <h1 className="text-xl font-normal text-gray-700">Conversations</h1>
        
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </span>
          </button>
          <button className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </span>
          </button>
          <button className="h-9 w-9 rounded-full bg-green-200 flex items-center justify-center">
            <span className="text-green-800 font-medium">AE</span>
          </button>
        </div>
      </div>
      
      {/* Main navigation tabs */}
      <div className="border-b border-gray-200 flex-shrink-0">
        <div className="flex">
          {mainTabs.map((tab) => (
            <button 
              key={tab}
              className={`px-4 py-4 text-sm ${activeMainTab === tab 
                ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
                : 'text-gray-600'}`}
              onClick={() => setActiveMainTab(tab)}
            >
              {tab}
              {tab === 'Trigger Links' && (
                <ChevronDown className="inline-block ml-1 w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content area that changes based on main tab */}
      <div className="flex flex-1 overflow-hidden">
        {activeMainTab === 'Conversations' && (
          <div className="flex w-full h-full">
            {/* Left sidebar for conversations - fixed width */}
            <div className="w-80 flex-shrink-0 border-r border-gray-200 flex flex-col overflow-hidden">
              {/* Sub navigation */}
              <div className="border-b border-gray-200 flex-shrink-0">
                <div className="flex">
                  {subTabs.map((tab) => (
                    <button 
                      key={tab}
                      className={`px-4 py-3 text-sm ${activeSubTab === tab 
                        ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
                        : 'text-gray-600'}`}
                      onClick={() => setActiveSubTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Search */}
              <div className="p-3 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <button className="ml-2 p-2 text-gray-500">
                    <Filter className="h-5 w-5" />
                  </button>
                  <button className="ml-1 p-2 text-gray-500">
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Results */}
              <div className="flex items-center justify-between p-3 text-sm flex-shrink-0 border-b border-gray-200">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 mr-2 border-gray-300 rounded" />
                  <span className="text-gray-500">0 RESULTS</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <span>Latest-All</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </div>
              
              {/* Conversation list - empty state */}
              <div className="flex-1 overflow-y-auto">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center relative">
                      <div className="w-10 h-10 bg-gray-200 rounded border border-dashed border-gray-400 flex items-center justify-center">
                        <Search className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="absolute -right-1 -top-1 text-gray-400 text-2xl">?</div>
                      <div className="absolute -left-1 -top-1 text-gray-400 text-2xl">?</div>
                      <div className="absolute -right-1 -bottom-1 text-gray-400 text-2xl">?</div>
                      <div className="absolute -left-1 -bottom-1 text-gray-400 text-2xl">?</div>
                    </div>
                    <h3 className="mt-4 text-gray-500 text-lg">No unread conversations found</h3>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right content area - takes remaining width */}
            <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center relative">
                    <div className="w-10 h-10 bg-gray-200 rounded border border-dashed border-gray-400 flex items-center justify-center">
                      <Search className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="absolute -right-1 -top-1 text-gray-400 text-2xl">?</div>
                    <div className="absolute -left-1 -top-1 text-gray-400 text-2xl">?</div>
                    <div className="absolute -right-1 -bottom-1 text-gray-400 text-2xl">?</div>
                    <div className="absolute -left-1 -bottom-1 text-gray-400 text-2xl">?</div>
                  </div>
                  <h3 className="mt-4 text-gray-500 text-lg">No conversation selected</h3>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeMainTab === 'Manual Actions' && (
          <div className="w-full h-full bg-gray-50 flex flex-col">
            {/* Manual Actions header - now with inline controls */}
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-800">Manual Actions</h2>
              
              {/* Filter controls inline */}
              <div className="flex items-center gap-4">
                <div className="w-64">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Type to Search Workflows"
                      className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md text-sm"
                      value={selectedWorkflow}
                      onChange={(e) => setSelectedWorkflow(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="w-64">
                  <div className="relative">
                    <select
                      className="appearance-none pl-3 pr-10 py-2 w-full border border-gray-300 rounded-md text-sm text-gray-500"
                      value={selectedAssignee}
                      onChange={(e) => setSelectedAssignee(e.target.value)}
                    >
                      <option value="">Select Assignee</option>
                      <option value="user1">Amina</option>
                      <option value="user2">Haitham</option>
                      <option value="user2">Zahra</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
                  Let's start
                </button>
              </div>
            </div>
            
            {/* Manual Actions content - empty state */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl text-gray-800 font-medium mb-2">Good Work!</h3>
                <p className="text-gray-500">You have no pending tasks</p>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-end p-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
          </div>
        )}
        
        {activeMainTab === 'Snippets' && (
          <div className="w-full h-full bg-gray-50 flex flex-col">
            {/* Snippets header with buttons on the same line */}
            <div className="bg-gray-50 px-6 py-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-medium text-gray-800">Snippets</h2>
                <p className="text-gray-600 text-sm mt-2">
                  Create snippets to quickly insert predefined content into messages for faster, consistent communication.
                </p>
              </div>
              
              {/* Action buttons aligned to the right */}
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center text-gray-700 bg-white hover:bg-gray-50">
                  <Folder className="h-4 w-4 mr-2" />
                  Add Folder
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm flex items-center hover:bg-blue-600 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Snippet
                </button>
              </div>
            </div>
            
            {/* Snippets tabs */}
            <div className="bg-gray-50 px-6 border-b border-gray-200">
              <div className="flex">
                {snippetsTabs.map((tab) => (
                  <button 
                    key={tab}
                    className={`mr-6 py-3 text-sm ${activeSnippetsTab === tab 
                      ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
                      : 'text-gray-600'}`}
                    onClick={() => setActiveSnippetsTab(tab)}
                  >
                    {tab === 'All Snippets' ? 'All Snippets' : 'Folders'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search and filters in a card/box layout */}
            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                {/* Search and filters */}
                <div className="p-4 flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search Snippets"
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm"
                      value={searchSnippets}
                      onChange={(e) => setSearchSnippets(e.target.value)}
                    />
                  </div>
                  <button className="ml-2 px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center text-gray-700 bg-white hover:bg-gray-50">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                </div>

                {/* Table header - now with gray background */}
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-12 py-3 px-6 text-sm font-medium text-gray-500">
                    <div className="col-span-1 flex items-center">
                      <input type="checkbox" className="h-4 w-4 mr-2 border-gray-300 rounded" />
                    </div>
                    <div className="col-span-3">Name</div>
                    <div className="col-span-4">Body</div>
                    <div className="col-span-2">Folder</div>
                    <div className="col-span-2">Type</div>
                  </div>
                </div>
                
                {/* Empty state */}
                <div className="flex flex-col items-center justify-center py-20 bg-white text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FilePlus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-gray-500 text-lg mb-1">No Data</h3>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeMainTab === 'Trigger Links' && (
          <div className="w-full h-full bg-white flex flex-col">
            {/* Trigger Links subtabs dropdown/menu */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {triggerLinksTabs.map((tab) => (
                  <button 
                    key={tab}
                    className={`px-4 py-4 text-sm ${activeTriggerLinksTab === tab 
                      ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
                      : 'text-gray-600'}`}
                    onClick={() => setActiveTriggerLinksTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {activeTriggerLinksTab === 'Links' && (
              <div className="flex flex-col h-full">
                {/* Header and description */}
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-800">Link</h2>
                  <p className="text-gray-600 text-sm mt-4">
                    Trigger links allow you to put links inside SMS messages and emails, which allow you to track specific customer actions and trigger events based on when the link is clicked.
                  </p>
                </div>
                
                {/* Search bar and add link button */}
                <div className="px-6 py-4 flex justify-between items-center">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Trigger Link"
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm"
                      value={searchTriggerLink}
                      onChange={(e) => setSearchTriggerLink(e.target.value)}
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
                    Add Link
                  </button>
                </div>
                
                {/* Table headers */}
                <div className="px-6 border-t border-b border-gray-200 py-3">
                  <div className="grid grid-cols-12 text-sm font-medium text-gray-500">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-4">Link URL</div>
                    <div className="col-span-3">Link Key</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                </div>
                
                {/* Empty table - no content */}
                <div className="flex-1">
                  {/* Empty state is just blank space as shown in the screenshot */}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-end p-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTriggerLinksTab === 'Analyze' && (
              <div className="flex flex-col h-full">
                {/* Header and description */}
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-800">Analyze</h2>
                  <p className="text-gray-600 text-sm mt-4">
                    Trigger links allow you to put links inside SMS messages and emails, which allow you to track specific customer actions and trigger events based on when the link is clicked.
                  </p>
                </div>
                
                {/* Empty state with helper text */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-600">
                      You do not have any trigger link yet. <a href="#" className="text-blue-500 hover:underline">Click here to create your first trigger link</a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;