export interface AddressRequestModel {
    KpsUserName: string;
    KpsPassword: string;
    TcKimlikNo: string;
    DogumGun: number;
    DogumAy: number;
    DogumYil: number;
  }
  
  export interface AddressResponseModel {
    result: number;
    adresTipi: string;
    il: string;
    ilce: string;
    mahalle: string;
    csbm: string;
    disKapiNo: string;
    icKapiNo: string;
    hataBilgisi: string;
  }
  