import restAPI from "axios";
import urlResource from './UrlResource'

export const USER_API = "https://seatmap-database.herokuapp.com/user";
export const MAP_API = "https://seatmap-database.herokuapp.com/map";
export const LOGIN_API = "https://seatmap-database.herokuapp.com/user/login";
export const LOGOUT_API = "https://seatmap-database.herokuapp.com/user/logout";
export const listRoles = {'Human Resources': 'hr', 'Developer': 'dv', 'Quality Assurance': 'qa'}
export const headers = {
    Authorization: localStorage.getItem("token"),
};

export {restAPI, urlResource}