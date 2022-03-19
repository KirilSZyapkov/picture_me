import * as api from './api';
import * as userAPI from './userApi';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllPictures() {

    return await api.get('/classes/Storage');
}

export async function getPictureById(id) {
    return await api.get('/classes/Storage/' + id + '?include=admin');
}

export async function addPicture(data, userId) {

    const body = Object.assign({}, data, {
        owner: {
            __type: 'Pointer',
            'className': '_User',
            objectId: userId
        }
    });
    return await api.post('/classes/Storage', body);
}

export async function updatePicture(blogId, body) {

    return await api.put('/classes/Storage/' + blogId, body);

}

export async function getUserOwnPictures(userId) {
    
    const q = JSON.stringify({
        owner: {
            __type: 'Pointer',
            'className': '_User',
            objectId: userId
        }
    })
    return await api.get('/classes/Storage?where=' + encodeURIComponent(q));
}
