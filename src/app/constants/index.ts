const currencyArray = [
    { title: "USD" },
    { title: "EUR" },
    { title: "GBP" },
    { title: "CHF" },
    { title: "RUB" },
    { title: "SAR" },
  ];

const HTTP_STATUS_CODE_ERROR = {
    'MOVED_PERMANENTLY': 301,
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'CONFLICT': 409,
    'INTERNAL_SERVER_ERROR': 500,
    'BAD_GATEWAY': 502,
};

const HTTP_STATUS_CODE_SUCCESS = {
    'OK': 200,
    'CREATED': 201,
};

const cityArray = [
    {
        title: "İstanbul",
        code: "istanbul",
        plate: 34,
        isActive: 1,
    },
    {
        title: "Ankara",
        code: "ankara",
        plate: 6,
        isActive: 1,
    },
    {
        title: "İzmir",
        code: "izmir",
        plate: 35,
        isActive: 1,
    },
    {
        title: "Adana",
        code: "adana",
        plate: 1,
        isActive: 1,
    },
    {
        title: "Bursa",
        code: "bursa",
        plate: 16,
        isActive: 1,
    },
];

export { currencyArray, cityArray, HTTP_STATUS_CODE_SUCCESS, HTTP_STATUS_CODE_ERROR }