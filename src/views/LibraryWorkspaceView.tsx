import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LibraryWorkspaceView: React.FC = () => {
  const { user } = useAuth();
  const [verifiedOperator, setVerifiedOperator] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/library/workspace')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.operator?.fullName) {
          setVerifiedOperator(data.operator.fullName);
        }
      })
      .catch(() => {
        // Ignore background failure
      });
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Library"
        description="Institutional library administration workspace for Krishna Ayurvedic Medical College & Hospital."
      />

      <Card accentTop>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#4B2E2E]/10 flex items-center justify-center text-[#4B2E2E]">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <CardTitle>Central Library Administration</CardTitle>
              <CardDescription>
                Authenticated Library Workspace
              </CardDescription>
            </div>
          </div>
          {user && (
            <Badge variant="institutional" size="sm">
              {user.roleName}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="text-xs text-stone-600 leading-relaxed space-y-2">
          <p>
            Active Operator: <strong className="text-stone-900">{verifiedOperator || user?.fullName}</strong> ({user?.username})
          </p>
          <p className="text-stone-500">
            This account is scoped strictly to Library operations and is isolated from User Management, Fees Management, Office, and Department modules.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
