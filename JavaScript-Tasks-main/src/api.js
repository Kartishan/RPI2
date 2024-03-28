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
    fetch(`${BASE_URL}${route}`, {
        method,
        headers: method !== Method.GET && method !== Method.DELETE ? { 'Content-Type': 'application/json' } : {},
        body: method !== Method.GET && method !== Method.DELETE ? JSON.stringify(body) : null
    })
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

const postData = (data) => load(Route.POST_DATA, ErrorText.SEND_DATA, Method.POST, data);

const deleteData = (id) => load(`${Route.DELETE_DATA}/${id}`, ErrorText.DELETE_DATA, Method.DELETE);

export { getData, postData, deleteData };
