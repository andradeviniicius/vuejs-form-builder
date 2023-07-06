<template>
    <div class="row">
        <div class="col-3">
            <h3>Draggable 2</h3>
            <draggable class="dragArea list-group" :list="list2" group="people" @change="log" item-key="name">
                <template #item="{ element }">
                    <div class="list-group-item">
                        {{ element.name }}
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>
  
<script lang="ts">
import draggable from "vuedraggable";

import { useDraggableStore } from "@/store/app";

export default {
    name: "FormEditor",
    display: "FormEditor",
    order: 2,
    components: {
        draggable
    },
    setup() {
        const store = useDraggableStore();

        return {
            list1: store.list1,
            list2: store.list2,
        }
    },
    methods: {
        log: function (evt: unknown) {
            console.log('list1', this.list1);
            console.log('list2', this.list2);
        }
    }
};
</script>
<style scoped></style>