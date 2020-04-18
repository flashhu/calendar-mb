import { message } from 'antd';

export default function msgret(tag, msg) {
    if(tag) {
        message.success(msg);
    }else {
        message.error(msg);
    }
}