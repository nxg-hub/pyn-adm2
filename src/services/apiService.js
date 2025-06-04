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


  registerSuperAdmin: async (requestData) => {
    const response = await fetch(`${import.meta.env.VITE_REGISTER_SUPER_ADMIN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Failed to register super admin');
    }

    return response.json();
  },

  inviteAdmin: async (requestData) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ADMIN_INVITE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    return response.json();
  },

  completeRegistration: async (requestData) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COMPLETE_REG}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    return response.json();
  },

  getPendingVerificationUsers: async () => {
    const response = await fetch(`${import.meta.env.VITE_GET_PENDING_VERIFICATION_USERS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  getRecentlyActiveUsers: async () => {
    const response = await fetch(`${import.meta.env.VITE_GET_RECENTLY_ACTIVE_USERS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  suspendUser: async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_SUSPEND_USER}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  unsuspendUser: async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_UNSUSPEND_USER}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  flagUser: async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_FLAG_USER}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  unflagUser: async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_UNFLAG_USER}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  getSuspendedUsers: async () => {
    const response = await fetch(`${import.meta.env.VITE_GET_SUSPENDED_USERS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  getFlaggedUsers: async () => {
    const response = await fetch(`${import.meta.env.VITE_GET_FLAGGED_USERS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
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
  addMessageToTicket: async (id, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets/${id}/messages`,
         {
          method: 'POST',
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
  getTicketMessages: async (id, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets/${id}/messages`,
         {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),

        }
      );
       const data = await response.json();

      return data.data.content
    } catch (error) {
      throw error;
    }
  },
      
    
  
};

export default apiService;