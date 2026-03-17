/* Assuming message system having this */
const messages = await Message.find({
  conversationId: req.params.id
});
/*
 當 conversation 裡有 100,000 messages. What problems might arise with the API? 
 that's mean is 從 MongoDB 抓出整個 conversation 的所有 messages
 it's become    MongoDB → Server → Client
                傳 100000 筆資料
*/

/* Three possible problems
1. MongoDB query slow

If there is no index:

conversationId

MongoDB may need to scan the entire collection.

This is:
A MongoDB query slow
*/

/* 
2. Response Too Large

If each message is:
1KB

then:
100,000 messages
≈ 100MB

In this case:
res.json(messages)

it's will become:
A Huge Response
*/

/* 
Slow network transfer speed

Server → Client transfer speed:
100MB
*/
