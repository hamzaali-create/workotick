import { has, includes } from 'lodash';

/**
 * Utility functions for permission checking
 * These can be used outside of React components
 */

/**
 * Check if user has a specific feature permission
 * @param {Object} organization - The organization object
 * @param {string} feature - The feature name to check
 * @returns {boolean} Whether the user has the feature
 */
export const hasFeature = (organization, feature) => {
  if (!organization?.plan?.features) return false;
  return has(organization.plan.features, feature);
};

/**
 * Check if user has a specific role
 * @param {Object} organization - The organization object
 * @param {string|string[]} roles - Role(s) to check for
 * @returns {boolean} Whether the user has the role
 */
export const hasRole = (organization, roles) => {
  if (!organization?.role) return false;
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return includes(roleArray, organization.role);
};

/**
 * Check if user is admin
 * @param {Object} organization - The organization object
 * @returns {boolean} Whether the user is admin
 */
export const isAdmin = (organization) => {
  return hasRole(organization, 'admin');
};

/**
 * Check if user has screenshot view permission
 * @param {Object} organization - The organization object
 * @returns {boolean} Whether the user can view screenshots
 */
export const canViewScreenshots = (organization) => {
  return (
    organization?.allow_screenshot_view ||
    isAdmin(organization)
  );
};

/**
 * Check if user has a specific organization setting permission
 * @param {Object} organization - The organization object
 * @param {string} setting - The setting name to check
 * @param {boolean} adminOverride - Whether admin role should override the setting
 * @returns {boolean} Whether the user has the permission
 */
export const hasSetting = (organization, setting, adminOverride = false) => {
  const hasSettingValue = organization?.[setting];
  return adminOverride ? (hasSettingValue || isAdmin(organization)) : hasSettingValue;
};

/**
 * Check multiple permissions with AND logic
 * @param {Object} organization - The organization object
 * @param {Array} permissions - Array of permission objects
 * @returns {boolean} Whether all permissions are satisfied
 */
export const hasAllPermissions = (organization, permissions) => {
  return permissions.every(permission => {
    if (permission.type === 'feature') {
      return hasFeature(organization, permission.value);
    } else if (permission.type === 'role') {
      return hasRole(organization, permission.value);
    } else if (permission.type === 'setting') {
      return hasSetting(organization, permission.value, permission.adminOverride);
    }
    return false;
  });
};

/**
 * Check multiple permissions with OR logic
 * @param {Object} organization - The organization object
 * @param {Array} permissions - Array of permission objects
 * @returns {boolean} Whether any permission is satisfied
 */
export const hasAnyPermission = (organization, permissions) => {
  return permissions.some(permission => {
    if (permission.type === 'feature') {
      return hasFeature(organization, permission.value);
    } else if (permission.type === 'role') {
      return hasRole(organization, permission.value);
    } else if (permission.type === 'setting') {
      return hasSetting(organization, permission.value, permission.adminOverride);
    }
    return false;
  });
};

/**
 * Common permission configurations
 */
export const PERMISSIONS = {
  // Feature-based permissions
  TEAM_MANAGEMENT: { type: 'feature', value: 'team-management' },
  TIMESHEET: { type: 'feature', value: 'timesheet' },
  SCREENSHOT_INTERVALS: { type: 'feature', value: 'screenshot-intervals' },
  IDLE_TIMEOUT: { type: 'feature', value: 'idle-timeout' },
  
  // Role-based permissions
  ADMIN: { type: 'role', value: 'admin' },
  MANAGER: { type: 'role', value: 'manager' },
  EMPLOYEE: { type: 'role', value: 'employee' },
  
  // Setting-based permissions
  SCREENSHOT_VIEW: { type: 'setting', value: 'allow_screenshot_view', adminOverride: true },
  
  // Combined permissions
  ADMIN_OR_TEAM_MANAGEMENT: [
    { type: 'role', value: 'admin' },
    { type: 'feature', value: 'team-management' }
  ],
  
  SCREENSHOT_ACCESS: [
    { type: 'setting', value: 'allow_screenshot_view', adminOverride: true }
  ]
};

/**
 * Helper function to create permission objects
 */
export const createPermission = (type, value, adminOverride = false) => ({
  type,
  value,
  adminOverride
});

export default {
  hasFeature,
  hasRole,
  isAdmin,
  canViewScreenshots,
  hasSetting,
  hasAllPermissions,
  hasAnyPermission,
  PERMISSIONS,
  createPermission
};
