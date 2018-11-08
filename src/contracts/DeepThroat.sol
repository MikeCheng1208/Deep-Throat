pragma solidity ^0.4.24;
contract DeepThroat {
    
    event NewMessage(uint _id, string _name, string _message, string _time);
    
    uint private idx = 0;
    
    struct PostMsg {
        uint _id;
        string _name;
        string _massage;
        string _time;
    }
    
    PostMsg[] public pastMsgs;
    
    function SetPosMsg(string _name, string _massage, string _time) public {
        idx = idx + 1;
        pastMsgs.push(PostMsg(idx, _name, _massage, _time));
        emit NewMessage(idx, _name, _massage, _time);
    }
    
    function GetMsgLength() public view returns(uint){
        return pastMsgs.length;
    }
    
    function GetPosMsg(uint index) public view returns(uint, string, string, string) {
        return (pastMsgs[index]._id, pastMsgs[index]._name, pastMsgs[index]._massage, pastMsgs[index]._time);
    }

}