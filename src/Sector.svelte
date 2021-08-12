<script>
  import getHexCorner from "./support/getHexCorner.js";

  export let name;
  export let value;
  export let direction;

  const grid = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const flip = direction === 2 || direction === 1;

  const radarTranslation = {
    hobby: "ХОББИ",
    friendship: "ДРУЖБА",
    health: "ЗДОРОВЬЕ",
    job: "РАБОТА",
    love: "ЛЮБОВЬ",
    rich: "БЛАГОСОСТОЯНИЕ",
    family: "СЕМЬЯ",
  };

  const svgFade = (node, { duration }) => {
    return {
      duration,
      css: (t) => {
        return `
					
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`;
      },
    };
  };
</script>

{#each grid as gridValue, i}
  <polygon
    points="{`${getHexCorner(gridValue * 10, direction)}, ${getHexCorner(
      gridValue * 10,
      direction + 1
    )}, 0, 0`}"
    strokeLinejoin="miter-clip"
    stroke-dasharray="4"
    stroke-width="0.5"
    class="{value >= gridValue ? name : ''}"
    name="{name}"
    value="{gridValue}"></polygon>
{/each}

<g
  transition:svgFade="{{duration: 1000}}"
  transform="{`translate(${getHexCorner(
    105,
    flip ? direction + 1 : direction
  )}) rotate(${direction * 51.5 + (flip ? -95 : 86)})`}"
>
  <text x="50" y="{flip ? 5 : 0}" text-anchor="middle">
    {radarTranslation[name]}
  </text>
  <text x="50" y="{flip ? 18 : -10}" text-anchor="middle" class="value">
    {value}
  </text>
</g>

<style>
  polygon {
    fill: #293038;
    stroke: #424a54;
  }
  text {
    font-size: 8px;
    fill: white;
  }
  .value {
    font-weight: bold;
    font-size: 12px;
  }
  .rich {
    fill: #469573;
  }
  .hobby {
    fill: #7c3f7a;
  }
  .friendship {
    fill: #5c6bc0;
  }
  .health {
    fill: #e5b744;
  }
  .job {
    fill: #e16838;
  }
  .love {
    fill: #e23f45;
  }
  .family {
    fill: #dfe23f;
  }
</style>
