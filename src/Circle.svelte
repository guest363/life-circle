<script>
  import { get } from "svelte/store";
  import Sector from "./Sector.svelte";
  import { activeSector, circle } from "./store/store.js";

  const getCircleElementAtPoint = (e) => {
    /* определяем тип события: касание или мышь */
    const event = e.touches ? e.touches[0] : e;
    const element = document.elementFromPoint(event.pageX, event.pageY);
    /* получаем имя и значение сектора из html разметки */
    const score = element.getAttribute("value");
    const id = element.getAttribute("name");
    return { id, score, type: event.type };
  };
  const start = (e) => {
    /* получаем элемент радара из активного сектора */
    const { id } = getCircleElementAtPoint(e);
    /* устанавливаем текущий активный сектор */
    activeSector.set(id);
  };
  const end = () => {
    /* сбрасываем активный сектор */
    activeSector.set(null);
  };
  const move = (e) => {
    /* тротлинг через requestAnimationFrame поможет избежать лагов при активном перемещении */
    window.requestAnimationFrame(() => {
      const { id, score, type } = getCircleElementAtPoint(e);
      /* проверяем, что у нас есть активный сектор, т.е. движение началось внутри радара, и это не клик */
      if (!id || (id !== get(activeSector) && type !== "click") || !score)
        return;
      /* обновляем состояние радара */
      circle.set(id, score);
    });
  };
</script>

<svg
  class="circle"
  viewBox="-120 -120 250 240"
  on:mousedown="{start}"
  on:touchstart="{start}"
  on:mouseup="{end}"
  on:touchend="{end}"
  on:mousemove="{move}"
  on:touchmove="{move}"
  on:touchmove="{move}"
  on:click="{move}"
>
  {#each $circle as sector, direction (sector.name)}
    <Sector {...sector} direction="{direction}" />
  {/each}
</svg>

<style>
  .circle {
    height: 90%;
    margin: 0 auto;
  }
</style>
