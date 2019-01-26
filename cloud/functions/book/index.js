// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

cloud.init()
const api = require('./api')
const tools = require('./tools')

//  1.检索书籍
//  2.获取书本基本信息
//  3.获取书本目录
//  4.获取书本详情


// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  });

  app.router('search', async (ctx, next) => {
    try {
      const {
        title
      } = ctx._req.event
      const result = await api.search(title)
      return ctx.body = {
        code: 200,
        msg: `发现相关小说`,
        data: tools.booksList(result.text)
      }
    } catch (err) {
      return ctx.body = {
        code: 500,
        msg: 'err:' + err
      }
    }
  });

  app.router('recentUpdate', async (ctx) => {
    try {
      const {
        url
      } = ctx._req.event
      const result = await api.recentUpdate(url)
      return ctx.body = {
        code: 200,
        msg: `最近更新章节`,
        data: tools.booksRecentChapter(result.text)
      }
    } catch (err) {
      return ctx.body = {
        code: 500,
        msg: 'err:' + err
      }
    }
  });

  app.router('detail', async (ctx) => {
    try {
      const {
        url
      } = ctx._req.event
      const result = await api.searchDetail(url)
      return ctx.body = {
        code: 200,
        msg: `详情已获取`,
        data: tools.booksDetail(result.text)
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