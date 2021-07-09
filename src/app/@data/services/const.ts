import {environment} from "../../../constantes";

export class Const {
  public static XAPPKEY: string = 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u';
  public static XAPPCODE: string = 'F4640DCF-81C7-441E-9AF5-42AA551ECA47';
  public static LOCAL_IP: string = 'LOCAL_IP';
  public static HOST_NAME: string = 'HOST_NAME';
  public static BROWSER_NAME: string = 'BROWSER_NAME';
  public static BROWSER_VERSION: string = 'BROWSER_VERSION';
  public static SHOW_ALL: string = 'Ver Todos';

  public static API_LOGIN: string = environment.HOST_ACCESO + '/acceso/';
  public static API_CONSULTAR_SUMINISTRO: string = environment.HOST_LOCAL + '/Suministro/DatosPorSuministro?NroServicio={nroservicio}';
  public static API_CONSULTAR_DNI: string = environment.HOST_LOCAL + '/Suministro/DatosPorDocumento';
  public static API_CONSULTAR_DETALLE_DEUDA: string = environment.HOST_LOCAL + '/Suministro/DetalleDeuda?NroServicio={nroservicio}';
  public static API_GENERAR_TOKEN: string = environment.HOST_LOCAL + '/pago/generartoken?nroservicio={nroservicio}';
  public static API_GENERAR_NROPEDIDO: string = environment.HOST_LOCAL + '/pago/generarnropedido';
  public static API_GENERAR_INTENTO_PAGO: string = environment.HOST_LOCAL + '/pago/generarintentopago';
  public static API_REALIZAR_PAGO: string = environment.HOST_LOCAL + '/pago/realizarpago';
  public static API_VERIFICAR_PAGO: string = environment.HOST_LOCAL + '/pago/verificarpago';
  public static API_LISTAR_CONFIG: string = environment.HOST_LOCAL + '/Pago/ListarConfig';
  public static API_CANCELAR_PAGO: string = environment.HOST_LOCAL + '/pago/cancelarpago?nropedido={nropedido}';

  public static API_GENERAR_TOKEN_VISA: string = 'https://apitestenv.vnforapps.com/api.security/v1/security';
  public static API_GENERAR_SESSION_VISA: string = 'https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/602545705';
  public static API_SOLICITAR_AUTORIZACION_VISA: string = 'https://apitestenv.vnforapps.com/api.authorization/v3/authorization/ecommerce/602545705';


  public static API_LISTAR_NOPROCESADOS: string = environment.HOST_LOCAL + '/pago/listarnoprocesados';
  public static API_REALIZAR_PAGO_NOPROCESADO: string = environment.HOST_LOCAL + '/pago/realizarpagonoprocesado?NroPedido={nropedido}';
  
  // public static API_CONSULTAR_DNI: string = environment.HOST_LOCAL + '/Suministro/DatosPorDocumento?Nrodocumento={nrodocumento}';

}
