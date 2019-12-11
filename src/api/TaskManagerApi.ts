import axios from 'axios';
import { async } from 'q';

const BASE_URL = 'http://localhost:8080/api/tasks';

const TaskManagerApi = {
  getAllTasks: async function() {
    try {
      const response = await axios.get(BASE_URL);
      const tasks = response.data;
      return tasks;
    } catch (e) {
      console.error(e);
    }
  },
  addTask: async function(newTask: any) {
    try {
      const response = await axios.post(BASE_URL, newTask);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  removeTask: async function(id: string) {
    try {
      console.log(id);
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
};

export default TaskManagerApi;
