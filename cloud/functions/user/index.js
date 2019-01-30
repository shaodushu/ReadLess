// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

cloud.init()
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

    // console.log(OPENID, APPID, UNIONID)
    const app = new TcbRouter({
        event
    });

    app.router('register', async (ctx, next) => {
        try {
            const {
                userinfo
            } = ctx._req.event
            // const result = await api.search(title)
            return ctx.body = {
                code: 200,
                msg: `用户注册`,
                data: {
                    userinfo,
                    OPENID,
                    APPID,
                    UNIONID
                }
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