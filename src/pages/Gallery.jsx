import React from "react";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Stack,
  ImageList,
  ImageListItem,
} from "@mui/material";
import MainTitle from "../components/MainTitle";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";
import img1 from "../assets/IMG-20210523-WA0000.jpg";
import img2 from "../assets/IMG-20210523-WA0003.jpg";
import img3 from "../assets/IMG-20210523-WA0005.jpg";
import img4 from "../assets/IMG-20210523-WA0002.jpg";
import img5 from "../assets/IMG-20210523-WA0029.jpg";
import img6 from "../assets/IMG-20210523-WA0025.jpg";
import img7 from "../assets/IMG-20210523-WA0012.jpg";
import img8 from "../assets/IMG-20210523-WA0016.jpg";
import img9 from "../assets/IMG-20210523-WA0030.jpg";
import img10 from "../assets/IMG-20210523-WA0024.jpg";
import img11 from "../assets/IMG_20210512_134824.jpg";
import img12 from "../assets/IMG-20210523-WA0021.jpg";
import img13 from "../assets/IMG-20210523-WA0026.jpg";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Gallery = () => {
  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <Stack spacing={3} mb={2}>
        <MainTitle title={"Photos mariage 1ère partie"} />
        <Typography
          sx={{
            fontSize: 38,
            fontFamily: alexBrush.fontFamily,
            fontWeight: alexBrush.fontWeight,
            fontStyle: alexBrush.fontStyle,
            color: theme.palette.primary.main,
          }}
          align='center'
          variant='h3'
        >
          12 mai 2021
        </Typography>
      </Stack>
      <Stack alignItems={"center"} mb={4}>
        <ImageList
          sx={{ width: 600, height: 550 }}
          variant='quilted'
          cols={4}
          rowHeight={121}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
      <Stack spacing={3}>
        <MainTitle title={"Photos mariage 2ème partie"} />
        <Typography
          sx={{
            fontSize: 38,
            fontFamily: alexBrush.fontFamily,
            fontWeight: alexBrush.fontWeight,
            fontStyle: alexBrush.fontStyle,
            color: theme.palette.primary.main,
          }}
          align='center'
          variant='h3'
        >
          25 mai 2022
        </Typography>
      </Stack>
    </Container>
  );
};

const itemData = [
  {
    img: img1,
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: img2,
    title: "Burger",
  },
  {
    img: img3,
    title: "Camera",
  },
  {
    img: img4,
    title: "Coffee",
    cols: 2,
    rows: 2,
  },
  {
    img: img5,
    title: "Hats",
    cols: 2,
    rows: 3,
  },
  {
    img: img6,
    title: "Honey",
    cols: 2,
  },
  {
    img: img7,
    title: "Basketball",
    cols: 2,
  },
  {
    img: img8,
    title: "Fern",
    cols: 2,
    rows: 2,
  },
  {
    img: img9,
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: img10,
    title: "Tomato basil",
    cols: 2,
    rows: 2,
  },
  {
    img: img11,
    title: "Sea star",
    cols: 2,
  },
  {
    img: img12,
    title: "Bike",
    cols: 2,
    rows: 2,
  },
  {
    img: img13,
    title: "Sea star",
    cols: 2,
    rows: 2,
  },
];

export default Gallery;
