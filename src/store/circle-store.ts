import { writable } from "svelte/store";
import { defaultSectors, LS_CIRCLE } from "../constants";

function Circle() {
  const initValue = JSON.parse(localStorage.getItem(LS_CIRCLE));
  /* инициализируем хранилище с начальным состоянием */
  const { subscribe, update } = writable(
    initValue || defaultSectors.map((item) => ({ name: item, value: 0 }))
  );
  /* возвращаем объект с функцией подписки и доступными действиями */
  return {
    subscribe,
    set: (id, value) =>
      update((store) => {
        const newStore = store.map((item) =>
          item.name === id ? { ...item, value } : item
        );
        localStorage.setItem(LS_CIRCLE, JSON.stringify(newStore));
        return newStore;
      }),
  };
}
export const circle = Circle();
export const activeSector = writable(null);
