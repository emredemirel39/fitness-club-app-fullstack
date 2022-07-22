export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phoneNumber: string,
    role: string,
    __v: 0
  }

// type of login form that send as a request to server
export interface ILoginForm {
    password: string,
    phoneNumber: string
};

// type of response from server
export interface IResponseFromServer {
    status: boolean,
    message?: string,
    data?: any,
    token?: string
};

export interface IUserUpdate {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phoneNumber: string,
    role: string,
}

export interface IUpdateUserConfig {
    endpoint: string,
    body: object
}

export interface IScheduleEvent {
    hour: string | null,
    day: string | null,
    lesson: string | null,
    trainer: string | null,
    _id: string | null
};

export interface ICreateEventForm {
    hour: string | null,
    day: string | null,
    lesson: string | null,
    trainer: string | null
};

export interface IAddNewUser {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: string,
};

export interface IDecodedToken {
    id: string,
    role: string,
    iat: number
};