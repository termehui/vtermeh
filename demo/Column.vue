<template>
    <div class="card">
        <div class="section">
            <vColumns>
                <div
                    v-for="(v, i) in items"
                    :key="i"
                    class="column-item"
                    :data-priority="i+1"
                >
                    {{ v }}
                </div>

                <div class="column-item" data-priority="0">AA</div>
            </vColumns>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vColumns } from "../src";
import { ref } from "vue";

const items = ref(["hi", "a", "b", "c"]);
</script>
