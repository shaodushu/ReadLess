// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()
const DB = cloud.database()
const USER = DB.collection('user')
const _ = DB.command
// const api = require('./api')
// const tools = require('./tools')

//  1. 用户注册
//  2. 更新用户阅读记录


// 云函数入口函数
exports.main = async (event, context) => {
    const {
        OPENID,
        APPID,
        UNIONID
    } = cloud.getWXContext()

    const app = new TcbRouter({
        event
    });

    app.router('authorization', async (ctx, next) => {
        try {
            const {
                userinfo
            } = event
            await USER.add({
                data: {
                    ...userinfo,
                    openid: OPENID,
                    readLog: []
                }
            })
            return ctx.body = {
                code: 200,
                msg: `AUTH_SUCCESS`,
                data: userinfo
            }
        } catch (err) {
            return ctx.body = {
                code: 500,
                msg: 'err:' + err
            }
        }
    });
    app.router('getUserInfo', async (ctx, next) => {
        try {
            const res = await USER.where({
                openid: OPENID
            }).get()
            return ctx.body = {
                code: 200,
                msg: `RD_USER_INFO`,
                data: res.data[0]
            }
        } catch (err) {
            return ctx.body = {
                code: 500,
                msg: 'err:' + err
            }
        }
    });
    app.router('recordLog', async (ctx, next) => {
        try {
            const {
                url,
                title
            } = event
            await USER.where({
                openid: OPENID
            }).update({
                data: {
                    readLog: _.push({
                        url,
                        title
                    })
                },
            })
            return ctx.body = {
                code: 200,
                msg: `RD_LOG_SUCCESS`
            }
        } catch (err) {
            return ctx.body = {
                code: 500,
                msg: 'err:' + err
            }
        }
    });
    return app.serve();
}