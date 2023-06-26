import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  Image,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/services/LocalSlices/CartLocalSlice";
import { useRouter } from "next/router";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const path = useRouter().pathname;
  console.log(data)
  return (
    <Card maxW="xs" my={1}>
      <CardBody>
        <Image
          src={"/images/" + data.product_image }
          alt="Green double couch with wooden legs"
          height={150}
          width={230}
          className="object-cover"
          borderRadius="xl"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{data.product_title}</Heading>
          <Text>
            {data.product_desc.length < 50
              ? data.product_desc
              : data.product_desc.substr(0, 50) + "..."}
          </Text>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            ${data.product_price}
          </Text>
          {data.avg_rating && (
            <Text
              color="green.600"
              display={"flex"}
              gap={2}
              alignItems={"center"}
              fontSize="md"
            >
              <span>Average Rating : {data.avg_rating?.substr(0, 3)} </span>{" "}
              <BsStarFill className="text-yellow-500 inline-block" />
            </Text>
          )}
        </Stack>
      </CardBody>
      <hr className="border-2" />
      <CardFooter>
        <ButtonGroup spacing="2">
          {path !== "/" && (
            <Button
              onClick={() => dispatch(addToCart(data))}
              variant="solid"
              colorScheme="green"
            >
              Add to cart
            </Button>
          )}
          <Button
            variant={path === "/" ? "solid" : `ghost`}
            colorScheme="green"
          >
            <Link
              href={{ pathname: "detail", query: { prodId: data.product_id } }}
            >
              View More
            </Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
