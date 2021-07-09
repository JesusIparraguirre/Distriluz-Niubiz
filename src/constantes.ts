
export const environment = {

    HOST_ACCESO: 'http://10.217.1.104/rest/NiubizAcceso/api/v1',
    HOST_LOCAL: 'http://10.217.1.104/rest/NiubizApi/api/v1',
    X_APPKEY_SEGURIDAD: 'ZGlzdHJpbHV6X3BsYXRhZm9ybWFfc2VndXJpZGFkX3dlYg==',
    X_APPCODE_SEGURIDAD: 'AC98E15D-8665-4AD6-8614-E134E46563C6',
    TIME_TOAST: 4 * 1000,


    URL_LOGO_VISA: 'http://10.217.1.104/Niubiz/assets/image/banner.png',
    URL_ACTION_FORMVISA: 'http://10.217.1.104:8088/transaction.php',

    // URL_LOGO_VISA: 'http://localhost:4200/assets/image/banner.png',
    // URL_ACTION_FORMVISA: 'http://localhost/transaction1.php',

    // seguridad visa
    URL_TOKEN_VISA :'https://apitestenv.vnforapps.com/api.security/v1/security',
    // sesion visa
    URL_SESION_VISA : 'https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/',
    // formulario visa
    URL_FORMULARIO_VISA : 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true',
    // autorizacion pago visa
    URL_AUTORIZACION_VISA : 'https://apitestenv.vnforapps.com/api.authorization/v3/authorization/ecommerce/',

    DATOS_EMPRESA : [
      {id : '1', nombre : 'Electronoroeste S.A.', direccion: 'Ca. Callao N 875 Centro Piura'},
      {id : '2', nombre : 'Electronorte S.A.', direccion: 'Ca. San Martin N 250 Centro Chiclayo'},
      {id : '3', nombre : 'Hidrandina S.A.', direccion: 'Jr. San Martin N 831 Centro Trujillo'},
      {id : '4', nombre : 'Electrocentro S.A.', direccion: 'Jr. Amazonas N 641 Centro Huancayo'},
      {id : '5', nombre : 'Electro Oriente S.A.', direccion: 'Av. General EP Augusto Freyre N 1168'}
    ]
};
