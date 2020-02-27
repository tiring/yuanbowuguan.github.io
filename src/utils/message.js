import { Message } from "element-ui";
//封装Element的消息提示框
//type:类型  可传入:success/warning/info/error
//message:提示的文字
export const _message = (type, message) => {
  Message({
    message,
    type
  });
};
