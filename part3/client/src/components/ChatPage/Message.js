import './Message.css'

const Message = ({message, user}) => {
    // console.log(message);
    
    if (!message) {
        return null;
      }
    //   console.log("came here");
    return (
        <div className={"message message-" + (message.sender.username === user.username ? "left" : "right")}>
            <div className="message-bubble">
                {message.type === 'text' &&
                    <div className="message-text">
                        <p>{message.content}</p>
                    </div>
                }
                <div>
                    <p>{message.content}</p>
                </div>
                {message.type === 'image' &&
                    <img className="message-media" src={message.text} alt="sent"/>
                }
                {message.type === 'video' &&
                    <video className="message-media" controls>
                        <source src={message.text}/>
                    </video>
                }
                <div className="message-timestamp">{new Date(message.created).toLocaleTimeString("en-US", {
                    hourCycle: 'h23',
                    hour: "numeric",
                    minute: "numeric"
                })}</div>
            </div>
        </div>
        
    );
};

export default Message;