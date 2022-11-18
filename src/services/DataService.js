import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/referrals");
  }

  get(id) {
    return http.get(`/referrals/${id}`);
  }

  create(data) {
    //console.log("CREATE REFERRAL DATA POST: ",data);
    return http.post("/referrals", data);
  }

  update(id, data) {
    console.log("UPDATE DATA SENT :: ", data);

    return http.put(`/referrals/${id}`, data);
  }

  delete(id) {
    return http.delete(`/referrals/${id}`);
  }

  deleteAll() {
    return http.delete(`/referrals`);
  }

  findByTitle(title) {
    console.log("SEARCH BY TITLE::: ", title);
    return http.get(`/referrals?title=${title}`);
  }

  login(id) {
    return http.get(`/login/${id}`);
  }

  register(data) {
    return http.post("/register", data);
  }

  forgot(id, data) {
    return http.put(`/forgot/${id}`, data);
  }
}

export default new DataService();
