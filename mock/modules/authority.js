import Mock from 'mockjs'

const authorityList = Mock.mock({
    "code": 200,
    "result": {
      "list|4": [
        {
          "name|+1": ["商品列表", "用户列表", "角色列表", "菜单列表"],
          "roleId|+1": 1,
          "roleList|+1": [
            [
              {"name":"商品详情", "roleId":11 },
              {"name":"新增商品", "roleId":12 },
              {"name":"删除商品", "roleId":13 }
            ],
            [
              {"name":"用户详情", "roleId":21 },
              {"name":"新增用户", "roleId":22 },
              {"name":"删除用户", "roleId":23 }
            ],
            [
              {"name":"角色详情", "roleId":31 },
              {"name":"新增角色", "roleId":32 },
              {"name":"删除角色", "roleId":33 }
            ],
            [
              {"name":"菜单列表", "roleId":41 },
              {"name":"菜单编辑", "roleId":42 },
            ]
          ]
        }
      ],
      "count": 4
    },
    "message": "成功"
})

export default {
  // 获取权限列表
  getAuthorityList: () => authorityList
}