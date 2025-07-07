import axios from "axios";

//  const email =  localStorage.getItem("email")
const token = localStorage.getItem("token");

const apiService = {
  login: async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_LOGIN_ADMIN_ENDPOINT
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  registerSuperAdmin: async (requestData) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_REGISTER_SUPER_ADMIN_ENDPOINT
      }?secretKey=${import.meta.env.VITE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to register super admin");
    }
  },

  inviteAdmin: async (requestData, AdminId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ADMIN_INVITE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Inviting-Admin-Id": AdminId,
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to send invite");
    }

    return result;
  },

  completeRegistration: async (requestData, token) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_COMPLETE_REG
      }?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to complete registration");
    }
  },

  getPendingVerificationUsers: async (queryParams) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_PENDING_VERIFICATION_USERS
        }?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.data.content;
    } catch (error) {
      throw error;
    }
  },

  getRecentlyActiveUsers: async (queryParams) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_RECENTLY_ACTIVE_USERS
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.data.content;
    } catch (error) {
      throw error;
    }
  },

  suspendUser: async (requestData, AdminId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_SUSPEND_USER}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Id": AdminId,
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to suspend user");
    }
  },

  unsuspendUser: async (requestData, AdminId) => {
    const response = await fetch(
      `${import.meta.env.VITE_UNSUSPEND_USER}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Id": AdminId,
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to unsuspend user");
    }
  },

  flagUser: async (requestData, AdminId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FLAG_USER}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Id": AdminId,
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to flag user");
    }
  },

  unflagUser: async (requestData, AdminId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_UNFLAG_USER}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Id": AdminId,
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to flag user");
    }
  },

  deleteAdmin: async (XAdminId, adminId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/admin/management/${adminId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Id": XAdminId,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to delete admin");
    }
  },
  resetAdminPassword: async (requestData) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/password-reset/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to delete admin");
    }

    return result;
  },

  updateAdminPermission: async (formData, XAdminId, adminId) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/admin/management/${adminId}/permissions`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Id": XAdminId,
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.debugMessage || "Failed to update admin");
    }
  },

  SuspiciousActivities: async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/compliance/suspicious?page=0&size=10&sortBy=createdAt&sortDir=desc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.debugMessage || "An error occurred.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  CreateSuspiciousReport: async (token, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/compliance/suspicious`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.debugMessage || "An error occurred.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
  FetchSupportTickets: async (queryParams) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  },
  assignTicket: async (id, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets/${id}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  },
  addMessageToTicket: async (id, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets/${id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  },
  getTicketMessages: async (id, requestData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/support/tickets/${id}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },

  fetchActivities: async (adminId, superAdminId, queryParams) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/management/${adminId}/activity-logs?${queryParams}`,
        {
          method: "GET",
          headers: {
            "X-Admin-Id": superAdminId,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch activities");
      }

      return {
        data: data,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
  fetchAdmins: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_ALL_ADMINS
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch admins");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
  fetchFlaggedUsers: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_FLAGGED_USERS
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch flagged users");
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },
  fetchAdmin: async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_ADMIN_DETAILS
        }?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch admin");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  fetchSuspendedUsers: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_SUSPENDED_USERS
        }`, // Changed to correct endpoint
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch suspended users");
      }

      return data.data.content;
    } catch (error) {
      throw error;
    }
  },

  fetchUnsuspendedUsers: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_UNSUSPENDED_USERS
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch unsuspeneded users");
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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch all users");
      }

      return data;
    } catch (error) {
      console.error("Fetch users error:", error);
      throw error;
    }
  },
  fetchLoans: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_ALL_LOANS}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch all users");
      }

      return data;
    } catch (error) {
      console.error("Fetch users error:", error);
      throw error;
    }
  },
  fetchLoanApprovalSummarys: async (id) => {
    // console.log(token, "token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_LOAN_APPROVAL_SUMMARY
        }`.replace("{id}", id),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch all users");
      }

      return data;
    } catch (error) {
      console.error("Fetch users error:", error);
      throw error;
    }
  },

  approveLoan: async (id, requestBody) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_APPROVE_LOAN
        }`.replace("{id}", id),

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approvedAmount: requestBody }),
        }
      );
      const data = await response.text();

      return data;
    } catch (error) {
      console.error("loan approve error:", error);
      throw error;
    }
  },

  rejectLoan: async (id, reason) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REJECT_LOAN}`
          .replace("{id}", id)
          .replace("{reason}", reason),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response;

      if (!response.ok) {
        throw new Error(data.message || "reject loan error");
      }

      return data;
    } catch (error) {
      console.log(error);
      console.error("reject loan error:", error);
      throw error;
    }
  },

  fetchLoanSchedule: async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_GET_LOAN_SCHEDULE
        }`.replace("{id}", id),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(data.message || "Failed to fetch all users");
      }

      return response.data;
    } catch (error) {
      console.error("Fetch loan schedule error:", error);
      throw error;
    }
  },

  approveLowerAmount: async (id, amount) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_APPROVE_LOWER_AMOUNT
        }`
          .replace("{id}", id)
          .replace("{amount}", amount),

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.text();

      if (!response.ok) {
        throw new Error(data.message || "loan approve error");
      }

      return data;
    } catch (error) {
      console.error("loan approve error:", error);
    }
  },
};

export default apiService;
