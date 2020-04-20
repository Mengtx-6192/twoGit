import logo from '@/assets/images/logo1.png';
import logoSmall from '@/assets/images/logo.png';
const config = {
    projectName: '逸刻工程管理系统',
    logo: logo,
    logoSmall: logoSmall,
    loginBg: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/rdp-cpm-fe/imags/login-bg.png',
    historyMode: 'history',
    axiosResponseType: 'json',
    clientId: 'yk_cpm',
    clientSecret: 'yk_cpm_secret',
    themeColor: '#515a6e',
    customBg: [],
    customColor: [],
    home: '/prjM/apply'
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
