import axios from "axios"


const Instance = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
    headers: {
      "Authorization": localStorage.getItem("token"),
      "Content-Type": "application/json",
  },   
  });


export default function ApiCall(path,method,param,body){
   return Instance({
        url: path,
        method: method,
        params: param,
        data:body,
        transformResponse: [function (response) {  
            if(response && response.data)  {
              response.data = JSON.parse(response.data)
            }
            return response
        }],
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
        },   
   })

}

Instance.interceptors.response.use(function (response) {
    response =  JSON.parse(response.data)
    return response
  }, function (error) {
    console.log("error in reques",error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status === 401){
        localStorage.removeItem("token")
        window.location.reload()
    }
    error.response.data = JSON.parse(error.response.data)

    return Promise.reject(error);
  });   

//   Instance.interceptors.request.use(function (config) {
//       console.log("++++",config)
//     // config.headers.test = 'I am only a header!';
//     return config;
//   }, null, { synchronous: true });