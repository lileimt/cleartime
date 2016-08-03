/**
 * Created by gxx on 16/6/8.
 */
'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var json = require('./config');

// 查询单一文章评论
router.get('/', function (req, res, next) {
    var articleId = req.body.content;//文章Id
    var cql = 'select * from Comments where  objectId="' + req.body.objectId + '"';
    var pvalues = [0];
    AV.Query.doCloudQuery(cql, pvalues).then(function (data) {
        var results = data.results;
        json.data = results;
        json.msg = '获取成功!';
        res.send(json);
    }, function (error) {
        console.log(error);
        json.code = error.code;
        json.msg = error.message;
        res.send(json);
    });
});

// 修改单一文章评论
router.post('/updata', function (req, res, next) {
    var nickname = req.body.nickname;//昵称
    var email = req.body.email;//邮箱
    var content = req.body.content;//评论内容
    var cql = 'update Comments set  nickname=?,email=?,content=? where objectId=?';
    var pvalues = [nickname, email, content, req.body.objectId];
    AV.Query.doCloudQuery(cql, pvalues).then(function (data) {
        var results = data.results;
        json.data = results;
        json.msg = '修改成功!';
        res.send(json);
    }, function (error) {
        console.log(error);
        json.code = error.code;
        json.msg = error.message;
        res.send(json);
    });
});


// 新增单一文章评论
router.post('/', function (req, res, next) {
    var nickname = req.body.nickname;//昵称
    var email = req.body.email;//邮箱
    var content = req.body.content;//评论内容
    var articleId = req.body.content;//文章Id
    var cql = 'insert into Comments(nickname,email,content,articleId) values(?,?,?,?)';
    var pvalues = [nickname, email, content, articleId];
    AV.Query.doCloudQuery(cql, pvalues).then(function (data) {
        var results = data.results;
        json.data = results[0];
        json.msg = '设置成功!';
        res.send(json);
    }, function (error) {
        //查询失败，查看 error
        console.log(error);
        json.code = error.code;
        json.msg = error.message;
        res.send(json);
    });
});


// 删除单一文章评论
router.post('/del', function (req, res, next) {
    var objectId = req.body.objectId;
    AV.Query.doCloudQuery('delete from Comments where objectId="' + objectId + '"').then(function (data) {
        var results = data.results;
        json.data = results;
        json.msg = '删除成功!';
        res.send(json);
    }, function (error) {
        console.log(error);
        json.code = error.code;
        json.msg = error.message;
        res.send(json);
    });
});


module.exports = router;

