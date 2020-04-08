export default class ApiUtil {
  static URL_IP = 'http://localhost:8080';
  static URL_ROOT = ApiUtil.URL_IP + '/api';

  static API_GET_TERM = ApiUtil.URL_ROOT + '/term/getAll';
  static API_ADD_TERM = ApiUtil.URL_ROOT + '/term/add/'; 
}