import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Wrap,
} from "@chakra-ui/react";
import { Form, Formik, useField } from "formik";
import react, { InputHTMLAttributes } from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const register: React.FC<registerProps> = (props) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            email: values.username,
            password: values.password,
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          }
          response.data.register?.user?.id;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />

            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default register;
