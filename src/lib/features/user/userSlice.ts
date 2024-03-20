import { RootState } from '@/lib/store';
import { TUser } from '@/utils/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
	users: [] as TUser[],
	detail: {
		id: 0,
		name: '',
		username: '',
		email: '',
		address: {
			street: '',
			suite: '',
			city: '',
			zipcode: '',
			geo: {
				lat: '',
				lng: '',
			},
		},
		phone: '',
		website: '',
		company: {
			name: '',
			catchPhrase: '',
			bs: '',
		},
		imageProfile: '',
	} as TUser,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<TUser[]>) => {
			const dat = [...action.payload];
			let newArr: TUser[] = [];
			dat.map((o: TUser, i: number) => {
				let item: TUser = {
					...o,
					imageProfile: `${process.env.baseImageURL}` + `/id/5${i + 1}/200`,
				};
				newArr.push(item);
			});
			state.users = newArr;
			return state;
		},
		setSelectedUser: (state, action: PayloadAction<TUser>) => {
			state.detail = action.payload;
			return state;
		},
		addUser: (state, action: PayloadAction<TUser>) => {
			state.users = [...state.users, action.payload];
			return state;
		},
		removeUser: (state, action: PayloadAction<number>) => {
			state.users = state.users.filter((user) => user.id !== action.payload);
			return state;
		},
		updateUser: (state, action: PayloadAction<TUser>) => {
			state.users = state.users.map((user) => {
				if (user.id === action.payload.id) {
					return action.payload;
				}
				return user;
			});
			return state;
		},
	},
});

export const { setUsers, setSelectedUser, addUser, removeUser, updateUser } =
	userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users.users;

export default userSlice.reducer;
