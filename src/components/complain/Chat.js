import React from "react";
import noMessages from "../../assets/static/media/no-message.svg";

const Chat = ({ contact, user, messages, sendMessage }) => {
  console.log("Message: ", messages);
  console.log("user: ", user);
  return (
    <>
      {contact ? (
        <>
          <div id="chat-messages" className="d-flex flex-column h-100 overflow-auto">
            {messages ? (
              <>
                <div className="mt-auto">
                  {messages?.map((item, index) => (
                    <div key={index}>
                      <div className={`d-flex  ${item.idSender === user.id ? "justify-content-end pe-3" : "justify-content-start ps-2"} mb-2`}>
                        <div className={item.idSender === user.id ? "chat-me" : "chat-other"}>
                          <span className="">{item.message}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center" style={{ opacity: "0.5" }}>
                <img src={noMessages} style={{ maxWidth: "30%" }} alt="" />
                <h4 className="mt-4">"No Message"</h4>
              </div>
            )}
            <div className="col-12">
              <div className="form px-2">
                <input placeholder="Send Message" className="my-2" onKeyPress={sendMessage} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-100 d-flex align-items-center justify-content-center">
            <h2>Click Contact For Send Message</h2>
          </div>
        </>
      )}
    </>
  );
};

export default Chat;
