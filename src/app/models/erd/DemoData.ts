// this file will be deleted in the future, but currently is needed to ease on development

import Entity from "./Entity";
import Relation from "./Relation";

export const entitiesMap = {
  user: new Entity(1, 'User'),
  account: new Entity(2, 'Account'),
  order: new Entity(3, 'Order'),
  product: new Entity(4, 'Product'),
  orderLine: new Entity(5, 'OrderLine')
};

export const entites = Object.values(entitiesMap);

export const relations = [
  new Relation(entitiesMap.user, entitiesMap.account),
  new Relation(entitiesMap.account, entitiesMap.order),
  new Relation(entitiesMap.orderLine, entitiesMap.order),
  new Relation(entitiesMap.orderLine, entitiesMap.product)
];
