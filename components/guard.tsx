import { Permission, serverCan } from '@/lib/permissions';

interface GuardProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export async function Guard({ permission, children, fallback = null }: GuardProps) {
  const isAllowed = await serverCan(permission);

  if (!isAllowed) return <>{fallback}</>;
  return <>{children}</>;
}
