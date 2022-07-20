import axios from "axios";
import md5 from "md5";

const publicKey = '9dee951c35405ccbc560691079d7bcaa';
const privateKey ='5d489f64f54ae57a7a1bc25f1722cf295866f106';

var ts = new Date().getTime()

const hash = md5(ts + privateKey + publicKey);


const api = axios.create({
  baseURL:'http://gateway.marvel.com/v1/public/',
  params: {
    ts,
    apikey: publicKey,
    hash: hash,
  },
});


export default api;