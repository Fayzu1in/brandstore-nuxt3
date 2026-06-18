import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.brandstore.uz/api',
  timeout: 10000,
})

export const api = {
  getCategories: () => instance.get('/categories').then(r => r.data),
  getBanners: () => instance.get('/banners').then(r => r.data),
  getBrands: () => instance.get('/home', { params: { type: 'brand' } }).then(r => r.data),
  getHotProducts: () => instance.get('/home', { params: { type: 'hot_products' } }).then(r => r.data),
  getRecommendedProducts: () => instance.get('/home', { params: { type: 'recommended_products' } }).then(r => r.data),
}