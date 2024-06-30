import { createSlice } from "@reduxjs/toolkit";



const jobSlice = createSlice({
    name: "job",
    initialState: {
        isLoading: false,
        error: null,
        jobs: []
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },

        setError: (state, { payload }) => {
            state.isLoading = false,
                state.error = payload
        },

        setJobs: (state, { payload }) => {
            state.jobs = payload;
            state.isLoading = false;
            state.error = null;
        },

        delJob: (state, { payload }) => {
            const i = state.jobs.findIndex((i => i.id === payload))
            state.jobs.splice(i, 1)
        },

        addNewJob: (state, { payload }) => {
            state.jobs.push(payload)
        }


    }
})

export default jobSlice.reducer

export const { setLoading, setError, setJobs, delJob, addNewJob } = jobSlice.actions;
