import { writable } from "svelte/store";
import { defaultSectors, LS_TODO } from "../constants";
import { deleteFromArrayByIndex } from "../support/delete-from-array-by-index";
import { replacer } from "../support/replacer";
import { reviver } from "../support/reviver";

function Todos() {
  const initValue = JSON.parse(localStorage.getItem(LS_TODO), reviver);
  /* инициализируем хранилище с начальным состоянием */
  const { subscribe, update } = writable(
    initValue ||
      new Map(defaultSectors.map((item) => [item, { name: item, list: [] }]))
  );
  const updateLS = (store) => {
    localStorage.setItem(LS_TODO, JSON.stringify(store, replacer));
  };
  /* возвращаем объект с функцией подписки и доступными действиями */
  return {
    subscribe,
    set: (lifePart, listId, value) =>
      update((store) => {
        store.get(lifePart).list[listId] = value;
        updateLS(store);
        return new Map(store);
      }),
    add: (lifePart) =>
      update((store) => {
        store.get(lifePart).list.push("");
        return new Map(store);
      }),

    remove: (lifePart, listId) =>
      update((store) => {
        const list = store.get(lifePart).list;
        console.log(list);
        
        store.set(lifePart, {
          name: lifePart,
          list: deleteFromArrayByIndex(list, listId),
        });
        updateLS(store);
        return new Map(store);
      }),
  };
}
export const todoStore = Todos();
export const activePartOfLife = writable(null);
