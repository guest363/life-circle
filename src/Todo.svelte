<script>
  import { blur } from "svelte/transition";
  import { LIFE_PARTS } from "./constants";
  import { todo_display } from "./store/todo-display";
  import { todoStore } from "./store/todo-store";

  /**
   * При нажатии клавиши Enter занести значение
   * в хранилище и добавить новый инпут
   */
  const onKeyPress = (lifePart, listId, value) => (e) => {
    if (e.charCode === 13) {
      todoStore.set(lifePart, listId, value);
      todoStore.add(lifePart);
    }
  };

  /**
   * Фокус на вновь создангном элементе
   */
  function init(el) {
    el.focus();
  }
</script>

<div class="wrapper">
  <button class="hider" on:click="{() => todo_display.set(!$todo_display)}"
    >{$todo_display ? ">" : "<"}</button
  >

  {#if $todo_display}
    <div class="todo" in:blur="{{ amount: 2 }}">
      {#each Object.entries(LIFE_PARTS) as part}
        <h2>{part[1]}</h2>
        <button
          on:click="{() => {
            todoStore.add(part[0]);
          }}">+</button
        >
        <ul>
          {#each $todoStore.get(part[0]).list as listItem, index}
            <li>
              <input
                type="text"
                on:keypress="{onKeyPress(part[0], index, listItem)}"
                bind:value="{listItem}"
                use:init
              />
              <button
                on:click="{() => {
                  todoStore.remove(part[0], index);
                }}">-</button
              >
            </li>
          {/each}
        </ul>{/each}
    </div>
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
    height: 100%;
  }
  .todo {
    background: #fff;
    padding: 2em;
    height: 100%;
    max-height: 100vh;
    overflow: scroll;
  }
  .hider {
    position: absolute;
    left: -2em;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    font-size: 2em;
    font-weight: 900;
    color: #fff;
    height: 100%;
    padding-left: 1em;
  }
</style>
