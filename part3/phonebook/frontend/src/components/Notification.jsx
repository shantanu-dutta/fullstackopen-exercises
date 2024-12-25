const Notification = ({ type, message }) => {
  return message ? <div className={`alert ${type}`}>{message}</div> : null;
};

export default Notification;
