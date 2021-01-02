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
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

interface registerProps {}

const register: React.FC<registerProps> = (props) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
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
