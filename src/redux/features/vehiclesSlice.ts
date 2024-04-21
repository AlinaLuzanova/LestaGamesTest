import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { client } from '../../client';

 export interface Vehicle {
    title: string;
    description: string;
    name:string;
    id:any;
    icons: {
        large: string;
        medium: string;
    };
    level: number;
    type: {
        name: string;
        title: string;
        icons: {
            default: string;
        };
    };
    nation: {
        name: string;
        title: string;
        color: string;
        icons: {
            small: string;
            medium: string;
            large: string;
        };
    };
}


interface VehiclesState {
    vehicles: Vehicle[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: VehiclesState = {
    vehicles: [],
    status: 'idle',
    error: null,
};

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    async () => {
        const response = await client.query({
            query: gql`
      {
        vehicles {
          title
          description
          name
          id
          icons {
            large
            medium
          }
          level
          type {
            name
            title
            icons {
              default
            }
          }
          nation {
            name
            title
            color
            icons {
              small
              medium
              large
            }
          }
        }
      }
    `,
        });
        return response.data.vehicles;
    }
);

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch vehicles';
            });
    },
});



export default vehiclesSlice.reducer;
