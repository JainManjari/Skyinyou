# Skyinyou - Social Media Website
A clone of social media websites like Instagram, Facebook or Twitter.


### Functional Requirements
1. Creating new users
2. Creating, reading, editing and deleting a post created by a user.
3. Creating, reading, editing and deleting a comment on a post by a user.
4. Creating, reading, editing and deleting a reply on a comment by a user.
5. Toggling likes on posts, comments or replies.
6. Sending friend requests from one user to another. Leading to acceptance or rejection of friend requests.
7. For timeline -> it displays all the posts that have been created.
7. Receiving in-app notifications and email notifications on the user registered email address.
8. Updating user profile in the following way : changing bio, adding/editing/deleting work experience, adding/editing/deleting education, uploading/deleting profile picture,
adding contact info etc.,.
9. Sign up through Google is possible.
10. Searching a user through its name. 
11. Assigning a time-alloted session cookie to each logged-in user.
12. Changing email or setting up a new password is also possible. 


### Tech Stack Overview
1. It uses Node Js as Backend.
2. It uses EJS as view templates.
3. It uses redis-server & nodemailer for sending out email notifications.
4. It uses google-oauth-2 for signing in through google.
5. It uses Mongodb as the database.


### Entities

1. User
```json
{"_id":{"$oid":"665062ddf1e87c149272880b"},"friendships":[{"$oid":"6650668edf37f61defeb57ea"}],"works":[{"$oid":"6650688adf37f61defeb5c31"},{"$oid":"665068b5df37f61defeb5c4b"}],"grads":[{"$oid":"665068dcdf37f61defeb5c64"}],"noties":[{"$oid":"6650661fdf37f61defeb5756"},{"$oid":"6650662edf37f61defeb5765"},{"$oid":"665066e1df37f61defeb5923"},{"$oid":"66506702df37f61defeb5971"}],"pendFR":[{"$oid":"66506719df37f61defeb59c4"}],"name":"Manjari Jain","email":"manjarijain98@gmail.com","password":"1","info":{"about":"Hi, I am Manjari Jain. Nice to meet you!","personalInfo":{"currentCity":"Noida","homeTown":"","bDay":""},"socialInfo":{"fb":"","linkedin":"https://www.linkedin.com/in/manjarijain","quora":"","insta":"","utube":"","twitter":""},"contactInfo":{"phone":"","website":"https://jainmanjari.github.io/"},"bgColor":"#FB8C00"},"oldNotyLength":{"$numberInt":"2"},"prevNotyOpen":true,"oldPendFRLength":{"$numberInt":"0"},"prevPendFROpen":false,"createdAt":{"$date":{"$numberLong":"1716544221502"}},"updatedAt":{"$date":{"$numberLong":"1716545756494"}},"__v":{"$numberInt":"10"}}
```
<br>

2. Post
```json
{"_id":{"$oid":"665062fcf1e87c1492728819"},"comments":[{"$oid":"6650662ddf37f61defeb575d"}],"likes":[{"$oid":"6650661edf37f61defeb5751"},{"$oid":"665066dddf37f61defeb5914"}],"shares":[{"$oid":"665066fedf37f61defeb5961"}],"content":"Hello world","user":{"$oid":"665062ddf1e87c149272880b"},"update":false,"sharedFromPost":false,"edited":false,"likesLength":{"$numberInt":"2"},"createdAt":{"$date":{"$numberLong":"1716544252598"}},"updatedAt":{"$date":{"$numberLong":"1716545278741"}},"__v":{"$numberInt":"4"}}
```
<br>

3. Shares - sharing a post
```json
{"_id":{"$oid":"665066fedf37f61defeb5961"},"post":{"$oid":"665062fcf1e87c1492728819"},"user":{"$oid":"6650658edf37f61defeb5732"},"createdPost":{"$oid":"665066fedf37f61defeb595f"},"createdAt":{"$date":{"$numberLong":"1716545278400"}},"updatedAt":{"$date":{"$numberLong":"1716545278400"}},"__v":{"$numberInt":"0"}}
```
<br>

