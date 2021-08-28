import { writable } from "svelte/store";
import { defaultSectors } from "../constants";

function Circle() {
  /* инициализируем хранилище с начальным состоянием */
  const { subscribe, update } = writable(
    defaultSectors.map((item) => ({ name: item, value: 0 }))
  );
  /* возвращаем объект с функцией подписки и доступными действиями */
  return {
    subscribe,
    set: (id, value) =>
      update((store) =>
        store.map((item) => (item.name === id ? { ...item, value } : item))
      ),
  };
}
export const circle = Circle();
export const activeSector = writable(null);
