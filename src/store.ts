import { writable } from "svelte/store";
const defaultStore = ["hobby", "friendship", "health", "job", "love", "rich"];

function Circle() {
  /* инициализируем хранилище с начальным состоянием */
  const { subscribe, update } = writable(
    defaultStore.map((item) => ({ name: item, value: 0 }))
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
