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
  getSimilarProducts: (productId: number | string, perPage = 4) =>
    instance
      .get('/products/similar', {
        params: {
          product_id: productId,
          per_page: perPage,
        },
      })
      .then((r) => r.data),
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

  getProductBySlug: (slug: string) =>
    instance
      .get('/products', {
        params: { slug },
      })
      .then((r) => {
        // Зависит от того, как API возвращает один товар:
        // Если возвращает массив с одним элементом: r.data.data?.[0] или r.data?.[0]
        // Если сразу объект: r.data
        return Array.isArray(r.data?.data) ? r.data.data[0] : (r.data?.data || r.data);
      }),
}