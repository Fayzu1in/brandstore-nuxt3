<template>
  <div class="max-w-5xl mx-auto px-4 py-8 text-gray-700">
    <!-- Заголовок страницы -->
    <h1
      class="text-2xl md:text-3xl font-bold text-white text-center mb-8 uppercase tracking-wide"
    >
      Способы оплаты и доставки
    </h1>

    <!-- СЕКЦИЯ: ОПЛАТА -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
        <div
          class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-bold"
        >
          💳
        </div>
        <h2 class="text-xl font-bold text-white">Способы оплаты</h2>
      </div>

      <!-- Как оформить -->
      <div class="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
        <h3
          class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3"
        >
          Как выбрать способ оплаты:
        </h3>
        <ol
          class="list-decimal list-inside space-y-1.5 text-gray-600 text-sm md:text-base"
        >
          <li>
            Нажмите кнопку
            <span class="font-medium text-gray-800">«Оформить заказ»</span> в
            «Корзине».
          </li>
          <li>
            Заполните разделы
            <span class="font-medium text-gray-800"
              >«Контактная информация»</span
            >
            и <span class="font-medium text-gray-800">«Способы доставки»</span>.
          </li>
          <li>Выберите наиболее удобный вариант оплаты из списка ниже.</li>
        </ol>
      </div>

      <!-- Физ и Юр лица -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Физлица -->
        <div
          class="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-2 mb-4">
            <span
              class="text-xs font-semibold uppercase px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md"
            >
              Для физических лиц
            </span>
          </div>
          <ul class="space-y-2.5 text-gray-600 text-sm">
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span>Наличный расчёт</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span
                >Оплата картами Uzcard, Humo, Visa, Mastercard, Union Pay через
                терминал</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span
                >Оплата онлайн через платёжные системы: Payme, Uzum Bank</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span
                >Бесконтактная оплата через Apple Pay, Google Wallet (Google
                Pay)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span>Покупка в рассрочку</span>
            </li>
          </ul>
        </div>

        <!-- Юрлица -->
        <div
          class="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-2 mb-4">
            <span
              class="text-xs font-semibold uppercase px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md"
            >
              Для юридических лиц
            </span>
          </div>
          <ul class="space-y-2.5 text-gray-600 text-sm mb-4">
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span>Безналичный расчёт (перечисление по договор-счёту)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span>Оплата корпоративной картой</span>
            </li>
          </ul>
          <p
            class="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100"
          >
            Вы можете оставить заказ на нашем сайте — наши менеджеры свяжутся с
            вами для уточнения деталей.
          </p>
        </div>
      </div>

      <!-- Контакты для заказа -->
      <div
        class="bg-gray-100/70 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600"
      >
        <span
          >Оформить заказ также можно напрямую через колл-центр или в
          Telegram:</span
        >
        <div class="flex items-center gap-3 shrink-0">
          <a
            href="tel:+998712059393"
            class="font-semibold text-gray-800 hover:underline"
          >
            +998 (71) 205 93 93
          </a>
          <span class="text-gray-300">|</span>
          <a
            href="https://t.me/brandstore24_bot"
            target="_blank"
            class="font-semibold text-blue-600 hover:underline"
          >
            @brandstore24_bot
          </a>
        </div>
      </div>
    </section>

    <!-- СЕКЦИЯ: ДОСТАВКА -->
    <section class="space-y-6">
      <div class="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
        <div
          class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-bold"
        >
          🚚
        </div>
        <h2 class="text-xl font-bold text-white">Способы доставки</h2>
      </div>

      <!-- 1. Самовывоз -->
      <div class="border border-gray-200 rounded-2xl p-6 bg-white space-y-4">
        <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          Самовывоз из магазина
        </h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Если товар отсутствует в магазине, мы осуществляем бесплатную доставку
          до магазина для самовывоза — при условии, что он есть на наших
          отдаленных складах.
        </p>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100 text-sm"
        >
          <div>
            <span class="block text-xs font-semibold text-gray-400 uppercase"
              >Документы для получения:</span
            >
            <p class="text-gray-600 mt-1">
              Не требуются. Достаточно назвать
              <span class="font-medium text-gray-800">ID заказа</span>
              сотруднику.
            </p>
          </div>
          <div>
            <span class="block text-xs font-semibold text-gray-400 uppercase"
              >Срок хранения:</span
            >
            <p class="text-gray-600 mt-1">
              <span class="font-semibold text-gray-800">72 часа</span> (по
              истечении срока заказ аннулируется).
            </p>
          </div>
        </div>

        <p
          class="text-xs text-gray-500 bg-amber-50/50 text-amber-900/80 p-3 rounded-xl border border-amber-100"
        >
          💡 Если вы внесли предоплату, срок хранения можно продлить, сообщив по
          номеру
          <a href="tel:+998712059393" class="font-medium underline"
            >+998 (71) 205 93 93</a
          >
          или в Telegram
          <a
            href="https://t.me/brandstore24_bot"
            target="_blank"
            class="font-medium underline"
            >@brandstore24_bot</a
          >.
        </p>
      </div>

      <!-- 2. Курьер Ташкент -->
      <div class="border border-gray-200 rounded-2xl p-6 bg-white space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-lg font-bold text-gray-800">
            Курьерская доставка по г. Ташкент
          </h3>
          <span
            class="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md"
          >
            Ежедневно с 10:00 до 19:00
          </span>
        </div>

        <div class="space-y-2 text-sm text-gray-600">
          <p>
            • <span class="font-medium text-gray-700">Пн – Пт:</span> доставка
            собственными курьерами.
          </p>
          <p>
            • <span class="font-medium text-gray-700">Выходные дни:</span> через
            партнёра — Яндекс GO*.
          </p>
          <p>
            • Также в любое время доступна
            <span class="font-medium text-gray-700"
              >экспресс-доставка через Яндекс GO*</span
            >.
          </p>
          <p class="text-xs text-gray-400 italic">
            *Обе опции доступны при наличии товара в магазине или на локальном
            складе.
          </p>
        </div>

        <!-- Условия оплаты и сроков -->
        <div
          class="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-sm"
        >
          <div class="font-medium text-gray-800 mb-1">Условия доставки:</div>
          <p class="text-gray-600">
            Срок: в течение
            <span class="font-medium text-gray-800">48 рабочих часов</span> (в
            пределах ТКАД).
          </p>
          <div class="flex flex-wrap items-center gap-3 pt-1">
            <span class="text-gray-600"
              >Стоимость:
              <strong class="text-gray-800">29 900 сум</strong></span
            >
            <span class="text-gray-300">|</span>
            <span
              class="text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded border border-green-200"
            >
              При заказе от 300 000 сум — БЕСПЛАТНО
            </span>
          </div>
          <p class="text-xs text-gray-500 pt-1">
            * В случае каких-либо задержек наши операторы обязательно уведомят
            вас заранее.
          </p>
        </div>

        <!-- Важно -->
        <div
          class="text-xs text-gray-500 space-y-1.5 pt-2 border-t border-gray-100"
        >
          <p class="font-semibold text-gray-700 uppercase tracking-wider">
            Важно:
          </p>
          <p>
            • При изменении адреса сообщите в колл-центр по номеру
            <a href="tel:+998712059393" class="underline"
              >+998 (71) 205 93 93</a
            >
            или в Telegram
            <a
              href="https://t.me/brandstore24_bot"
              target="_blank"
              class="underline"
              >@brandstore24_bot</a
            >
            до выезда курьера.
          </p>
          <p>
            • Если доставка на закрытую территорию, убедитесь, что курьер сможет
            на неё попасть.
          </p>
        </div>
      </div>

      <!-- 3. Регионы -->
      <div class="border border-gray-200 rounded-2xl p-6 bg-white space-y-3">
        <h3 class="text-lg font-bold text-gray-800">Доставка в регионы</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Осуществляется через курьерские службы. Срок доставки составляет от
          <span class="font-medium text-gray-800">1 до 7 рабочих дней**</span> и
          зависит от маршрута и выбранного типа («до пункта выдачи» или «до
          двери»).
        </p>
        <p class="text-sm text-gray-600">
          Стоимость рассчитывается исходя из габаритов, массы товара, маршрута и
          типа доставки.
        </p>
        <p class="text-xs text-gray-400 italic border-t border-gray-100 pt-3">
          ** Срок доставки отсчитывается со следующего рабочего дня после
          передачи товара курьерской службе.
        </p>
      </div>
    </section>
  </div>
</template>
