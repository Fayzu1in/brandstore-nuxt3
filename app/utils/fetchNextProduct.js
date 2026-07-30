/**
 * Парсит HTML страницы товара и достает данные singleProduct из __NEXT_DATA__
 * @param {string} slug - slug товара
 * @returns {Promise<Object|null>}
 */
export async function fetchProductBySlug(slug) {
  try {
    // 1. Делаем запрос к обычной HTML-странице товара
    const html = await $fetch(`https://brandstore.uz/productPage/${slug}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    // 2. Регуляркой вырезаем содержимое script id="__NEXT_DATA__"
    const match = html.match(
      /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
    );

    if (!match || !match[1]) {
      console.warn("__NEXT_DATA__ не найден на странице");
      return null;
    }

    // 3. Парсим JSON и аккуратно достаем singleProduct
    const parsedData = JSON.parse(match[1]);
    const singleProduct = parsedData?.props?.pageProps?.singleProduct;

    return singleProduct || null;
  } catch (err) {
    console.error("Ошибка при вытягивании товара через HTML:", err);
    return null;
  }
}
