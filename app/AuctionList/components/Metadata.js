/*eslint-disable*/

import LinkComponent from './LinkComponent'
import ButtonComponent from './ActionComponent'


export default [

  {
   "columnName": "yardNumber",
   "order": 1,
   "locked": false,
   "visible": true,
   "displayName": "Yard Number",
 },
 {
   "columnName": "yardName",
   "order": 2,
   "locked": false,
   "visible": true,
   "displayName": "Yard Name",
 },
 {
   "columnName": "lotsAssigned",
   "order": 3,
   "locked": false,
   "visible": true,
   "displayName": "Lots",
 },
 {
   "columnName": "statusCode",
   "order": 4,
   "locked": false,
   "visible": true,
   "displayName": "Status Code",
 },
 {
   "columnName": "status",
   "order": 5,
   "locked": false,
   "visible": true,
   "displayName": "status",
   "customComponent" : LinkComponent

 },
 {
   "columnName": "yardCountry",
   "order":  6,
   "locked": false,
   "visible": true,
   "displayName": "Yard Country",




 },
 {
   "columnName": "actions",
   "visible": true,
   "displayName": "Actions",
      "customComponent": ButtonComponent



 }
 ]
