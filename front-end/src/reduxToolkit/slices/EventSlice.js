import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4444";

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(`${baseURL}/events`);
  return response.data;
});

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (eventData) => {
    const response = await axios.post(`${baseURL}/events`, eventData);
    return response.data;
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (eventData) => {
    const response = await axios.put(
      `${baseURL}/events/${eventData.id}`,
      eventData
    );
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    await axios.delete(`${baseURL}/events/${eventId}`);
    return eventId;
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const { id, ...updatedEventData } = action.payload;
        const existingEventIndex = state.events.findIndex(
          (event) => event.id === id
        );
        if (existingEventIndex !== -1) {
          state.events[existingEventIndex] = {
            ...state.events[existingEventIndex],
            ...updatedEventData,
          };
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      });
  },
});

export default eventSlice.reducer;
