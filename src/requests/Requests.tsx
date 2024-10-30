import axios from "axios";



export default function getArticle() {
    const instance = axios.create();
    instance.get("http://localhost:8080/article/")
        .then(function (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
}

