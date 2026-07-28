import { defineStore } from 'pinia';

export const useTallyStore = defineStore('tally', {
    state: () => ({
        selected: [],
    }),
    getters: {
        getSelected: (state) => state.selected,
    },
    actions: {
        setSelectedValue(id) {
            this.selected.push(id);
            localStorage.selectedValues = this.getSelected;
            console.log('selected values: ', this.getSelected);
        }
    },

});