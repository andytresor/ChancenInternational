import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

const CustomCard = ({ className, children }) => {
  return (
    <Card.Root  className={className}>
      <CardBody>{children}</CardBody>
    </Card.Root >
  );
};

export default CustomCard;
