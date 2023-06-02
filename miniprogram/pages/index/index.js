import { sendEmailUtils, getUserStep } from '../../utils/index'
Page({
  data: {
    
  },

  onLoad: function (options) {
    
  },
  // 调用utils发送邮件
  sendEmail: () => {
    sendEmailUtils({ subject: '我是邮件主题', text: '我是邮件内容！' })
  },
  // 调用utils获取微信步数
  getUserStep: () => {
    getUserStep()
  }
})