export function getReasonLabel(id) {
  let list = []
  switch (id) {
    case 1:
      list = [
        { id: 1, name: '色情' },
        { id: 2, name: '低俗' },
        { id: 3, name: '引导私下交易' },
      ]
      break
    case 2:
      list = [
        { id: 4, name: '涉政不实信息' },
        { id: 5, name: '涉政不当言论' },
      ]
      break
    case 3:
      list = [
        { id: 6, name: '虚拟虚假时事' },
        { id: 7, name: '虚拟虚假知识' },
      ]
      break
    case 4:
      list = [
        { id: 8, name: '杀猪盘' },
        { id: 9, name: '刷单欺诈' },
        { id: 10, name: '换脸合成' },
        { id: 11, name: '养老欺诈' },
      ]
      break
    case 5:
      list = [
        { id: 12, name: '侮辱谩骂' },
        { id: 13, name: '涉嫌非法集资' },
        { id: 14, name: '危险行为' },
      ]
      break
    case 6:
      list = [
        { id: 15, name: '骗赞骗互动' },
        { id: 16, name: '内容观感体验差' },
        { id: 17, name: '内容虚假/不完整' },
      ]
      break
    case 7:
      list = [
        { id: 18, name: '虚假夸大宣传' },
        { id: 19, name: '出售违禁品' },
        { id: 20, name: '售卖假冒商品' },
      ]
      break
    case 8:
      list = [
        { id: 21, name: '疑似自杀' },
        { id: 22, name: '教唆自杀' },
      ]
      break
    case 9:
      list = [
        { id: 23, name: '引人不适' },
        { id: 24, name: '价值观导向不良' },
        { id: 25, name: '网暴他人' },
      ]
      break
    case 10:
      list = [
        { id: 26, name: '商标权' },
        { id: 27, name: '名誉权' },
        { id: 28, name: '肖像权' },
        { id: 29, name: '隐私权' },
        { id: 30, name: '专利权' },
        { id: 31, name: '著作权（本人作品被盗用）' },
        { id: 32, name: '无法确定侵权类型' },
        { id: 33, name: '他人作品被盗用' },
      ]
      break
    case 11:
      list = [
        { id: 34, name: '危险行为' },
        { id: 35, name: '未成年营销' },
        { id: 36, name: '未成年医美' },
      ]
      break
    case 12:
      list = [
        { id: 37, name: '侵害未成年' },
        { id: 38, name: '价值观导向不良' },
        { id: 39, name: '儿童邪典' },
      ]
      break
  }
  return list
}
