import { useState, useEffect, useRef } from 'react';

export default function ScrollButtons({ scrollContainerRef }) {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  const updateVisibility = () => {
    const el = scrollContainerRef?.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScroll = scrollHeight > clientHeight;
    const threshold = 80;
    setShowTop(canScroll && scrollTop > threshold);
    setShowBottom(canScroll && scrollTop < scrollHeight - clientHeight - threshold);
  };

  useEffect(() => {
    const el = scrollContainerRef?.current;
    if (!el) return;
    updateVisibility();
    el.addEventListener('scroll', updateVisibility);
    const ro = new ResizeObserver(updateVisibility);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateVisibility);
      ro.disconnect();
    };
  }, [scrollContainerRef]);

  const scrollTo = (direction) => {
    const el = scrollContainerRef?.current;
    if (!el) return;
    const step = 300;
    const target = direction === 'up' ? el.scrollTop - step : el.scrollTop + step;
    el.scrollTo({ top: Math.max(0, Math.min(target, el.scrollHeight - el.clientHeight)), behavior: 'smooth' });
  };

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    const el = scrollContainerRef?.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-8 flex flex-col gap-2 z-30">
      {showTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors"
          title="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      {showBottom && (
        <button
          onClick={scrollToBottom}
          className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors"
          title="Scroll to bottom"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      {/* Incremental scroll up/down - always visible when scrollable */}
      {(showTop || showBottom) && (
        <div className="flex flex-col gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
          <button
            onClick={() => scrollTo('up')}
            className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
            title="Scroll up"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo('down')}
            className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
            title="Scroll down"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
