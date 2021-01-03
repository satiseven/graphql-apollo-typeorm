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
import { useRouter } from "next/router";
interface registerProps {}

const register: React.FC<registerProps> = (props) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            email: values.email,
            password: values.password,
          });
          // console.log(response.data?.register.errors);

          if (response.data?.register.errors) {
            console.log("yes");

            return setErrors(toErrorMap(response.data.register.errors));
          }
          router.push("/");
          //console.log(response.data.register?.user?.id);
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default register;