4. Comment
```json
{"_id":{"$oid":"6650662ddf37f61defeb575d"},"likes":[{"$oid":"665066e9df37f61defeb5934"}],"replies":[],"content":"Hello Manjari!!","post":{"$oid":"665062fcf1e87c1492728819"},"user":{"$oid":"6650656adf37f61defeb5728"},"update":false,"edited":false,"createdAt":{"$date":{"$numberLong":"1716545069267"}},"updatedAt":{"$date":{"$numberLong":"1716545257684"}},"__v":{"$numberInt":"1"}}
```
<br>

5. CommentReplies - replying to a comment.
```json
{"_id":{"$oid":"6650728cdf37f61defeb637b"},"likes":[{"$oid":"665072cddf37f61defeb6432"}],"content":"Hello Harryyyyyyy","comment":{"$oid":"6650662ddf37f61defeb575d"},"user":{"$oid":"66506976df37f61defeb5d46"},"update":false,"edited":true,"isReply":false,"createdAt":{"$date":{"$numberLong":"1716548236624"}},"updatedAt":{"$date":{"$numberLong":"1716548320840"}},"__v":{"$numberInt":"1"},"liked":false}
```
<br>

6. Likes - can happen on replies, comments or posts.
```json
{"_id":{"$oid":"6650661edf37f61defeb5751"},"likeable":{"$oid":"665062fcf1e87c1492728819"},"onModel":"Post","user":{"$oid":"6650656adf37f61defeb5728"},"createdAt":{"$date":{"$numberLong":"1716545054580"}},"updatedAt":{"$date":{"$numberLong":"1716545054580"}},"__v":{"$numberInt":"0"}}
```
<br>

7. Notifications - reples, comments, posts or friendship requests.
```json
{"_id":{"$oid":"6650661fdf37f61defeb5756"},"user":{"$oid":"6650656adf37f61defeb5728"},"notyable":{"$oid":"665062fcf1e87c1492728819"},"onModel":"Post","action":"liked","createdAt":{"$date":{"$numberLong":"1716545055220"}},"updatedAt":{"$date":{"$numberLong":"1716545055220"}},"__v":{"$numberInt":"0"}}
```
<br>

8. Friendships - which are confirmed.
```json
{"_id":{"$oid":"6650668ddf37f61defeb57e7"},"fromUser":{"$oid":"6650656adf37f61defeb5728"},"toUser":{"$oid":"665062ddf1e87c149272880b"},"createdAt":{"$date":{"$numberLong":"1716545165632"}},"updatedAt":{"$date":{"$numberLong":"1716545165632"}},"__v":{"$numberInt":"0"}}
```
<br>

9. FriendshipForms - friendships which are pending state. The toUser still has to accept to reject it.
```json
{"_id":{"$oid":"66506719df37f61defeb59c4"},"isFormSent":true,"fromUser":{"$oid":"6650658edf37f61defeb5732"},"toUser":{"$oid":"665062ddf1e87c149272880b"},"createdAt":{"$date":{"$numberLong":"1716545305706"}},"updatedAt":{"$date":{"$numberLong":"1716545305706"}},"__v":{"$numberInt":"0"}}
```
<br>


### High Level of API Designs
1. Create an user:
```
POST '/users/create'
HEADER 'Content-Type: application/json'
BODY '{
    "name": "Ron Weasley",
    "email": "ron@hogwartz.com",
    "gender": "male",
    "password": "12345678M#",
    "confirm_password": "12345678M#"
}
RESPONSE
{
    "message": "Your email chariot awaits!",
    "error": false
}
```
<br>

2. Upating an user profile
```
POST '/users/update-profile-info/{userId}'
BODY:
`
{
    "name": "Hershley",
    "about": "Hi, I am Hershley. Nice to meet you!!",
    "currentCity": "Hogwarts",
    "homeTown": "Uk",
    "birthday": "",
    "fb": "",
    "linkedin": "https://www.linkedin.com/in/manjarijain",
    "quora": "",
    "insta": "",
    "utube": "",
    "twitter": "",
    "phone": "8753426612",
    "website": "https://jainmanjari.github.io/"
}
`
RESPONSE
{
   "message":"Successfully updated profile"
}
```
<br>

