<template>
    <v-item-group selected-class="bg-primary">

        <v-container>


            <v-row>
                <v-col v-for="item in filteredForms" :key="item.id" cols="12" sm="6" md="4" lg="3">
                    <FormItem :key="item.id" :item="item" :data="item" />

                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
</template>
                       
    
<script lang="ts">
import { storeToRefs } from 'pinia';
import FormItem from './FormItem.vue';
import { useRegisteredForms } from "@/store/app";

export default {
    name: 'FormGrid',
    components: {
        FormItem,
    },
    beforeMount() {
        const store = useRegisteredForms();
        store.filteredForms = store.registeredForms
    },
    setup() {
        const store = useRegisteredForms();
        const { filteredForms } = storeToRefs(store)

        return {
            formItem: store.registeredForms,
            filteredForms
        }
    },
};
</script>