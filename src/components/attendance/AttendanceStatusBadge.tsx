
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AttendanceStatusBadgeProps {
  status: 'Present' | 'Late' | 'Absent' | undefined;
}

const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  if (!status) return null;
  
  const badgeClasses = {
    Present: 'bg-green-100 text-green-800 hover:bg-green-100',
    Late: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    Absent: 'bg-red-100 text-red-800 hover:bg-red-100'
  };

  return (
    <Badge className={badgeClasses[status]}>
      {status}
    </Badge>
  );
};

export default AttendanceStatusBadge;