3. Adding a work experience or education in user's profile.
```
POST '/users/workgrad/add'
HEADER'Content-Type: application/json' 
BODY '{
    "type": "grad",
    "title": "Bachelor of Science",
    "company": "DU",
    "descrpt": "",
    "fromMonth": "7",
    "fromYear": "2014",
    "toMonth": "6",
    "toYear": "2017"
}'
RESPONSE
{
    "data": {
        "object": {
            "_id": "665076fd0078c74bcca8d201",
            "grade": "Bachelor of Science",
            "school": "DU",
            "descrpt": "",
            "fromMonth": "07",
            "fromYear": "2014",
            "toMonth": "06",
            "toYear": "2017",
            "user": "66506976df37f61defeb5d46",
            "createdAt": "2024-05-24T11:16:13.463Z",
            "updatedAt": "2024-05-24T11:16:13.463Z",
            "__v": 0
        },
        "length": 1,
        "type": "grad"
    },
    "error": false
}
```
<br>

4. Updating a work experience or education in user's profile.
```
POST '/users/workgrad/update-work-grad'
HEADER'Content-Type: application/json' 
BODY '{
    "id": "665076fd0078c74bcca8d201",
    "type": "grad",
    "title": "Bachelor",
    "company": "Delhi University",
    "descrpt": "",
    "fromMonth": "07",
    "fromYear": "2014",
    "toMonth": "06",
    "toYear": "2017"
}'
RESPONSE
{
    "data": {
        "object": {
            "_id": "665076fd0078c74bcca8d201",
            "grade": "Bachelor",
            "school": "Delhi University",
            "descrpt": "",
            "fromMonth": "07",
            "fromYear": "2014",
            "toMonth": "06",
            "toYear": "2017",
            "user": "66506976df37f61defeb5d46",
            "createdAt": "2024-05-24T11:16:13.463Z",
            "updatedAt": "2024-05-24T11:16:13.463Z",
            "__v": 0
        },
        "type": "grad"
    },
    "error": false
}
```
<br>

5. Searching for another user
```
GET '/search?search={value}'
HEADER'Content-Type: application/json' 
RESPONSE
{
    "data": {
        "usersFound": [
            {
                "name": "Harry Potter",
                "id": "6650656adf37f61defeb5728",
                "bgColor": "#512DA8"
            },
            {
                "name": "Lily Luna Potter",
                "id": "6650658edf37f61defeb5732",
                "bgColor": "#4952be"
            }
        ]
    },
    "message": "Users found successfully!"
}
```
<br>



6. Creating a post:
```
POST '/postRoutes/create-post'
HEADER'Content-Type: application/json' 
BODY: 
`
{
    "content": "Creating my first post ever!!"
}
`
RESPONSE
`{"data":{"post":{"comments":[],"likes":[],"shares":[],"_id":"665079210078c74bcca8d247","content":"Creating my first post ever!!","user":{"friendships":[],"_id":"66506976df37f61defeb5d46","name":"Hershley","email":"hershley@gmail.com","info":{"about":"Hi, I am Hershley. Nice to meet you!!","personalInfo":{"currentCity":"Hogwarts","homeTown":"Uk","bDay":""},"socialInfo":{"fb":"","linkedin":"https://www.linkedin.com/in/manjarijain","quora":"","insta":"","utube":"","twitter":""},"contactInfo":{"phone":"8753426612","website":"https://jainmanjari.github.io/"},"bgColor":"#E91E63"}},"update":false,"sharedFromPost":false,"edited":false,"likesLength":0,"createdAt":"2024-05-24T11:25:21.923Z","updatedAt":"2024-05-24T11:25:21.923Z","__v":0},"len":1},"message":"Post created"}`
```
<br>

7. Updating a post:
```
POST '/postRoutes/update-post-p2/'
HEADER'Content-Type: application/json' 
BODY: 
`
{
    "content": "Updating my first post ever!!!!!!!",
    "post": "66507975557e3f5461446aa9"
}
`
RESPONSE
{"postID":"66507975557e3f5461446aa9","content":"Updating my first post ever!!!!!!!","edited":true,"posts":[{"comments":[],"likes":[],"shares":[],"_id":"665079210078c74bcca8d247","content":"Creating my first post ever!!","user":"66506976df37f61defeb5d46","update":false,"sharedFromPost":false,"edited":false,"likesLength":0,"createdAt":"2024-05-24T11:25:21.923Z","updatedAt":"2024-05-24T11:25:21.923Z","__v":0},{"comments":[],"likes":[],"shares":[],"_id":"66507975557e3f5461446aa9","content":"Updating my first post ever!!!!","user":"66506976df37f61defeb5d46","update":true,"sharedFromPost":false,"edited":true,"likesLength":0,"createdAt":"2024-05-24T11:26:45.243Z","updatedAt":"2024-05-24T11:30:57.673Z","__v":0}]}
```
<br>

