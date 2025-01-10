// constants/permissions.js
export const ROLES = {
    ADMIN: 1,
    MESERO: 2,
    COCINA: 3,
    CAJA: 4,
    CLIENTE: 5
  };
  
  export const SECTIONS_BY_ROLE = {
    [ROLES.ADMIN]: [
      "overview",
      "products",
      "orders",
      "tables",
      "settings",
      "employees",
      "reports"
    ],
    [ROLES.MESERO]: [
      "orders",
      "tables",
      "overview"
    ],
    [ROLES.COCINA]: [
      "orders",
      "overview"
    ],
    [ROLES.CAJA]: [
      "orders",
      "overview",
      "reports"
    ],
    [ROLES.CLIENTE]: [
      "orders",
      "tables"
    ]
  };