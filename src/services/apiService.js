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
    //   console.log(data.data.content)

      return data.data.content;
    } catch (error) {
      throw error;
    }
  }, 
};

export default apiService;
