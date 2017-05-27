import Mock from 'mockjs'

Mock.mock(/\/test/, {
    'list|1-10': [{
        'id': 1
    }]
})
