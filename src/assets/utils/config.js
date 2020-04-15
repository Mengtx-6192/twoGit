import logo from '@/assets/images/logo.png';
const config = {
    projectName: '***管理系统',
    logo: logo,
    logoSmall: '',
    loginBg: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/rdp-cpm-fe/imags/login-bg.png',
    historyMode: 'history',
    axiosResponseType: 'json',
    clientId: 'cpm',
    clientSecret: 'cpm_secret',
    themeColor: '#0C3F72',
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