8. Sharing a post:
```
POST '/postRoutes/share-post/'
HEADER'Content-Type: application/json' 
BODY: 
`
{
  content: 'Sharing is carringgg!!!!',
  post: '665062fcf1e87c1492728819'
}
`
RESPONSE
{"message":"Request successful!","data":{"newPostID":"66507b28233cd35b263ae51b","newUserName":"Hershley","newUserID":"66506976df37f61defeb5d46","newUserBgColor":"#E91E63","newUserContent":"Sharing is carringgg!!!!","newWholePost":{"comments":[],"likes":[],"shares":[],"_id":"66507b28233cd35b263ae51b","content":{"prevAuthName":"Manjari Jain","prevAuthID":"665062ddf1e87c149272880b","prevAuthBgColor":"#FB8C00","prevAuthContent":"Hello world","prevPostId":"665062fcf1e87c1492728819","newContent":"Sharing is carringgg!!!!","prevPostShares":2},"user":{"friendships":[],"works":[],"grads":["665076fd0078c74bcca8d201"],"noties":[],"pendFR":[],"_id":"66506976df37f61defeb5d46","name":"Hershley","email":"hershley@gmail.com","gender":"female","password":"123345678M#","info":{"about":"Hi, I am Hershley. Nice to meet you!!","personalInfo":{"currentCity":"Hogwarts","homeTown":"Uk","bDay":""},"socialInfo":{"fb":"","linkedin":"https://www.linkedin.com/in/manjarijain","quora":"","insta":"","utube":"","twitter":""},"contactInfo":{"phone":"8753426612","website":"https://jainmanjari.github.io/"},"bgColor":"#E91E63"},"prevNotyOpen":false,"oldNotyLength":0,"prevPendFROpen":false,"oldPendFRLength":0,"createdAt":"2024-05-24T10:18:30.691Z","updatedAt":"2024-05-24T11:16:13.795Z","__v":1},"update":false,"sharedFromPost":true,"edited":false,"likesLength":0,"createdAt":"2024-05-24T11:34:00.603Z","updatedAt":"2024-05-24T11:34:00.603Z","__v":0},"shareID":"66507b28233cd35b263ae51d","originalPostID":"665062fcf1e87c1492728819","newPostDate":"5/24/2024, 5:04:00 PM","valid":true,"len":3},"error":false}
```
<br>


9. Deleting a post:
```
GET '/postRoutes/share-post/'
HEADER'Content-Type: application/json' 
RESPONSE
{
    "data": {
        "postID": "66507975557e3f5461446aa9",
        "bornPosts": [],
        "len": 1
    },
    "message": "Post deleted successfully!"
}
```
<br>


10. Displaying timeline:
```
GET '/'
HEADER'Content-Type: application/json' 
RESPONSE
[{"comments":[],"likes":[],"shares":[],"_id":"66507b28233cd35b263ae51b","content":{"prevAuthName":"Manjari Jain","prevAuthID":"665062ddf1e87c149272880b","prevAuthBgColor":"#FB8C00","prevAuthContent":"Hello world","prevPostId":"665062fcf1e87c1492728819","newContent":"Sharing is carringgg!!!!","prevPostShares":2},"user":{"friendships":[],"works":[],"grads":["665076fd0078c74bcca8d201"],"noties":[],"pendFR":[],"_id":"66506976df37f61defeb5d46","name":"Hershley","email":"hershley@gmail.com","gender":"female","password":"123345678M#","info":{"about":"Hi, I am Hershley. Nice to meet you!!","personalInfo":{"currentCity":"Hogwarts","homeTown":"Uk","bDay":""},"socialInfo":{"fb":"","linkedin":"https://www.linkedin.com/in/manjarijain","quora":"","insta":"","utube":"","twitter":""},"contactInfo":{"phone":"8753426612","website":"https://jainmanjari.github.io/"},"bgColor":"#E91E63"},"prevNotyOpen":false,"oldNotyLength":0,"prevPendFROpen":false,"oldPendFRLength":0,"createdAt":"2024-05-24T10:18:30.691Z","updatedAt":"2024-05-24T11:16:13.795Z","__v":1},"update":false,"sharedFromPost":true,"edited":false,"likesLength":0,"createdAt":"2024-05-24T11:34:00.603Z","updatedAt":"2024-05-24T11:34:00.603Z","__v":0}]
```
<br>


