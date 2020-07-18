import React from 'react'; 
import './Message.css';
 import ReactEmoji from 'react-emoji';
const Message = ({ message: { user, text }, id, created }) =>   {
    let isSentByCurrentUser = false; 
    if(user === id) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
			 <div className="media media-chat"> 
				<div className="media-body">
					<p> {ReactEmoji.emojify(text)} </p>
					<p className="meta"><time datetime="2018">{created}</time></p>
				</div>
			</div>
           
        )
        : (
			 <div className="media media-chat media-chat-reverse">
				<div className="media-body">
					 <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
					<p className="meta"><time datetime="2018">{created}</time></p>
				</div>
			</div>
						
             
        )

    )
}

export default Message;