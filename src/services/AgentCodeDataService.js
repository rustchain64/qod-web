import http from "../http-common";

class AgentCodeDataService {
  getAll() {
    console.log("Get All Codes");
    return http.get("/agentCodes");
  }

  get(id) {
    return http.get(`/agentCodes/${id}`);
  }

  create(data) {
    console.log("Service DATA: ", data);
    return http.post("/agentCodes", data);
  }

  update(id, data) {
    return http.put(`/agentCodes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/agentCodes/${id}`);
  }

  deleteAll() {
    return http.delete(`/agentCodes`);
  }

}

export default new AgentCodeDataService();
