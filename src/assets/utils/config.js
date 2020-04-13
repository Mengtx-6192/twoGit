import loginBg from '@/assets/images/logo.png';
const config = {
    projectName: '***管理系统',
    loginBg: loginBg,
    historyMode: 'history',
    axiosResponseType: 'json',
    clientId: 'flow',
    clientSecret: 'flow_secret'
};

export default {
    development: Object.assign(
        {
            axiosBaseUrl: '/'
        },
        config
    ),
    production: Object.assign(
        {
            axiosBaseUrl: ''
        },
        config
    )
};
