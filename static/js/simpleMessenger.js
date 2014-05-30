'use strict';

function SimpleMessenger(){
    this.messageList = [];
}

SimpleMessenger.prototype.addMessage = function(message){
    if (message instanceof SimpleMessage)
        this.messageList.push(message);
};