'use strict';

$(document).ready(function(){
    var simpleMessenger = new SimpleMessenger();

    $('.main__inner__chat__message_list').slimScroll({
        height: '250px'
    });

    $('.app').on('newMessageCame', function(e, message) {
        if (message instanceof SimpleMessage) {
            simpleMessenger.addMessage(message);
            $('.main__inner__chat__message_list').append(getNewMessages(simpleMessenger));
        }
    });

    startFaking(7000, 'Илья', ['Привет', 'Да норм.', 'А я тебя люблю, штурмовик...']);
    startFaking(4000, 'Стас', ['Привет', 'Как ты?', 'Я тебя ненавижу']);

    $('.main__inner__chat__message_form__form').submit(function(e){
        var userName = $('#userName').val(),
            userMessage = $('#userMessage').val(),
            newMessage = new SimpleMessage(userName, userMessage, false);

        e.preventDefault();
        $('.app').trigger('newMessageCame', newMessage);
        $('#userMessage').val('').focus();
    });
});

//function generateMessages(messenger){
//    for (var i = 0; i < 10; i++){
//        messenger.addMessage(new SimpleMessage('Антон', 'Привет', true));
//    }
//}

function clearForm(selector){
    $(selector)[0].reset();
}

function getNewMessages(messenger){
    var elementsToRender = [];
    var template = '<div class="main__inner__chat__message_list__item {message-type}">' +
                    '<div class="main__inner__chat__message_list__item__user-name">{user-name}:</div>' +
                    '<div class="main__inner__chat__message_list__item__user-message -rounded">{user-message}</div>' +
                    '</div>';

    for (var i = 0; i < messenger.messageList.length; i++){
        if (messenger.messageList[i]){
            var newElement = template.replace('{user-name}', (messenger.messageList[i].income ? messenger.messageList[i].userName : 'Вы'))
                .replace('{user-message}', messenger.messageList[i].userMessage)
                .replace('{message-type}', (messenger.messageList[i].income ? '-income' : '-outcome'));

            if (messenger.messageList[i].inQueue === true) {
                elementsToRender.push(newElement);
                messenger.messageList[i].activate();
            }
        }
    }

    return elementsToRender;
}

function startFaking(timeout, userName, userMessages){
    var interval = timeout || 2000,
        name = userName || 'Unknown',
        messages = userMessages || ['Unknown'];

    setInterval(function(){
        var message = messages[Math.floor(Math.random() * messages.length)];
        var newMessage = new SimpleMessage(name, message, true);
        $('.app').trigger('newMessageCame', newMessage);
    }, interval);
}