11. Creating a comment on a post:
```
POST '/commentRoutes/create-comment'
HEADER'Content-Type: application/json' 
BODY: 
`{
    "content": "Heyyyy :D",
    "post": "665062fcf1e87c1492728819"
}
`
RESPONSE
`{"data":{"comment":{"likes":[],"replies":[],"_id":"66507e6edf74ce679413acda","content":"Hello universe!","post":"665066fedf37f61defeb595f","user":{"friendships":[],"_id":"66506976df37f61defeb5d46","name":"Hershley","email":"hershley@gmail.com","gender":"female","info":{"about":"Hi, I am Hershley. Nice to meet you!!","personalInfo":{"currentCity":"Hogwarts","homeTown":"Uk","bDay":""},"socialInfo":{"fb":"","linkedin":"https://www.linkedin.com/in/manjarijain","quora":"","insta":"","utube":"","twitter":""},"contactInfo":{"phone":"8753426612","website":"https://jainmanjari.github.io/"},"bgColor":"#E91E63"}},"update":false,"edited":false,"createdAt":"2024-05-24T11:47:58.742Z","updatedAt":"2024-05-24T11:47:58.742Z","__v":0},"post":{"comments":[{"likes":[],"replies":[],"_id":"66507e6edf74ce679413acda","content":"Hello universe!","post":"665066fedf37f61defeb595f","user":{"friendships":[],"works":[],"grads":["665076fd0078c74bcca8d201"],"noties":[],"pendFR":[],"_id":"66506976df37f61defeb5d46","name":"Hershley","email":"hershley@gmail.com","gender":"female","password":"123345678M#","info":{"about":"Hi, I am Hershley. Nice to meet you!!","personalInfo":{"currentCity":"Hogwarts","homeTown":"Uk","bDay":""},"socialInfo":{"fb":"","linkedin":"https://www.linkedin.com/in/manjarijain","quora":"","insta":"","utube":"","twitter":""},"contactInfo":{"phone":"8753426612","website":"https://jainmanjari.github.io/"},"bgColor":"#E91E63"},"prevNotyOpen":false,"oldNotyLength":0,"prevPendFROpen":false,"oldPendFRLength":0,"createdAt":"2024-05-24T10:18:30.691Z","updatedAt":"2024-05-24T11:16:13.795Z","__v":1},"update":false,"edited":false,"createdAt":"2024-05-24T11:47:58.742Z","updatedAt":"2024-05-24T11:47:58.742Z","__v":0}],"likes":[],"shares":[],"_id":"665066fedf37f61defeb595f","content":{"prevAuthID":"665062ddf1e87c149272880b","prevAuthName":"Manjari Jain","prevAuthContent":"Hello world","prevAuthImage":null,"prevPostId":"665062fcf1e87c1492728819","prevAuthBgColor":"#FB8C00","newContent":"All the best Manjari!!","prevPostShares":1},"user":{"friendships":[],"_id":"6650658edf37f61defeb5732","name":"Lily Luna Potter","email":"lily@uk.com"},"update":false,"sharedFromPost":true,"edited":false,"likesLength":0,"createdAt":"2024-05-24T10:07:58.082Z","updatedAt":"2024-05-24T11:47:59.377Z","__v":1},"length":1,"notyOriginalUser":{"friendships":[],"works":[],"grads":[],"noties":[{"_id":"66507e70df74ce679413ace1","user":"66506976df37f61defeb5d46","notyable":{"comments":[{"likes":[],"replies":[],"_id":"66507e6edf74ce679413acda","content":"Hello universe!","post":"665066fedf37f61defeb595f","user":{"friendships":[],"works":[],"grads":["665076fd0078c74bcca8d201"],"noties":[],"pendFR":[],"_id":"66506976df37f61defeb5d46","name":"Hershley","email":"hershley@gmail.com","gender":"female","password":"123345678M#","info":{"about":"Hi, I am Hershley. Nice to meet you!!","personalInfo":{"currentCity":"Hogwarts","homeTown":"Uk","bDay":""},"socialInfo":{"fb":"","linkedin":"https://www.linkedin.com/in/manjarijain","quora":"","insta":"","utube":"","twitter":""},"contactInfo":{"phone":"8753426612","website":"https://jainmanjari.github.io/"},"bgColor":"#E91E63"},"prevNotyOpen":false,"oldNotyLength":0,"prevPendFROpen":false,"oldPendFRLength":0,"createdAt":"2024-05-24T10:18:30.691Z","updatedAt":"2024-05-24T11:16:13.795Z","__v":1},"update":false,"edited":false,"createdAt":"2024-05-24T11:47:58.742Z","updatedAt":"2024-05-24T11:47:58.742Z","__v":0}],"likes":[],"shares":[],"_id":"665066fedf37f61defeb595f","content":{"prevAuthID":"665062ddf1e87c149272880b","prevAuthName":"Manjari Jain","prevAuthContent":"Hello world","prevAuthImage":null,"prevPostId":"665062fcf1e87c1492728819","prevAuthBgColor":"#FB8C00","newContent":"All the best Manjari!!","prevPostShares":1},"user":{"friendships":[],"_id":"6650658edf37f61defeb5732","name":"Lily Luna Potter","email":"lily@uk.com"},"update":false,"sharedFromPost":true,"edited":false,"likesLength":0,"createdAt":"2024-05-24T10:07:58.082Z","updatedAt":"2024-05-24T11:47:59.377Z","__v":1},"onModel":"Post","action":"commented","createdAt":"2024-05-24T11:48:00.301Z","updatedAt":"2024-05-24T11:48:00.301Z","__v":0}],"pendFR":[],"_id":"6650658edf37f61defeb5732","name":"Lily Luna Potter","email":"lily@uk.com","gender":"female","password":"1","info":{"about":"Hi, I am Lily Luna Potter. Nice to meet you!","bgColor":"#4952be"},"prevNotyOpen":false,"oldNotyLength":0,"prevPendFROpen":false,"oldPendFRLength":0,"createdAt":"2024-05-24T10:01:50.428Z","updatedAt":"2024-05-24T10:01:50.428Z","__v":0}},"message":"Comment published!"}`
```
<br>





