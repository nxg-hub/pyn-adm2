import apiService from "./api-service";

class AuthService {
    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Login result
     */
    async login(email, password) {
        try {
            const response = await apiService.login(email, password);

            return {
                success: true,
                data: response.data,
                message: response.message || "Login successful",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Login failed",
            };
        }
    }

    /**
     * Logout user
     * @returns {Promise} Logout result
     */
    async logout() {
        try {
            await apiService.logout();
            return {
                success: true,
                message: "Logout successful",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || "Logout failed",
            };
        }
    }

    /**
     * Invite admin user
     * @param {string} email - Admin email
     * @param {string} role - Admin role
     * @returns {Promise} Invite result
     */
    async inviteAdmin(email, role) {
        try {
            // Map frontend role values to backend adminUserType values if needed
            const roleMap = {
                general_manager: "GENERAL_MANAGER",
                operations_manager: "OPERATIONS_MANAGER",
                finance_manager: "FINANCE_MANAGER",
                customer_care: "CUSTOMER_CARE",
            };

            const adminUserType = roleMap[role] || role.toUpperCase();
            const response = await apiService.inviteAdmin(email, adminUserType);

            return {
                success: true,
                data: response.data,
                message: response.message || "Invitation sent successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Failed to send invitation",
            };
        }
    }

    /**
     * Complete admin registration
     * @param {string} token - Invitation token
     * @param {Object} userData - User registration data
     * @returns {Promise} Registration result
     */
    async completeRegistration(token, userData) {
        try {
            const response = await apiService.completeRegistration(token, userData);
            return {
                success: true,
                data: response.data,
                message: response.message || "Registration completed successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Registration failed",
            };
        }
    }

    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {Promise} Password reset request result
     */
    async requestPasswordReset(email) {
        try {
            const response = await apiService.requestPasswordReset(email);
            return {
                success: true,
                message: response.message || "Password reset email sent",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Failed to send password reset email",
            };
        }
    }

    /**
     * Reset password
     * @param {string} token - Reset token
     * @param {string} password - New password
     * @param {string} confirmPassword - Confirm new password
     * @returns {Promise} Password reset result
     */
    async resetPassword(token, password, confirmPassword) {
        try {
            const response = await apiService.resetPassword(token, password, confirmPassword);
            return {
                success: true,
                message: response.message || "Password reset successful",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Failed to reset password",
            };
        }
    }

    /**
     * Verify two-factor authentication
     * @param {string} code - 2FA verification code
     * @returns {Promise} 2FA verification result
     */
    async verify2FA(code) {
        try {
            const response = await apiService.verify2FA(code);
            return {
                success: true,
                data: response.data,
                message: response.message || "Verification successful",
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Invalid verification code",
            };
        }
    }

    /**
     * Get current authenticated user
     * @returns {Object|null} User data or null if not authenticated
     */
    getCurrentUser() {
        return apiService.getCurrentUser();
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated
     */
    isAuthenticated() {
        return apiService.isAuthenticated();
    }

    /**
     * Check if user has specific role
     * @param {string} role - Role to check
     * @returns {boolean} True if user has role
     */
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }

    /**
     * Check if user has a specific permission
     * @param {string} permission - Permission to check
     * @returns {boolean} True if user has permission
     */
    checkPermission(permission) {
        const user = this.getCurrentUser();
        return user && user.permissions && user.permissions.includes(permission);
    }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;