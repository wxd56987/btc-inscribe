import { FC } from "react";
import { Container } from "@chakra-ui/react";
import type { ContainerProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  containerProps?: ContainerProps;
}>;

export const AppLayout: FC<Props> = ({ children, containerProps }) => {
  return (
    <Container
      as="main"
      maxWidth="full"
      width="full"
      {...containerProps}
      overflowX="hidden"
      margin={0}
      padding={0}
    >
      {children}
    </Container>
  );
};
