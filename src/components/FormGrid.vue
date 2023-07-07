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
import { useRegisteredForms } from "@/store/app";

export default {
    name: 'FormGrid',
    components: {
        FormItem,
    },
    setup() {
        const store = useRegisteredForms();

        return {
            formItem: store.registeredForms
        }
    },
    data() {
        return {

        };
    },
};
</script>