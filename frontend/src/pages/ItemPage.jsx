import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';

const ItemPage = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/intel/${itemId}`);
        const data = await res.json();
        setItem(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center">Not found</div>;

  const backHash = `#hub/${item.type === 'open_source' ? 'open-source' : item.type === 'ai_tool' ? 'tools' : 'report'}`;

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b-2 border-black px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <a href={backHash} className="font-bold text-sm hover:underline">← Back to {item.type.replace('_',' ')}</a>
        <div className="font-mono font-bold text-xl">Banana Intel <span className="bg-black text-white px-1 text-sm">[REPORT]</span></div>
        <div></div>
      </nav>
      <main className="max-w-4xl mx-auto p-6 lg:p-12">
        <h1 className="text-4xl font-bold mb-2">{item.title}</h1>
        <p className="text-gray-500 mb-6">{item.created_at?.split('T')[0]}</p>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-bold hover:underline mb-6">
            Reference <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        )}
        <div className="prose prose-lg max-w-none font-serif leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {item.content || item.description || ''}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export default ItemPage;

