// app/data/catalog.ts

export interface SubCategory {
  id: number;
  title: string;
  slug: string;
  icon: string; // MDI иконки
}

export interface CategoryData {
  title: string;
  slug: string;
  subcategories: SubCategory[];
}

export const CATALOG_MOCK_DATA: Record<string, CategoryData> = {
  'dlya-gejmerov': {
    title: 'Для геймеров',
    slug: 'dlya-gejmerov',
    subcategories: [
      { id: 148, title: 'Игровые аксессуары', slug: 'igrovye-aksessuary', icon: 'mdi:gamepad-variant-outline' },
      { id: 21, title: 'Игровые кресла', slug: 'igrovye-kresla', icon: 'mdi:chair-rolling' },
      { id: 1736, title: 'Игровые наборы', slug: 'igrovye-nabory', icon: 'mdi:package-variant-closed' },
      { id: 32, title: 'Игровые клавиатуры', slug: 'igrovye-klaviatury', icon: 'mdi:keyboard-outline' },
      { id: 33, title: 'Игровые мыши', slug: 'igrovye-myshi', icon: 'mdi:mouse' },
      { id: 101, title: 'Игровые кейсы', slug: 'igrovye-kejsy', icon: 'mdi:desktop-tower font' },
      { id: 102, title: 'Игровые наушники', slug: 'igrovye-naushniki', icon: 'mdi:headphones' },
      { id: 104, title: 'Игровые коврики', slug: 'igrovye-kovriki', icon: 'mdi:rug' },
      { id: 146, title: 'Игровые столы', slug: 'igrovye-stoly', icon: 'mdi:desk' },
      { id: 105, title: 'Микрофоны', slug: 'mikrofony', icon: 'mdi:microphone-outline' },
    ]
  },
  'smartfony-i-gadzhety': {
    title: 'Смартфоны и гаджеты',
    slug: 'smartfony-i-gadzhety',
    subcategories: [
      { id: 201, title: 'Смартфоны', slug: 'smartfony', icon: 'mdi:cellphone' },
      { id: 202, title: 'Планшеты', slug: 'planshety', icon: 'mdi:tablet' },
      { id: 203, title: 'Powerbank и зарядные станции', slug: 'powerbank-i-zaryadnye-stantsii', icon: 'mdi:battery-charging-100' },
      { id: 204, title: 'Зарядные устройства', slug: 'zaryadnye-ustrojstva', icon: 'mdi:power-plug-outline' },
      { id: 205, title: 'Гаджеты', slug: 'gadzhety', icon: 'mdi:watch-variant' },
      { id: 206, title: 'Наушники', slug: 'naushniki', icon: 'mdi:headphones' },
      { id: 207, title: 'Аксессуары', slug: 'aksessuary', icon: 'mdi:cellphone-dock' },
    ]
  },
  'kompyutery-i-noutbuki': {
    title: 'Компьютеры и ноутбуки',
    slug: 'kompyutery-i-noutbuki',
    subcategories: [
      { id: 301, title: 'Ноутбуки', slug: 'noutbuki', icon: 'mdi:laptop' },
      { id: 302, title: 'Компьютеры и моноблоки', slug: 'kompyutery-i-monobloki', icon: 'mdi:monitor-cellphone' },
      { id: 303, title: 'Аксессуары для ПК и ноутбуков', slug: 'aksessuary-dlya-pk-i-noutbukov', icon: 'mdi:fan' },
    ]
  },
  'komplektuyushchie-dlya-pk': {
    title: 'Комплектующие для ПК',
    slug: 'komplektuyushchie-dlya-pk',
    subcategories: [
      { id: 401, title: 'Кейсы', slug: 'kejsy', icon: 'mdi:desktop-tower' },
      { id: 402, title: 'Материнские платы', slug: 'materinskie-platy', icon: 'mdi:developer-board' },
      { id: 403, title: 'Процессоры', slug: 'protsessory', icon: 'mdi:cpu-64-bit' },
      { id: 404, title: 'Блоки питания', slug: 'bloki-pitaniya', icon: 'mdi:power-supply' },
      { id: 405, title: 'Видеокарты', slug: 'videokarty', icon: 'mdi:expansion-card' },
      { id: 406, title: 'Твердотельные накопители SSD', slug: 'tverdotelnye-nakopiteli-ssd', icon: 'mdi:harddisk-plus' },
      { id: 407, title: 'Жесткие диски', slug: 'zhestkie-diski', icon: 'mdi:harddisk' },
      { id: 408, title: 'Охлаждение компьютера', slug: 'okhlazhdenie-kompyutera', icon: 'mdi:fan-auto' },
      { id: 409, title: 'Устройства', slug: 'ustrojstva', icon: 'mdi:disc-player' },
      { id: 410, title: 'Крепления и прочие аксессуары', slug: 'krepleniya-i-prochie-aksessuary', icon: 'mdi:cable-data' },
    ]
  },
  'kompyuternaya-periferiya': {
    title: 'Компьютерная периферия',
    slug: 'kompyuternaya-periferiya',
    subcategories: [
      { id: 501, title: 'Мониторы', slug: 'monitory', icon: 'mdi:monitor' },
      { id: 502, title: 'Клавиатуры', slug: 'klaviatury', icon: 'mdi:keyboard' },
      { id: 503, title: 'Мыши', slug: 'myshi', icon: 'mdi:mouse' },
      { id: 504, title: 'Комплекты клавиатура+мышь', slug: 'komplekty-klaviatura-mysh', icon: 'mdi:keyboard-settings' },
      { id: 505, title: 'Коврики', slug: 'kovriki', icon: 'mdi:rug' },
      { id: 506, title: 'Акустические системы', slug: 'akusticheskie-sistemy', icon: 'mdi:speaker' },
      { id: 507, title: 'Наушники и гарнитуры', slug: 'naushniki-i-garnitury', icon: 'mdi:headset' },
      { id: 508, title: 'Микрофоны', slug: 'mikrofony', icon: 'mdi:microphone' },
      { id: 509, title: 'Веб-камеры', slug: 'veb-kamery', icon: 'mdi:webcam' },
      { id: 510, title: 'Флеш накопители', slug: 'flesh-nakopiteli', icon: 'mdi:usb-flash-drive' },
      { id: 511, title: 'Кронштейны', slug: 'kronshtejny', icon: 'mdi:monitor-dashboard' },
      { id: 512, title: 'Сетевые фильтры', slug: 'setevye-filtry', icon: 'mdi:power-socket-de' },
      { id: 513, title: 'Аксессуары', slug: 'aksessuary', icon: 'mdi:hub' },
    ]
  }
}