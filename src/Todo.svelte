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

  const onKeyDown = (lifePart, listId, value) => (e) => {
    const key = e.keyCode || e.charCode;
    const isDelete = key === 8 || key === 46;
    if (isDelete && value === "") {
      todoStore.remove(lifePart, listId);
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
        <div class="header">
          <h2>{part[1]}</h2>
          <button
            class="button add {part[0]}"
            on:click="{() => {
              todoStore.add(part[0]);
            }}">+</button
          >
        </div>

        <ul class="list">
          {#each $todoStore.get(part[0]).list as listItem, index}
            <li class="list--item">
              <input
                class="input {part[0]}_input"
                type="text"
                on:keypress="{onKeyPress(part[0], index, listItem)}"
                on:keydown="{onKeyDown(part[0], index, listItem)}"
                bind:value="{listItem}"
                use:init
              />
              <button
                class="button {part[0]}"
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
    z-index: 4;
    position: relative;
    overflow: auto;
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
    padding-right: 2em;
    backdrop-filter: blur(1px);
  }
  .button {
    outline: none;
    border: none;
    background: none;
    font-weight: 900;
    font-size: 1em;
    cursor: pointer;
  }
  .add {
    font-size: 2em;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .input {
    border: none;
    outline: none;
    padding: 10px;
    width: 100%;
  }
  .input:focus {
    border-bottom: 1px solid rgb(193 193 193);
  }
  .list--item {
    display: flex;
  }
  .list {
    margin-left: 0;
    padding: 0;
  }

  .rich {
    color: var(--rich_color);
  }
  .rich_input:focus {
    border-bottom: 1px solid var(--rich_color);
  }
  .hobby {
    color: var(--hobby_color);
  }
  .hobby_input:focus {
    border-bottom: 1px solid var(--hobby_color);
  }
  .friendship {
    color: var(--friendship_color);
  }
  .friendship_input:focus {
    border-bottom: 1px solid var(--friendship_color);
  }
  .health {
    color: var(--health_color);
  }
  .health_input:focus {
    border-bottom: 1px solid var(--health_color);
  }
  .job {
    color: var(--job_color);
  }
  .job_input:focus {
    border-bottom: 1px solid var(--job_color);
  }
  .love {
    color: var(--love_color);
  }
  .love_input:focus {
    border-bottom: 1px solid var(--love_color);
  }
  .family {
    color: var(--family_color);
  }
  .family_input:focus {
    border-bottom: 1px solid var(--family_color);
  }
</style>
