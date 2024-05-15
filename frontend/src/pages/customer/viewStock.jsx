import { useEffect, useState } from 'react';
import { useGet } from "./../../hooks/useFetch";
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Grid, Paper, IconButton, Chip, Avatar, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import Header from '../../components/customer/Header';
import { Container } from '@mui/material';
const ViewStock = () => {
  const { data, fetchData } = useGet();
  const [stocks, setStocks] = useState(null);
  const [stocksWithQty, setStocksWithQty] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const lsCartItemsJson = localStorage.getItem('cart-items')
    const lsCartItems = JSON.parse(lsCartItemsJson) || []
    const subtotal = lsCartItems.reduce((total, item) => total + item.qty, 0)
    setCartItemCount(subtotal)
  }, [stocksWithQty])

  useEffect(() => {
    if (!stocks) {
      fetchData('stocks')
    }
    if (data) {
      setStocks(data.data)
    }
  }, [data])

  useEffect(() => {
    if (!stocks) {
      fetchData('stocks')
    }
    if (stocks) {
      const lsCartItemsJson = localStorage.getItem('cart-items')
      const lsCartItems = JSON.parse(lsCartItemsJson) || []
      const mappedStock = stocks.map(stock => {
        const item = lsCartItems.find(finalizedCartItem => finalizedCartItem.id === stock.id)
        if (stock.id === item?.id) {
          return item
        }
        return stock
      })
      setStocksWithQty(mappedStock)
    }
  }, [stocks])

  const addToCart = async (stock) => {
    const lsCartItemsJson = await localStorage.getItem('cart-items')
    const lsCartItems = JSON.parse(lsCartItemsJson) || []
    let finalizedCartItems = []
    // check the cart is empty or not
    if (lsCartItems.length) {
      // check if the item exists or not
      let exists = lsCartItems.find(lsCartItem => lsCartItem.id === stock.id)
      if (exists) {
        // increment qty (cart quantity) using JS Array map function
        finalizedCartItems = lsCartItems.map(lsCartItem => {
          if (lsCartItem.id === stock.id) {
            return {
              ...lsCartItem,
              qty: Number(lsCartItem.qty || 0) + 1
            }
          }
          return lsCartItem
        })
      } else {
        finalizedCartItems = [{ ...stock, qty: 1 }, ...lsCartItems]
      }
    } else {
      // set item if the cart is empty
      finalizedCartItems = [
        { ...stock, qty: 1 }
      ]
    }
    const mappedStock = stocks.map(stock => {
      const item = finalizedCartItems.find(finalizedCartItem => finalizedCartItem.id === stock.id)
      if (stock.id === item?.id) {
        return item
      }
      return stock
    })
    setStocksWithQty(mappedStock)
    localStorage.setItem('cart-items', JSON.stringify(finalizedCartItems))
  }

  return (
    <>
    <Header />
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, marginTop: 32 }}>
        <Typography gutterBottom variant="h5" style={{ margin: 0, marginRight: 16 }}>
          Products
        </Typography>
        {cartItemCount > 0 && <Button variant="contained" href="cart" size="small" color="success" endIcon={
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCart color="white" />
          </Badge>}>
          View cart
        </Button>}
      </div>
      <Grid container spacing={1}>
        {(stocksWithQty || []).map((stock) => {
          return (
            <Grid md={3} xs={4}>
              <Paper style={{ padding: 8 }} elevation={0}>
                <Card key={stock.id}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="no-mage.jpg"
                    title={stock.name}
                  />
                  <CardContent>
                    <Chip label={stock.type} size="small" variant="outlined" style={{ marginBottom: 8 }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: 0 }}>
                        {stock.name}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div" style={{ marginLeft: 8, marginBottom: 0 }}>
                        ({stock.brand})
                      </Typography>
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {stock.color.toLowerCase()}
                      </Typography>
                      <div style={{ marginLeft: 8, width: 8, height: 8, borderRadius: 16, backgroundColor: stock.color }}></div>
                    </div>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'space-between' }}>
                    <Chip color="secondary" size="small" avatar={<Avatar>Rs</Avatar>} label={`${stock.price}/=`} />
                    <IconButton aria-label="add to favorites" color="success" onClick={() => addToCart(stock)}>
                      <Badge badgeContent={stock.qty} color="primary">
                        <ShoppingCart color="action" />
                      </Badge>
                    </IconButton>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>)
        })}
      </Grid>
      </Container>
    </>
  )
}

export default ViewStock