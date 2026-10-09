import { auth } from "@/lib/auth"; 
import { authClient } from "@/lib/auth-client"; 
import { headers } from "next/headers";

export const PERMISSION_MAP = {
  "dashboard:view": { routes: ["/dashboard"], allowedRoles: ["admin", "manager", "user"] },
  "users:manage": { routes: ["/dashboard/users"], allowedRoles: ["admin"] },
  "billing:edit": { routes: ["/dashboard/billing"], allowedRoles: ["admin"] },
  "reports:view": { routes: ["/dashboard/reports"], allowedRoles: ["admin", "manager"] }
} as const;

export type Permission = keyof typeof PERMISSION_MAP;

// for ts err on check() on useCan()
interface MinimumSessionShape {
  user: {
    role?: string | null;
    [key: string]: any;
  };
}

function check(session: MinimumSessionShape | null | undefined, permission: Permission): boolean {
  if (!session || !session.user || !session.user.role) return false;
  const config = PERMISSION_MAP[permission];
  return config?.allowedRoles.includes(session.user.role as any) ?? false;
}

//for proxy. basic check if user can access the path
export function can(session: MinimumSessionShape | null | undefined, permission: Permission): boolean {
  return check(session, permission);
}

//hepler for serverside func/compoenents and api route
export async function serverCan(permission: Permission): Promise<boolean> {
  const session = await auth.api.getSession({ headers: await headers() });
  return check(session, permission);
}

//for client compoenets you can use as hook as it is, or you can use <Guard/> compoenent since it already inherits this usage.
export function useCan(permission: Permission): boolean {
  const { data: session } = authClient.useSession();
  return check(session, permission);
}

//helper func for middleware/proxy
export function getRequiredPermissionForRoute(pathname: string): Permission | null {
  for (const [permission, config] of Object.entries(PERMISSION_MAP)) {
    if (config.routes.some(route => pathname === route || pathname.startsWith(route + "/"))) {
      return permission as Permission;
    }
  }
  return null;
}
