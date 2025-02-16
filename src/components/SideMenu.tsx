import React from 'react';
import { X, Home, Package, Wrench, Phone, FileText, HelpCircle, Settings } from 'lucide-react';

interface SideMenuProps {
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const menuItems = [
  { icon: Home, label: 'Home', view: 'home' },
  { icon: Package, label: 'Orders', view: 'orders' },
  { icon: Wrench, label: 'Services', view: 'services' },
  { icon: Phone, label: 'Contact Us', view: 'contact' },
  { icon: FileText, label: 'Terms & Conditions', view: 'terms' },
  { icon: HelpCircle, label: 'Help Center', view: 'help' },
  { icon: Settings, label: 'Settings', view: 'settings' },
];

export default function SideMenu({ onClose, onNavigate }: SideMenuProps) {
  const handleNavigation = (view: string) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-navy-900">Menu</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 py-4">
            {menuItems.map(({ icon: Icon, label, view }) => (
              <button
                key={label}
                onClick={() => handleNavigation(view)}
                className="w-full flex items-center space-x-4 px-6 py-3 hover:bg-gray-100 transition-colors"
              >
                <Icon className="h-5 w-5 text-navy-900" />
                <span className="text-gray-700">{label}</span>
              </button>
            ))}
          </div>
          <div className="p-4 border-t">
            <p className="text-sm text-gray-500">© 2024 BuildMart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}