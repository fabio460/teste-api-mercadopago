const express = require('express');
const cors = require('cors');
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
var mercadopago = require('mercadopago');
const { payment } = require('./controllers/paymantControler');
mercadopago.configure({
    access_token: process.env.access_token
});



app.get("/", async(req,res)=>{
    var response = {
      items: [
        {
          title: 'Blusa Regata',
          quantity: 2,
          currency_id: 'ARS',
          unit_price: 10.5
        },
        {
            title: 'Bermuda',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 6.8
        }
      ]
    };
    const result = await mercadopago.preferences.create(response)
    res.json(result.body.init_point)
})
app.post("/paymant",async(req, res)=>{
    const {items} = req.body
    var response = {
        items
      };
      const result = await mercadopago.preferences.create({
        items,
        back_urls:{
            success:"http://localhost:3000"
        }
      })
      res.json(result.body.init_point)
})
app.listen(4000,()=>console.log('rodando na porta 4000'))