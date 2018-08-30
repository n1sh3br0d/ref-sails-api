# ref-sails-api

a [Sails v1](https://sailsjs.com) application
## Installation

Clone repository and run `npm i && npm start`.
Now you can go to your [site](http://localhost:1337/).
For automate testing run `npm run test`.

## Usage 

### Work with Account

First you need create account. For do it need send **POST** request to **http://localhost:1337/users/signup** with required parameters of body (**email**, **user** and **password**). Email and user **unique**. If email or user already exist, you will get **RESPONSE** with code **400** and body **Email/User busy**. Else you will get **RESPONSE** with code **201** and body **Sucess created**.

Now you can login. For do it send **POST** request to **http://localhost:1337/users/login** with yours **email** and **password**. If you send wrong email or password you will get **RESPONSE** with code **401** and body **Invalid parameters**. Else you will get **RESPONSE** with code **200** and body with **token**. Token will using for all actions **creating**/**modifying**/**deleting** in future.

**MANUAL TESTED.PASSED IN AUTOMATE TEST** For upload avatar picture send **POST** request to **http://localhost:1337/users/YOURID/avatar** with image into form field called avatar. For take avatar you need send **GET** request to **http://localhost:1337/uploads/AVATAR_FIELD** which you learn how to get later. Also you need use your **TOKEN**. Just add **Authorization** header with **Bearer YOURtoken** to your request. Max size of image 10MB. You will get **RESPONSE** with code 201 and body **Avatar uploaded**.

For modify account send **PATCH** request to **http://localhost:1337/users/YOURID** with parameters you want update. You will get **RESPONSE** with code 200 and body **Sucess updated**. User **can't** change email. For change avatar use upper instructions.

For delete account send **DELETE** request to **http://localhost:1337/users/YOURID**. You will get **RESPONSE** with code 201 and body **Sucess deleted**.

**NOT TESTED** For restore password of your account send **GET** request to **http://localhost:1337/users/restore** with query parameter **name**. You will get **RESPONSE** with code 200 and body **Check inbox for letter with password**. Example `http://localhost:1337/users/restore?name=MYNAME` after it check inbox (You will recieve letter in 10 minutes), also you can check SPAM folder.

You **can't** modify/delete **account**/**topics**/**comments** of another users. In this you will get **RESPONSE** with code 300 and body **ACCESS DENIED**. Also for all operations(except **GET** requests to **topics**,**comments**,**likes**) must use token. Else you will get **RESPONSE** with code 401 and body **Token required**.

For find users send **GET** request to **http://localhost:1337/users** you will get json response with fields **model** and **users**. Last contain array of users. Every user have fields **id**,**name** and **avatar**. If add to request id of user **/users/ID** will get identical response, but array will containt only 1 element with information of id user. Also if it's your id, will added **email** field. If to **/users/ID** add **topics**/**comments**/**likes** will get response with relevant data sorted by field **owner**.


### Work with topics

For create topic send **POST** request to **http://localhost:1337/topics** with required parameters **subject** and **body**. Its create topic with identical fields and adding field **owner** with id of user. **RESPONSE** will be 201.

For modify/delete topic, send **PATCH**/**DELETE** request to **/topics/IDofTOPIC** with modifying parameters in first and nothing in last. For find topics, send **GET** request to **/topics**, you will get response with simillar fields **model** and **topics**. Last contain array of topics. Every topic have fields **id**,**subject**,**body** and **owner**. Identical in users, if add **/topics/IDofTopic** will get response with information of id topic. Also if add **/topics/IDofTOPIC/comments** will get response with relevant data sorted by field **topic**.


### Work with comments

For create comment send **POST** request to **http://localhost:1337/topics/IDofTOPIC** with only one field in body called **body**. Its create a comment with fields **topic** that contain id of topic, **body** and **owner** that contain id of user. **RESPONSE** will be 201. 

For modify/delete comment, send **PATCH**/**DELETE** request to **/comments/IDofCOMMENT** with modifying parameter in first and nothing in last. For find comments, send **GET** request to **/comments**, you will get response with simillar fields **model** and **comments**. Last contain array of comments. Every comment have fields **topic**,**body** and **owner**. Identical in uppers, if add **/comments/IDofCOMMENT** will get response with information of id comment. Also if add **/comments/IDofCOMMENTS/likes** will get response with relevant data sorted by field **comment**.


### Work with likes

For create like send **POST** request to **http://localhost:1337/comments/IDofCOMMENT** with nothing. Its create a like with only two fields **comment** that contain id of comment and **owner** that contain id of user. **RESPONSE** will be 201. 

Repeat it for delete like. **RESPONSE** will be 200.


### Work with queries

You can use paggination for control searches. Add query integer parameter **limit** to limit elements of arrays. Also you can add integer parameter **page** to go next page. Example `http://localhost:/users/?limit=3&page=2`.

You can use all actions with **GET** requests. Just insert actions(exclude upload avatar),token(api query) and parameters in query.
Here some examples:  

`http://localhost:1337/users/signup?email=myEmail&name=&myName&password=myPassword`  
`http://localhost:1337/topics/ID/update?subject=myNewSubject&api=MyToken`  
`http://localhost:1337/topics/ID/create?body=myComment&api=MyToken`  
`http://localhost:1337/comments/ID/create?api=MyToken         It's create and also delete like. See response code to uderstand`  
`http://localhost:1337/comments/ID/delete?api=MyToken`

### Links

+ [Get started](https://sailsjs.com/get-started)
+ [Sails framework documentation](https://sailsjs.com/documentation)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sun Aug 26 2018 06:59:54 GMT+0300 (MSK) using Sails v1.0.2.

<!-- Internally, Sails used [`sails-generate@1.15.28`](https://github.com/balderdashy/sails-generate/tree/v1.15.28/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

