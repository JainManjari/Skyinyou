const express = require('express');
const router = express.Router();
const password=require('passport');

const commentController=require('../controllers/comment_controller');


router.post("/create-comment",password.checkAuthentication,commentController.createComment);
router.get("/destroy-comment/:id",password.checkAuthentication,commentController.destroyComment);
router.get("/destroy-comment-reply-page/:id",password.checkAuthentication,commentController.destroyCommentReply);
router.get("/update-comment/:id",password.checkAuthentication,commentController.updateComment);
router.post("/update-comment-c2/",password.checkAuthentication,commentController.updateComment2);
router.get("/replies/:id",password.checkAuthentication,commentController.showReply);
router.post("/create-comment-reply/",password.checkAuthentication,commentController.createReply);
router.get("/destroy-comment-reply/:id",password.checkAuthentication,commentController.deleteReply);
router.get("/update-reply/:id",password.checkAuthentication,commentController.updateReply);
router.post("/update-reply-r2/",password.checkAuthentication,commentController.updateReply2);
router.get("/reply-reply-r1/:id",password.checkAuthentication,commentController.replyReply1);
router.post("/reply-reply-r2/",password.checkAuthentication,commentController.replyReply2);
router.get("/reply-remove-tag/:id",password.checkAuthentication,commentController.removeTag);


module.exports=router;