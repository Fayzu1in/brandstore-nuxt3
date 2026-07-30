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

  async getProductBySlug(slug: string) {
    try {
      // Указываем <string>, чтобы TS понял, что на выходе вернется HTML-строка
      const html = await $fetch<string>(`https://brandstore.uz/productPage/${slug}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      // Регуляркой вырезаем содержимое <script id="__NEXT_DATA__">
      const match = html.match(
        /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
      );

      if (!match || !match[1]) {
        console.warn('__NEXT_DATA__ не найден на странице');
        return null;
      }

      const parsedData = JSON.parse(match[1]);
      return parsedData?.props?.pageProps?.singleProduct || null;
    } catch (err) {
      console.error('Ошибка при запросе товара через HTML:', err);
      return null;
    }
  },
}