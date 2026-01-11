import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lock, Search, Filter, ExternalLink, Database, Code, FileText } from 'lucide-react';
import { API_BASE_URL } from '../config';

const HubLayout = ({ initialFilter = 'all' }) => {
  const [intelItems, setIntelItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter); // all, report, ai_tool, open_source
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchIntel();
  }, []);
  
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const fetchIntel = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/intel/`);
      const data = await response.json();
      setIntelItems(data);
    } catch (error) {
      console.error('Error fetching intel:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = intelItems.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type) => {
    switch(type) {
      case 'open_source': return <Code className="w-4 h-4" />;
      case 'ai_tool': return <Database className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'open_source': return 'REPO';
      case 'ai_tool': return 'AI TOOL';
      default: return 'REPORT';
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b-2 border-black px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="font-mono font-bold text-xl">Banana Intel <span className="bg-black text-white px-1 text-sm">[HUB]</span></div>
        <button className="bg-gray-400 text-white px-4 py-2 font-bold text-sm border-2 border-transparent cursor-not-allowed">
          WAITLIST ONLY
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Intel Hub.</h1>
          <p className="text-gray-600 max-w-2xl">
            Access the latest free market reports and tool lists below. Premium databases are locked for non-members.
          </p>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
          
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['all', 'report', 'ai_tool', 'open_source'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors whitespace-nowrap
                  ${filter === t ? 'bg-black text-white' : 'bg-white text-gray-500 hover:text-black border border-gray-200'}
                `}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search intel..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none w-full" 
            />
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 animate-pulse">Loading Intelligence...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className={`bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden group hover:shadow-lg transition-shadow
                  ${item.is_premium ? 'bg-gray-50' : ''}
                `}
              >
                {/* Premium Overlay */}
                {item.is_premium && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Lock className="w-8 h-8 text-gray-800 mb-2" />
                    <p className="font-bold text-sm">Premium Content</p>
                    <button className="mt-2 text-xs bg-black text-white px-3 py-1 rounded">Unlock</button>
                  </div>
                )}

                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  {item.is_premium ? (
                    <span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PREMIUM
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">FREE</span>
                  )}
                  <span className="text-gray-400 text-xs flex items-center gap-1 uppercase">
                    {getIcon(item.type)} {getTypeLabel(item.type)}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{item.title}</h3>
                
                <p className={`text-gray-600 text-sm mb-4 line-clamp-3 ${item.is_premium ? 'blur-[2px]' : ''}`}>
                  {item.description || "No description available."}
                </p>

                <div className="flex items-center gap-4 text-primary text-sm font-bold">
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center cursor-pointer hover:underline text-left"
                  >
                    Read Report <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline text-left">
                      Reference <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No intelligence found matching your criteria.
              </div>
            )}

          </div>
        )}

        {/* Report Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100] backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
            <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
              
              <div className="flex items-center gap-2 mb-4">
                 <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded uppercase">
                    {getTypeLabel(selectedItem.type)}
                 </span>
                 <span className="text-gray-400 text-sm">{selectedItem.created_at?.split('T')[0]}</span>
              </div>

              <h2 className="text-3xl font-bold mb-6 font-display">{selectedItem.title}</h2>
              
              {selectedItem.url && (
                <div className="mb-6">
                  <a 
                    href={selectedItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-primary font-bold hover:underline"
                  >
                    Reference <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              )}

              <div className="prose prose-lg max-w-none font-serif leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedItem.content || selectedItem.description || ''}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HubLayout;
