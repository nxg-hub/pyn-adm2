// TODO, PLEASE ADD ALL APIS TO . ENV FILE, SOME OF THE APIS WILL BE WRONG BECASUE OF THE BASE URL, PLS DONT EXPOSE ANY API THIS IS JUT FOR TH PURPOSE OF TEST
// TODO: PLEASE RETURN THE REUSABLE MODAL AND USE THE REUSABLE LOADER WHERE NECESSARY
// TODO: ALSO RECALL THAT THEERE ARE ADMIN ROLES AND PERMISSIONS.
import axios from 'axios';

const apiService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data && response.data.data && response.data.data.token) {
                localStorage.setItem('authToken', response.data.data.token);

                const userData = {
                    adminId: response.data.data.adminId,
                    email: response.data.data.email,
                    role: response.data.data.role,
                    permissions: [], // TODO:Add actual permissions if It is available in the response body
                };

                localStorage.setItem('user', JSON.stringify(userData));
            }

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            // TODO: logout api int
            // If there's a logout API endpoint, uncomment the following:
            // const token = localStorage.getItem('authToken');
            // if (token) {
            //   await axios.post(
            //     `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/logout`,
            //     {},
            //     {
            //       headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json',
            //       },
            //     }
            //   );
            // }


            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);

            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            throw error;
        }
    },

    inviteAdmin: async (email, adminUserType) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/invite`,
                { email, adminUserType },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Admin invitation error:', error);
            throw error;
        }
    },

    completeRegistration: async (token, userData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/complete-registration?token=${token}`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Registration completion error:', error);
            throw error;
        }
    },

    requestPasswordReset: async (email) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/forgot-password`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Password reset request error:', error);
            throw error;
        }
    },

    resetPassword: async (token, password, confirmPassword) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/reset-password?token=${token}`,
                { password, confirmPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Password reset error:', error);
            throw error;
        }
    },

    verify2FA: async (code) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/verify-2fa`,
                { code },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('2FA verification error:', error);
            throw error;
        }
    },

    getCurrentUser: () => {
        try {
            const userData = localStorage.getItem('user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Failed to get current user:', error);
            return null;
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },
};

export default apiService;