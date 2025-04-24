import apiService from "./api-service";

class AuthService {
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


    getCurrentUser() {
        return apiService.getCurrentUser();
    }

    isAuthenticated() {
        return apiService.isAuthenticated();
    }

    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }

    checkPermission(permission) {
        const user = this.getCurrentUser();
        return user && user.permissions && user.permissions.includes(permission);
    }
}

const authService = new AuthService();
export default authService;