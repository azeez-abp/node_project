// routesConfig.js
import express from 'express';
import clientRoute from '../route/client.js'
import generalRoute from '../route/general.js'
import managementRoute from '../route/management.js'
import saleRoute from '../route/sales.js'
import path from 'path'
//import ProductStat  from './model/ProductStat.js'


export function configureRoutes(app) {
 
  app.use('/client', clientRoute);
  app.use('/general', generalRoute);
  app.use('/management', managementRoute);
  app.use('/sales', saleRoute);

  app.use(express.static(path.join(process.cwd(), '/public')));
}
