import "server-only";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const PERMISSION_MAP = {
  "dashboard:view": {
    routes: ["/"],
    allowedRoles: ["admin", "owner", "user"],
  },

  "profile:view": {
    routes: ["/profile"],
    allowedRoles: ["admin", "owner", "user"],
  },

  "profile:update": {
    routes: ["/profile/update"],
    allowedRoles: ["admin", "owner", "user"],
  },

  "users:list:view": {
    routes: ["/users"],
    allowedRoles: ["admin"],
  },

  "users:detail:view": {
    routes: ["/users/[user]"],
    allowedRoles: ["admin"],
  },

  "users:edit": {
    routes: ["/users/[user]/edit"],
    allowedRoles: ["admin"],
  },

  "users:create": {
    routes: ["/users/create"],
    allowedRoles: ["admin"],
  },

  "properties:list:view": {
    routes: ["/properties"],
    allowedRoles: ["admin", "owner"],
  },

  "properties:create": {
    routes: ["/properties/new"],
    allowedRoles: ["admin"],
  },

  "properties:detail:view": {
    routes: ["/properties/[property]"],
    allowedRoles: ["admin"],
  },

  "properties:detail:edit": {
    routes: ["/properties/[property]/edit"],
    allowedRoles: ["admin"],
  },
} as const;

export type Permission = keyof typeof PERMISSION_MAP;

interface MinimumSessionShape {
  user: {
    role?: string | null;
  };
}

function check(
  session: MinimumSessionShape | null | undefined,
  permission: Permission,
): boolean {
  const role = session?.user?.role;

  if (!role) {
    return false;
  }

  const allowedRoles = PERMISSION_MAP[permission]
    .allowedRoles as readonly string[];

  return allowedRoles.includes(role);
}
export function can(
  session: MinimumSessionShape | null | undefined,
  permission: Permission,
): boolean {
  return check(session, permission);
}

//hepler for serverside func/compoenents and api route. Always use this for DAL and Zero Trust.
export async function serverCan(permission: Permission): Promise<boolean> {
  //for normal fetches we can trust the better-auth cookie cache
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return check(session, permission);
}

//hepler for serverside func/compoenents and api route. Always use this for DAL and Zero Trust.
export async function serverCanMutate(
  permission: Permission,
): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
    //IMPORTANT: in MUTATIONS, never trust to better-auth cookie cache. It's industry standart for DAL and Zero Trust Policy
    query: { disableCookieCache: true },
  });

  return check(session, permission);
}

// check for dynamic or any kinda level of deep path
function routeMatches(pattern: string, pathname: string): boolean {
  const patternParts = pattern.split("/").filter(Boolean);

  const pathnameParts = pathname.split("/").filter(Boolean);

  if (patternParts.length !== pathnameParts.length) {
    return false;
  }

  return patternParts.every((part, index) => {
    const isDynamicSegment = part.startsWith("[") && part.endsWith("]");

    if (isDynamicSegment) {
      return Boolean(pathnameParts[index]);
    }

    return part === pathnameParts[index];
  });
}

//helper func for middleware/proxy

export function getRequiredPermissionForRoute(
  pathname: string,
): Permission | null {
  for (const [permission, config] of Object.entries(PERMISSION_MAP)) {
    const matches = config.routes.some((route) =>
      routeMatches(route, pathname),
    );

    if (matches) {
      return permission as Permission;
    }
  }

  return null;
}
