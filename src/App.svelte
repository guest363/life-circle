<script>
  import Circle from "./Circle.svelte";
  import { todo_display } from "./store/todo-display";
  import Todo from "./Todo.svelte";
</script>

<div class="{$todo_display ? 'container--full' : 'container--part'}">
  <Circle />
  <Todo />
</div>

<style>
  :global(body) {
    height: 100%;
    overscroll-behavior: none; /* отключает pull to refresh*/
    user-select: none; /* Отключает выделение в тач интерфейсах */
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background: rgb(35, 41, 37);
  }
  :global(html) {
    height: 100%;
    --hobby_color: #7c3f7a;
    --friendship_color:#5c6bc0;
    --health_color: #e5b744;
    --rich_color: #469573;
    --job_color: #e16838;
    --love_color: #e23f45;
    --family_color:#dfe23f;
  }
  .container--full {
    justify-content: center;
    height: 100%;
    display: grid;
    width: 100%;
    grid-template-columns: 2fr 1fr;
  }
  .container--part {
    justify-content: center;
    height: 100%;
    display: grid;
    width: 100%;
    overflow: hidden;
    grid-template-columns: 2fr 30px;
  }
</style>
