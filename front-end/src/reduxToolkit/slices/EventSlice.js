import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ensure that cookies are sent with requests
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:5001";

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

// Function to handle displaying toast notifications
const showToast = (message, isError = false) => {
  console.log(`Toast: ${message}`);
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await axios.get(`${baseURL}/events`);
    return response.data;
  } catch (error) {
    showToast("Failed to fetch events", true);
    throw error;
  }
});

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (eventData) => {
    try {
      const response = await axios.post(`${baseURL}/create-event`, eventData);
      showToast("Event added successfully");
      return response.data;
    } catch (error) {
      showToast("Failed to add event", true);
      throw error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (eventData) => {
    try {
      const response = await axios.put(
        `${baseURL}/events/${eventData.id}`,
        eventData
      );
      showToast("Event updated successfully");
      return response.data;
    } catch (error) {
      showToast("Failed to update event", true);
      throw error;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    try {
      await axios.delete(`${baseURL}/events/${eventId}`);
      showToast("Event deleted successfully");
      return eventId;
    } catch (error) {
      showToast("Failed to delete event", true);
      throw error;
    }
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
