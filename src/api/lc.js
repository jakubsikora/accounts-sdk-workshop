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
        {}
      );

      return data;
    } catch (error) {
      console.log("getAgents error", error);
    }
  },
  async approveAgent(agentId) {},
};

export default api;
