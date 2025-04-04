
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AttendanceWarningProps {
  type: 'past' | 'future' | 'submitted';
  className?: string;
}

const AttendanceWarning: React.FC<AttendanceWarningProps> = ({ type, className = '' }) => {
  const messages = {
    past: "You cannot mark attendance for past dates. Please contact an administrator.",
    future: "You cannot mark attendance for future dates.",
    submitted: "Attendance has been submitted and can only be edited by administrators."
  };
  
  const styles = {
    past: "bg-yellow-50 border border-yellow-200 text-yellow-700",
    future: "bg-yellow-50 border border-yellow-200 text-yellow-700",
    submitted: "bg-blue-50 border border-blue-200 text-blue-700"
  };
  
  const iconStyles = {
    past: "text-yellow-500",
    future: "text-yellow-500",
    submitted: "text-blue-500"
  };

  return (
    <div className={`rounded-md p-3 mb-2 flex items-center ${styles[type]} ${className}`}>
      <AlertTriangle className={`h-5 w-5 mr-2 ${iconStyles[type]}`} />
      <p className="text-sm">
        {messages[type]}
      </p>
    </div>
  );
};

export default AttendanceWarning;
