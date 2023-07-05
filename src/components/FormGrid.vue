<template>
    <v-item-group selected-class="bg-primary">

        <v-container>


            <v-row>
                <v-col v-for="item in formItem" :key="item.id" cols="12" sm="6" md="4" lg="3">
                    <FormItem :key="item.id" :item="item" :data="item" />

                </v-col>
            </v-row>
        </v-container>

    </v-item-group>
</template>
                       
    
<script lang="ts">
import FormItem from './FormItem.vue';

export default {
    name: 'FormGrid',
    components: {
        FormItem,
    },
    data() {
        return {
            formItem: [
                { id: 1, label: 'Item 1' },
                { id: 2, label: 'Item 2' },
                { id: 3, label: 'Item 3' },
                { id: 4, label: 'Item 4' },
                { id: 5, label: 'Item 5' },
                { id: 6, label: 'Item 6' },
                { id: 7, label: 'Item 7' },
            ],
        };
    },
};
</script>