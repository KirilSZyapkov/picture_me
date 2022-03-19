import errors from './errors';

const host = 'https://parseapi.back4app.com';

async function request(url, options) {
    try {

        const respons = await fetch(url, options);

        if (respons.ok === false) {
            const error = await respons.json();

            throw new Error(errors(error));

        }

        try {
            const data = await respons.json();
            return data;
        } catch (err) {
            return respons;
        }

    } catch (err) {

        throw new Error(errors(err));
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'yl3nehm1AjBjX46I3yWWPlxrx5dPGh8LBgvcBWbq',
            'X-Parse-REST-API-Key': 'FWv8fyXC7QMJmeCMZk5i170E4ADTh4ugAq9o8X2i'
        }
    };

    const token = JSON.parse(sessionStorage.getItem('user'));
    if (token !== null) {
        options.headers['X-Parse-Session-Token'] = token.sessionToken;
        
    };

    if (body) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(body);
    };

    return options;
}

export async function get(url) {
    return await request(host + url, getOptions());
};

export async function put(url, data) {
    return await request(host + url, getOptions('PUT', data));
};

export async function post(url, data) {
    return await request(host + url, getOptions('post', data));
};

export async function del(url) {
    return await request(host + url, getOptions('delete'));
};

export async function login(data) {
    const result = await post('/login', data);
    result.userName = data.username;

    sessionStorage.setItem('user', JSON.stringify(result));
    return result;
}

export async function register(data) {
    const result = await post('/users', data);
    result.userName = data.username;

    sessionStorage.setItem('user', JSON.stringify(result));

    return result;
}

export async function logout() {
    const result = await post('/logout', {});

    sessionStorage.removeItem('user');

    return result;
}