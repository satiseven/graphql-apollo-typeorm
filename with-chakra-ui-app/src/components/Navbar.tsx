import { Box, Button, Flex, Link } from "@chakra-ui/react";
import react from "react";
import NextLink from "next/link";
import { useMeQuery, useUsersQuery } from "../generated/graphql";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching, data }] = useMeQuery();
  const [user] = useUsersQuery();
  let body = null;
  if (user.data) {
    console.log(user.data);
  }
  if (fetching) {
    body = <h1>Loading...</h1>;
  } else if (!data?.me) {
    console.log(data);

    body = (
      <>
        <NextLink href="/register">
          <Link mr={4}>Register</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
      </>
    );
  } else {
    console.log(data);
    body = (
      <Box>
        {" "}
        <Box> {data.me.email} </Box>
        <Button variant="link">Logout </Button>
      </Box>
    );
  }
  return (
    <Flex bg="tomato">
      <Box bg="tomato" ml="auto">
        {body}
      </Box>
    </Flex>
  );
};
