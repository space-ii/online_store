import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../index";

export default observer(function Pages() {
  const { pageStore } = useContext(Context);
  // const pages = [1, 2, 3, 4, 5];
  const pageCount = Math.ceil(pageStore.totalCount / pageStore.limit); // посчитаем общее количество страниц. Делим общее количество товаров на количество товаров на одной странице и округляем число в большую сторону (если у нас 30 устройств и нужно отрисовать 5 устройств на странице то отрисовываем 6 страниц)
  const pages = []; // Создаем пустой массив
  console.log(pageStore.limit);

  for (let i = 0; i < pageCount; i++) {
    // потом пробегаемся в цикле по числу страниц и создадим этим самым массив со страницами
    pages.push(i + 1);
  }

  return (
    <nav aria-label="..." className="mt-3">
      <ul className="pagination pagination-sm">
        {pages.map((page) => (
          <li
            className={`page-item ${pageStore.page === page ? "active" : ""}`} // Добавляем к классу active который будет активен (выделен) если страница со стора будет = странице текущей
            key={page} // Добавляем ключ
            onClick={() => pageStore.setPage(page)} // Вешаем слушатель события который будет добавлять активную страницу в стор (то есть при нажатии мы будем эту страницу выделять)
          >
            <Link className="page-link" href="#">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});
