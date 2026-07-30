// // data/categories.ts
// export interface SubCategory {
//   id: number;
//   title: string;
//   slug: string;
//   icon: string; // Название MDI иконки
// }

// export interface CategoryPage {
//   title: string;
//   slug: string;
//   subcategories: SubCategory[];
// }

// export const categoriesData: Record<string, CategoryPage> = {
//   'kompyutery-i-noutbuki': {
//     title: 'КОМПЬЮТЕРЫ И НОУТБУКИ',
//     slug: 'kompyutery-i-noutbuki',
//     subcategories: [
//       { id: 1, title: 'Ноутбуки', slug: 'noutbuki', icon: 'mdi:laptop' },
//       { id: 2, title: 'Компьютеры и моноблоки', slug: 'kompyutery-i-monobloki', icon: 'mdi:monitor-cellphone' },
//       { id: 3, title: 'Аксессуары для ПК и ноутбуков', slug: 'aksessuary', icon: 'mdi:cooling-fan' },
//     ]
//   },
//   'dlya-gejmerov': {
//     title: 'ДЛЯ ГЕЙМЕРОВ',
//     slug: 'dlya-gejmerov',
//     subcategories: [
//       { id: 10, title: 'Игровые ноутбуки', slug: 'gaming-laptops', icon: 'mdi:laptop-off' },
//       { id: 11, title: 'Игровые мыши и клавиатуры', slug: 'gaming-periphery', icon: 'mdi:gamepad-variant-outline' },
//     ]
//   }
// }