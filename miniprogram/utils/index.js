// 发送邮件 subject：邮件主题， text：邮件内容
export const sendEmailUtils = ({ subject, text }) => {
  wx.cloud.callFunction({
    name: 'cloudFunc',
    data: {
      operation: 'sendEmail',
      params:{ subject, text }
    },
    success: res => {
      console.log(res)
    }
  })
}

// 获取微信步数
export const getUserStep = () => {
  wx.getWeRunData({
    success: ({ cloudID }) => {
      console.log(cloudID, 'cloudID')
      console.log(wx.cloud.CloudID( cloudID ), 'cc')
      wx.cloud.callFunction({
        name: 'cloudFunc',
        data: {
          weRunData: wx.cloud.CloudID( cloudID )
        },
        success: res => {
          console.log(res, 'res')
        }
      })
    }
  })
}