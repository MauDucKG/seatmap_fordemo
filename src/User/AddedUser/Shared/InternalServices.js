import { USER_API, restAPI, listRoles } from '../../../Shared/InternalServices';

const CLOUDINARY_UPLOAD_API = 'https://api.cloudinary.com/v1_1/Map/image/upload';
const DEFAULT_AVATAR_URL = 'https://res.cloudinary.com/seatmap-cy/image/upload/v1657786288/xrshhwsx1sbwd6zhywih.png';

const CHECK_USERNAME_API = `${USER_API}/checkUsername`

export { restAPI, CLOUDINARY_UPLOAD_API, DEFAULT_AVATAR_URL, USER_API, CHECK_USERNAME_API, listRoles}
