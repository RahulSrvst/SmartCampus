import axios from 'axios'

/**
 * Base URL for API requests.
 * @type {string}
 */
//  export const baseURL = 'https://schoolb1.bharaterp.org/'
    // export const baseURL = 'http://192.168.1.188:9098/'
    export const baseURL = 'http://localhost:8020/'

/**
 * Creates and configures an Axios instance with baseURL and request/response interceptors.
 * @param {string} baseURL - The base URL for API requests.
 * @returns {import("axios").AxiosInstance} - The configured Axios instance.
 */
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL })

  // Request interceptor
  instance.interceptors.request.use(
    /**
     * Interceptor function to add Authorization header to the request config.
     * @param {import("axios").AxiosRequestConfig} config - Axios request config.
     * @returns {import("axios").AxiosRequestConfig} - Updated Axios request config.
     */
    (config) => {
      const Authorization = 'Token 27d01aa2dc08720f9a3cf974a16101e43773a1bf'
      config.headers = { Authorization, ...config.headers }
      return config
    },

    /**
     * Interceptor error handler for request.
     * @param {import("axios").AxiosError} error - Axios error object.
     * @returns {Promise<never>} - Promise rejection with error.
     */
    (error) => Promise.reject(error)
  )

  // Response interceptor
  instance.interceptors.response.use(
    /**
     * Interceptor function for successful response.
     * @param {import("axios").AxiosResponse} response - Axios response object.
     * @returns {import("axios").AxiosResponse} - The response object.
     */
    (response) => response,
    /**
     * Interceptor error handler for response.
     * @param {import("axios").AxiosError} error - Axios error object.
     * @returns {Promise<never>} - Promise rejection with error.
     */
    (error) => Promise.reject(error)
  )

  return instance
}

/**
 * Axios instance with baseURL set and request/response interceptors configured.
 * @type {import("axios").AxiosInstance}
 */
const axiosInstance = createAxiosInstance(baseURL)

export default axiosInstance
