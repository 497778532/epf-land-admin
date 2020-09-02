const menus = {
  supply_demand: [
    {
      id: 'provide',
      icon: 'fa fa-qrcode',
      label: '供给信息列表',
      submenu: [
        {id: 'transferPlace', name: 'transferPlace', label: '转让地块信息111111111111'},
        {id: 'rentPlace', name: 'rentPlace', label: '出租地块信息'},
        {id: 'pledgePlace', name: 'pledgePlace', label: '抵押地块信息'}
      ]
    },
    {
      id: 'demand',
      icon: 'fa fa-handshake-o',
      label: '需求信息列表',
      submenu: [
        {id: 'needBuyPlace', name: 'needBuyPlace', label: '求购地块信息'},
        {id: 'needRentPlace', name: 'needRentPlace', label: '求租地块信息'}
      ]
    }
  ],
  deal: [
    {
      id: 'provide',
      icon: 'fa fa-circle-o',
      label: '供给信息列表',
      submenu: [
        {id: 'transferPlace', name: 'transferPlace', label: '转让地块信息'},
        {id: 'rentPlace', name: 'rentPlace', label: '出租地块信息'},
        {id: 'pledgePlace', name: 'pledgePlace', label: '抵押地块信息'}
      ]
    },
    {
      id: 'demand',
      icon: 'fa fa-circle-o',
      label: '需求信息列表',
      submenu: [
        {id: 'needBuyPlace', name: 'needBuyPlace', label: '求购地块信息'},
        {id: 'needRentPlace', name: 'needRentPlace', label: '求租地块信息'}
      ]
    }
  ],
  contract: [
    {
      id: 'provide',
      icon: 'fa fa-circle-o',
      label: '合同网签鉴证列表',
      submenu: [
        {id: 'transferPlace', name: 'transferPlace', label: '转让合同网签'},
        {id: 'rentPlace', name: 'rentPlace', label: '转让合同鉴证'},
        {id: 'pledgePlace', name: 'pledgePlace', label: '出租合同网签'},
        {id: 'transferPlace', name: 'transferPlace', label: '出租合同鉴证'},
        {id: 'rentPlace', name: 'rentPlace', label: '抵押合同网签'},
        {id: 'rentPlace', name: 'rentPlace', label: '抵押合同鉴证'}
      ]
    },
    {
      id: 'demand1',
      icon: 'fa fa-circle-o',
      label: '合同撤销列表'
    },
    {
      id: 'demand2',
      icon: 'fa fa-circle-o',
      label: '合同归档列表'
    }
  ],
  system: [
    {
      id: 'provide',
      icon: 'fa fa-circle-o',
      label: '微信管理'
    },
    {
      id: 'demand1',
      icon: 'fa fa-circle-o',
      label: '系统管理',
      submenu: [
        {id: 'menuManage', name: 'menuManage', label: '菜单管理'}
      ]
    },
    {
      id: 'demand2',
      icon: 'fa fa-circle-o',
      label: '门户管理',
      submenu: [
        // {id: 'infosearch', name: 'infosearch', label: '信息查询'},
        {id: 'infomenu', name: 'infomenu', label: '栏目配置'},
        {id: 'infowebset', name: 'infowebset', label: '前段设置'},
        {id: 'infomodleset', name: 'infomodleset', label: '模板配置'}
      ]
    }
  ]
}
export default menus
