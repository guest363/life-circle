<script>
  import { LIFE_PARTS } from "./constants";
  import getHexCorner from "./support/getHexCorner.js";

  export let name;
  export let value;
  export let direction;

  const grid = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const flip = direction === 2 || direction === 1;

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
  transition:svgFade="{{ duration: 1000 }}"
  transform="{`translate(${getHexCorner(
    105,
    flip ? direction + 1 : direction
  )}) rotate(${direction * 51.5 + (flip ? -95 : 86)})`}"
>
  <text x="50" y="{flip ? 5 : 0}" text-anchor="middle">
    {LIFE_PARTS[name]}
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
    fill: var(--rich_color);
  }
  .hobby {
    fill: var(--hobby_color);
  }
  .friendship {
    fill: var(--friendship_color);
  }
  .health {
    fill: var(--health_color);
  }
  .job {
    fill: var(--job_color);
  }
  .love {
    fill: var(--love_color);
  }
  .family {
    fill: var(--family_color);
  }
</style>
