import logo from '@/assets/images/logo.png';
import logoSmall from '@/assets/images/logo.png';
const config = {
    projectName: '欢迎登陆',
    logo: '',
    loginBg: 'https://pc-app-uat.egocvs.com/img/login_bg.f00d993d.png',
    pageHeader: {
        screenful: true,
        theme: false,
        lang: false,
        message: false,
        logoSmall: logoSmall,
        height: 50
    },
    historyMode: 'history',
    axiosResponseType: 'json',
    clientId: 'yk_cpm',
    clientSecret: 'yk_cpm_secret',
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
