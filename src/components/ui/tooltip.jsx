import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

const Tooltip = ({ text, definition, position }) => {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: position.x, y: position.y });
  const [isVisible, setIsVisible] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  
  useEffect(() => {
    if (!tooltipRef.current) return;
    
    const tooltipEl = tooltipRef.current;
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const parentRect = tooltipEl.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
    
    if (!parentRect) return;
    
    // Default position
    let newX = position.x;
    let newY = position.y + 18;
    let above = false;
    
    // Check horizontal boundaries
    const rightOverflow = newX + (tooltipRect.width / 2) - parentRect.right + 10;
    const leftOverflow = parentRect.left - (newX - (tooltipRect.width / 2)) + 10;
    
    // Adjust horizontal position if needed
    if (rightOverflow > 0) {
      newX -= rightOverflow;
    } else if (leftOverflow > 0) {
      newX += leftOverflow;
    }
    
    // Make sure tooltip doesn't go off left or right edges completely
    newX = Math.max(tooltipRect.width / 2 + 5, Math.min(newX, parentRect.width - (tooltipRect.width / 2) - 5));
    
    // Check if tooltip would go below the parent container
    const bottomOverflow = newY + tooltipRect.height - parentRect.bottom + 10;
    
    // If it would overflow bottom, place it above the cursor instead
    if (bottomOverflow > 0) {
      newY = position.y - tooltipRect.height - 10;
      above = true;
    }
    
    setShowAbove(above);
    setTooltipPosition({ x: newX, y: newY });
    setIsVisible(true);
  }, [position]);
  
  if (!isVisible) {
    return <div ref={tooltipRef} className="absolute opacity-0" />;
  }

  return (
    <div 
      ref={tooltipRef}
      className="absolute z-50 animate-fade-in"
      style={{ 
        top: `${tooltipPosition.y}px`, 
        left: `${tooltipPosition.x}px`, 
        transform: 'translateX(-50%)' 
      }}
    >
      <div className="relative">
        {/* Triangle pointer - only show if tooltip is below cursor */}
        {!showAbove && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-blue-600"></div>
        )}
        
        {/* Triangle pointer - show if tooltip is above cursor */}
        {showAbove && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-600"></div>
        )}
        
        {/* Tooltip content with margin */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-[250px] backdrop-blur-sm border border-gray-600 m-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold truncate">{text}</h3>
            <span className="text-xs bg-blue-500 px-2 py-0.5 rounded-full text-blue-100 whitespace-nowrap">Java keyword</span>
          </div>
          <p className="text-sm break-words">{definition}</p>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
