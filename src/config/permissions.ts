import { NavigationItemKey } from '../types';

/**
 * Centralized Role & Visibility Policy for KAMCH ERP Frontend.
 * Note: All rules here are strictly mirrored and enforced on the backend APIs.
 */

const ROLE_MODULES: Record<string, NavigationItemKey[]> = {
  SUPER_ADMIN: [
    'welcome',
    'user_mgmt',
    'fees_mgmt',
    'student_records',
    'teacher_records',
    'marks_mgmt',
    'dept_portal',
    'library_mgmt',
  ],
  PRINCIPAL: [
    'welcome',
    'user_mgmt',
    'fees_mgmt',
    'student_records',
    'teacher_records',
    'marks_mgmt',
    'dept_portal',
    'library_mgmt',
  ],
  SECRETARY: [
    'welcome',
    'user_mgmt',
    'fees_mgmt',
    'student_records',
    'teacher_records',
    'marks_mgmt',
    'dept_portal',
    'library_mgmt',
  ],
  OFFICE: ['welcome', 'fees_mgmt', 'student_records', 'teacher_records', 'marks_mgmt'],
  STAFF: ['welcome', 'fees_mgmt', 'student_records', 'teacher_records', 'marks_mgmt'],
  DEPARTMENT: ['dept_portal', 'teacher_records', 'marks_mgmt'],
  HOD: ['dept_portal', 'teacher_records', 'marks_mgmt'],
  LIBRARY: ['library_mgmt'],
};

const MODULE_PATHS: Record<string, NavigationItemKey> = {
  '/': 'welcome',
  '/user-management': 'user_mgmt',
  '/users': 'user_mgmt',
  '/fees': 'fees_mgmt',
  '/fees-management': 'fees_mgmt',
  '/students': 'student_records',
  '/teachers': 'teacher_records',
  '/marks': 'marks_mgmt',
  '/department': 'dept_portal',
  '/library': 'library_mgmt',
};

const PATH_FOR_MODULE: Partial<Record<NavigationItemKey, string>> = {
  welcome: '/',
  user_mgmt: '/user-management',
  fees_mgmt: '/fees',
  student_records: '/students',
  teacher_records: '/teachers',
  marks_mgmt: '/marks',
  dept_portal: '/department',
  library_mgmt: '/library',
};

export function getPermittedModules(role?: string | null): NavigationItemKey[] {
  if (!role) return ['welcome'];
  return ROLE_MODULES[role] || ['welcome'];
}

export function getDefaultModuleForRole(role?: string | null): NavigationItemKey {
  if (!role) return 'welcome';
  const permitted = getPermittedModules(role);
  return permitted[0] || 'welcome';
}

export function canAccessModule(role: string | null | undefined, moduleKey: NavigationItemKey): boolean {
  if (!role) return moduleKey === 'welcome';
  return getPermittedModules(role).includes(moduleKey);
}

export function canManageUsers(role?: string | null): boolean {
  return Boolean(role && ['SUPER_ADMIN', 'PRINCIPAL', 'SECRETARY'].includes(role));
}

export function isSuperAdminRole(role?: string | null): boolean {
  return role === 'SUPER_ADMIN';
}

export function isDepartmentAccountRole(role?: string | null): boolean {
  return Boolean(role && ['DEPARTMENT', 'HOD'].includes(role));
}

export function isOfficeMemberRole(role?: string | null): boolean {
  return Boolean(role && ['OFFICE', 'STAFF'].includes(role));
}

export function moduleFromPathname(pathname: string): NavigationItemKey | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return MODULE_PATHS[clean] || null;
}

export function pathnameForModule(moduleKey: NavigationItemKey): string {
  return PATH_FOR_MODULE[moduleKey] || '/';
}
