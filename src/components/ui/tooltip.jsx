import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

const TooltipContext = createContext(null);

export const TooltipProvider = ({ children }) => {
  const [tooltipState, setTooltipState] = useState({
    isVisible: false,
    text: '',
    position: { x: 0, y: 0 }
  });

  return (
    <TooltipContext.Provider value={{ tooltipState, setTooltipState }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};

export const TooltipTrigger = ({ children, asChild }) => {
  const { setTooltipState } = useTooltip();
  const triggerRef = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = triggerRef.current.getBoundingClientRect();
    setTooltipState({
      isVisible: true,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.bottom
      }
    });
  };

  const handleMouseLeave = () => {
    setTooltipState(prev => ({ ...prev, isVisible: false }));
  };

  const child = asChild ? React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }) : (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );

  return child;
};

export const TooltipContent = ({ children, className }) => {
  const { tooltipState } = useTooltip();
  const contentRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!contentRef.current || !tooltipState.isVisible) return;

    const contentRect = contentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = tooltipState.position.x;
    let y = tooltipState.position.y;

    // Adjust horizontal position if needed
    if (x + contentRect.width / 2 > viewportWidth) {
      x = viewportWidth - contentRect.width / 2 - 10;
    } else if (x - contentRect.width / 2 < 0) {
      x = contentRect.width / 2 + 10;
    }

    // Adjust vertical position if needed
    if (y + contentRect.height > viewportHeight) {
      y = tooltipState.position.y - contentRect.height - 10;
    }

    setPosition({ x, y });
  }, [tooltipState]);

  if (!tooltipState.isVisible) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-[250px] backdrop-blur-sm border border-gray-600",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)'
      }}
    >
      {children}
    </div>
  );
};

const Tooltip = ({ children }) => {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  );
};

export default Tooltip;
