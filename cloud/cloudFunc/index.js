// 云函数入口文件
const cloud = require('wx-server-sdk')
const nodemailer = require("nodemailer")
const OPEN_EMAIL = ""; // 开通服务的邮箱（一般都是自己的邮箱）

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const { operation, params } = event
  switch (operation) {
    case 'getUserOpenId' :
      return getUserOpenId();
    case 'sendEmail' : 
      return sendEmail( params );
  }
}

// 获取用户openid和
function getUserOpenId () {
  const wxContext = cloud.getWXContext()
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

// 发送邮件
function sendEmail ({ subject, text }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 邮箱服务器主机，如：smtp.163.com
    service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: OPEN_EMAIL, // 你的邮箱
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: "",
    },
  });  
  const mailOptions = {
    from: OPEN_EMAIL, 
    to: "", 
    subject: subject, 
    // 发送text或者html格式
    text: text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return {
        code: 200,
        data: error,
        message: '发送失败！'
      }
    }
    return {
      code: 200,
      data: info.messageId,
      message: '发送成功！'
    }
  });
}