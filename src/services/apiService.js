const token = localStorage.getItem('token')

const apiService = {
  login: async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_ADMIN_ENDPOINT}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  SuspiciousActivities: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/compliance/suspicious?page=0&size=10&sortBy=createdAt&sortDir=desc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,

          },
        }
      );
       const data = await response.json();

      return data.data.content;
    } catch (error) {
      throw error;
    }
  }, 
   CreateNewSupportTicket: async (token, requestData) => {
try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.debugMessage || 'An error occurred.');
      }

      return result;
    } catch (error) {
      throw error
    }
  },
  FetchSupportTickets: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets?page=0&size=10&sortBy=createdAt&sortDir=desc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,

          },
        }
      );
       const data = await response.json();
    //   console.log(data.data.content)

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },
  resolveTicket: async (id, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets/${id}/resolve`,
         {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),

        }
      );
       const data = await response.json();

      return data
    } catch (error) {
      throw error;
    }
  },
  assignTicket: async (id, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets/${id}/assign`,
         {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),

        }
      );
       const data = await response.json();

      return data
    } catch (error) {
      throw error;
    }
  },
  fetchActivities: async (adminId, superAdminId, queryParams) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/management/${adminId}/activity-logs?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'X-Admin-Id': superAdminId,
            "Content-Type": "application/json",
          },
        }
      );
       const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch activities');
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },
  fetchAdmins: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_ALL_ADMINS}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
      },
        }
      );
       const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch admins');
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },
  fetchFlaggedUsers: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_FLAGGED_USERS}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
      },
        }
      );
       const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch flagged users');
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },
  fetchAdmin: async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_ADMIN_DETAILS}?email=${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
       const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch admin');
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },
  
  fetchSuspendedUsers: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_SUSPENDED_USERS}`, // Changed to correct endpoint
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch suspended users');
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },
  
  fetchUnsuspendedUsers: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_UNSUSPENDED_USERS}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
      },
        }
      );
       const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch unsuspeneded users');
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },

  fetchUsers: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_ALL_USERS}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
      },
        }
      );
       const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch all users');
      }

      return data?.data?.content ?? [];
    } catch (error) {
      throw error;
    }
  },

  
};

  
      
    
  


export default apiService;
