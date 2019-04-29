const provinceList = [
  {
    value: '上海市',
    id: '310000'
  },
  {
    value: '其他',
    id: '000000'
  }
]

const cityList = {
  '310000': [
    {
      province: '上海市',
      value: '上海市',
      id: '310100'
    }
  ],
  '000000':[
    {
      province: '其他',
      value: '其他',
      id: '000001'
    }
  ]
}

const areaList = {
  '310100': [
    {
      city: '市辖区',
      value: '黄浦区',
      id: '310101'
    },
    {
      city: '市辖区',
      value: '徐汇区',
      id: '310104'
    },
    {
      city: '市辖区',
      value: '长宁区',
      id: '310105'
    },
    {
      city: '市辖区',
      value: '静安区',
      id: '310106'
    },
    {
      city: '市辖区',
      value: '普陀区',
      id: '310107'
    },
    {
      city: '市辖区',
      value: '虹口区',
      id: '310109'
    },
    {
      city: '市辖区',
      value: '杨浦区',
      id: '310110'
    },
    {
      city: '市辖区',
      value: '闵行区',
      id: '310112'
    },
    {
      city: '市辖区',
      value: '宝山区',
      id: '310113'
    },
    {
      city: '市辖区',
      value: '嘉定区',
      id: '310114'
    },
    {
      city: '市辖区',
      value: '浦东新区',
      id: '310115'
    },
    {
      city: '市辖区',
      value: '金山区',
      id: '310116'
    },
    {
      city: '市辖区',
      value: '松江区',
      id: '310117'
    },
    {
      city: '市辖区',
      value: '青浦区',
      id: '310118'
    },
    {
      city: '市辖区',
      value: '奉贤区',
      id: '310120'
    },
    {
      city: '市辖区',
      value: '崇明区',
      id: '310151'
    }
  ],
  '000001':[
    {
      city: '市辖区',
      value: '其他',
      id: '000011'
    }
  ]
}

provinceList.forEach((province) => {
  province.children = cityList[province.id]
  province.children.forEach((city) => {
    city.children = areaList[city.id]
  })
})

export default provinceList



// WEBPACK FOOTER //
// ./src/area.js