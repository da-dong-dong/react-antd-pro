export default {
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true,
            },
        ],
    ],
    routes: [
        {
            path: '/login',
            component: './login',
        },
        {
            path: '/',
            component: '../layouts',
            routes: [

                {
                    path: '/',
                    component: './goods/index',
                },
                {
                    path: '/users',
                    component: './users/_layout',
                    routes: [
                        {
                            path: '/users/',
                            component: './users/index',
                        },
                        {
                            path: '/users/:id',
                            component: './users/$id',
                        },
                    ],
                },
                {
                    path: '/about',
                    component: './about/index',
                },
                {
                    component: './404.js',
                },
            ],
        },
    ],
};
