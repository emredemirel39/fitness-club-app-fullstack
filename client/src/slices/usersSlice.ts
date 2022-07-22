import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { IDecodedToken, ILoginForm, IUpdateUserConfig, IUser } from "../types";

export interface IUsersState {
    currentUser: null | IUser,    // user that logged in
    allUser: null | IUser[] ,
    selectedUser: null | IUser,      // user that selected by admin or manager
    loading: boolean,
    error: string | undefined,
    isLoggedIn : boolean
};

const initialState: IUsersState = {
    currentUser: null,    // user that logged in
    allUser: null,
    selectedUser: null,      // user that selected by admin or manager
    loading: false,
    error: '',
    isLoggedIn: false
};


// SERVICES

// Login
export const userLogin = createAsyncThunk('userLogin', async (body: ILoginForm) => {

    const response = await axios.post('users/login', body)
   try {

    if (response.data.status === true ) {
        sessionStorage.setItem('token', response.data.token);
        return response.data
    }

   } catch (error) {
    return error
   }
})

// Logout
export const userLogout = createAsyncThunk('userLogout', async () => {

    const response = await axios.post('users/logout', {}, {
        headers:{
            'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    try {
        if (response.data.status === true) {
            return response.data;
        }
    } catch (error) {
        return  error;
    }
});

// Fetch All Users

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {

    const response = await axios.get('users')

    try {
        if (response.data.status === true) {
            return response.data
        }
    } catch (error) {
        return error
    }
});

// Delete User

export const deleteUser = createAsyncThunk('deleteUser', async (userID: string) => {
    
    const response = await axios.delete(`${userID}`, {
        headers : {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          data: {}
    });

    try {
        if (response.status) {
            return response.data
        }
    } catch (error) {
        return error
    }

});

// Update One

export const updateUser = createAsyncThunk('updateUser', async (config: IUpdateUserConfig) => {

    const response = await axios.patch(config.endpoint, config.body )

    try {
        if (response.data.status === true) {
            return response.data
        }
    } catch (error) {
        return error
    };

});

// Update Password

export const updatePassword = createAsyncThunk('updatePassword', async (config: IUpdateUserConfig) => {

    const response = await axios.patch(config.endpoint, config.body);

    try {
        
        if (response.data.status === true) {
            return response.data;
        };

    } catch (error) {
        return error;
    };
});

// Add New User

export const addNewUser = createAsyncThunk('addNewUser', async (body: Object) => {

    try {
        const response = await axios.post('users', body)

        if (response.status === 201) {
            return response.data;
        };

    } catch (error) {
        return error;
    }
})

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoggedIn : (state, action : PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setSelectedUser : (state, action: PayloadAction<IUser | null>) => {
            state.selectedUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

        // USER LOGIN CASES

        .addCase(userLogin.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.currentUser = action.payload.data
        })
        .addCase(userLogin.rejected, (state, action) => {

            state.loading = false;
            state.error = action.error.message ;
        })

        // USER LOGOUT CASES

        .addCase(userLogout.pending, (state, action) => {
            
            state.loading = true;
            state.error = ''
        })
        .addCase(userLogout.fulfilled, (state) => {
            state.loading = false;
            state.currentUser = null
        })
        .addCase(userLogout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // FETCH ALL USERS

        .addCase(fetchAllUsers.pending, (state) => {
            state.error = ''
            state.loading = true
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.allUser = action.payload.data
        })
        .addCase(fetchAllUsers.rejected, (state) => {
            state.loading = false;
            state.error = 'Problem while fecthing all users'
        })

        // DELETE ONE

        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = ''
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.loading = false;
            state.error = '';
            state.selectedUser = null
        })
        .addCase(deleteUser.rejected, (state) => {
            state.loading = false;
            state.error = 'Error while deleting user';
        })

        // UPDATE ONE

        .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.currentUser = action.payload.data;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // UPDATE PASSWORD

        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.currentUser = action.payload.data;
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // CREATE NEW USER

        .addCase(addNewUser.pending, (state) => {
            state.error = '';
            state.loading = true;
        })
        .addCase(addNewUser.fulfilled, (state, action) => {
            state.error = ''
            state.loading = false;
            state.selectedUser = action.payload;
        })
        .addCase(addNewUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {
    setIsLoggedIn,
    setSelectedUser
} = usersSlice.actions

export default usersSlice.reducer;