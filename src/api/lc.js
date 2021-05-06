import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.livechatinc.com",
  headers: { "Content-Type": "application/json" },
});

const api = {
  setToken(token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  async getAgents() {
    try {
      const { data } = await instance.post(
        "/v3.3/configuration/action/list_agents",
        {
          fields: ["awaiting_approval"],
        }
      );

      return data;
    } catch (error) {
      console.log("getAgents error", error);
    }
  },
  async approveAgent(agentId) {
    try {
      const { data } = await instance.post(
        "v3.3/configuration/action/approve_agent",
        {
          id: agentId,
        }
      );
      return data;
    } catch (error) {
      console.log("approveAgent error", error);
    }
  },
  async denyAgent(agentId) {
    try {
      const { data } = await instance.post(
        "v3.3/configuration/action/delete_agent",
        {
          id: agentId,
        }
      );
      return data;
    } catch (error) {
      console.log("approveAgent error", error);
    }
  },
};

export default api;
