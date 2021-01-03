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
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
interface loginProps {}

const login: React.FC<loginProps> = (props) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            email: values.email,
            password: values.password,
          });
          // console.log(response.data?.login.errors);

          if (response.data?.login.errors) {
            console.log("yes");

            return setErrors(toErrorMap(response.data.login.errors));
          }
          router.push("/");
          //console.log(response.data.login?.user?.id);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="Username" label="Username" />

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
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default login;
