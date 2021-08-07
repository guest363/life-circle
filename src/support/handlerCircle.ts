/* директива get нужна для получения текущего значения хранилища без подписки на само хранилище */
import { get } from "svelte/store";
import { activeSector, circle } from "../store.js";

export function handleCircle(node) {
  const getCircleElementAtPoint = (e) => {
    /* определяем тип события: касание или мышь */
    const event = e.touches ? e.touches[0] : e;
    const element = document.elementFromPoint(event.pageX, event.pageY);
    /* получаем имя и значение сектора из html разметки */
    const score = element.getAttribute("value");
    const id = element.getAttribute("name");
    return { id, score, type: event.type };
  };
  const start = (e) => {
    /* получаем элемент радара из активного сектора */
    const { id } = getCircleElementAtPoint(e);
    /* устанавливаем текущий активный сектор */
    activeSector.set(id);
  };
  const end = () => {
    /* сбрасываем активный сектор */
    activeSector.set(null);
  };
  const move = (e) => {
    /* тротлинг через requestAnimationFrame поможет избежать лагов при активном перемещении */
    window.requestAnimationFrame(() => {
      const { id, score, type } = getCircleElementAtPoint(e);
      /* проверяем, что у нас есть активный сектор, т.е. движение началось внутри радара, и это не клик */
      if (!id || (id !== get(activeSector) && type !== "click") || !score)
        return;
      /* обновляем состояние радара */
      circle.set(id, score);
    });
  };
  /* регистрируем обработчики */
  node.addEventListener("mousedown", start);
  node.addEventListener("touchstart", start);
  node.addEventListener("mouseup", end);
  node.addEventListener("touchend", end);
  node.addEventListener("mousemove", move);
  node.addEventListener("touchmove", move);
  node.addEventListener("touch", move);
  node.addEventListener("click", move);

  /* возвращаем объект с функцией destroy, которая произведет отписку от событий при удалении компонента из DOM */
  return {
    destroy() {
      node.removeEventListener("mousedown", start);
      node.removeEventListener("touchstart", start);
      node.removeEventListener("mouseup", end);
      node.removeEventListener("touchend", end);
      node.removeEventListener("mousemove", move);
      node.removeEventListener("touchmove", move);
      node.removeEventListener("touch", move);
      node.removeEventListener("click", move);
    },
  };
}
