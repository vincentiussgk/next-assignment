export interface IDropdown {
  [code: number]: string;
}

export interface IEvent {
  id?: number;
  name: string;
  startTime: string;
  location: string;
  duration: number;
  category: number;
  price: number;
  image: string;
  description: string;
  capacity: number;
  current: number;
  date: string;
}

export interface IMerch {
  id?: number;
  price: number;
  image: string;
  name: string;
  desc: string;
  eventId: string;
  stock: number;
}

export interface IMerchOrder extends IMerch {
  qty: number;
}

export interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  role: number; //
  membership: number; //
  balance: number;
  image: string;
}

export interface IPurchase {
  id?: number;
  userId: number;
  eventId: number;
  purchaseDate: string;
  merch: IMerchOrder[];
  paymentStatus: boolean;
  paymentTotal: number;
  event: IEvent;
}

export interface IBookmarksDB {
  usersId: number;
  eventsId: number;
  id: number;
  events: IEvent;
}
