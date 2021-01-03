import { Box, Flex, Link } from "@chakra-ui/react";
import react from "react";
import NextLink from "next/link";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex bg="tomato">
      <Box bg="tomato" ml="auto">
        <NextLink href="/register">
          <Link mr={4}>Register</Link>
        </NextLink>

        <Link>Login</Link>
      </Box>
    </Flex>
  );
};
