import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.brandstore.uz/api',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const showProgress = (config as any).progress !== false

  if (showProgress && process.client) {
    const loadingIndicator = useLoadingIndicator()
    loadingIndicator.start()
  }

  return config;
})

instance.interceptors.response.use(
  (response) => {
    const showProgress = (response.config as any).progress !== false
    if (showProgress && process.client) {
      const loadingIndicator = useLoadingIndicator()
      loadingIndicator.finish()
    }
    return response
  },
  (error) => {
    const showProgress = (error.config as any)?.progress !== false
    if (showProgress && process.client) {
      const loadingIndicator = useLoadingIndicator()
      loadingIndicator.finish()
    }
    return Promise.reject(error)
  }
)

export const api = {
  getCategories: () => instance.get('/categories').then((r) => r.data),
  getBanners: () => instance.get('/banners').then((r) => r.data),
  getBrands: () =>
    instance.get('/home', { params: { type: 'brand' } }).then((r) => r.data),
  getHotProducts: () =>
    instance.get('/home', { params: { type: 'hot_products' } }).then((r) => r.data),
  getRecommendedProducts: () =>
    instance.get('/home', { params: { type: 'recommended_products' } }).then((r) => r.data),
  getTechnoBlogs: () =>
    instance.get('https://api.brandstore.uz/api/posts').then((r) => r.data),

  searchProducts: (query: string, page = 1) =>
    instance
      .get('/search', {
        params: {
          search: query,
          shop: 1,
          page,
        },
        progress: false
      }as any)
      .then((r) => r.data),
  getSimilarProducts: (productId: number | string, perPage = 4) =>
    instance
      .get('/products/similar',{
        params: {
          product_id: productId,
          per_page: perPage,
        },
        progress: false,
      }as any)
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
        progress: false,
      } as any)
      .then((r) => r.data),

  getProductBySlug: (slug: string) =>
    instance
      .get('/products', {
        params: { slug },
      })
      .then((r) => {
        return Array.isArray(r.data?.data)
          ? r.data.data[0]
          : r.data?.data || r.data
      }),

  // Пример фонового запроса с отключенным лоадером:
  // sendPosition: (fileId, position) => 
  //   instance.post(`/file/played/${fileId}`, { position }, { progress: false } as any),
}