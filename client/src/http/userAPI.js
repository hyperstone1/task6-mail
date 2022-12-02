import axios from 'axios';
import { host } from '../utils/constants/constants';

export const getMessagesReceived = async (user) => {
  const { data } = await axios.post(`${host}/chat/user/messages/received`, { user });
  return data;
};

export const getMessagesSended = async (user) => {
  const { data } = await axios.post(`${host}/chat/user/messages/sended`, { user });
  return data;
};
export const submitMessage = async (user, receiverName, messageBody, title) => {
  const { data } = await axios.post(`${host}/chat/user/send/message`, {
    nameSender: user,
    receiverName,
    messageBody,
    title,
  });
  return data;
};
