import request from '../utils/request.js'

const baseUrl = getApp().globalData.baseUrl
// let app = getApp()
// 意见箱
// 1.意见的添加
export function addSuggest(data) {
  return request({
    url: `${baseUrl}/suggest/addSuggest.do`,
    method: 'post',
    data
  })
}

// 2.意见的删除
export function deleteSuggest(data) {
  return request({
    url: `${baseUrl}/suggest/deleteSuggest.do`,
    method: 'post',
    data
  })
}

// 3.意见的分页查找
export function getSuggest(data) {
  return request({
    url: `${baseUrl}suggest/getSuggest.do`,
    method: 'post',
    data
  })
}

// 用户端
// 用pictureId获取解析信息接口
export function labelsDo(data) {
  return request({
    url: `${baseUrl}/picture/labels.do`,
    method: 'get',
    data
  })
}

// 管理端
// 删除害虫数据
export function deleteMessage(data) {
  return request({
    url: `${baseUrl}/sample/deleteMessage.do`,
    method: 'post',
    data
  })
}

// 获得科、目、属序号的序号和名字
export function get_order(data) {
  return request({
    url: `${baseUrl}/sample/get_order.do`,
    method: 'post',
    data
  })
} 

// 插入害虫数据
export function insertMessage(data) {
  return request({
    url: `${baseUrl}/sample/insertMessage.do`,
    method: 'post',
    data
  })
}

// 获取全部数据
export function selectAll(data) {
  return request({
    url: `${baseUrl}sample/selectAll.do`,
    method: 'post',
    data
  })
}

// 修改害虫数据
export function updateMessage(data) {
  return request({
    url: `${baseUrl}/sample/updateMessage.do`,
    method: 'post',
    data
  })
}

// 上传害虫样本图片
export function upload_deep(data) {
  return request({
    url: `${baseUrl}/sample/upload_deep.do`,
    method: 'post',
    data
  })
}

// 查找某一个昆虫的信息
export function selectOne(data) {
  return request({
    url: `${baseUrl}/sample/selectOne.do`,
    method: 'post',
    data
  })
}

// 修改样本图片
export function updatePic(data) {
  return request({
    url: `${baseUrl}/sample/updatePic.do`,
    method: 'post',
    data
  })
}

//删除样本图片
export function deletePic(data) {
  return request({
    url: `${baseUrl}/sample/deletePic.do`,
    method: 'post',
    data
  })
}

// 模糊查询昆虫
export function selectVague(data) {
  return request({
    url: `${baseUrl}sample/selectVague.do`,
    method: 'post',
    data
  })
}

// 资讯新闻
// 文章收藏
export function Collection(data) {
  return request({
    url: `${baseUrl}Article/Collection.do`,
    method: 'post',
    data
  })
}

// 文章详情
export function Getone(data) {
  return request({
    url: `${baseUrl}Article/Getone.do`,
    method: 'post',
    data
  })
}

//文章投稿
export function Ainsert(data) {
  return request({
    url: `${baseUrl}Article/insert.do`,
    method: 'post',
    data
  })
}

// 文章菜单
export function Menu(data) {
  return request({
    url: `${baseUrl}Article/Menu.do`,
    method: 'post',
    data
  })
}

// 投稿消息
export function selectByOpenId(data) {
  return request({
    url: `${baseUrl}Article/selectByOpenId.do`,
    method: 'post',
    data
  })
}

// 用户作品信息
export function selectByStatus(data) {
  return request({
    url: `${baseUrl}Article/selectByStatus.do`,
    method: 'post',
    data
  })
}

// 查看某一栏目关联的所有文章
export function selectMenuId(data) {
  return request({
    url: `${baseUrl}Article/selectMenuId.do`,
    method: 'post',
    data
  })
}

export function GetCollection(data) {
  return request({
    url: `${baseUrl}Article/GetCollection.do`,
    method: 'post',
    data
  })
}

// export function apiLogout() {
//   return request({
//     url: `${baseUrl}/suggest/addSuggest.do`,
//     method: 'delete'
//   })
// }
// export function apiLogout() {
//   return request({
//     url: `${baseUrl}/suggest/addSuggest.do`,
//     method: 'delete'
//   })
// }
// export function apiLogout() {
//   return request({
//     url: `${baseUrl}/suggest/addSuggest.do`,
//     method: 'delete'
//   })
// }
// export function apiLogout() {
//   return request({
//     url: `${baseUrl}/suggest/addSuggest.do`,
//     method: 'delete'
//   })
// }

export function apiLogin(data) {
  return request({
    url: `${baseUrl}/user/login`,
    method: 'post',
    data
  })
}
export function apiGetUserInfo() {
  return request({
    url: `${baseUrl}/user/userInfo`,
    method: 'get'
  })
}
export function apiModifyUserPassword(data) {
  return request({
    url: `${baseUrl}/user/modifyPassword`,
    method: 'put',
    data
  })
}
export function apiLogout() {
  return request({
    url: `${baseUrl}/user/logout`,
    method: 'delete'
  })
}
