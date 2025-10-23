"use client";

import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  name: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
  className?: string;
  tabListClassName?: string;
  tabButtonClassName?: string;
  tabPanelClassName?: string;
}

export function Tabs({
  tabs,
  defaultTab = 0,
  className,
  tabListClassName,
  tabButtonClassName,
  tabPanelClassName,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div
        className={cn(
          "flex border-b border-gray-200 dark:border-gray-700",
          tabListClassName
        )}
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 font-medium text-sm transition-colors relative",
              "hover:text-gray-900 dark:hover:text-gray-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              activeTab === index
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray-400",
              tabButtonClassName
            )}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
          >
            {tab.name}
            {/* Active indicator */}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={cn(
            "py-4",
            activeTab === index ? "block" : "hidden",
            tabPanelClassName
          )}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
