import { writable } from "svelte/store";

/**
 * Отображать ли TODO
 */

const isShowTodo = false;

export const todo_display = writable(isShowTodo);
