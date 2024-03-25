const BASE_URL = 'http://localhost:3000';

const Route = {
    GET_DATA: '/tasks',
    POST_DATA: '/tasks',
    DELETE_DATA: '/tasks'
};

const Method = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE"
};

const ErrorText = {
    GET_DATA: "sad",
    SEND_DATA: "full sad",
    DELETE_DATA: "Failed to delete task"
};

const load = (route, errorText, method = Method.GET, body = null) =>
    fetch(`${BASE_URL}${route}`, { method, body })
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .catch(() => {
            throw new Error(errorText);
        });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const postData = (data) =>
    fetch(`${BASE_URL}${Route.POST_DATA}`, {
        method: Method.POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    })
    .catch(() => {
        throw new Error(ErrorText.SEND_DATA);
    });

const deleteData = (id) =>
    fetch(`${BASE_URL}${Route.DELETE_DATA}/${id}`, {
        method: Method.DELETE
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(ErrorText.DELETE_DATA);
        }
        return response.json();
    })
    .catch(() => {
        throw new Error(ErrorText.DELETE_DATA);
    });

export { getData, postData, deleteData };
