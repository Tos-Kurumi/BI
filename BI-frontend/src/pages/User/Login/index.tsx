// import Footer from '@/components/Footer';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Helmet, history, useModel} from '@umijs/max';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
// import Settings from '../../../../config/defaultSettings';
import {Link} from "@@/exports";
import {getLoginUserUsingGet, userLoginUsingPost} from "@/services/BI/userController";
// const ActionIcons = () => {
//   const langClassName = useEmotionCss(({ token }) => {
//     return {
//       marginLeft: '8px',
//       color: 'rgba(0, 0, 0, 0.2)',
//       fontSize: '24px',
//       verticalAlign: 'middle',
//       cursor: 'pointer',
//       transition: 'color 0.3s',
//       '&:hover': {
//         color: token.colorPrimaryActive,
//       },
//     };
//   });
//   return (
//     <>
//       <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
//       <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
//       <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
//     </>
//   );
// };
// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => {
//   return (
//     <Alert
//       style={{
//         marginBottom: 24,
//       }}
//       message={content}
//       type="error"
//       showIcon
//     />
//   );
// };
const Login: React.FC = () => {

  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });


  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGet();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();//获取用户登录信息
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }else {
        message.error(res.message)
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {/*{'登录'}- {Settings.title}*/}
          {'登录'}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          // title="Ant Design"
          title='智能数据分析系统'
          // subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
          subTitle={'用户名:977@ , 密码:12345678'}
          // initialValues={{
          //   autoLogin: true,
          // }}
          // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              // {
              //   key: 'account',
              //   label: '账户密码登录',
              // },
              {
                key: 'account',
                label: '',
              },
              // {
              //   key: 'mobile',
              //   label: '手机号登录',
              // },
            ]}
          />

          {/*{status === 'error' && loginType === 'account' && (*/}
          {/*  <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />*/}
          {/*)}*/}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {/*{status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}*/}
          {/*{type === 'mobile' && (*/}
          {/*  <>*/}
          {/*    <ProFormText*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <MobileOutlined />,*/}
          {/*      }}*/}
          {/*      name="mobile"*/}
          {/*      placeholder={'请输入手机号！'}*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: '手机号是必填项！',*/}
          {/*        },*/}
          {/*        {*/}
          {/*          pattern: /^1\d{10}$/,*/}
          {/*          message: '不合法的手机号！',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*    />*/}
          {/*    <ProFormCaptcha*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <LockOutlined />,*/}
          {/*      }}*/}
          {/*      captchaProps={{*/}
          {/*        size: 'large',*/}
          {/*      }}*/}
          {/*      placeholder={'请输入验证码！'}*/}
          {/*      captchaTextRender={(timing, count) => {*/}
          {/*        if (timing) {*/}
          {/*          return `${count} ${'秒后重新获取'}`;*/}
          {/*        }*/}
          {/*        return '获取验证码';*/}
          {/*      }}*/}
          {/*      name="captcha"*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: '验证码是必填项！',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*      onGetCaptcha={async (phone) => {*/}
          {/*        const result = await getFakeCaptcha({*/}
          {/*          phone,*/}
          {/*        });*/}
          {/*        if (!result) {*/}
          {/*          return;*/}
          {/*        }*/}
          {/*        message.success('获取验证码成功！验证码为：1234');*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
          <div
            // style={{
            //   marginBottom: 24,
            // }}
          >
            {/*<ProFormCheckbox noStyle name="autoLogin">*/}
            {/*  自动登录*/}
            {/*</ProFormCheckbox>*/}
            <Link
              style={{
                float: 'right',marginBottom: 24,
              }}
              to="/user/register"

            >
              没有账户 ? 请点击注册
            </Link>
          </div>
        </LoginForm>
      </div>
      {/*<Footer />*/}
    </div>
  );
};
export default Login;
