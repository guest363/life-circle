<script>
  import Circle from "./Circle.svelte";
</script>

<div class="container">
  <Circle />
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
  }
  .container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
</style>
