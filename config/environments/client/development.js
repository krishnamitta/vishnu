module.exports = {
  services: {
    endpoint: '/services',
    purchaseRequisition: {
      create: '/HeaderSet'
    },
    references: {
      vendorList: "/VendorMaster?acctgroup='ZPUL'&sap-client=300&$format=json",
      countries: "/CountryMaster?locale='E'&sap-client=300&$format=json",
      UOMList: "/UomMaster?locale='E'&sap-client=300&$format=json",
      plantList: "/PlantMaster?sap-client=300&locale='E'&$format=json",
      currencyList: "/CurrencyMaster?locale='E'&sap-client=300&$format=json",
      materialList: "/MaterialMaster?locale='E'&materialtype='ZAWA'&sap-client=300&$format=json",
      materialGroupList: "/MatGrpMaster?sap-client=300&locale='E'&$format=json",
      businessUnitList: "/CostCenterMaster?locale='E'&sap-client=300&$format=json"
    },
    vendor: {
      address: '/VendAddress?sap-client=300&$format=json'
    }
  }
}
