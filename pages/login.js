import LoginForm from "@/components/LoginForm";
import React from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SignUpForm from "@/components/SignupForm";

const Login = () => {
  const MultiForm = () => {
    const form1 = useForm();
    const form2 = useForm();
    return [form1, form2];
  };
  const [
    {
      register  : register1,
      handleSubmit : handleSubmit1,
      reset: reset1,
      formState: { errors : errors1 },
    },
    {
      register  : register2,
      handleSubmit : handleSubmit2,
      reset: reset2,
      formState: { errors : errors2 },
    },
  ] = MultiForm();

  return (
    <Tabs p={"12"} variant="soft-rounded" colorScheme="green">
      <TabList>
        <Tab fontSize={"xl"}>Login</Tab>
        <Tab fontSize={"xl"}>Signup</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="flex justify-center items-center">
            <LoginForm
              email={"userEmail"}
              role={"user"}
              password={"userPassword"}
              register={register1}
              handleSubmit={handleSubmit1}
              errors={errors1}
              reset={reset1}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex justify-center items-center">
            <SignUpForm
              name={"userName"}
              email={"userEmail"}
              role={"user"}
              password={"userPassword"}
              register={register2}
              handleSubmit={handleSubmit2}
              errors={errors2}
              reset={reset2}
            />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Login;
