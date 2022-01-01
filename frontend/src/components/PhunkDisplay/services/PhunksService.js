import http from "../http-common";

  const getAll = () => {
    return http.get("/phunks");
  }

  const findByName = (ID) => {
    return http.get(`/phunks/${ID}`);
  }

  const PhunkDataService = {
    getAll,
    findByName
  };

export default PhunkDataService;