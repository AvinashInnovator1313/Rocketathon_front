import React, { useState } from 'react';
import {
  Search,
  GraduationCap,
  Presentation,
  BookOpen,
  HeartHandshake,
  Briefcase,
  Building2,
  MessageSquare,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { MOCK_TOPICS } from '../api/mockApi';

interface KnowledgeViewProps {
  onSelectTopicQuery: (query: string) => void;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({ onSelectTopicQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCardDetails, setActiveCardDetails] = useState<typeof MOCK_TOPICS[0] | null>(null);

  const categories = ['All', 'Teaching', 'Academic', 'Advice', 'Experience', 'FAQs'];

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    GraduationCap,
    Presentation,
    BookOpen,
    HeartHandshake,
    Briefcase,
    Building2,
    MessageSquare,
    Lightbulb
  };

  const filteredTopics = MOCK_TOPICS.filter((topic) => {
    const matchesCat = selectedCategory === 'All' || topic.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.suggestedQuery.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
      {/* 1. Top Search Bar matching Wireframe 1 */}
      <div className="relative w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-[#5A6478] dark:text-[#9AA6BD]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search slides, topics, OOP concepts, or course guidelines..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FFFEF9] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] text-[#1A2238] dark:text-[#ECE8DD] placeholder-[#5A6478]/70 focus:outline-hidden focus:border-[#B08A3E] dark:focus:border-[#D4AF63] shadow-xs text-sm md:text-base transition-colors"
          />
        </div>
      </div>

      {/* 2. Filter Pills Row matching Wireframe 1 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border ${
                isActive
                  ? 'bg-[#ECF1DD] text-[#1B2A4A] border-[#8A9A60] dark:bg-[#24314F] dark:text-[#D4AF63] dark:border-[#D4AF63]'
                  : 'bg-[#FFFEF9] text-[#5A6478] border-[#E4DCCB] dark:bg-[#151E36] dark:text-[#9AA6BD] dark:border-[#2A3556] hover:bg-[#FAF6EE] dark:hover:bg-[#1D2848]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. 2x4 Cards Grid matching Wireframe 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTopics.map((topic) => {
          const Icon = iconMap[topic.icon] || BookOpen;

          return (
            <div
              key={topic.id}
              onClick={() => setActiveCardDetails(topic)}
              className="flex flex-col justify-between p-5 min-h-[140px] rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] hover:border-[#B08A3E] dark:hover:border-[#D4AF63] hover:shadow-xs transition-all cursor-pointer group text-left"
            >
              {/* Top Row: Icon matching wireframe position */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#1D2848] text-[#1B2A4A] dark:text-[#D4AF63] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#ECE8DD]">
                  {topic.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-4 space-y-1">
                <h4 className="font-academic text-base font-bold text-[#1B2A4A] dark:text-[#8FAAD6] group-hover:text-[#B08A3E] dark:group-hover:text-[#D4AF63] transition-colors leading-snug">
                  {topic.title}
                </h4>
                <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD] line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              {/* Bottom Callout */}
              <div className="mt-3 pt-2 border-t border-[#E4DCCB]/40 dark:border-[#2A3556]/40 flex items-center justify-between text-[11px] text-[#7A5C1E] dark:text-[#D4AF63] font-medium">
                <span>Explore topic</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="p-8 text-center rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] text-[#5A6478] dark:text-[#9AA6BD] space-y-2">
          <p className="font-academic text-lg font-bold">No lecture topics matched your search.</p>
          <p className="text-xs">Try searching for "marks", "polymorphism", "aggregation", or "IDE".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-2 text-xs font-semibold text-[#1B2A4A] dark:text-[#8FAAD6] underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Topic Detail Modal */}
      {activeCardDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#FFFCF3] dark:bg-[#151E36] border border-[#E4DCCB] dark:border-[#2A3556] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EDF0DB] dark:bg-[#24314F] text-[#1B2A4A] dark:text-[#ECE8DD]">
                {activeCardDetails.category}
              </span>
              <button
                onClick={() => setActiveCardDetails(null)}
                className="text-xs text-[#5A6478] hover:text-[#1A2238] dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <h3 className="font-academic text-xl font-bold text-[#1B2A4A] dark:text-[#8FAAD6]">
              {activeCardDetails.title}
            </h3>

            <p className="text-xs text-[#5A6478] dark:text-[#9AA6BD] leading-relaxed">
              {activeCardDetails.description}
            </p>

            <div className="p-3 rounded-xl bg-[#FAF6EE] dark:bg-[#111A30] border border-[#E4DCCB] dark:border-[#2A3556] space-y-1.5">
              <span className="text-[11px] font-semibold text-[#7A5C1E] dark:text-[#D4AF63] uppercase tracking-wide block mb-1">
                Suggested Query:
              </span>
              <p className="text-xs font-medium text-[#1A2238] dark:text-[#ECE8DD]">
                "{activeCardDetails.suggestedQuery}"
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveCardDetails(null)}
                className="px-3 py-1.5 text-xs rounded-lg border border-[#E4DCCB] dark:border-[#2A3556] hover:bg-[#FAF6EE] text-[#5A6478]"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  onSelectTopicQuery(activeCardDetails.suggestedQuery);
                  setActiveCardDetails(null);
                }}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-[#1B2A4A] text-white hover:bg-[#14203A] dark:bg-[#D4AF63] dark:text-[#0E1526] shadow-xs flex items-center gap-1.5"
              >
                <span>Ask Stand-In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
