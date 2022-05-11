import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import Navbar from "../components/Navbar";
import Contact from "../components/complain/Contact";
import Chat from "../components/complain/Chat";
import '../assets/static/css/loading.css'

// import package socket
import { io } from "socket.io-client";

// init variable socket
let socket;

const Complain = () => {
  const title = "Complain";
  document.title = "DumbMerch | " + title;

  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [state] = useContext(UserContext);

  // connect to server in useEffect function
  useEffect(() => {
    socket = io( "https://e-dumbmers.herokuapp.com", {
      auth: {
        token: localStorage.getItem("token"), // we must set options to get access to socket server
      },
      query: {
        id: state.user.id,
      },
    });

    // define corresponding socket listener
    socket.on("new message", () => {
      console.log("contact", contact);
      console.log("triggered", contact?.id);
      socket.emit("load messages", contact?.id);
    });

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });

    loadContact();
    loadMessages();

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const loadContact = () => {
    // emit event to load admin contact
    socket.emit("load admin contact");

    // listen event to get admin contact
    socket.on("admin contact", async (data) => {
      // do whatever to the data sent from server
      const dataContact = data.map((item) => ({
        ...item,
        message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start message",
      }));
      console.log("Data Contact : ", dataContact);
      setContacts(dataContact);
    });
  };

  // used for active style when click contact
  const onClickContact = (data) => {
    console.log(data);
    setContact(data);

    socket.emit("load messages", data.id);
  };

  const loadMessages = (value) => {
    // listen event to get admin contact
    socket.on("admin contact", (data) => {
      socket.on("messages", async (data) => {
        if (data.length > 0) {
          const dataMessages = data.map((item) => ({
            idSender: item.sender.id,
            message: item.message,
          }));
          console.log("Data Messages", dataMessages);
          setMessages(dataMessages);
        } else {
          const dataMessages = null;
          console.log("Data Messages", dataMessages);
          setMessages(dataMessages);
        }
        const chatMessages = document.getElementById("chat-messages");
        chatMessages.scrollTop = chatMessages?.scrollHeight;
      });
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      socket.emit("send messages", data);
      e.target.value = "";
    }
  };

  return (
    <>
      <Navbar title={title}/>
      <Container fluid>
        <Row>
          <Col md={3} style={{ maxHeight: "86vh" }} className="list-contact mt-5">
            <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
          </Col>

          <Col md={9} style={{ maxHeight: "86vh" }}>
            <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Complain;
