import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../types";
import { API_SERVER_DOMAIN } from "../../constants";

type ProductItemProps = {
  product: ProductType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();

  const handlePushProductPage = () => navigate(`/product/${product.id}`);
  const handlePushPurchasePage = () => navigate(`/purchase/${product.id}`);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, padding: 3, height: 300 }}>
        <CardContent 
          sx={{ padding: 0 }}
          onClick={handlePushProductPage}
        >
          {product.thumbnail && (
            <CardMedia
              sx={{ height: 140 }}
              image={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
              title={product.name}
            />
          )}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="test.secondary"
            sx={{
              height: 30,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.explanation}
          </Typography>
        </CardContent>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 3
        }}>
          <Button
            size="small"
            onClick={handlePushPurchasePage}
            variant="contained"
          >
            구매하기
          </Button>
        </Box>
      </Card>
    </Grid>
  )
}

export default ProductItem;