### Flowchart
<img width="1362" alt="Screenshot 2024-05-12 at 9 16 36 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/99d30718-2bd5-49d1-9983-5d338990f839">


### Current Architecture
<img width="861" alt="Screenshot 2024-05-12 at 10 15 34 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/0d4f0c44-a3e4-47a2-8419-4a5039dc9304">


### Future improvements in the Current Architecture
<img width="1201" alt="Screenshot 2024-05-12 at 10 12 01 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/7b32d27c-52f7-4fe6-bdc1-ae038cb2ecc9">


### Testing 

1. Create a player
<img width="624" alt="Screenshot 2024-05-12 at 10 55 06 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/dad4dbff-7b2e-4b23-9c8c-acc8461a3abc">
<br/>
<br/>
2. Create a game
<img width="1080" alt="Screenshot 2024-05-12 at 10 57 06 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/92557d92-61fc-4fe1-83d0-97e20cdf8883">
<br/>
<br/>
3. Scheduler running in the background
<br/>
<img width="717" alt="Screenshot 2024-05-12 at 10 57 31 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/da1e2a0c-cba5-45ee-96c5-65edec5200f3">
<br/>
<br/>
<img width="756" alt="Screenshot 2024-05-12 at 10 59 10 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/c38f011e-4c64-407c-8ccb-df314b8243a8">
<br/>
<br/>
4. Displaying the top 5 players on UI
<br/>
<img width="880" alt="Screenshot 2024-05-12 at 11 00 01 AM" src="https://github.com/JainManjari/GameScheduler/assets/54873596/17bbc595-7a6e-4d79-b904-9553aa3de375">
<br/>


## Running project

1. git clone https://github.com/JainManjari/GameScheduler.git
2. npm install
3. npm start
4. Open browser and go to http://localhost:8000