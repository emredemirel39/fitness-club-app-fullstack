import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { ICreateEventForm, IScheduleEvent } from "../types";

interface IScheduleState {
    allSchedule: IScheduleEvent [] | null,
    selectedScheduleEvent: IScheduleEvent | null,
    addedScheduleEvent: IScheduleEvent | null,
    deletedScheduleEvent: IScheduleEvent | null,
    loading: boolean,
    error: string | null | undefined
};

const initialState: IScheduleState = {
    allSchedule: null,
    selectedScheduleEvent: null,
    deletedScheduleEvent: null,
    addedScheduleEvent: null,
    loading: false,
    error: ''
};

// SERVICES

// Fetch All Events

export const fetchAllEvents = createAsyncThunk('fetchAllEvents', async () => {
    try {
        const response = await axios.get('events');

        if (response.data.status === true) {
            return response.data;
        };

    } catch (error) {
        return error
    };
});

// Fetch an Event

export const fetchEvent = createAsyncThunk('fetchEvent', async (id: string) => {
    try {
        const response = await axios.get(`events/${id}`);

        if (response.data.status === true) {
            return response.data;
        };

    } catch (error) {
        return error
    };
});

// Delete an Event

export const deleteEvent = createAsyncThunk('deleteEvent', async (id: string) => {
    try {
        const response = await axios.delete(`events/${id}`);

        if (response.data.status === true) {
            return response.data;
        };

    } catch (error) {
        return error
    };
});

// Create an Event

export const postNewEvent = createAsyncThunk('postNewEvent', async (body: ICreateEventForm) => {
    try {
        const response = await axios.post('events', body)

        if (response.status === 201) {
            return response.data
        }

    } catch (error) {
        return error
    }
})

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        selectEvent : (state, action: PayloadAction <IScheduleEvent> ) => {
            state.selectedScheduleEvent = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

        // Fetch All Events
        .addCase(fetchAllEvents.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchAllEvents.fulfilled, (state, action) => {
            state.loading = false
            state.allSchedule = action.payload.data
        })
        .addCase(fetchAllEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // Fetch an Event
        .addCase(fetchEvent.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchEvent.fulfilled, (state, action) => {
            state.loading = false
            state.selectedScheduleEvent = action.payload.data
        })
        .addCase(fetchEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // Delete an Event
        .addCase(deleteEvent.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.deletedScheduleEvent = action.payload.data;
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        // Create an Event
        .addCase(postNewEvent.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(postNewEvent.fulfilled, (state, action) => {
            state.loading = false
            state.addedScheduleEvent = action.payload.data
        })
        .addCase(postNewEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default scheduleSlice.reducer;

export const { selectEvent } = scheduleSlice.actions