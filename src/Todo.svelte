<script>
  import { blur } from "svelte/transition";
  import { LIFE_PARTS } from "./constants";
  import { quintOut } from "svelte/easing";
  import { todo_display } from "./store/todo-display";
</script>

<div class="wrapper">
  <button class="hider" on:click="{() => todo_display.set(!$todo_display)}"
    >{$todo_display ? ">" : "<"}</button
  >

  {#if $todo_display}
    <div class="todo" in:blur="{{ amount: 10 }}" out:blur="{{ amount: 10 }}">
      {#each Object.values(LIFE_PARTS) as part}
        <h2>{part}</h2>{/each}
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
  }
  .hider {
    position: absolute;
    left: -1em;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    font-size: 2em;
    font-weight: 900;
    color: #fff;
    height: 100%;
  }
</style>
