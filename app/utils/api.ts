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
  getTechnoBlogs: () => instance.get('https://api.brandstore.uz/api/posts').then(r => r.data),
  getProducts: (params = {}) =>
    instance
      .get('/products', {
        params: {
          sort: 'view_count',
          asc: 0,
          per_page: 12,
          page: 1,
          ...params,
        },
      })
      .then(r => r.data),
}