import logo from '@/assets/images/logo.png';
const config = {
    projectName: '***管理系统',
    logo: logo,
    loginBg: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/rdp-cpm-fe/imags/login-bg.png',
    pageHeader: {
        screenful: true,
        theme: false,
        lang: true,
        message: true,
        logoSmall: '',
        height: 36
    },
    historyMode: 'history',
    axiosResponseType: 'json',
    clientId: 'cpm',
    clientSecret: 'cpm_secret',
    customBg: [],
    customColor: [],
    home: '/example/tree'
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
