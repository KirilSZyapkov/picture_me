import errors from './errors';

const host = 'https://parseapi.back4app.com/parse/files';

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
            'X-Parse-Application-Id': `yl3nehm1AjBjX46I3yWWPlxrx5dPGh8LBgvcBWbq`,
            'X-Parse-REST-API-Key': `FWv8fyXC7QMJmeCMZk5i170E4ADTh4ugAq9o8X2i`
        }
    };

    const token = JSON.parse(sessionStorage.getItem('user'));
    if (token !== null) {
        options.headers['X-Parse-Session-Token'] = token.sessionToken;
        
    };

    if (body) {
        options.headers['Content-type'] = 'image/jpeg';
        options.body = body;
    };

    return options;
}



export async function post(data, name) {
    return await request(host + `/${name}`, getOptions('POST', data));
};