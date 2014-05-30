'use strict';

function SimpleMessage(userName, userMessage, isIncome){
    this.inQueue = true;
    this.income = (typeof isIncome === 'boolean') ? isIncome : false;
    this.userName = userName || '';
    this.userMessage = userMessage || '';
};

SimpleMessage.prototype.activate = function(){
    this.inQueue = false;
};

