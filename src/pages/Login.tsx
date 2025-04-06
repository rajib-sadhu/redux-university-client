import { Button, Card, Form, Input, Layout, Typography } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import {
  Controller,
  FieldValues,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHform from "../components/form/PHform";
import PHInput from "../components/form/PHInput";

const { Header, Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  // const { control, handleSubmit } = useForm<FieldValues>();

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {

    const toastId = toast.loading("logging In");

    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      console.log("Login", res.data.accessToken);
      navigate(`/${user.role}/dashboard`);

      toast.success("User Logging successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log("Login Error", error);
      toast.error("Login Error!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: 0 }}>
        <Title level={3} style={{ color: "white", margin: "16px" }}>
          Login System
        </Title>
      </Header>
      <Content
        style={{ padding: "50px", display: "flex", justifyContent: "center" }}
      >
        <Card style={{ width: 400 }}>
          <PHform onSubmit={onSubmit}>
            <PHInput name={"id"} type={"text"} label="ID" />
            <PHInput name={"password"} type={"password"} label="Password" />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
              >
                Login
              </Button>
            </Form.Item>
          </PHform>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
