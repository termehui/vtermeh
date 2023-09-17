<template>
    <div class="columns" ref="container">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineExpose, ref, computed, onMounted } from "vue";

// Props and emits
const props = defineProps<{
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
    mobileQ?: string;
    desktopQ?: string;
    wideQ?: string;
}>();

// stats
const container = ref<HTMLElement>();

// computed
const mobileCols = computed(() =>
    props.mobile && +props.mobile ? +props.mobile : 1
);
const tabletCols = computed(() =>
    props.tablet && +props.tablet ? +props.tablet : 2
);
const desktopCols = computed(() =>
    props.desktop && +props.desktop ? +props.desktop : 3
);
const wideCols = computed(() => (props.wide && +props.wide ? +props.wide : 4));
const mobileQuery = computed(
    () => props.mobileQ || "screen and (max-width: 768px)"
);
const desktopQuery = computed(
    () => props.desktopQ || "screen and (min-width: 1024px)"
);
const wideQuery = computed(
    () => props.wideQ || "screen and (min-width: 1408px)"
);

// methods
function dataNum(el: any, attr: string, fallback = -1): number {
    const data = el && el.dataset ? el.dataset[attr] : null;
    if (data && +data) {
        return +data;
    }
    return fallback;
}

function reOrder() {
    if (!container.value) return;
    const items = Array.from(container.value.querySelectorAll(".column-item"))
        .filter(Boolean)
        .sort((a, b) => dataNum(a, "priority") - dataNum(b, "priority"));
    if (!items || !items.length) return;

    // Get columns count for media query
    let count = tabletCols.value;
    if (window.matchMedia) {
        if (window.matchMedia(mobileQuery.value).matches) {
            count = mobileCols.value;
        } else if (window.matchMedia(wideQuery.value).matches) {
            count = wideCols.value;
        } else if (window.matchMedia(desktopQuery.value).matches) {
            count = desktopCols.value;
        }
    }

    const columns: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
        const column = document.createElement("div");
        column.classList.add("column");
        columns.push(column);
    }

    let counter = 0;
    for (const item of items) {
        if (counter > count - 1) {
            counter = 0;
        }
        columns[counter].appendChild(item);
        counter++;
    }

    while (container.value.firstChild) {
        container.value.lastChild &&
            container.value.removeChild(container.value.lastChild);
    }

    for (const column of columns) {
        container.value.appendChild(column);
    }
}

// hooks
onMounted(() => reOrder());
window.addEventListener("resize", () => reOrder());
defineExpose({
    update: reOrder,
});
</script>
