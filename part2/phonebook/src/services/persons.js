import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((res) => res.data);

const update = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson).then((res) => res.data);
const remove = (id) => axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

export default {
  getAll,
  create,
  update,
  remove,
};
