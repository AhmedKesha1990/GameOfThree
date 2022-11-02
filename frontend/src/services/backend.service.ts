import axios, { AxiosInstance } from 'axios'

export class BackendService {
  protected client: AxiosInstance
  private static readonly API_URL = '/api/backend-service/'
  constructor() {
    this.client = axios.create({ baseURL: BackendService.API_URL })
  }
}
