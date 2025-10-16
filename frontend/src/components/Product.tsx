import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { IProductProps } from "../types/product";
import { CardMedia } from "@mui/material";

export default function Product({
  _id,
  title,
  price,
  stock,
  image,
}: IProductProps) {
  const addItemToCart = (_id: string) => {
    return _id;
  };

  return (
    <Card
      sx={{
        flex: "1",
        boxShadow:
          "-1px -2px 16px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{
          height: 200,
          aspectRatio: " 16 / 9",
          backgroundSize: "60%",
          margin: "20px",
        }}
        image={image}
        title="green iguana"
      />
      <CardContent sx={{ padding: "0 0 0 30px", marginRight: "auto" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            mb: "20px",
            height: "60px",
            width: "100%",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} SYP
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: "10px" }}
        >
          {stock} In Stock
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          margin: "20px",
          width: "100%",
          paddingLeft: "30px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() => addItemToCart(_id)}
        >
          Add To Cart
        </Button>

        <div style={{ width: "2rem", height: "2rem", paddingRight: "30px" }}>
          <span
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              borderRadius: "50%",
              backgroundColor: stock ? "#4caf50" : "#f44336",
            }}
          ></span>
        </div>
      </CardActions>
    </Card>
  );
}
