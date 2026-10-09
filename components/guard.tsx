"use client";

import { useCan, Permission } from "@/lib/permissions";

interface GuardProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Guard({ permission, children, fallback = null }: GuardProps) {
  const isAllowed = useCan(permission);

  if (!isAllowed) return <>{fallback}</>;
  return <>{children}</>;
}
