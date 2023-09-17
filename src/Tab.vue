<template>
    <div class="v-tab">
        <div class="v-tab-headers">
            <slot name="tabs" :style="style" />
            <div class="tab is-filler"></div>
        </div>
        <div class="v-tab-content">
            <Transition
                :name="animation"
                mode="out-in"
                @after-enter="emits('changed')"
                appear
            >
                <div v-if="slots[tab || '-']" :key="tab">
                    <slot :name="tab || '-'" />
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, useSlots } from "vue";

// props and emits
const emits = defineEmits(["changed"]);
const props = defineProps({
    animation: { type: String, default: "slide" },
    tab: { type: String },
});

// stats
const slots = useSlots();

// methods
function style(tab: string) {
    if (props.tab == tab) {
        return { "is-active": true };
    }
    return {};
}
</script>
