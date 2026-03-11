import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        priority: 'all',
        category: 'all',
        dateRange: 'all',
        assignee: 'all'
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setPriority: (state, action) => {
            state.priority = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setAssignee: (state, action) => {
            state.assignee = action.payload;
        },
        clearFilters: (state) => {
            state.search = '';
            state.priority = 'all';
            state.category = 'all';
            state.dateRange = 'all';
            state.assignee = 'all';
        }
    }
});

export const { setSearch, setPriority, setCategory, setDateRange, setAssignee, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
