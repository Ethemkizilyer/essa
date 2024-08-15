import axios from 'axios';

export abstract class BaseService<T> {
  protected abstract endpoint: string;

  async getAll(): Promise<T[]> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}`);
    return response.data;
  }

  async getById(id: string | number): Promise<T> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/${id}`);
    return response.data;
  }

  async create(item: T): Promise<T> {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}`, item);
    return response.data;
  }

  async update(id: string | number, item: T): Promise<T> {
    console.log("response item",item,id)
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/${id}`, item);
    console.log("response",response)
    return response.data;
  }

  async delete(id: string | number): Promise<void> {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/${id}`);
  }
}
