import axios from 'axios'
import Cookies from 'universal-cookie';

const service = axios.create({
    baseURL: '/api',
    headers: { 
        "Content-Type": "application/json"
     }, 
    timeout: 1200000000000
})

service.interceptors.request.use(
    (request) => {
        const cookies = new Cookies();
        const token = cookies.get('token')
        if( token ){
          request.headers.Authorization = `Token ${token}`
        }
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        // disableLoad()
        // 處裡錯誤訊息陣列
        // if(response.data.success === false && typeof response.data.msg === 'object'){
        //     let errorMsg = ''
        //     Object.values(response.data.msg).forEach((val:any) => {
        //         errorMsg += val.toString() + '\n'
        //     });
        //     response.data.msg = errorMsg
        // }
        return response
    },
    (error) => {
        // disableLoad()
        switch (error.response.status) {
            case 401:
            case 403:
                break;
            case 400:
                let errorMsg = ''
                if(error.request.response){
                    console.log();
                    const response = JSON.parse( error.request.response )
                    if(response.message){
                        errorMsg += response.message + '\n'
                    }else{
                        Object.values(JSON.parse( error.request.response )).forEach((values) => {
                            values.forEach((value) => {
                                errorMsg += value + '\n'
                            })
                        })
                    }
                    return {'msg':errorMsg}
                }
                return Promise.reject(error);
                break;
            default:
                return Promise.reject(error);
        }
    }
)

export default service
