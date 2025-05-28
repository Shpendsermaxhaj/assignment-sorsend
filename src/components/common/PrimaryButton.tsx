import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ icon, children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors 
      duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${className}`}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);

export default PrimaryButton; 