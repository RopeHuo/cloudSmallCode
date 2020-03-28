// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rq = require("request-promise")
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return rq(`https://douban.uieee.com/v2/movie/subject/${event.movieid}`)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      console.error(err);
    });
}