<script>
  import Sector from "./Sector.svelte";
  import { circle } from "./store.js";
  import { handleCircle } from "./support/handlerCircle";
</script>

<svg viewBox="-115 -110 230 220" use:handleCircle>
  {#each $circle as sector, direction (sector.name)}
    <Sector {...sector} direction="{direction}" />
  {/each}
</svg>
