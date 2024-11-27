import { Card, CardBody } from "@chakra-ui/react";

const CustomCard = ({ className, children }) => {
  return (
    <Card.Root  className={className} border="none">
      <CardBody>{children}</CardBody>
    </Card.Root >
  );
};

export default CustomCard;
